import { NextResponse } from "next/server";

/**
 * Receives a contact message.
 *
 * The site has no mail transport wired up, so the message is validated and
 * logged on the server. Swap the log for the real transport when one is
 * configured — the client already treats a non-2xx answer as a failure and
 * keeps the form open.
 */
export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { name, email, topic, message } = (payload ?? {}) as Record<string, unknown>;

  const valid =
    typeof name === "string" &&
    name.trim().length > 0 &&
    typeof email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()) &&
    typeof message === "string" &&
    message.trim().length >= 20;

  if (!valid) {
    return NextResponse.json({ error: "Invalid message" }, { status: 400 });
  }

  console.log("[contact]", { name, email, topic, message });

  return NextResponse.json({ ok: true });
}
