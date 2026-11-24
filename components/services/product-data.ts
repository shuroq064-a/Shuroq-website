import { Blocks, Boxes, Cloud, Plug, Users, Workflow, type LucideIcon } from "lucide-react";

import type { LogoMarqueeBrand } from "@/components/arc/blocks/logo-marquee/logo-marquee";

const mark = (name: string, file: string): LogoMarqueeBrand => ({
  name,
  icon: `/icons/${file}.svg`,
});

export const productHero = {
  eyebrow: "Product Engineering Services",
  headline: "Products built for the people who use them",
  lead: "A product is only as good as the workflow it fits into. We combine research, engineering and business understanding to build enterprise software that people actually want to use.",
};

export const productOverview = {
  title: "Enterprise software, engineered to last",
  lead: "Scalable systems for the way modern organisations actually work.",
  paragraphs: [
    "We develop enterprise-grade software engineered for scalability, performance, security and long-term business growth. Every system is designed around the workflows it has to support, not a generic template.",
    "Too often, systems are fragmented, outdated or unable to keep pace with operational demand. We replace that friction with software that fits the organisation: clear to operate, straightforward to integrate, and ready to extend.",
    "Our focus is not development for its own sake. It is software that improves operational efficiency and supports the decisions the business makes every day.",
  ],
};

export interface ProductService {
  title: string;
  text: string;
  icon: LucideIcon;
}

export const productServices: ProductService[] = [
  {
    title: "Custom Enterprise Applications",
    text: "Software shaped around internal processes and the people who run them — with the access, auditability and boundaries the work needs.",
    icon: Blocks,
  },
  {
    title: "CRM & ERP Solutions",
    text: "Connected customer, resource and reporting workflows, with data that stays legible through migration and use.",
    icon: Users,
  },
  {
    title: "SaaS Product Development",
    text: "Multi-tenant products designed for scale from the first customer: tenant isolation, billing and predictable releases.",
    icon: Cloud,
  },
  {
    title: "API Development & Integration",
    text: "Secure contracts between systems, with versioning, third-party integrations and failures that are visible and recoverable.",
    icon: Plug,
  },
  {
    title: "Workflow Automation",
    text: "The repetitive steps removed, the judgement calls kept human, and the result measured in fewer errors rather than more tickets.",
    icon: Workflow,
  },
  {
    title: "Cloud-Native Development",
    text: "Applications designed for elasticity and high availability from day one, with a clear path to the cloud-native practice.",
    icon: Boxes,
  },
];

/** Four steps, closed by default in the vendored Arc accordion. */
export const productProcess = [
  {
    title: "Discover",
    content:
      "We map the workflow, the constraints and the people affected before proposing a system. That includes the awkward exceptions a demo would leave out.",
  },
  {
    title: "Shape",
    content:
      "Architecture, data model and interfaces are agreed together. Trade-offs are written down so the decisions still make sense to the next team.",
  },
  {
    title: "Build",
    content:
      "Small, reviewable increments. Working software from the first sprint rather than a single reveal at the end.",
  },
  {
    title: "Evolve",
    content:
      "After launch we measure what changed, keep the system healthy and improve the parts that actually matter to its users.",
  },
];

export const productCommitments = [
  { title: "Business-first decisions", text: "We start from the outcome, then choose the technology that serves it." },
  { title: "Secure by construction", text: "Permissions, data handling and deployment boundaries are part of the design." },
  { title: "Small, visible releases", text: "Increments you can review and reverse, rather than one large handover." },
  { title: "Measurable outcomes", text: "Success is stated in operational terms, not in tickets shipped." },
];

export const productStack = {
  title: "The stack behind the work",
  description: "A familiar set of frameworks, databases and platforms stays close to every engagement.",
  brands: [
    mark("React", "react"),
    mark("Next.js", "nextjs"),
    mark("TypeScript", "typescript"),
    mark("Node.js", "nodejs"),
    mark("Python", "python"),
    mark("PostgreSQL", "postgresql"),
    mark("MongoDB", "mongodb"),
    mark("Redis", "redis"),
    mark("GraphQL", "graphql"),
    mark("AWS", "amazon-web-services"),
    mark("Kubernetes", "kubernetes"),
    mark("Docker", "docker"),
    mark("GitHub", "github"),
  ],
};

export const productCrossLink = {
  eyebrow: "Next",
  title: "Cloud Native Product Development",
  text: "The same engineering discipline, applied to applications designed for the cloud from day one.",
  href: "/cloud-native/",
};

export const productCta = {
  title: "Transform operations with intelligent software",
  text: "Enterprise software should simplify operations, not add complexity. Tell us what is slowing your teams down and we will tell you what we would build.",
};
