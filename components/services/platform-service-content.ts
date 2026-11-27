import type { Stat } from "@/components/arc/blocks/stats-band/stats-band-data";

/**
 * Content for the five platform, reliability and security service routes.
 *
 * The copy is carried over from the original static site (public/<route>/index.html)
 * so the wording stays the one Shuroq already published, and the numbers quoted
 * in the stats and metrics are the ones those pages claimed.
 *
 * Each page names its own `heroVariant`, `sections`, `faqVariant` and
 * `ctaVariant`, so no two service pages are built from the same layout.
 *
 * `icon` holds the name of a lucide-react icon; the page component resolves it.
 */
export type ServiceIconName =
  | "Rocket"
  | "Users"
  | "Shield"
  | "ChartLine"
  | "Box"
  | "Cog"
  | "Wrench"
  | "Component"
  | "Puzzle"
  | "UserCog"
  | "Infinity"
  | "GitBranch"
  | "Truck"
  | "Heart"
  | "Flag"
  | "Undo"
  | "Bot"
  | "Calculator"
  | "Bell"
  | "Server"
  | "Bug"
  | "BookOpen"
  | "Search"
  | "Lock"
  | "Cloud"
  | "ChartBar"
  | "ChartArea"
  | "Network"
  | "Activity"
  | "Database"
  | "Gauge"
  | "CircleCheck"
  | "DollarSign"
  | "Triangle"
  | "Clock"
  | "Code"
  | "CodeXml"
  | "ScanEye"
  | "ScanSearch"
  | "Radar"
  | "Compass"
  | "Braces"
  | "Blocks"
  | "LifeBuoy"
  | "Orbit"
  | "Satellite"
  | "Globe"
  | "MapPin"
  | "Play"
  | "Layers"
  | "Waypoints"
  | "Route"
  | "Container"
  | "Boxes"
  | "Siren"
  | "Newspaper"
  | "RefreshCw";

export type ServiceHighlight = {
  icon: ServiceIconName;
  title: string;
  description: string;
};

export type ServiceCapability = {
  title: string;
  lead: string;
  description: string;
  detail: string;
  /** Deep-link anchor. The legacy redirects still point at a few of these. */
  id?: string;
  items: { title: string; description: string }[];
};

export type ServiceTool = {
  name: string;
  category: string;
  note: string;
};

export type ServiceEngagement = {
  value: string;
  label: string;
  description: string;
  meta: string;
};

/**
 * The sections a service page is built from. Each page picks its own set and
 * its own order, so no two service pages read the same way: one runs a stats
 * band into a comparison table, another runs a chart into a stepper.
 */
export type ServiceSectionKind =
  | "highlights"
  | "stats"
  | "capabilityCards"
  | "capabilityTabs"
  | "capabilityAccordion"
  | "capabilitySpec"
  | "capabilityColumns"
  | "code"
  | "metrics"
  | "sparklines"
  | "progress"
  | "slo"
  | "lineChart"
  | "barChart"
  | "donut"
  | "heatmap"
  | "comparison"
  | "engagement"
  | "stepper"
  | "approach"
  | "approachRail"
  | "tools"
  | "toolChips"
  | "slides"
  | "expand"
  | "checklist"
  | "useCases"
  | "scenarioGrid"
  | "catalog"
  | "slope"
  | "ridges"
  | "waffle"
  | "stream"
  | "faq"
  | "cta";

/** How a service page opens. */
export type ServiceHeroVariant =
  | "split"
  | "centered"
  | "image"
  | "imageLeft"
  | "panel";

export type ServiceChartLineSeries = {
  key: string;
  label: string;
  color?: string;
  dashed?: boolean;
  area?: boolean;
};

export type ServiceChartLineDatum = {
  key: string;
  label: string;
  axisLabel?: string;
  values: Record<string, number | undefined>;
};

export type ServiceChartBarDatum = {
  key: string;
  label: string;
  axisLabel?: string;
  value: number;
};

export type ServiceChartDonutDatum = {
  key: string;
  label: string;
  value: number;
};

export type ServiceChartHeatmapDay = { date: string; count: number };

export type PlatformServiceData = {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  /** The shape of the opening band. */
  heroVariant: ServiceHeroVariant;
  /** The sections this page is built from, in the order it reads. */
  sections: ServiceSectionKind[];
  /** The FAQ layout. */
  faqVariant?: "accordion" | "columns" | "search";
  /** The closing call to action. */
  ctaVariant?: "split" | "centered" | "banner";
  /** Charts and measures that only some pages carry. */
  charts?: {
    line?: {
      label: string;
      unit: string;
      series: ServiceChartLineSeries[];
      data: ServiceChartLineDatum[];
    };
    bar?: {
      label: string;
      period: string;
      unit: string;
      data: ServiceChartBarDatum[];
    };
    donut?: {
      label: string;
      data: ServiceChartDonutDatum[];
    };
    heatmap?: {
      label: string;
      period: string;
      days: ServiceChartHeatmapDay[];
    };
  };
  /** Slides for the carousel layout. */
  slides?: { tag: string; title: string; body: string }[];
  /** The opening checklist. */
  checklist?: {
    title: string;
    doneTitle: string;
    steps: { id: string; title: string; description: string }[];
  };
  intro: {
    title: string;
    description: string;
  };
  highlightsTitle: string;
  highlights: ServiceHighlight[];
  statsTitle: string;
  statsDescription: string;
  stats: Stat[];
  capabilitiesTitle: string;
  capabilitiesIntro: string;
  capabilities: ServiceCapability[];
  code: {
    filename: string;
    language: string;
    caption: string;
    code: string;
  };
  metricsTitle: string;
  metrics: {
    label: string;
    value: number;
    suffix?: string;
    context: string;
    change?: string;
    /** A short run of values behind the headline, for the pages that plot it. */
    spark?: number[];
  }[];
  comparison: {
    title: string;
    description: string;
    columns: { id: string; name: string; caption: string; highlight?: boolean }[];
    sections: {
      id: string;
      title: string;
      rows: {
        id: string;
        feature: string;
        hint?: string;
        values: Record<string, boolean | "partial" | string>;
      }[];
    }[];
  };
  engagementTitle: string;
  engagementIntro: string;
  engagement: ServiceEngagement[];
  approachTitle: string;
  approachIntro: string;
  approach: { title: string; description: string }[];
  toolsTitle: string;
  toolsIntro: string;
  tools: ServiceTool[];
  faqTitle: string;
  faq: { question: string; answer: string }[];
  useCases?: { title: string; description: string }[];
  /** The service catalog, as a tree of what teams can build on. */
  catalog?: {
    title: string;
    description: string;
    roots: { id: string; label: string; children?: { id: string; label: string }[] }[];
  };
  /** One measure before and after, as a slope between two moments. */
  slope?: {
    title: string;
    description: string;
    label: string;
    startLabel: string;
    endLabel: string;
    items: { key: string; label: string; start: number; end: number }[];
  };
  /** A distribution per service, drawn as overlapping ridges. */
  ridges?: {
    title: string;
    description: string;
    label: string;
    unit: string;
    series: { id: string; label: string; values: number[] }[];
  };
  /** The whole counted in squares, one per percent. */
  waffle?: {
    title: string;
    description: string;
    label: string;
    data: { key: string; label: string; value: number }[];
  };
  /** The mix of traffic over time, layer on layer. */
  stream?: {
    title: string;
    description: string;
    label: string;
    unit: string;
    series: { key: string; label: string }[];
    data: {
      key: string;
      label: string;
      axisLabel?: string;
      values: Record<string, number | undefined>;
    }[];
  };
  cta: {
    title: string;
    description: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
    points: string[];
  };
};

const uptime90 = Array.from({ length: 90 }, (_, day) =>
  day === 51 ? 99.24 : day === 23 ? 99.93 : 100,
);

/* A year of incident pressure for the reliability heatmap. The shape is
   fixed — a slow wave across the year with a spike every five weeks — so the
   picture is the same on the server and on the client. */
const incidentDays = Array.from({ length: 364 }, (_, day) => {
  const date = new Date(Date.UTC(2025, 0, 6) + day * 86400000)
    .toISOString()
    .slice(0, 10);
  const wave = Math.abs(Math.sin(day / 11));
  return { date, count: Math.round(wave * 8) + (day % 37 === 0 ? 6 : 0) };
});

export const platformServiceDetails: Record<string, PlatformServiceData> = {
  "platform-engineering": {
    slug: "platform-engineering",
    eyebrow: "Platform Engineering",
    title: "Platform Engineering",
    subtitle:
      "Building robust internal developer platforms that accelerate engineering velocity.",
    image: "/images/services/generated/platform-cicd.webp",
    imageAlt:
      "A modular internal developer platform assembling golden paths from reusable components",
    heroVariant: "split",
    sections: [
      "highlights",
      "stats",
      "capabilityCards",
      "catalog",
      "code",
      "metrics",
      "engagement",
      "approach",
      "tools",
      "useCases",
      "faq",
      "cta",
    ],
    faqVariant: "accordion",
    ctaVariant: "split",
    intro: {
      title: "Empower your teams with internal developer platforms",
      description:
        "At Shuroq, we specialize in building robust internal developer platforms that accelerate engineering velocity and enhance developer experience. Our comprehensive platform engineering services span from Backstage portal implementation to progressive delivery pipelines, ensuring your teams have the tools and infrastructure they need to innovate faster and more efficiently.",
    },
    highlightsTitle: "What a platform changes",
    highlights: [
      {
        icon: "Rocket",
        title: "Accelerated development",
        description: "Reduce development time by 40% with streamlined workflows.",
      },
      {
        icon: "Users",
        title: "Enhanced developer experience",
        description: "Self-service platforms that developers love to use.",
      },
      {
        icon: "Shield",
        title: "Enterprise security",
        description: "Built-in security and compliance for all platforms.",
      },
      {
        icon: "ChartLine",
        title: "Scalable infrastructure",
        description: "Platforms that grow with your organization's needs.",
      },
    ],
    catalog: {
      title: "What the catalog holds",
      description:
        "One place to find what to build on, what already exists, and who owns it. Every node here is a template a team can start from on the same morning.",
      roots: [
        {
          id: "golden-paths",
          label: "Golden paths",
          children: [
            { id: "service", label: "Service template" },
            { id: "library", label: "Library template" },
            { id: "pipeline", label: "Pipeline template" },
            { id: "event", label: "Event-driven service" },
          ],
        },
        {
          id: "runtime",
          label: "Runtime",
          children: [
            { id: "clusters", label: "Kubernetes clusters" },
            { id: "environments", label: "Environments" },
            { id: "secrets", label: "Secrets and identity" },
          ],
        },
        {
          id: "delivery",
          label: "Delivery",
          children: [
            { id: "runners", label: "Build runners" },
            { id: "artifacts", label: "Artifact registry" },
            { id: "rollout", label: "Progressive rollout" },
          ],
        },
        {
          id: "observation",
          label: "Observation",
          children: [
            { id: "logs", label: "Log pipeline" },
            { id: "metrics", label: "Metrics and dashboards" },
            { id: "alerts", label: "Alert routing" },
          ],
        },
      ],
    },

    statsTitle: "What platform work moves",
    statsDescription:
      "Measured across platform engagements after the first four quarters of steady use.",
    stats: [
      {
        value: 40,
        suffix: "%",
        label: "Reduction in development time",
        detail: "With streamlined workflows",
        context: "Measured against the pre-platform baseline",
        visual: {
          kind: "trend",
          values: [148, 141, 152, 139, 128, 121, 112, 104, 96, 88, 79, 71],
        },
      },
      {
        value: 50,
        suffix: "%",
        label: "Productivity increase",
        detail: "Across platform implementations",
        context: "Reported by teams after go-live",
        visual: { kind: "uptime", days: uptime90 },
      },
      {
        value: 90,
        suffix: "%",
        label: "Reduction in deployment time",
        detail: "Through infrastructure automation",
        context: "From a manual ticket to an automatic provision",
        visual: {
          kind: "distribution",
          bins: [2, 9, 21, 30, 24, 17, 11, 8, 5, 3, 2, 1.2, 0.8, 0.5, 0.3],
          max: 160,
          marker: 42,
        },
      },
      {
        value: 30,
        suffix: "%",
        label: "Cost savings",
        detail: "From optimized resource usage",
        context: "After twelve months of self-service",
        visual: {
          kind: "map",
          points: [
            [-122.4, 37.8],
            [-74, 40.7],
            [-0.1, 51.5],
            [2.35, 48.9],
            [8.7, 50.1],
            [18, 59.3],
            [28, -26.2],
            [36.8, -1.3],
            [55.3, 25.3],
            [72.9, 19.1],
            [103.8, 1.35],
            [114.2, 22.3],
            [139.7, 35.7],
            [151.2, -33.9],
          ],
        },
      },
    ],
    capabilitiesTitle: "Four disciplines, one platform",
    capabilitiesIntro:
      "A platform is an exercise in removing repetition. Each discipline below removes a different kind of manual work from the path between an idea and a running service.",
    capabilities: [
      {
        title: "Platform engineering services",
        lead: "Design and build internal developer platforms that scale",
        description:
          "Design and build comprehensive internal developer platforms (IDP) that provide self-service capabilities, automated workflows, and standardized tooling across your organization.",
        detail:
          "We start from how your teams actually ship today, then give the platform a shape that fits: a catalog developers can browse, templates they can trust, and policies that apply themselves.",
        items: [
          {
            title: "Internal developer platform",
            description: "Custom IDP design and implementation.",
          },
          {
            title: "Developer toolchain",
            description: "Standardized development tools and workflows.",
          },
          {
            title: "Infrastructure automation",
            description: "Automated provisioning and management.",
          },
        ],
      },
      {
        title: "Backstage consulting",
        id: "backstage",
        lead: "Build a unified developer portal with Backstage",
        description:
          "Implement and customize Backstage to create a centralized developer portal that provides a unified interface for all your development tools, services, and documentation.",
        detail:
          "The portal becomes the front door to everything a team owns, so ownership, runbooks and golden paths live next to the code that implements them.",
        items: [
          {
            title: "Implementation",
            description: "End-to-end Backstage deployment.",
          },
          {
            title: "Plugin development",
            description: "Custom plugins for your specific needs.",
          },
          {
            title: "System integration",
            description: "Connect with existing tools and services.",
          },
        ],
      },
      {
        title: "CI/CD and developer experience",
        lead: "Optimize developer workflows with modern pipelines",
        description:
          "Build and optimize CI/CD pipelines that enhance developer experience, reduce deployment friction, and enable rapid, reliable software delivery at scale.",
        detail:
          "Pipelines are treated as a product with users. Build times, test coverage and the path to production all get measured and improved on a loop.",
        items: [
          {
            title: "Pipeline optimization",
            description: "Fast, reliable CI/CD pipelines.",
          },
          {
            title: "Deployment strategies",
            description: "Advanced deployment patterns.",
          },
          {
            title: "Developer experience",
            description: "Tools and workflows developers love.",
          },
        ],
      },
      {
        title: "Progressive delivery",
        id: "progressive-delivery",
        lead: "Deploy with confidence using advanced delivery strategies",
        description:
          "Implement progressive delivery strategies that enable zero-downtime deployments, feature flags, canary releases, and automated rollback capabilities for maximum reliability.",
        detail:
          "Shipping becomes incremental: a small slice goes out first, its behaviour is measured against real traffic, and the blast radius of a bad change stays small.",
        items: [
          {
            title: "Feature flags",
            description: "Control feature releases dynamically.",
          },
          {
            title: "Canary releases",
            description: "Gradual rollout with real-time monitoring.",
          },
          {
            title: "Automated rollback",
            description: "Automatic recovery on failure detection.",
          },
        ],
      },
    ],
    code: {
      filename: "platform/golden-path.yaml",
      language: "yaml",
      caption:
        "A golden path is not a template on its own. It bundles the template, the policy, the pipeline and the telemetry so a team can follow it without reading documentation first.",
      code: `apiVersion: platform.shuroq.dev/v1
kind: GoldenPath
metadata:
  name: service-with-observability
  owner: platform-engineering
spec:
  template: service-template@2.4
  runtime:
    cluster: eu-west-1
    namespace: "{{ .team }}"
  pipeline:
    provider: github-actions
    workflow: .platform/build.yaml
    gates:
      - unit-tests
      - dependency-scan
      - image-signing
    promote:
      strategy: progressive
      steps: [5, 25, 50, 100]
      rollbackOn: error-budget-burn
  telemetry:
    metrics: true
    logs: true
    traces: true
    slo:
      availability: 99.9
      latencyP95: 300ms
  guardrails:
    - resource: requests
      policy: recommended
    - image
      policy: signed-only
      verify: cosign
  selfService:
    request: false
    provision: true`,
    },
    metricsTitle: "The measures we hold ourselves to",
    metrics: [
      {
        label: "Development time",
        value: 40,
        suffix: "%",
        context: "Lower after the platform lands",
        change: "Year over year",
      },
      {
        label: "Deployment time",
        value: 90,
        suffix: "%",
        context: "Lower through automation",
        change: "Ticket to production",
      },
      {
        label: "Configuration errors",
        value: 95,
        suffix: "%",
        context: "Fewer with infrastructure as code",
        change: "Per quarter",
      },
      {
        label: "Infrastructure cost",
        value: 30,
        suffix: "%",
        context: "Lower after optimization",
        change: "Per workload",
      },
    ],
    comparison: {
      title: "Before and after the platform",
      description:
        "The same engineering team, a different way of working. Nothing here asks a developer to learn a new way of building — it removes the ways that did not work.",
      columns: [
        {
          id: "before",
          name: "Before",
          caption: "Manual, ticket-driven delivery",
        },
        {
          id: "after",
          name: "With the platform",
          caption: "Self-service, paved roads",
          highlight: true,
        },
      ],
      sections: [
        {
          id: "onboarding",
          title: "Getting started",
          rows: [
            {
              id: "env",
              feature: "Environment setup",
              hint: "The work before writing any code",
              values: { before: "Manual, days", after: "One command" },
            },
            {
              id: "onboard",
              feature: "New engineer productive",
              values: { before: "2 to 4 weeks", after: "50% faster" },
            },
            {
              id: "template",
              feature: "Service scaffolding",
              values: { before: "Copy an old repo", after: "Catalog template" },
            },
          ],
        },
        {
          id: "delivery",
          title: "Delivery",
          rows: [
            {
              id: "pipeline",
              feature: "CI/CD pipeline",
              values: { before: "Partial", after: true },
            },
            {
              id: "rollback",
              feature: "Rollback on failure",
              values: { before: false, after: true },
            },
            {
              id: "traffic",
              feature: "Gradual traffic shifting",
              values: { before: false, after: true },
            },
            {
              id: "cadence",
              feature: "Deployment frequency",
              values: { before: "Monthly", after: "Daily" },
            },
          ],
        },
        {
          id: "governance",
          title: "Governance",
          rows: [
            {
              id: "policy",
              feature: "Policy enforcement",
              hint: "Security and compliance rules",
              values: { before: "Review", after: "Automatic" },
            },
            {
              id: "audit",
              feature: "Audit trail",
              values: { before: "Partial", after: true },
            },
            {
              id: "ownership",
              feature: "Service ownership",
              values: { before: "Spreadsheets", after: "Catalog metadata" },
            },
          ],
        },
        {
          id: "shared",
          title: "What stays the same",
          rows: [
            {
              id: "shared-vcs",
              feature: "Version control",
              values: { before: true, after: true },
            },
            {
              id: "shared-review",
              feature: "Code review before merge",
              values: { before: "Required", after: "Required" },
            },
            {
              id: "shared-tests",
              feature: "Automated test suite",
              hint: "Only as good as the tests you already write",
              values: { before: "Where they exist", after: "Where they exist" },
            },
            {
              id: "shared-envs",
              feature: "Separate environments",
              values: { before: true, after: true },
            },
          ],
        },
      ],
    },
    engagementTitle: "How the work is staged",
    engagementIntro:
      "Platform work lands in four stages. We size each one so there is something usable at the end of it rather than only at the end of the programme.",
    engagement: [
      {
        value: "assessment",
        label: "Assessment",
        description:
          "Map how teams build, ship and operate today, and find the friction that costs the most time.",
        meta: "2 to 3 weeks",
      },
      {
        value: "design",
        label: "Design",
        description:
          "Decide the platform's shape: the catalog, the golden paths, the policy model and the ownership rules.",
        meta: "3 to 4 weeks",
      },
      {
        value: "implementation",
        label: "Implementation",
        description:
          "Build the templates, the pipelines, the portal and the guardrails, then hand them to real teams.",
        meta: "Quarterly increments",
      },
      {
        value: "optimization",
        label: "Optimization",
        description:
          "Measure adoption and delivery metrics, then keep removing the next layer of manual work.",
        meta: "Continuous",
      },
    ],
    approachTitle: "What working with us looks like",
    approachIntro:
      "We work as an extension of your team, building the platform your teams actually want to use rather than the one that reads well in a slide.",
    approach: [
      {
        title: "Understand the operation",
        description:
          "Map the processes, users, systems and constraints the platform has to serve.",
      },
      {
        title: "Shape the solution",
        description:
          "Choose a fit-for-purpose architecture, scope the work and align the experience to the people using it.",
      },
      {
        title: "Build and validate",
        description:
          "Develop in clear increments, test against real requirements and prepare data and integrations.",
      },
      {
        title: "Launch with continuity",
        description:
          "Support rollout, knowledge transfer and the next improvements after go-live.",
      },
    ],
    toolsTitle: "Tools and technologies",
    toolsIntro:
      "The platforms behind the work. We pick from what your teams already run, and introduce new pieces only when they earn their place.",
    tools: [
      { name: "Kubernetes", category: "Orchestration", note: "Cluster and workload runtime" },
      { name: "Docker", category: "Containers", note: "Local and CI build parity" },
      { name: "Tekton", category: "Pipelines", note: "Pipeline tasks and triggers" },
      { name: "Argo CD", category: "GitOps", note: "Continuous delivery and rollback" },
      { name: "Crossplane", category: "Cloud", note: "Multi-cloud control planes" },
      { name: "KubeSphere", category: "Platform UI", note: "Cluster console and extensions" },
    ],
    faqTitle: "Questions teams ask before they start",
    useCases: [
      {
        title: "Engineering teams waiting on infrastructure",
        description:
          "The backlog is full of work that only needs a cluster, a domain and a certificate, and every one of them is queued behind a ticket.",
      },
      {
        title: "Platform teams that inherited a tool sprawl",
        description:
          "Twelve ways to deploy, none of them documented, and every new engineer has to learn which one their team happens to use.",
      },
      {
        title: "Organisations standardising before they scale",
        description:
          "The engineering team is about to double, and the current way of working will not survive the headcount.",
      },
      {
        title: "Regulated environments that need guardrails",
        description:
          "Security and compliance reviews have to happen somewhere. Encoding them in the platform is faster than encoding them in a manual review.",
      },
    ],
    faq: [
      {
        question: "Do we need to adopt Backstage to get a platform?",
        answer:
          "No. Backstage is one good way to build a portal, and it is the right answer for many organizations. We start from the workflows you already have and will recommend a portal only when there is enough catalog surface to justify it.",
      },
      {
        question: "How do you avoid building a platform nobody uses?",
        answer:
          "Every stage ships something usable, and the first increment is measured against the friction it was meant to remove. If a golden path is not being followed, we treat that as a design problem rather than a communication problem.",
      },
      {
        question: "Will this fit our existing cloud and tooling?",
        answer:
          "Yes. The platform is built around your existing clouds, repositories, identity provider and CI systems. We introduce new components only where they replace something more expensive than they are.",
      },
      {
        question: "Who owns the platform when the engagement ends?",
        answer:
          "Your team does. We work inside your repository and your infrastructure, document as we go and pair with your engineers so the platform is maintainable by the people who live with it.",
      },
      {
        question: "How is this priced?",
        answer:
          "Platform work is scoped as staged increments rather than a single fixed programme, so you can review the value after each stage and adjust what follows.",
      },
    ],
    cta: {
      title: "Ready to transform your developer experience?",
      description:
        "Let's discuss how our platform engineering expertise can accelerate your development velocity.",
      primary: { label: "Talk to our team", href: "/contact/" },
      secondary: { label: "See CI/CD & Dev Experience", href: "/ci-cd-dev/" },
      points: [
        "Assessment of current delivery flow in two weeks",
        "A golden path and catalog scoped to your teams",
        "Documentation and pairing included in every increment",
      ],
    },
  },

  "ci-cd-dev": {
    slug: "ci-cd-dev",
    eyebrow: "CI/CD and developer experience",
    title: "CI/CD & Dev Experience",
    subtitle:
      "Optimize developer workflows with modern CI/CD pipelines and enhanced developer experience.",
    image: "/images/services/generated/automation-workflow.webp",
    imageAlt:
      "A continuous delivery pipeline moving a change from commit to production through gated stages",
    heroVariant: "panel",
    sections: [
      "highlights",
      "barChart",
      "slope",
      "capabilityAccordion",
      "comparison",
      "stepper",
      "slides",
      "sparklines",
      "faq",
      "cta",
    ],
    faqVariant: "columns",
    ctaVariant: "centered",
    slope: {
      title: "The same change, before and after",
      description:
        "Minutes per stage on one real service, measured the week the pipeline landed and eight weeks later.",
      label: "Minutes per pipeline stage",
      startLabel: "Before",
      endLabel: "After",
      items: [
        { key: "build", label: "Build", start: 38, end: 9 },
        { key: "test", label: "Test suite", start: 24, end: 6 },
        { key: "scan", label: "Security scan", start: 16, end: 4 },
        { key: "review", label: "Review wait", start: 118, end: 22 },
        { key: "release", label: "Release", start: 41, end: 5 },
      ],
    },

    charts: {
      bar: {
        label: "Median lead time",
        period: "The first fourteen days of the engagement",
        unit: "min",
        data: [
          { key: "d1", label: "Day one", axisLabel: "D1", value: 214 },
          { key: "d2", label: "Day two", axisLabel: "D2", value: 186 },
          { key: "d3", label: "Day three", axisLabel: "D3", value: 171 },
          { key: "d4", label: "Day four", axisLabel: "D4", value: 149 },
          { key: "d5", label: "Day five", axisLabel: "D5", value: 138 },
          { key: "d6", label: "Day six", axisLabel: "D6", value: 121 },
          { key: "d7", label: "Day seven", axisLabel: "D7", value: 112 },
          { key: "d8", label: "Day eight", axisLabel: "D8", value: 96 },
          { key: "d9", label: "Day nine", axisLabel: "D9", value: 84 },
          { key: "d10", label: "Day ten", axisLabel: "D10", value: 71 },
          { key: "d11", label: "Day eleven", axisLabel: "D11", value: 63 },
          { key: "d12", label: "Day twelve", axisLabel: "D12", value: 52 },
          { key: "d13", label: "Day thirteen", axisLabel: "D13", value: 41 },
          { key: "d14", label: "Day fourteen", axisLabel: "D14", value: 34 },
        ],
      },
    },
    slides: [
      {
        tag: "Week one",
        title: "We measure the loop you already have",
        body: "Time a hundred real changes end to end, then map every wait between commit and production. The number is usually worse than the team expects.",
      },
      {
        tag: "Week one",
        title: "We make the slow gates fast",
        body: "Caching, parallelism and a smaller test set come first, because they need no behaviour change and they pay for the rest of the work.",
      },
      {
        tag: "Week two",
        title: "We write the path as code",
        body: "One pipeline definition, versioned with the service, so moving between environments is a promotion rather than a rebuild.",
      },
      {
        tag: "Week two",
        title: "We hand the keys over",
        body: "The pipeline is documented, the runbook lives beside it, and the people who own the service can change it without us.",
      },
    ],
    intro: {
      title: "Make the fast path the easy path",
      description:
        "We put developers at the center of our CI/CD and DevEx strategy. Our approach focuses on understanding developer pain points, automating repetitive tasks, and creating intuitive workflows. We ensure that every tool and process enhances productivity while reducing cognitive load and frustration.",
    },
    highlightsTitle: "Three ways we improve the loop",
    highlights: [
      {
        icon: "Infinity",
        title: "Pipeline optimization",
        description: "Fast, reliable CI/CD pipelines that scale.",
      },
      {
        icon: "Truck",
        title: "Deployment strategies",
        description: "Blue-green, canary and rolling delivery.",
      },
      {
        icon: "Heart",
        title: "Developer experience",
        description: "Tools and workflows developers love.",
      },
    ],
    statsTitle: "What a faster loop changes",
    statsDescription:
      "Measured on delivery pipelines after the first two quarters of tuning.",
    stats: [
      {
        value: 70,
        suffix: "%",
        label: "Faster builds",
        detail: "With parallel execution and caching",
        context: "Median wall-clock, same test suite",
        visual: {
          kind: "trend",
          values: [142, 136, 131, 122, 115, 106, 98, 89, 79, 68, 57, 47],
        },
      },
      {
        value: 80,
        suffix: "%",
        label: "Developer satisfaction",
        detail: "Across the teams we work with",
        context: "Self-reported after onboarding onto the new flow",
        visual: { kind: "uptime", days: uptime90 },
      },
      {
        value: 50,
        suffix: "%",
        label: "Faster onboarding",
        detail: "New joiners productive sooner",
        context: "Shortened from first day to first change",
        visual: {
          kind: "distribution",
          bins: [4, 12, 22, 28, 25, 19, 14, 9, 6, 4, 2.5, 1.5, 0.9, 0.5],
          max: 160,
          marker: 44,
        },
      },
      {
        value: 40,
        suffix: "%",
        label: "More code time",
        detail: "Less time fighting the tooling",
        context: "Time spent on product work per week",
        visual: {
          kind: "map",
          points: [
            [-122.4, 37.8],
            [-99.1, 19.4],
            [-46.6, -23.5],
            [0.5, 51.5],
            [13.4, 52.5],
            [37.6, 55.7],
            [72.8, 18.5],
            [103.8, 1.35],
            [151.2, -33.9],
          ],
        },
      },
    ],
    capabilitiesTitle: "Three ways we improve the loop",
    capabilitiesIntro:
      "A delivery loop has three parts and each one fails differently. We measure before changing any of them.",
    capabilities: [
      {
        title: "Pipeline optimization",
        lead: "Build fast, reliable CI/CD pipelines that accelerate delivery",
        description:
          "We design and implement modern CI/CD pipelines that prioritize speed, reliability, and developer experience. Our pipeline architecture includes automated testing, parallel execution, intelligent caching, and comprehensive monitoring. We ensure your pipelines scale with your organization while maintaining security and compliance standards.",
        detail:
          "Our optimization approach focuses on reducing build times, improving test coverage, and accelerating deployment cycles, using advanced caching strategies, parallel processing, and intelligent resource allocation.",
        items: [
          {
            title: "Parallel execution",
            description: "Run multiple stages concurrently for speed.",
          },
          {
            title: "Smart caching",
            description: "Intelligent dependency and artifact caching.",
          },
          {
            title: "Automated testing",
            description: "Comprehensive test automation at every stage.",
          },
          {
            title: "Real-time monitoring",
            description: "Live pipeline status and performance metrics.",
          },
          {
            title: "Security scanning",
            description: "Built-in vulnerability and compliance checks.",
          },
        ],
      },
      {
        title: "Deployment strategies",
        lead: "Advanced deployment patterns for zero-downtime releases",
        description:
          "We implement advanced deployment strategies that balance speed, safety, and reliability. Our approach includes blue-green deployments, canary releases, rolling updates, and automated rollback capabilities. We ensure your deployment process minimizes risk while maximizing deployment frequency and reliability.",
        detail:
          "Safety is paramount in our deployment strategies. We implement comprehensive monitoring, automated rollback triggers, health checks, and gradual traffic shifting, so any issue is detected early and resolved quickly with minimal impact on users.",
        items: [
          {
            title: "Blue-green",
            description: "Zero-downtime deployments with instant rollback.",
          },
          {
            title: "Canary",
            description: "Gradual rollout with real-time monitoring.",
          },
          {
            title: "Rolling",
            description: "Incremental updates with load balancing.",
          },
          {
            title: "Feature flags",
            description: "Dynamic feature toggling for controlled releases.",
          },
          {
            title: "Automated rollback",
            description: "Instant recovery on failure detection.",
          },
        ],
      },
      {
        title: "Developer experience enhancement",
        lead: "Create workflows and tools developers love to use every day",
        description:
          "We put developers at the center of our CI/CD and DevEx strategy, understanding pain points, automating repetitive tasks, and creating intuitive workflows. Our DevEx solutions directly impact developer productivity and job satisfaction through streamlined workflows, integrated development environments, automated documentation, and real-time feedback mechanisms.",
        detail:
          "The result is happier, more productive developers who can focus on creating value rather than fighting with tools.",
        items: [
          {
            title: "Integrated IDE",
            description: "Pre-configured development environments.",
          },
          {
            title: "Project templates",
            description: "Standardized project scaffolding.",
          },
          {
            title: "Auto-documentation",
            description: "Generated documentation from code.",
          },
          {
            title: "Real-time feedback",
            description: "Instant build and test results.",
          },
          {
            title: "Team collaboration",
            description: "Integrated code review and communication.",
          },
        ],
      },
    ],
    code: {
      filename: ".github/workflows/deliver.yaml",
      language: "yaml",
      caption:
        "A pipeline that keeps the inner loop short: the unit stage runs on every push, everything else waits for the merge queue, and the promotion to production is a separate, authorized step.",
      code: `name: deliver

on:
  pull_request:
  merge_group:
    type: checks_requested

concurrency:
  group: deliver-\${{ github.ref }}
  cancel-in-progress: true

jobs:
  # The inner loop: fast, parallel, cached.
  verify:
    strategy:
      matrix:
        node: [20, 22]
      fail-fast: false
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node }}
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --coverage
      - uses: codecov/codecov-action@v4
        with:
          fail_ci_if_error: false

  # The slow stage: scan and sign once, reuse the artifact.
  build:
    needs: verify
    if: github.event_name == 'merge_group'
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - run: npm run test:e2e
      - uses: aquasecurity/trivy-action@master
        with:
          scan-type: image
          image-ref: registry.shuroq.dev/app:\${{ github.sha }}
          severity: HIGH,CRITICAL
          exit-code: "1"
      - run: cosign sign registry.shuroq.dev/app:\${{ github.sha }}

  # Promotion is explicit, gated and reversible.
  deploy:
    needs: build
    environment: production
    steps:
      - run: argocd app sync app-\${{ github.sha }} --revision \${{ github.sha }}
      - run: kubectl -n app rollout status deploy/app --timeout=5m`,
    },
    metricsTitle: "The measures we hold ourselves to",
    metrics: [
      {
        label: "Build time",
        value: 70,
        suffix: "%",
        context: "Lower after optimization",
        change: "Median wall-clock",
        spark: [128, 124, 116, 109, 101, 92, 81, 70],
      },
      {
        label: "Deployment downtime",
        value: 0,
        suffix: "%",
        context: "Zero-downtime releases",
        change: "Per rollout",
        spark: [12, 9, 6, 4, 3, 2, 1, 0],
      },
      {
        label: "Onboarding time",
        value: 50,
        suffix: "%",
        context: "Faster for new joiners",
        change: "To first merged change",
        spark: [42, 32, 24, 18, 13, 9, 6, 4],
      },
      {
        label: "Developer satisfaction",
        value: 80,
        suffix: "%",
        context: "Across the teams we work with",
        change: "Self-reported",
        spark: [51, 55, 58, 63, 69, 73, 78, 80],
      },
    ],
    comparison: {
      title: "Traditional delivery against a paved road",
      description:
        "The difference is rarely a better CI server. It is having one path that is fast, safe and documented, so nobody has to build their own.",
      columns: [
        {
          id: "traditional",
          name: "Traditional delivery",
          caption: "Every team builds its own",
        },
        {
          id: "paved",
          name: "With a paved road",
          caption: "Opinionated, fast, reversible",
          highlight: true,
        },
      ],
      sections: [
        {
          id: "build",
          title: "Building",
          rows: [
            {
              id: "setup",
              feature: "Pipeline setup for a new service",
              values: { traditional: "Days of wiring", paved: "One template" },
            },
            {
              id: "feedback",
              feature: "Time to first result",
              values: { traditional: "Long", paved: "Minutes" },
            },
            {
              id: "cache",
              feature: "Dependency and artifact caching",
              values: { traditional: "Partial", paved: true },
            },
            {
              id: "parallel",
              feature: "Parallel stage execution",
              values: { traditional: false, paved: true },
            },
          ],
        },
        {
          id: "release",
          title: "Releasing",
          rows: [
            {
              id: "downtime",
              feature: "Downtime during release",
              values: { traditional: "Planned windows", paved: "None" },
            },
            {
              id: "rollback",
              feature: "Rollback",
              values: { traditional: "Manual", paved: "Automatic" },
            },
            {
              id: "traffic",
              feature: "Gradual traffic shifting",
              values: { traditional: false, paved: true },
            },
            {
              id: "flags",
              feature: "Feature flags",
              values: { traditional: false, paved: true },
            },
          ],
        },
        {
          id: "developer",
          title: "The developer",
          rows: [
            {
              id: "docs",
              feature: "Documentation generated from code",
              values: { traditional: false, paved: true },
            },
            {
              id: "scaffold",
              feature: "Project scaffolding",
              values: { traditional: "Copy an old repo", paved: "Standard templates" },
            },
            {
              id: "context",
              feature: "Context switching per change",
              values: { traditional: "High", paved: "Low" },
            },
          ],
        },
        {
          id: "shared",
          title: "What stays the same",
          rows: [
            {
              id: "shared-vcs",
              feature: "Version control",
              values: { traditional: true, paved: true },
            },
            {
              id: "shared-review",
              feature: "Code review before merge",
              values: { traditional: "Required", paved: "Required" },
            },
            {
              id: "shared-tests",
              feature: "Automated test suite",
              hint: "Only as good as the tests you already write",
              values: { traditional: "Where they exist", paved: "Where they exist" },
            },
            {
              id: "shared-envs",
              feature: "Separate environments",
              values: { traditional: true, paved: true },
            },
          ],
        },
      ],
    },
    engagementTitle: "How the work is staged",
    engagementIntro:
      "We start with the pipeline you already have and make it measurably faster, then widen the road to the rest of the delivery loop.",
    engagement: [
      {
        value: "measure",
        label: "Measure",
        description:
          "Baseline the pipeline: build times, test coverage, flake rate and the time a change waits before anyone sees it.",
        meta: "1 to 2 weeks",
      },
      {
        value: "accelerate",
        label: "Accelerate",
        description:
          "Parallelize, cache and restructure the stages so the inner loop returns a result while it still matters.",
        meta: "2 to 4 weeks",
      },
      {
        value: "harden",
        label: "Harden",
        description:
          "Add the gates, the signing and the progressive delivery steps that make a release safe to run.",
        meta: "3 to 4 weeks",
      },
      {
        value: "scale",
        label: "Scale the road",
        description:
          "Turn what worked into templates and plumbing so the next service inherits the same fast, safe loop.",
        meta: "Continuous",
      },
    ],
    approachTitle: "What working with us looks like",
    approachIntro:
      "We measure the loop before touching it, because the bottleneck is rarely where people assume it is.",
    approach: [
      {
        title: "Measure the flow",
        description:
          "Find where a change actually waits, and which stage is actually slow.",
      },
      {
        title: "Rework the pipeline",
        description:
          "Restructure stages, restore caching and remove the checks that cost more than they catch.",
      },
      {
        title: "Make releases safe",
        description:
          "Add progressive delivery, automated rollback and the gates that policy requires.",
      },
      {
        title: "Give it back to developers",
        description:
          "Scaffold, document and shorten the loop until the tooling stops being the work.",
      },
    ],
    toolsTitle: "Tools and technologies",
    toolsIntro:
      "We work inside the pipeline your teams already use, and swap components only when the measurement says so.",
    tools: [
      { name: "Jenkins", category: "CI", note: "Self-hosted pipelines" },
      { name: "GitHub Actions", category: "CI", note: "Hosted runners" },
      { name: "GitLab CI", category: "CI", note: "Pipeline as code" },
      { name: "Azure DevOps", category: "CI", note: "Enterprise pipelines" },
      { name: "CircleCI", category: "CI", note: "Hosted pipelines" },
      { name: "Kubernetes", category: "Runtime", note: "Deployment target" },
      { name: "Argo CD", category: "GitOps", note: "Sync and rollback" },
      { name: "Flux", category: "GitOps", note: "Continuous delivery" },
      { name: "Helm", category: "Packaging", note: "Release charts" },
      { name: "LaunchDarkly", category: "Flags", note: "Feature toggles" },
      { name: "VS Code", category: "IDE", note: "Editor defaults" },
      { name: "IntelliJ", category: "IDE", note: "Editor defaults" },
      { name: "Docker Desktop", category: "Local", note: "Local parity" },
      { name: "Lens", category: "Local", note: "Cluster inspection" },
      { name: "Postman", category: "API", note: "Contract testing" },
    ],
    faqTitle: "Questions teams ask before they start",
    useCases: [
      {
        title: "Pipelines nobody trusts",
        description:
          "The pipeline is flaky, so people rerun it, so the queue is long, so engineers batch their changes and the queue gets longer.",
      },
      {
        title: "Release day that takes a week",
        description:
          "A release is an event with a runbook, a change window and a conference bridge, and it happens far less often than it should.",
      },
      {
        title: "New joiners waiting to contribute",
        description:
          "It takes a month before a new engineer can make a real change, and most of that month is environment setup.",
      },
      {
        title: "Developers working around the pipeline",
        description:
          "There is a shared script, and a lot of very good reasons why people bypass the normal path.",
      },
    ],
    faq: [
      {
        question: "Will you migrate us off our current CI server?",
        answer:
          "Not by default. We first measure the pipeline you have, and a great many of the problems people blame on the CI server are cheaper to fix inside it. Migration is a recommendation we make with evidence, not a precondition.",
      },
      {
        question: "How do you stop the pipeline becoming slower over time?",
        answer:
          "Caching is versioned and periodically verified rather than assumed, stage ownership is explicit, and pipeline changes go through the same review as product code. Drift is what makes pipelines slow.",
      },
      {
        question: "Do feature flags become technical debt?",
        answer:
          "Only if they are never removed. We set an expiry date on every flag at creation, report the age of the flags still in production, and treat stale flags as a defect.",
      },
      {
        question: "Can we keep our existing release approval process?",
        answer:
          "Yes. Progressive delivery sits underneath the approval process rather than replacing it, so the gate stays where your risk process expects it.",
      },
      {
        question: "What does DevEx actually mean in an engagement?",
        answer:
          "It is the work that shortens the distance between a developer deciding to build something and seeing it running. In practice that means scaffolding, templates, documentation and fast feedback, measured rather than asserted.",
      },
    ],
    cta: {
      title: "Ready to transform your CI/CD and developer experience?",
      description:
        "Let's discuss how our CI/CD and DevEx expertise can accelerate your delivery and delight your developers.",
      primary: { label: "Talk to our team", href: "/contact/" },
      secondary: { label: "See SRE consultancy", href: "/sre-consultancy/" },
      points: [
        "Pipeline baseline measured in the first two weeks",
        "Delivery pattern templates you can adopt immediately",
        "Rollout and documentation handover included",
      ],
    },
  },

  "sre-consultancy": {
    slug: "sre-consultancy",
    eyebrow: "Site reliability engineering",
    title: "SRE Consultancy",
    subtitle:
      "Build a practical SRE program with SLO frameworks, incident processes, and reliability roadmaps aligned to business priorities.",
    image: "/images/services/generated/site-reliability.webp",
    imageAlt:
      "A reliability control room wall of service health signals with an active error budget gauge",
    heroVariant: "image",
    sections: [
      "highlights",
      "slo",
      "capabilityTabs",
      "heatmap",
      "ridges",
      "comparison",
      "approachRail",
      "engagement",
      "faq",
      "cta",
    ],
    faqVariant: "accordion",
    ctaVariant: "split",
    ridges: {
      title: "How long each service takes to answer",
      description:
        "Response times sampled across a week, one ridge per service. The wide ones are the services that page people.",
      label: "Response time by service",
      unit: "ms",
      series: [
        {
          id: "payments",
          label: "payments-api",
          values: [420, 480, 510, 560, 600, 640, 700, 760, 820, 900, 980, 1100],
        },
        {
          id: "checkout",
          label: "checkout-web",
          values: [180, 200, 230, 260, 300, 330, 380, 430, 500, 560, 640, 720],
        },
        {
          id: "search",
          label: "search",
          values: [80, 95, 110, 120, 140, 160, 190, 220, 260, 300, 360, 420],
        },
        {
          id: "catalogue",
          label: "catalogue",
          values: [60, 70, 85, 95, 110, 130, 150, 175, 200, 240, 290, 340],
        },
        {
          id: "notifications",
          label: "notifications",
          values: [40, 50, 60, 70, 85, 100, 120, 145, 175, 210, 250, 300],
        },
        {
          id: "reporting",
          label: "reporting",
          values: [900, 1100, 1300, 1500, 1750, 2000, 2300, 2600, 3000, 3400, 3900, 4400],
        },
      ],
    },

    charts: {
      heatmap: {
        label: "Incident pressure",
        period: "The twelve months before this engagement",
        days: incidentDays,
      },
    },
    intro: {
      title: "Move from firefighting to reliability engineering",
      description:
        "Transform your operations from reactive firefighting to proactive reliability engineering, where systems are designed to be resilient, scalable, and continuously improving through data-driven decisions.",
    },
    highlightsTitle: "Why SRE matters",
    highlights: [
      {
        icon: "Shield",
        title: "Reliability over firefighting",
        description:
          "Shift from reactive incident response to proactive system design that prevents failures before they impact users.",
      },
      {
        icon: "ChartLine",
        title: "Measurable reliability",
        description:
          "Achieve measurable reliability targets with error budgets and SLOs that balance innovation with stability.",
      },
      {
        icon: "Bot",
        title: "Proactive systems",
        description:
          "Eliminate toil through automation and build systems that self-heal, scale, and adapt to changing demands.",
      },
    ],
    statsTitle: "What the practice moves",
    statsDescription:
      "Reported outcomes from engagements that introduced SLOs, error budgets and automated response.",
    stats: [
      {
        value: 99.9,
        suffix: "%",
        decimals: 1,
        label: "Availability",
        detail: "Through proactive reliability engineering",
        context: "Target agreed with the business, not with the platform",
        visual: { kind: "uptime", days: uptime90 },
      },
      {
        value: 80,
        suffix: "%",
        label: "Reduction in MTTR",
        detail: "With runbooks and coordinated response",
        context: "Median time to restore, relative to baseline",
        visual: {
          kind: "trend",
          values: [96, 92, 87, 81, 74, 68, 60, 54, 47, 41, 34, 29],
        },
      },
      {
        value: 70,
        suffix: "%",
        label: "Reduction in repetitive tasks",
        detail: "Through automation and self-healing systems",
        context: "Operational toil removed from the on-call rotation",
        visual: {
          kind: "distribution",
          bins: [3, 10, 19, 27, 31, 26, 20, 14, 9, 6, 4, 2.4, 1.4, 0.8],
          max: 160,
          marker: 47,
        },
      },
      {
        value: 3,
        suffix: "x",
        label: "Engineering velocity",
        detail: "With reliable infrastructure",
        context: "Teams shipping more because the platform holds",
        visual: {
          kind: "map",
          points: [
            [-122.4, 37.8],
            [-96.8, 32.8],
            [-74, 40.7],
            [-70.7, -33.4],
            [-0.1, 51.5],
            [28, -26.2],
            [72.9, 19.1],
            [114.2, 22.3],
            [139.7, 35.7],
          ],
        },
      },
    ],
    capabilitiesTitle: "Service scope",
    capabilitiesIntro:
      "Four areas. Together they turn reliability from a thing the operations team defends into a property the engineering team designs.",
    capabilities: [
      {
        title: "SLO and error budget design",
        lead: "Define measurable service objectives and governance for engineering decisions",
        description:
          "Establish clear reliability targets that align with business goals and provide data-driven guidance for engineering investments.",
        detail:
          "An SLO is only useful if it changes a decision. We agree the indicators, set the burn-rate alerts, and write down what happens when the budget is spent.",
        items: [
          {
            title: "Objective definition",
            description:
              "Service Level Objective definition and measurement.",
          },
          {
            title: "Error budget policy",
            description: "Error budget policies and burn rate monitoring.",
          },
          {
            title: "Indicator selection",
            description: "SLI (Service Level Indicator) selection and implementation.",
          },
          {
            title: "Governance",
            description: "Reliability governance and decision frameworks.",
          },
        ],
      },
      {
        title: "Incident management",
        lead: "Runbook design, escalation policies, and post-incident review practices",
        description:
          "Build comprehensive incident response capabilities that minimize downtime and maximize learning from failures.",
        detail:
          "Incidents are the most expensive teacher an organization has. The work here is to make sure each one produces a change, not just a document.",
        items: [
          {
            title: "Runbooks",
            description: "Automated runbook design and execution.",
          },
          {
            title: "Escalation",
            description: "Incident escalation and communication protocols.",
          },
          {
            title: "Review",
            description: "Post-mortem and blameless review processes.",
          },
          {
            title: "Crisis",
            description: "War room coordination and crisis management.",
          },
        ],
      },
      {
        title: "Reliability improvement backlog",
        lead: "Prioritized actions that reduce toil and improve platform resilience",
        description:
          "Create a systematic approach to eliminating operational toil and building self-healing, resilient systems.",
        detail:
          "The backlog is ordered by risk and by how much toil each item removes, so the first investments are the ones that change an on-call rotation.",
        items: [
          {
            title: "Toil identification",
            description: "Toil identification and automation opportunities.",
          },
          {
            title: "Capacity",
            description: "Capacity planning and scaling strategies.",
          },
          {
            title: "Failure testing",
            description: "Chaos engineering and failure testing.",
          },
          {
            title: "Performance",
            description: "Performance optimization and bottleneck elimination.",
          },
        ],
      },
    ],
    code: {
      filename: "slo/checkout-api.yaml",
      language: "yaml",
      caption:
        "An SLO with a burn-rate alert attached. The alert fires on how fast the error budget is being spent, not on a single bad minute, so it wakes a human only when it matters.",
      code: `apiVersion: monitoring.coreos.com/v1
kind: ServiceLevelObjective
metadata:
  name: checkout-api-availability
  namespace: production
spec:
  service: checkout-api
  indicator:
    type: ratio
    good:
      metric:
        name: http_request_duration_seconds_count
        labels:
          code: "200"
          service: checkout-api
    total:
      metric:
        name: http_request_duration_seconds_count
        labels:
          service: checkout-api
  objective:
    target: 99.9
    timeWindow: 28d
    timeframe: 30d
  alerting:
    burnRates:
      - name: fast-burn
        longWindow: 1h
        shortWindow: 5m
        factor: 14
        severity: page
      - name: slow-burn
        longWindow: 6h
        shortWindow: 30m
        factor: 6
        severity: ticket
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: error-budget-policy
  namespace: production
data:
  policy: |
    When the fast-burn alert fires, the on-call engineer is the only
    responder and releases are frozen by default.
    Release freeze is lifted once the error budget is above 50%.
    Slow-burn alerts open a reliability ticket reviewed in the
    weekly engineering forum.`,
    },
    metricsTitle: "The measures we hold ourselves to",
    metrics: [
      {
        label: "MTTR cut",
        value: 80,
        suffix: "%",
        context: "Lower with runbooks and coordination",
        change: "Against baseline",
      },
      {
        label: "Repeat incidents cut",
        value: 90,
        suffix: "%",
        context: "Fewer after blameless reviews",
        change: "Per quarter",
      },
      {
        label: "Operational overhead cut",
        value: 50,
        suffix: "%",
        context: "Lower as toil is automated away",
        change: "On-call hours",
      },
      {
        label: "Reliability gain",
        value: 85,
        suffix: "%",
        context: "Improvement across the engagement",
        change: "Against baseline",
      },
    ],
    comparison: {
      title: "Traditional operations against reliability engineering",
      description:
        "The difference is not a tool. It is who owns reliability, and whether the system tells you before a customer does.",
      columns: [
        {
          id: "ops",
          name: "Traditional operations",
          caption: "Reactive, ticket-driven",
        },
        {
          id: "sre",
          name: "Reliability engineering",
          caption: "Objective, owned, measured",
          highlight: true,
        },
      ],
      sections: [
        {
          id: "targets",
          title: "Targets and ownership",
          rows: [
            {
              id: "target",
              feature: "Reliability target",
              values: { ops: "Best effort", sre: "Agreed SLO" },
            },
            {
              id: "owner",
              feature: "Accountability",
              values: { ops: "Operational team", sre: "Product team" },
            },
            {
              id: "budget",
              feature: "Error budget",
              values: { ops: false, sre: true },
            },
            {
              id: "decision",
              feature: "Release risk decisions",
              values: { ops: "By judgement", sre: "By burn rate" },
            },
          ],
        },
        {
          id: "response",
          title: "Incident response",
          rows: [
            {
              id: "runbook",
              feature: "Documented runbooks",
              values: { ops: "Partial", sre: true },
            },
            {
              id: "review",
              feature: "Blameless post-incident review",
              values: { ops: false, sre: true },
            },
            {
              id: "warroom",
              feature: "War room coordination",
              values: { ops: "Ad hoc", sre: "Defined roles" },
            },
            {
              id: "repeat",
              feature: "Repeat incidents",
              values: { ops: "Common", sre: "Tracked and closing" },
            },
          ],
        },
        {
          id: "improvement",
          title: "Continuous improvement",
          rows: [
            {
              id: "toil",
              feature: "Operational toil measured",
              values: { ops: false, sre: true },
            },
            {
              id: "chaos",
              feature: "Failure testing",
              values: { ops: false, sre: true },
            },
            {
              id: "capacity",
              feature: "Capacity planning",
              values: { ops: "Reactive", sre: "Continuous" },
            },
            {
              id: "backlog",
              feature: "Prioritized reliability backlog",
              values: { ops: false, sre: true },
            },
          ],
        },
        {
          id: "shared",
          title: "What stays the same",
          rows: [
            {
              id: "shared-vcs",
              feature: "Version control",
              values: { ops: true, sre: true },
            },
            {
              id: "shared-review",
              feature: "Code review before merge",
              values: { ops: "Required", sre: "Required" },
            },
            {
              id: "shared-tests",
              feature: "Automated test suite",
              hint: "Only as good as the tests you already write",
              values: { ops: "Where they exist", sre: "Where they exist" },
            },
            {
              id: "shared-envs",
              feature: "Separate environments",
              values: { ops: true, sre: true },
            },
          ],
        },
      ],
    },
    engagementTitle: "How the work is staged",
    engagementIntro:
      "Reliability practice only sticks when the people on call can feel it. Each stage ends with something that runs in production.",
    engagement: [
      {
        value: "assessment",
        label: "Assessment",
        description:
          "Evaluate your current reliability posture and identify critical improvement opportunities.",
        meta: "2 to 3 weeks",
      },
      {
        value: "design",
        label: "Design",
        description:
          "Create tailored SRE frameworks, SLOs, and reliability targets aligned with your business goals.",
        meta: "3 to 4 weeks",
      },
      {
        value: "implementation",
        label: "Implementation",
        description:
          "Deploy monitoring systems, automate processes, and establish incident response capabilities.",
        meta: "Quarterly increments",
      },
      {
        value: "continuous",
        label: "Continuous improvement",
        description:
          "Refine processes, expand automation, and evolve reliability practices based on operational insights.",
        meta: "Ongoing",
      },
    ],
    approachTitle: "What working with us looks like",
    approachIntro:
      "We build the practice alongside your team rather than handing over a document. The goal is that your engineers run it after we leave.",
    approach: [
      {
        title: "Assess the posture",
        description:
          "Evaluate your current reliability posture and identify critical improvement opportunities.",
      },
      {
        title: "Design the framework",
        description:
          "Create tailored SRE frameworks, SLOs, and reliability targets aligned with your business goals.",
      },
      {
        title: "Implement the practice",
        description:
          "Deploy monitoring systems, automate processes, and establish incident response capabilities.",
      },
      {
        title: "Improve continuously",
        description:
          "Refine processes, expand automation, and evolve reliability practices based on operational insights.",
      },
    ],
    toolsTitle: "Tools and technologies",
    toolsIntro:
      "Open and familiar tooling. An SLO that requires a proprietary console is an SLO nobody checks.",
    tools: [
      { name: "Prometheus", category: "Metrics", note: "Scraping and rules" },
      { name: "Grafana", category: "Dashboards", note: "Service health views" },
      { name: "PagerDuty", category: "On-call", note: "Alert routing" },
      { name: "Kubernetes", category: "Runtime", note: "Workload platform" },
      { name: "Terraform", category: "IaC", note: "Infrastructure as code" },
      { name: "Jenkins", category: "CI", note: "Pipeline automation" },
      { name: "Chaos Monkey", category: "Resilience", note: "Failure injection" },
      { name: "Runbooks", category: "Response", note: "Documented recovery" },
    ],
    faqTitle: "Questions teams ask before they start",
    useCases: [
      {
        title: "High-traffic applications",
        description:
          "Ensure reliability for applications handling millions of requests with automated scaling and failure recovery.",
      },
      {
        title: "Cloud-native systems",
        description:
          "Build resilient microservices architectures with comprehensive observability and self-healing capabilities.",
      },
      {
        title: "Enterprise platforms",
        description:
          "Establish enterprise-grade reliability standards across complex, multi-team environments.",
      },
      {
        title: "Critical infrastructure",
        description:
          "Implement zero-downtime deployments and disaster recovery for mission-critical systems.",
      },
    ],
    faq: [
      {
        question: "We already have monitoring. Why do we need SLOs?",
        answer:
          "Because monitoring tells you what is happening and SLOs tell you what matters. Most teams have plenty of the first and no agreed version of the second, which is why alerting does not reduce incidents.",
      },
      {
        question: "Should we hit 99.99%?",
        answer:
          "Only if the business can pay for it and users would notice. A 99.9% SLO on a tier-one checkout service is often more valuable than 99.99% on a reporting service, because it is the one the error budget actually protects.",
      },
      {
        question: "How do you stop SLOs becoming a target people game?",
        answer:
          "Pair every SLO with a business-impact indicator and review both together. If a service can meet its availability target while its users are unhappy, the target is wrong.",
      },
      {
        question: "Who should own the error budget?",
        answer:
          "The team that owns the service, not a central reliability team. The budget works because the people who can spend it feel the consequence of spending it.",
      },
      {
        question: "Will this slow down releases?",
        answer:
          "It should do the opposite. Once risk is expressed as a burn rate rather than a feeling, teams ship more often with less ceremony, because the policy is written down.",
      },
    ],
    cta: {
      title: "Transform your operations",
      description:
        "Move from reactive operations to predictable reliability engineering with expert SRE guidance and proven frameworks.",
      primary: { label: "Talk to our team", href: "/contact/" },
      secondary: { label: "See observability", href: "/observability-consult/" },
      points: [
        "SLOs agreed with the business in the first stage",
        "Incident process and runbooks handed over in full",
        "Reliability backlog reviewed with your engineering forum",
      ],
    },
  },

  "devsec-ops": {
    slug: "devsec-ops",
    eyebrow: "Observability and DevSecOps",
    title: "DevSecOps",
    subtitle:
      "Integrate security controls across the software lifecycle without slowing engineering velocity.",
    image: "/images/services/generated/assurance-devsecops.webp",
    imageAlt:
      "Security controls built into each stage of a delivery pipeline from planning to runtime",
    heroVariant: "centered",
    sections: [
      "highlights",
      "checklist",
      "capabilitySpec",
      "donut",
      "waffle",
      "code",
      "comparison",
      "toolChips",
      "faq",
      "cta",
    ],
    faqVariant: "columns",
    ctaVariant: "split",
    waffle: {
      title: "Where the controls actually sit",
      description:
        "One square is one percent of the estate, counted the way the pipeline counts it rather than the way a policy describes it.",
      label: "Security control coverage",
      data: [
        { key: "pipeline", label: "In the pipeline", value: 46 },
        { key: "build", label: "Scanned every build", value: 24 },
        { key: "review", label: "Reviewed by hand", value: 18 },
        { key: "gap", label: "Not covered", value: 12 },
      ],
    },

    charts: {
      donut: {
        label: "Where the effort goes",
        data: [
          { key: "pipeline", label: "Pipeline controls", value: 34 },
          { key: "supply", label: "Supply chain", value: 26 },
          { key: "secrets", label: "Secrets & identity", value: 18 },
          { key: "runtime", label: "Runtime & posture", value: 14 },
          { key: "evidence", label: "Audit evidence", value: 8 },
        ],
      },
    },
    checklist: {
      title: "What the first thirty days deliver",
      doneTitle: "The first thirty days are done",
      steps: [
        {
          id: "inventory",
          title: "Inventory what already runs",
          description:
            "We list every pipeline, registry, identity provider and runtime, then mark which controls are already present.",
        },
        {
          id: "secrets",
          title: "Move secrets out of the repository",
          description:
            "Credentials move into a managed vault with short-lived access, and the old paths are removed in the same change.",
        },
        {
          id: "scanning",
          title: "Put scanning where it blocks nothing",
          description:
            "Dependency, image and secret scanning run on the pull request and on the schedule that already runs.",
        },
        {
          id: "policy",
          title: "Turn policy into a check",
          description:
            "The rules your compliance team writes down become checks the pipeline enforces, with a clear way to appeal.",
        },
        {
          id: "evidence",
          title: "Make the evidence automatic",
          description:
            "Every control reports its own state, so the audit pack is generated rather than assembled.",
        },
      ],
    },
    intro: {
      title: "Security that ships with the code, not after it",
      description:
        "Transform your security posture with automated compliance, continuous monitoring, and developer-friendly security practices that scale with your organization.",
    },
    highlightsTitle: "Why DevSecOps matters",
    highlights: [
      {
        icon: "Shield",
        title: "Security without speed loss",
        description:
          "Integrate security early in the pipeline to catch vulnerabilities without compromising delivery velocity.",
      },
      {
        icon: "Lock",
        title: "Compliance automation",
        description:
          "Automate policy enforcement and compliance checks across all development stages.",
      },
      {
        icon: "ScanEye",
        title: "Risk reduction",
        description:
          "Proactively identify and mitigate security risks before they reach production.",
      },
    ],
    statsTitle: "What the practice moves",
    statsDescription:
      "Measured across delivery lifecycles after security controls were introduced into the pipeline.",
    stats: [
      {
        value: 80,
        suffix: "%",
        label: "Lower remediation cost",
        detail: "With early vulnerability detection",
        context: "Because findings arrive before release, not after",
        visual: {
          kind: "trend",
          values: [128, 119, 108, 99, 88, 79, 68, 59, 49, 40, 33, 27],
        },
      },
      {
        value: 12,
        label: "Automated checks in every pipeline",
        detail: "From threat modelling to runtime detection",
        context: "Enforced as gates, not advisory notes",
        visual: { kind: "uptime", days: uptime90 },
      },
      {
        value: 4,
        label: "Lifecycle stages covered",
        detail: "Plan, code, build, run",
        context: "Each stage has its own control set",
        visual: {
          kind: "distribution",
          bins: [2, 7, 15, 24, 30, 27, 21, 15, 10, 7, 4, 3, 1.6, 0.9],
          max: 160,
          marker: 50,
        },
      },
      {
        value: 6,
        label: "Tool categories in use",
        detail: "From SAST through to cloud security",
        context: "Integrated rather than stacked side by side",
        visual: {
          kind: "map",
          points: [
            [-118.2, 34],
            [-87.6, 41.9],
            [-46.6, -23.5],
            [-0.1, 51.5],
            [13.4, 52.5],
            [55.3, 25.3],
            [103.8, 1.35],
            [151.2, -33.9],
          ],
        },
      },
    ],
    capabilitiesTitle: "Service scope",
    capabilitiesIntro:
      "Four control areas, mapped onto the lifecycle stages they protect. Each one has a place in the pipeline, not just a policy document.",
    capabilities: [
      {
        title: "Secure SDLC",
        lead: "Threat modeling and control placement from planning through release",
        description:
          "Security requirements analysis, design threat modeling and automated code review put the control in the workflow at the point where a change is cheapest to fix.",
        detail:
          "We work with the delivery teams to define what each stage must prove before a change is allowed to move to the next one.",
        items: [
          {
            title: "Requirements analysis",
            description: "Security requirements analysis.",
          },
          {
            title: "Threat modeling",
            description: "Design threat modeling.",
          },
          {
            title: "Static testing",
            description: "Static application security testing.",
          },
          {
            title: "Dynamic testing",
            description: "Dynamic application security testing.",
          },
        ],
      },
      {
        title: "CI/CD security guardrails",
        lead: "Automated scanning, policy checks, and release gates",
        description:
          "Every image, dependency and configuration change is checked on the way through. Findings block a release when they matter and are recorded when they do not.",
        detail:
          "Policy is applied by the pipeline, which means it applies to everyone equally and does not depend on anyone remembering to run the right command.",
        items: [
          {
            title: "Code review automation",
            description: "Code review automation.",
          },
          {
            title: "Container image scanning",
            description: "Container image scanning.",
          },
          {
            title: "Supply chain",
            description: "Signed builds and verified provenance.",
          },
          {
            title: "Release gates",
            description: "Policy enforced as pipeline gates.",
          },
        ],
      },
      {
        title: "Runtime security",
        lead: "Container posture management and rapid vulnerability response",
        description:
          "Runtime threat detection and vulnerability management cover what static analysis cannot see: what the running workload actually does, and what it actually has access to.",
        detail:
          "Findings from runtime are fed back into the pipeline, so a class of problem that keeps reappearing stops reappearing.",
        items: [
          {
            title: "Runtime detection",
            description: "Runtime threat detection.",
          },
          {
            title: "Vulnerability management",
            description: "Vulnerability management.",
          },
          {
            title: "Posture",
            description: "Container and workload posture checks.",
          },
          {
            title: "Remediation",
            description: "Automated remediation paths.",
          },
        ],
      },
      {
        title: "Security operations",
        lead: "Continuous monitoring and security incident response",
        description:
          "Security monitoring dashboards, log analysis and correlation and automated alerting give the security team a live picture of the estate rather than a report from last week.",
        detail:
          "Detection and response are designed together, because a finding nobody can act on quickly is the same as no finding.",
        items: [
          {
            title: "Monitoring",
            description: "Security monitoring dashboards.",
          },
          {
            title: "Correlation",
            description: "Log analysis and correlation.",
          },
          {
            title: "Alerting",
            description: "Automated alerting.",
          },
          {
            title: "Response",
            description: "Incident response automation.",
          },
        ],
      },
    ],
    code: {
      filename: ".security/release-gate.yaml",
      language: "yaml",
      caption:
        "A release gate that runs on every merge. It fails the build for the things that matter and records the rest, so teams are not trained to ignore the output.",
      code: `# Enforced on every merge to main. Findings below the threshold are
# recorded, not blocked; findings above it fail the release.
name: security-gate

on:
  pull_request:
    branches: [main]

jobs:
  sast:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Static analysis
        uses: semgrep/semgrep-action@v1
        with:
          config: p/security-audit
          severity: error
      - name: Dependency review
        uses: actions/dependency-review-action@v4
        with:
          fail-on-severity: high

  secrets:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Secret scan
        uses: gitleaks/gitleaks-action@v2
        env:
          GITLEAKS_CONFIG: .security/gitleaks.toml

  image:
    needs: [sast, secrets]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: docker build -t app:\${{ github.sha }} .
      - name: Image scan
        uses: aquasecurity/trivy-action@master
        with:
          severity: HIGH,CRITICAL
          exit-code: "1"
          ignore-unfixed: true
      - name: Verify provenance
        run: cosign verify app:\${{ github.sha }} --certificate-identity-regexp ".*"`,
    },
    metricsTitle: "The measures we hold ourselves to",
    metrics: [
      {
        label: "Remediation cost",
        value: 80,
        suffix: "%",
        context: "Lower with early detection",
        change: "Per finding",
      },
      {
        label: "Pipeline gate coverage",
        value: 100,
        suffix: "%",
        context: "Every merge goes through the gate",
        change: "Continuous",
      },
      {
        label: "Manual security steps",
        value: 0,
        suffix: "%",
        context: "Automated rather than ticked",
        change: "Per release",
      },
      {
        label: "Time to remediate",
        value: 70,
        suffix: "%",
        context: "Faster with runtime feedback",
        change: "Against baseline",
      },
    ],
    comparison: {
      title: "Security at the end against security throughout",
      description:
        "The same controls, placed differently. Finding a flaw before it ships is cheaper than finding it after it does.",
      columns: [
        {
          id: "late",
          name: "Security at the end",
          caption: "A gate before production",
        },
        {
          id: "early",
          name: "DevSecOps",
          caption: "Controls in every stage",
          highlight: true,
        },
      ],
      sections: [
        {
          id: "timing",
          title: "When it is found",
          rows: [
            {
              id: "stage",
              feature: "Point of detection",
              values: { late: "Before release", early: "At design time" },
            },
            {
              id: "cost",
              feature: "Cost to remediate",
              values: { late: "High", early: "Low" },
            },
            {
              id: "owner",
              feature: "Who fixes it",
              values: { late: "Security team", early: "The authoring team" },
            },
          ],
        },
        {
          id: "coverage",
          title: "Coverage",
          rows: [
            {
              id: "sast",
              feature: "Static analysis",
              values: { late: "Partial", early: true },
            },
            {
              id: "dast",
              feature: "Dynamic analysis",
              values: { late: "Partial", early: true },
            },
            {
              id: "runtime",
              feature: "Runtime detection",
              values: { late: false, early: true },
            },
            {
              id: "supply",
              feature: "Supply chain verification",
              values: { late: false, early: true },
            },
          ],
        },
        {
          id: "operate",
          title: "Operating the result",
          rows: [
            {
              id: "compliance",
              feature: "Compliance evidence",
              values: { late: "Assembled by hand", early: "Generated by the pipeline" },
            },
            {
              id: "alerting",
              feature: "Security alerting",
              values: { late: "Partial", early: true },
            },
            {
              id: "response",
              feature: "Incident response automation",
              values: { late: false, early: true },
            },
            {
              id: "velocity",
              feature: "Effect on delivery speed",
              values: { late: "Slows release", early: "Built into the flow" },
            },
          ],
        },
        {
          id: "shared",
          title: "What stays the same",
          rows: [
            {
              id: "shared-vcs",
              feature: "Version control",
              values: { late: true, early: true },
            },
            {
              id: "shared-review",
              feature: "Code review before merge",
              values: { late: "Required", early: "Required" },
            },
            {
              id: "shared-tests",
              feature: "Automated test suite",
              hint: "Only as good as the tests you already write",
              values: { late: "Where they exist", early: "Where they exist" },
            },
            {
              id: "shared-envs",
              feature: "Separate environments",
              values: { late: true, early: true },
            },
          ],
        },
      ],
    },
    engagementTitle: "How the work is staged",
    engagementIntro:
      "Security changes are trusted faster when teams can see the control working on their own changes. Each stage is small enough to trust.",
    engagement: [
      {
        value: "assessment",
        label: "Assessment",
        description:
          "Evaluate current security posture and identify gaps in your DevSecOps maturity.",
        meta: "2 to 3 weeks",
      },
      {
        value: "strategy",
        label: "Strategy design",
        description:
          "Create a tailored DevSecOps roadmap aligned with your business objectives.",
        meta: "2 to 3 weeks",
      },
      {
        value: "implementation",
        label: "Implementation",
        description:
          "Deploy security tools, processes, and training across your development lifecycle.",
        meta: "Quarterly increments",
      },
      {
        value: "optimization",
        label: "Optimization",
        description:
          "Continuously monitor, measure, and improve security practices and tool effectiveness.",
        meta: "Continuous",
      },
    ],
    approachTitle: "What working with us looks like",
    approachIntro:
      "Security that slows a team down gets worked around. Every control we add is designed to be fast enough that keeping it is easier than skipping it.",
    approach: [
      {
        title: "Assess the posture",
        description:
          "Evaluate current security posture and identify gaps in your DevSecOps maturity.",
      },
      {
        title: "Design the strategy",
        description:
          "Create a tailored DevSecOps roadmap aligned with your business objectives.",
      },
      {
        title: "Implement the controls",
        description:
          "Deploy security tools, processes, and training across your development lifecycle.",
      },
      {
        title: "Optimize and measure",
        description:
          "Continuously monitor, measure, and improve security practices and tool effectiveness.",
      },
    ],
    toolsTitle: "Tools and technologies",
    toolsIntro:
      "Chosen so the developer gets a fast, legible result rather than a wall of findings. Integration matters more than catalogue length.",
    tools: [
      { name: "SAST tools", category: "Static", note: "Source analysis" },
      { name: "DAST tools", category: "Dynamic", note: "Runtime analysis" },
      { name: "Container security", category: "Supply chain", note: "Image scanning" },
      { name: "SIEM solutions", category: "Operations", note: "Log correlation" },
      { name: "Git security", category: "Source", note: "Commit and secret scanning" },
      { name: "Cloud security", category: "Cloud", note: "Posture and identity" },
    ],
    faqTitle: "Questions teams ask before they start",
    useCases: [
      {
        title: "Financial services",
        description:
          "Meet regulatory compliance while maintaining rapid innovation cycles.",
      },
      {
        title: "Healthcare applications",
        description: "Ensure HIPAA compliance and protect sensitive patient data.",
      },
      {
        title: "E-commerce platforms",
        description:
          "Protect customer data and payment information without affecting user experience.",
      },
      {
        title: "SaaS applications",
        description:
          "Build secure multi-tenant applications with automated security controls.",
      },
    ],
    faq: [
      {
        question: "Will this slow our releases down?",
        answer:
          "It should not. Most of the slowdown people expect comes from a control that is slow to run or noisy to read. We tune both: controls that fail the build are fast and specific, and everything else is recorded instead of blocking.",
      },
      {
        question: "We already run a scanner. What is different?",
        answer:
          "Usually the gap is what happens after the scan. A finding that is not routed, tracked and closed is a report, not a control. We wire the existing tooling into the delivery flow and make sure findings reach the team that can fix them.",
      },
      {
        question: "Which compliance regime should we design for?",
        answer:
          "The one your customers care about. Mapping controls to a specific framework happens naturally once the controls are defined, and the pipeline generates the evidence as a by-product rather than as a separate project.",
      },
      {
        question: "Do developers need training to use this?",
        answer:
          "Yes, and it is short. The goal is not to turn developers into security engineers but to make the secure path the path of least resistance, so they never need to think about security at all.",
      },
      {
        question: "How do you handle false positives?",
        answer:
          "We measure them from the first stage and treat a high false-positive rate as a defect in the control. Baselines, ownership and expiry are part of the design, not an afterthought once the noise becomes painful.",
      },
    ],
    cta: {
      title: "Ready to transform your DevSecOps?",
      description:
        "Let's build a security-first culture that accelerates innovation while protecting your digital assets.",
      primary: { label: "Talk to our team", href: "/contact/" },
      secondary: { label: "See observability", href: "/observability-consult/" },
      points: [
        "Security posture assessed in the first stage",
        "Controls landed as pipeline gates, not policy pages",
        "Developer training and handover included",
      ],
    },
  },

  "observability-consult": {
    slug: "observability-consult",
    eyebrow: "Observability and DevSecOps",
    title: "Observability",
    subtitle:
      "Define observability standards and operating models that help teams detect and resolve issues faster.",
    image: "/images/services/generated/observability.webp",
    imageAlt:
      "Connected telemetry surfaces where metrics, logs and traces converge on one service map",
    heroVariant: "imageLeft",
    sections: [
      "highlights",
      "lineChart",
      "stream",
      "capabilityColumns",
      "progress",
      "expand",
      "scenarioGrid",
      "faq",
      "cta",
    ],
    faqVariant: "search",
    ctaVariant: "centered",
    stream: {
      title: "How the traffic actually split",
      description:
        "Requests per second by service, week by week. The shape matters more than any single number: it shows which service is about to become somebody's problem.",
      label: "Requests per second by service",
      unit: "k req/s",
      series: [
        { key: "checkout", label: "checkout" },
        { key: "search", label: "search" },
        { key: "catalogue", label: "catalogue" },
        { key: "account", label: "account" },
      ],
      data: [
        { key: "w1", label: "Week of 5 Jan", axisLabel: "Jan", values: { checkout: 42, search: 28, catalogue: 18, account: 12 } },
        { key: "w2", label: "Week of 12 Jan", axisLabel: "", values: { checkout: 44, search: 29, catalogue: 18, account: 12 } },
        { key: "w3", label: "Week of 19 Jan", axisLabel: "", values: { checkout: 43, search: 31, catalogue: 19, account: 13 } },
        { key: "w4", label: "Week of 26 Jan", axisLabel: "", values: { checkout: 47, search: 30, catalogue: 19, account: 13 } },
        { key: "w5", label: "Week of 2 Feb", axisLabel: "Feb", values: { checkout: 51, search: 33, catalogue: 20, account: 14 } },
        { key: "w6", label: "Week of 9 Feb", axisLabel: "", values: { checkout: 49, search: 35, catalogue: 21, account: 14 } },
        { key: "w7", label: "Week of 16 Feb", axisLabel: "", values: { checkout: 54, search: 34, catalogue: 21, account: 15 } },
        { key: "w8", label: "Week of 23 Feb", axisLabel: "", values: { checkout: 56, search: 36, catalogue: 22, account: 15 } },
        { key: "w9", label: "Week of 2 Mar", axisLabel: "Mar", values: { checkout: 55, search: 38, catalogue: 23, account: 16 } },
        { key: "w10", label: "Week of 9 Mar", axisLabel: "", values: { checkout: 58, search: 37, catalogue: 23, account: 16 } },
        { key: "w11", label: "Week of 16 Mar", axisLabel: "", values: { checkout: 61, search: 39, catalogue: 24, account: 17 } },
        { key: "w12", label: "Week of 23 Mar", axisLabel: "", values: { checkout: 60, search: 41, catalogue: 25, account: 17 } },
      ],
    },

    charts: {
      line: {
        label: "Request latency",
        unit: "ms",
        series: [
          { key: "p95", label: "p95 latency" },
          { key: "p50", label: "p50 latency", area: false },
          { key: "budget", label: "Error budget ceiling", dashed: true, area: false },
        ],
        data: [
          { key: "w1", label: "Week one", axisLabel: "W1", values: { p95: 1420, p50: 310, budget: 800 } },
          { key: "w2", label: "Week two", axisLabel: "W2", values: { p95: 1180, p50: 268, budget: 800 } },
          { key: "w3", label: "Week three", axisLabel: "W3", values: { p95: 940, p50: 224, budget: 800 } },
          { key: "w4", label: "Week four", axisLabel: "W4", values: { p95: 760, p50: 198, budget: 800 } },
          { key: "w5", label: "Week five", axisLabel: "W5", values: { p95: 690, p50: 181, budget: 800 } },
          { key: "w6", label: "Week six", axisLabel: "W6", values: { p95: 604, p50: 166, budget: 800 } },
          { key: "w7", label: "Week seven", axisLabel: "W7", values: { p95: 548, p50: 152, budget: 800 } },
          { key: "w8", label: "Week eight", axisLabel: "W8", values: { p95: 496, p50: 141, budget: 800 } },
        ],
      },
    },
    slides: [
      {
        tag: "Surface",
        title: "One service map, not nine dashboards",
        body: "Every service publishes the same handful of signals, so the map answers the question instead of sending you somewhere else.",
      },
      {
        tag: "Signal",
        title: "Logs that are worth reading",
        body: "Structured logs, a trace id on every line, and retention set by the questions you actually need answered.",
      },
      {
        tag: "Signal",
        title: "Traces that follow the request",
        body: "The trace is the spine: it links the log lines, the span timings and the deploy that introduced the change.",
      },
      {
        tag: "Practice",
        title: "Alerts that wake the right person",
        body: "An alert fires on user impact, carries the dashboard it came from, and has a runbook attached before it ships.",
      },
    ],
    intro: {
      title: "Turn telemetry into an operating capability",
      description:
        "In today's complex distributed systems, observability is the key to understanding system behavior, predicting failures, and maintaining optimal performance across your entire infrastructure.",
    },
    highlightsTitle: "Why observability matters",
    highlights: [
      {
        icon: "Radar",
        title: "Beyond traditional monitoring",
        description:
          "Move from basic metrics to deep insights that explain unknown unknowns in your system behavior.",
      },
      {
        icon: "Bot",
        title: "Faster problem resolution",
        description:
          "Reduce mean time to resolution (MTTR) by up to 70% with comprehensive observability data.",
      },
      {
        icon: "Heart",
        title: "Enhanced user experience",
        description:
          "Proactively identify and resolve issues before they impact your customers' experience.",
      },
    ],
    statsTitle: "What the practice moves",
    statsDescription:
      "Reported outcomes across engagements that standardized telemetry, alerting and dashboards.",
    stats: [
      {
        value: 70,
        suffix: "%",
        label: "Reduction in MTTR",
        detail: "With comprehensive telemetry data",
        context: "Median time to localize and resolve",
        visual: {
          kind: "trend",
          values: [134, 126, 117, 108, 97, 89, 78, 68, 59, 51, 44, 38],
        },
      },
      {
        value: 85,
        suffix: "%",
        label: "Decrease in system downtime",
        detail: "Through proactive issue detection",
        context: "Issues caught before they reach users",
        visual: { kind: "uptime", days: uptime90 },
      },
      {
        value: 90,
        suffix: "%",
        label: "Team adoption rate",
        detail: "Target for the enablement plan",
        context: "Teams actively using the telemetry, not just logging it",
        visual: {
          kind: "map",
          points: [
            [-122.4, 37.8],
            [-77, -12],
            [-0.1, 51.5],
            [28, -26.2],
            [55.3, 25.3],
            [103.8, 1.35],
            [139.7, 35.7],
          ],
        },
      },
      {
        value: 30,
        suffix: "%",
        label: "Reduction in operational cost",
        detail: "Better visibility of resource use",
        context: "Spend that was previously invisible",
        visual: {
          kind: "distribution",
          bins: [3, 11, 21, 29, 27, 22, 16, 11, 8, 5, 3.5, 2, 1.2, 0.7],
          max: 160,
          marker: 45,
        },
      },
    ],
    capabilitiesTitle: "Service scope",
    capabilitiesIntro:
      "Three pieces of work. The third is the one that decides whether the other two are worth anything.",
    capabilities: [
      {
        title: "Telemetry strategy",
        lead: "Metrics, logs, traces, and event conventions for consistent visibility",
        description:
          "Establish a unified telemetry foundation that provides comprehensive insights across all services and applications. Standardized collection and naming conventions mean a query written once works across every team.",
        detail:
          "The convention is the product. Without one, every dashboard is a bespoke artefact and every new engineer has to learn a different vocabulary.",
        items: [
          {
            title: "Metric conventions",
            description: "Standardized metric collection and naming conventions.",
          },
          {
            title: "Structured logging",
            description: "Structured logging with correlation IDs.",
          },
          {
            title: "Distributed tracing",
            description: "Distributed tracing implementation.",
          },
          {
            title: "Event streaming",
            description: "Event streaming for real-time monitoring.",
          },
        ],
      },
      {
        title: "SLO and alerting model",
        lead: "Alerting tuned to user impact and operational priorities",
        description:
          "Implement service level objectives and intelligent alerting that focuses on what matters most to your users, using multi-level alerting with escalation policies and business impact correlation.",
        detail:
          "Fewer alerts, each one with a clear reason to exist. When someone is paged, they already know what user-facing problem they are looking at.",
        items: [
          {
            title: "Objective definition",
            description: "Service Level Objective (SLO) definition.",
          },
          {
            title: "Error budgets",
            description: "Error budget management and burn rate alerts.",
          },
          {
            title: "Escalation",
            description: "Multi-level alerting with escalation policies.",
          },
          {
            title: "Impact",
            description: "Business impact correlation.",
          },
        ],
      },
      {
        title: "Adoption playbook",
        lead: "Enablement plans that drive adoption across product teams",
        description:
          "Create a comprehensive adoption strategy that empowers teams to leverage observability effectively, through team training, maturity assessment, dashboard templates and written best practice.",
        detail:
          "Tooling that nobody opens is a cost centre. The adoption work is what converts the telemetry into a practice teams actually run on.",
        items: [
          {
            title: "Training",
            description: "Team training and skill development programs.",
          },
          {
            title: "Assessment",
            description: "Observability maturity assessment.",
          },
          {
            title: "Templates",
            description: "Custom dashboards and reporting templates.",
          },
          {
            title: "Guidelines",
            description: "Best practices documentation and guidelines.",
          },
        ],
      },
    ],
    code: {
      filename: "otel/collector.yaml",
      language: "yaml",
      caption:
        "One collector, one set of conventions. The pipeline is owned by the platform team so a service only has to emit telemetry, not decide where it goes.",
      code: `# Collectors are deployed once per cluster and are owned by the
# platform team, so a service only has to emit telemetry.
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

processors:
  batch:
    timeout: 5s
    send_batch_size: 8192
  memory_limiter:
    check_interval: 1s
    limit_percentage: 80
  # Drop telemetry nobody is going to read, and tag what remains.
  filter/noisy:
    error_mode: ignore
    traces:
      span:
        - 'attributes["http.route"] == "/healthz"'
  resourcedetection:
    detectors: [env, system]
    timeout: 2s
  resource/attributes:
    attributes:
      - key: service.namespace
        value: "\${env:OTEL_SERVICE_NAMESPACE}"
        action: upsert
      - key: deployment.environment
        value: "\${env:DEPLOY_ENV}"
        action: upsert

exporters:
  otlp/metrics:
    endpoint: \${env:METRICS_ENDPOINT}
  otlp/traces:
    endpoint: \${env:TRACES_ENDPOINT}
  prometheus:
    endpoint: 0.0.0.0:8889

service:
  pipelines:
    metrics:
      receivers: [otlp]
      processors: [memory_limiter, resourcedetection, resource/attributes, batch]
      exporters: [otlp/metrics, prometheus]
    traces:
      receivers: [otlp]
      processors: [memory_limiter, filter/noisy, resourcedetection, resource/attributes, batch]
      exporters: [otlp/traces]`,
    },
    metricsTitle: "The measures we hold ourselves to",
    metrics: [
      {
        label: "MTTR",
        value: 70,
        suffix: "%",
        context: "Lower with complete telemetry",
        change: "Against baseline",
      },
      {
        label: "System downtime",
        value: 85,
        suffix: "%",
        context: "Lower through proactive detection",
        change: "Per quarter",
      },
      {
        label: "Operational cost",
        value: 30,
        suffix: "%",
        context: "Lower with better visibility",
        change: "Per workload",
      },
      {
        label: "Team adoption",
        value: 90,
        suffix: "%",
        context: "Target for the enablement plan",
        change: "Quarterly review",
      },
    ],
    comparison: {
      title: "Traditional monitoring against observability",
      description:
        "Monitoring answers the questions you thought to ask. Observability answers the ones you did not, which is the only one that matters at 3am.",
      columns: [
        {
          id: "monitoring",
          name: "Traditional monitoring",
          caption: "Known questions, known dashboards",
        },
        {
          id: "observable",
          name: "Observability",
          caption: "Questions you did not know to ask",
          highlight: true,
        },
      ],
      sections: [
        {
          id: "signal",
          title: "Signal",
          rows: [
            {
              id: "known",
              feature: "Approach to unknown problems",
              values: { monitoring: "Cannot answer", observable: "Reconstructs the path" },
            },
            {
              id: "context",
              feature: "Structured correlation IDs",
              values: { monitoring: false, observable: true },
            },
            {
              id: "traces",
              feature: "Distributed tracing",
              values: { monitoring: false, observable: true },
            },
            {
              id: "convention",
              feature: "Naming conventions",
              values: { monitoring: "Per team", observable: "Shared" },
            },
          ],
        },
        {
          id: "alerting",
          title: "Alerting",
          rows: [
            {
              id: "impact",
              feature: "Alerts tied to user impact",
              values: { monitoring: "Infrastructure alerts", observable: "SLO burn rate" },
            },
            {
              id: "fatigue",
              feature: "Alert fatigue",
              values: { monitoring: "Common", observable: "Measured and reduced" },
            },
            {
              id: "escalation",
              feature: "Escalation policies",
              values: { monitoring: false, observable: true },
            },
          ],
        },
        {
          id: "practice",
          title: "Practice",
          rows: [
            {
              id: "enablement",
              feature: "Team enablement",
              values: { monitoring: false, observable: true },
            },
            {
              id: "dashboard",
              feature: "Shared dashboard templates",
              values: { monitoring: false, observable: true },
            },
            {
              id: "cost",
              feature: "Telemetry cost visibility",
              values: { monitoring: false, observable: true },
            },
            {
              id: "maturity",
              feature: "Maturity assessment",
              values: { monitoring: false, observable: true },
            },
          ],
        },
        {
          id: "shared",
          title: "What stays the same",
          rows: [
            {
              id: "shared-vcs",
              feature: "Version control",
              values: { monitoring: true, observable: true },
            },
            {
              id: "shared-review",
              feature: "Code review before merge",
              values: { monitoring: "Required", observable: "Required" },
            },
            {
              id: "shared-tests",
              feature: "Automated test suite",
              hint: "Only as good as the tests you already write",
              values: { monitoring: "Where they exist", observable: "Where they exist" },
            },
            {
              id: "shared-envs",
              feature: "Separate environments",
              values: { monitoring: true, observable: true },
            },
          ],
        },
      ],
    },
    engagementTitle: "How the work is staged",
    engagementIntro:
      "Observability fails quietly when nobody looks at it. Each stage ends with something teams actually open.",
    engagement: [
      {
        value: "assessment",
        label: "Assessment",
        description:
          "Evaluate your current observability maturity and identify gaps in your monitoring capabilities.",
        meta: "2 to 3 weeks",
      },
      {
        value: "strategy",
        label: "Strategy design",
        description:
          "Create a comprehensive observability strategy aligned with your business objectives and technical requirements.",
        meta: "2 to 4 weeks",
      },
      {
        value: "implementation",
        label: "Implementation",
        description:
          "Deploy observability tools and establish data collection pipelines across your infrastructure.",
        meta: "Quarterly increments",
      },
      {
        value: "optimization",
        label: "Optimization",
        description:
          "Continuously refine dashboards, alerts, and processes based on operational feedback and evolving needs.",
        meta: "Continuous",
      },
    ],
    approachTitle: "What working with us looks like",
    approachIntro:
      "We treat telemetry as a product with users. The people on call are the users, and the design decisions follow from that.",
    approach: [
      {
        title: "Assess the maturity",
        description:
          "Evaluate your current observability maturity and identify gaps in your monitoring capabilities.",
      },
      {
        title: "Design the strategy",
        description:
          "Create a comprehensive observability strategy aligned with your business objectives and technical requirements.",
      },
      {
        title: "Implement the pipeline",
        description:
          "Deploy observability tools and establish data collection pipelines across your infrastructure.",
      },
      {
        title: "Optimize and adopt",
        description:
          "Continuously refine dashboards, alerts, and processes based on operational feedback and evolving needs.",
      },
    ],
    toolsTitle: "Tools and technologies",
    toolsIntro:
      "Open standards first, so the telemetry stays portable and the exit from any tool stays cheap.",
    tools: [
      { name: "Prometheus", category: "Metrics", note: "Scraping and rules" },
      { name: "Grafana", category: "Dashboards", note: "Service health views" },
      { name: "OpenTelemetry", category: "Collector", note: "Vendor-neutral pipeline" },
      { name: "Jaeger", category: "Traces", note: "Trace exploration" },
      { name: "Fluentd", category: "Logs", note: "Log routing" },
      { name: "Elasticsearch", category: "Logs", note: "Log search" },
      { name: "AlertManager", category: "Alerting", note: "Routing and grouping" },
      { name: "Kubernetes", category: "Runtime", note: "Workload platform" },
    ],
    faqTitle: "Questions teams ask before they start",
    useCases: [
      {
        title: "Microservices architecture",
        description:
          "Gain end-to-end visibility across distributed services and complex interaction patterns.",
      },
      {
        title: "Cloud-native applications",
        description:
          "Monitor dynamic scaling, container orchestration, and cloud resource utilization effectively.",
      },
      {
        title: "E-commerce platforms",
        description:
          "Track user journeys, transaction flows, and payment processing in real-time.",
      },
      {
        title: "Financial services",
        description:
          "Ensure compliance, audit trails, and real-time fraud detection with comprehensive logging.",
      },
    ],
    faq: [
      {
        question: "We already have Prometheus and Grafana. What is missing?",
        answer:
          "Usually the conventions and the traces. Metrics without naming standards means every dashboard is bespoke, and without distributed tracing a multi-service failure is still a puzzle.",
      },
      {
        question: "Does observability not get expensive quickly?",
        answer:
          "It does if nobody owns it. We make telemetry cost part of the platform team's budget and review it alongside usage, so the expensive signals are a deliberate choice rather than a default.",
      },
      {
        question: "How do we get teams to actually adopt it?",
        answer:
          "By making it the easiest way to answer a question they already have. Dashboards they would have built themselves, alerts tied to their SLOs, and an enablement plan that puts people in front of it rather than sending them a document.",
      },
      {
        question: "Should we standardize on one vendor?",
        answer:
          "No. OpenTelemetry for collection keeps the backend replaceable, which is also what makes the first conversation with a vendor a normal negotiation rather than a migration.",
      },
      {
        question: "What about log volume?",
        answer:
          "Filtering at the collector, before the data is stored, is where the savings are. We define cardinality and level rules per service and make them part of the template, not a conversation every time.",
      },
    ],
    cta: {
      title: "Transform your observability strategy",
      description:
        "Turn observability from tooling into a measurable engineering capability that drives business value.",
      primary: { label: "Talk to our team", href: "/contact/" },
      secondary: { label: "See SRE consultancy", href: "/sre-consultancy/" },
      points: [
        "Telemetry conventions defined in the first stage",
        "SLOs and alerting agreed with the business",
        "Enablement plan and handover included",
      ],
    },
  },
};

/** The five routes the site nav links to, keyed by their URL segment. */
export const platformServiceRoutes: Record<string, string> = {
  "/platformengineering/": "platform-engineering",
  "/ci-cd-dev/": "ci-cd-dev",
  "/sre-consultancy/": "sre-consultancy",
  "/devsec-ops/": "devsec-ops",
  "/observability-consult/": "observability-consult",
};
