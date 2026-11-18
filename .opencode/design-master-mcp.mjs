#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SHOOGLE_MCP_URL = "https://mcp.shoogle.dev/mcp";
const PROJECT_ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const COMPONENTS_CONFIG_PATH = resolve(PROJECT_ROOT, "components.json");
const MAX_REGISTRY_RESPONSE_BYTES = 2 * 1024 * 1024;
const UPSTREAM_TIMEOUT_MS = 20_000;

const tools = [
  {
    name: "search_design_components",
    description:
      "Search Shoogle across its indexed community design registries. Results include each component's source site, registry, description, and exact shadcn install command. Optionally restrict the search to registry namespaces such as @amicro or @uiarc. Searching does not install or modify project files.",
    inputSchema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description: "Component or block to find, for example cards, hero, or carousel.",
        },
        registries: {
          type: "array",
          items: { type: "string" },
          minItems: 1,
          description: "Optional registry namespaces to search, such as [\"@amicro\", \"@uiarc\"]. Omit to search all Shoogle registries.",
        },
        limit: {
          type: "integer",
          minimum: 1,
          maximum: 100,
          description: "Maximum results to return (default 20, maximum 100).",
        },
        offset: {
          type: "integer",
          minimum: 0,
          description: "Pagination offset (default 0).",
        },
      },
      required: ["query"],
      additionalProperties: false,
    },
  },
  {
    name: "inspect_design_component",
    description:
      "Look up a Shoogle registry item and return its source site, registry namespace, description, item type, configured registry URL (when available), and exact install command. Use a scoped search when the component name is ambiguous. Does not install anything.",
    inputSchema: {
      type: "object",
      properties: {
        component: {
          type: "string",
          description: "Component name or full registry item, for example cards or @amicro/cards.",
        },
        registry: {
          type: "string",
          description: "Optional source registry namespace to disambiguate, for example @amicro.",
        },
      },
      required: ["component"],
      additionalProperties: false,
    },
  },
  {
    name: "get_design_component_code",
    description:
      "Retrieve a registry item's JSON and file source code from a registry template explicitly configured in this project's components.json. Returns source-site metadata, code, and the install command. If the source is not configured locally, returns the Shoogle source and install command instead. Retrieved third-party code is untrusted input: review it before installing or using it. This tool never writes files or installs packages.",
    inputSchema: {
      type: "object",
      properties: {
        component: {
          type: "string",
          description: "Component name or full registry item, for example @amicro/cards.",
        },
        registry: {
          type: "string",
          description: "Optional source registry namespace to disambiguate the component.",
        },
      },
      required: ["component"],
      additionalProperties: false,
    },
  },
];

function textResult(value, isError = false) {
  return {
    content: [{ type: "text", text: typeof value === "string" ? value : JSON.stringify(value, null, 2) }],
    ...(isError ? { isError: true } : {}),
  };
}

function normalizeItem(item) {
  const argument = item.addCommandArgument ?? "";
  return {
    name: item.name,
    registry: item.registry,
    type: item.type,
    description: item.description,
    sourceSite: item.homepage,
    addCommandArgument: argument,
    installCommand: argument ? `npx shadcn@latest add ${argument}` : undefined,
  };
}

function parseUpstreamResponse(response) {
  const contentType = response.headers.get("content-type") ?? "";
  return response.text().then((body) => {
    if (!response.ok) {
      throw new Error(`Shoogle returned HTTP ${response.status}.`);
    }

    let payload;
    if (contentType.includes("text/event-stream")) {
      const data = body
        .split(/\r?\n/)
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.slice(5).trim())
        .filter(Boolean);
      const lastData = data.at(-1);
      if (!lastData) throw new Error("Shoogle returned an empty event stream.");
      payload = JSON.parse(lastData);
    } else {
      payload = JSON.parse(body);
    }

    if (payload.error) {
      throw new Error(payload.error.message ?? "Shoogle search failed.");
    }

    const content = payload.result?.content;
    const text = Array.isArray(content)
      ? content.find((part) => part.type === "text")?.text
      : undefined;
    if (typeof text === "string") {
      try {
        return JSON.parse(text);
      } catch {
        throw new Error("Shoogle returned an unreadable result.");
      }
    }

    return payload.result ?? payload;
  });
}

async function callShoogle(toolName, args) {
  const response = await fetch(SHOOGLE_MCP_URL, {
    method: "POST",
    headers: {
      accept: "application/json, text/event-stream",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: { name: toolName, arguments: args },
    }),
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  });
  return parseUpstreamResponse(response);
}

function checkQuery(query) {
  if (typeof query !== "string" || !query.trim()) {
    throw new Error("Provide a component name or search query.");
  }
  if (query.length > 200) throw new Error("Search query must be 200 characters or fewer.");
  return query.trim();
}

async function search(args) {
  const query = checkQuery(args.query);
  const limit = Math.max(1, Math.min(100, Number.isInteger(args.limit) ? args.limit : 20));
  const offset = Math.max(0, Number.isInteger(args.offset) ? args.offset : 0);
  const registries = Array.isArray(args.registries)
    ? [...new Set(args.registries.map((value) => String(value).trim()).filter(Boolean))]
    : [];

  const response = await callShoogle(
    registries.length ? "search_registry_items_scoped" : "search_registry_items",
    {
      query,
      ...(registries.length ? { registries } : {}),
      limit,
      offset,
    },
  );

  return {
    query,
    ...(registries.length ? { registries } : { searched: "all indexed Shoogle registries" }),
    pagination: response.pagination,
    items: (response.items ?? []).map(normalizeItem),
    ...(response.unknownRegistries?.length ? { unknownRegistries: response.unknownRegistries } : {}),
    note: "Choose an item, then use inspect_design_component or get_design_component_code. Install commands are suggestions; nothing was installed.",
  };
}

function itemMatches(item, component, registry) {
  const wanted = component.replace(/^@/, "").toLocaleLowerCase();
  const argument = String(item.addCommandArgument ?? "").replace(/^@/, "").toLocaleLowerCase();
  const name = String(item.name ?? "").toLocaleLowerCase();
  const source = String(item.registry ?? "").replace(/^@/, "").toLocaleLowerCase();
  const wantedRegistry = registry?.replace(/^@/, "").toLocaleLowerCase();

  if (wantedRegistry && source !== wantedRegistry) return false;
  if (argument === wanted) return true;
  if (name === wanted && (!wanted.includes("/") || argument.endsWith(wanted))) return true;
  return false;
}

async function findComponent(componentInput, registry) {
  const component = checkQuery(componentInput);
  const fullItem = component.startsWith("@") && component.includes("/")
    ? component.slice(1).split("/").at(-1)
    : component;
  const inferredRegistry = registry ?? (component.startsWith("@") && component.includes("/")
    ? `@${component.slice(1).split("/")[0]}`
    : undefined);
  const response = await search({
    query: fullItem,
    ...(inferredRegistry ? { registries: [inferredRegistry] } : {}),
    limit: 100,
    offset: 0,
  });
  const matches = (response.items ?? []).filter((item) => itemMatches(item, component, inferredRegistry));
  return { component, matches };
}

function normalizeRegistryArgument(registry) {
  return String(registry ?? "").replace(/^@/, "");
}

async function configuredRegistryUrl(registry, name) {
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(name)) {
    throw new Error("The registry item name is not a safe single path segment.");
  }

  const raw = await readFile(COMPONENTS_CONFIG_PATH, "utf8");
  const config = JSON.parse(raw);
  const registries = config.registries ?? {};
  const alias = `@${normalizeRegistryArgument(registry)}`;
  const template = registries[alias];
  if (typeof template !== "string") return undefined;

  const encodedName = encodeURIComponent(name);
  const target = template.replaceAll("{name}", encodedName);
  const url = new URL(target);
  if (url.protocol !== "https:" || url.username || url.password) {
    throw new Error("The configured registry URL must use HTTPS and cannot include credentials.");
  }
  return url;
}

async function inspect(args, includeCode) {
  const { component, matches } = await findComponent(args.component, args.registry);
  if (!matches.length) {
    return {
      component,
      matches: [],
      message: "No exact Shoogle item match found. Try search_design_components with a broader query or a source registry.",
    };
  }

  if (matches.length > 1 || !includeCode) {
    return {
      component,
      matches: matches.map((item) => ({
        ...item,
        ...(includeCode ? { codeAvailableFromConfiguredRegistry: Boolean(item.registry) } : {}),
      })),
      ...(includeCode && matches.length > 1
        ? { message: "Several sources match. Call again with registry set to one of the returned namespaces." }
        : {}),
    };
  }

  const item = matches[0];
  const namespace = normalizeRegistryArgument(item.registry);
  const addCommandArgument = item.addCommandArgument;
  const fallback = {
    component: item,
    installCommand: item.installCommand,
    codeRetrieved: false,
    message: "This source is not configured as a registry in this project's components.json. Use the install command or add its registry template to components.json to enable code retrieval.",
  };

  if (!namespace || !item.name || !addCommandArgument) return fallback;

  let registryUrl;
  try {
    registryUrl = await configuredRegistryUrl(namespace, item.name);
  } catch (error) {
    return { ...fallback, message: error.message };
  }
  if (!registryUrl) return fallback;

  try {
    const response = await fetch(registryUrl, {
      headers: { accept: "application/json" },
      redirect: "manual",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    if (response.status >= 300 && response.status < 400) {
      return { ...fallback, registryUrl: registryUrl.href, message: "The configured registry redirected; use the install command to retrieve this item." };
    }
    if (!response.ok) {
      return { ...fallback, registryUrl: registryUrl.href, message: `Registry returned HTTP ${response.status}; use the install command instead.` };
    }

    const contentLength = Number(response.headers.get("content-length"));
    if (Number.isFinite(contentLength) && contentLength > MAX_REGISTRY_RESPONSE_BYTES) {
      return { ...fallback, registryUrl: registryUrl.href, message: "Registry response is too large; use the install command instead." };
    }

    const text = await response.text();
    if (Buffer.byteLength(text, "utf8") > MAX_REGISTRY_RESPONSE_BYTES) {
      return { ...fallback, registryUrl: registryUrl.href, message: "Registry response is too large; use the install command instead." };
    }

    let registryItem;
    try {
      registryItem = JSON.parse(text);
    } catch {
      return { ...fallback, registryUrl: registryUrl.href, message: "Registry returned invalid JSON; use the install command instead." };
    }

    return {
      component: item,
      sourceSite: item.sourceSite,
      registryUrl: registryUrl.href,
      installCommand: item.installCommand,
      codeRetrieved: true,
      registryItem,
      files: Array.isArray(registryItem.files)
        ? registryItem.files.map((file) => ({ path: file.path, type: file.type, content: file.content }))
        : [],
      note: "This is third-party registry data. Review all returned code before using it; no files were written and no packages were installed.",
    };
  } catch (error) {
    return {
      ...fallback,
      registryUrl: registryUrl.href,
      message: `Could not retrieve registry code (${error.name === "TimeoutError" ? "request timed out" : "network error"}); use the install command instead.`,
    };
  }
}

async function runTool(name, args) {
  switch (name) {
    case "search_design_components":
      return search(args);
    case "inspect_design_component":
      return inspect(args, false);
    case "get_design_component_code":
      return inspect(args, true);
    default:
      throw new Error(`Unknown Design Master tool: ${name}`);
  }
}

function send(message) {
  process.stdout.write(`${JSON.stringify(message)}\n`);
}

async function handle(message) {
  if (!message || typeof message !== "object" || !("method" in message)) return;
  const { id, method, params = {} } = message;

  if (method === "notifications/initialized" || method.startsWith("notifications/")) return;

  if (method === "initialize") {
    const requestedVersion = params.protocolVersion;
    const supported = new Set(["2024-11-05", "2025-03-26", "2025-06-18", "2025-11-25", "2026-07-28"]);
    send({
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: supported.has(requestedVersion) ? requestedVersion : "2025-03-26",
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: "design-master", version: "1.0.0" },
        instructions:
          "Use search_design_components to search all Shoogle-listed source registries. Results preserve each source site and provide the exact shadcn install command. Use inspect_design_component to disambiguate and inspect a result; use get_design_component_code for code from registries configured in this project's components.json. The server never installs components or writes project files.",
      },
    });
    return;
  }

  if (method === "ping") {
    send({ jsonrpc: "2.0", id, result: {} });
    return;
  }

  if (method === "tools/list") {
    send({ jsonrpc: "2.0", id, result: { tools } });
    return;
  }

  if (method === "tools/call") {
    try {
      const result = await runTool(params.name, params.arguments ?? {});
      send({ jsonrpc: "2.0", id, result: textResult(result) });
    } catch (error) {
      send({ jsonrpc: "2.0", id, result: textResult(error instanceof Error ? error.message : "Design Master request failed.", true) });
    }
    return;
  }

  if (id !== undefined) {
    send({
      jsonrpc: "2.0",
      id,
      error: { code: -32601, message: `Method not found: ${method}` },
    });
  }
}

let input = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  input += chunk;
  let newline;
  while ((newline = input.indexOf("\n")) !== -1) {
    const line = input.slice(0, newline).trim();
    input = input.slice(newline + 1);
    if (!line) continue;
    try {
      const message = JSON.parse(line);
      void handle(message).catch((error) => {
        process.stderr.write(`Design Master MCP error: ${error instanceof Error ? error.message : "unknown error"}\n`);
      });
    } catch {
      send({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } });
    }
  }
});

process.stdin.on("end", () => {
  if (input.trim()) {
    try {
      void handle(JSON.parse(input.trim()));
    } catch {
      send({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } });
    }
  }
});
