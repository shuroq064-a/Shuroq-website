import type { LogoMarqueeBrand } from "@/components/arc/blocks/logo-marquee/logo-marquee";

const mark = (name: string, file: string): LogoMarqueeBrand => ({
  name,
  icon: `/icons/${file}.svg`,
});

export const cloudHero = {
  eyebrow: "Cloud Native Product Development",
  headline: "Resilient products, built for the cloud era",
  lead: "We design applications that treat the cloud as a platform, not a hosting destination — elastic, self-healing and straightforward to operate.",
};

export const cloudOverview = {
  title: "A cloud-native engineering approach",
  lead: "Built to use the full potential of the cloud, from the first commit.",
  paragraphs: [
    "Cloud-native applications are built differently. They embrace managed services, use containers, adopt microservices where they earn their place, and treat deployment as a continuous practice rather than an event.",
    "That approach gives teams more agility, better scalability and higher reliability, while reducing the operational overhead that comes with traditional application stacks. It also shortens the distance between an idea and a release.",
    "Our work covers the full lifecycle: strategy and architecture, implementation, optimisation and ongoing support. The goal is cloud adoption that changes how software is delivered without disrupting how the business runs.",
  ],
};

export interface CloudCapability {
  title: string;
  summary: string;
  details: string[];
}

export const cloudCapabilities: CloudCapability[] = [
  {
    title: "Container Orchestration",
    summary: "Kubernetes, Docker and Helm used where they solve a real problem.",
    details: [
      "Deployment, scaling and rollout strategies teams can operate",
      "Resource limits and health checks that make failures contained",
      "Clusters designed around the environments you actually run",
    ],
  },
  {
    title: "Cloud-Native Architecture Design",
    summary: "Services that are loosely coupled, independently deployable and easy to reason about.",
    details: [
      "Boundaries drawn around business capabilities, not org charts",
      "Explicit contracts between services and their data",
      "A migration path from the systems you have today",
    ],
  },
  {
    title: "CI/CD Pipeline Integration",
    summary: "Automated paths from commit to production with visible, reversible steps.",
    details: [
      "Pipelines with Jenkins, GitLab CI, ArgoCD or GitHub Actions",
      "Environments that stay consistent because they are defined in code",
      "Rollbacks treated as a normal operation, not an emergency",
    ],
  },
  {
    title: "Service Mesh Implementation",
    summary: "Istio and Linkerd for the traffic, security and observability between services.",
    details: [
      "Service-to-service communication made explicit",
      "Traffic policies that support safe rollouts",
      "Introduced only where the complexity pays for itself",
    ],
  },
  {
    title: "API Gateway & Management",
    summary: "A clear front door for APIs: authenticated, monitored and governed.",
    details: [
      "Rate limiting, authentication and request routing",
      "Versioning that lets consumers move at their own pace",
      "Monitoring tied to the APIs the business depends on",
    ],
  },
  {
    title: "Observability & Monitoring Setup",
    summary: "Metrics, logs and traces that answer the question when something changes.",
    details: [
      "Prometheus, Grafana and distributed tracing working together",
      "Dashboards built around service behaviour, not tool defaults",
      "Alerts that point to a cause rather than a symptom",
    ],
  },
];

export interface StartingPoint {
  value: string;
  label: string;
  title: string;
  text: string;
  bullets: string[];
}

/** Three views switched by the vendored Arc segmented control. */
export const cloudStartingPoints: StartingPoint[] = [
  {
    value: "modernise",
    label: "Modernise",
    title: "Bring what you have up to standard",
    text: "We move an existing application towards cloud-native behaviour in stages, without a single high-risk cutover.",
    bullets: [
      "Containerise before rewriting anything",
      "Separate services along existing fault lines",
      "Put repeatable releases in place early",
    ],
  },
  {
    value: "build-new",
    label: "Build new",
    title: "Start with a clean foundation",
    text: "For a new product, the important decisions are made before the first service exists — and written down.",
    bullets: [
      "Service boundaries and contracts agreed up front",
      "Infrastructure described in code from day one",
      "Observability designed in, not bolted on",
    ],
  },
  {
    value: "operate",
    label: "Operate",
    title: "Make the running system predictable",
    text: "The work continues after launch: making behaviour visible, releases boring and capacity affordable.",
    bullets: [
      "SLOs and dashboards tied to real behaviour",
      "Automated rollouts and reversals",
      "Cost and capacity kept in view",
    ],
  },
];

export interface PlatformLayer {
  title: string;
  detail: string;
  tools: string[];
}

/** A layer diagram drawn in type and hairlines — deliberately not another card grid. */
export const cloudLayers: PlatformLayer[] = [
  {
    title: "Application",
    detail: "Services, APIs and domain boundaries",
    tools: ["Node.js", "Python", "Go", "GraphQL"],
  },
  {
    title: "Runtime",
    detail: "Containers and orchestration",
    tools: ["Docker", "Kubernetes", "Helm"],
  },
  {
    title: "Delivery",
    detail: "Infrastructure and pipelines",
    tools: ["Terraform", "ArgoCD", "Jenkins", "GitHub"],
  },
  {
    title: "Observability",
    detail: "Signals from the running system",
    tools: ["Prometheus", "Grafana", "Istio"],
  },
];

export const cloudUseCases = [
  {
    title: "SaaS Product Development",
    text: "Multi-tenant applications that serve thousands of customers with consistent performance.",
  },
  {
    title: "Enterprise Application Modernisation",
    text: "Legacy systems rebuilt as services that match how the business works now.",
  },
  {
    title: "High-traffic Consumer Apps",
    text: "Products built to absorb peaks with auto-scaling and high availability built in.",
  },
  {
    title: "Real-time Data Platforms",
    text: "Event-driven systems that process and analyse streaming data as it arrives.",
  },
];

export const cloudStack = {
  title: "The stack behind the work",
  description: "The containers, clouds and delivery tools this work runs on.",
  brands: [
    mark("Docker", "docker"),
    mark("Kubernetes", "kubernetes"),
    mark("Helm", "helm-mono"),
    mark("AWS", "amazon-web-services"),
    mark("Microsoft Azure", "microsoft-azure"),
    mark("Google Cloud", "google-cloud"),
    mark("Terraform", "terraform"),
    mark("ArgoCD", "argocd"),
    mark("Istio", "istio"),
    mark("Prometheus", "prometheus"),
    mark("Grafana", "grafana"),
    mark("Jenkins", "jenkins"),
    mark("GitHub", "github"),
  ],
};

export const cloudCrossLink = {
  eyebrow: "Next",
  title: "Product Engineering Services",
  text: "The broader practice behind this work: enterprise software built around the people who use it.",
  href: "/product-engineering/",
};

export const cloudCta = {
  title: "Ready to build cloud-native solutions?",
  text: "Let us talk through what you are running today and what it needs to do next. We will tell you what we would change and why.",
};
