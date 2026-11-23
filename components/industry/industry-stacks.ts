import type { LogoMarqueeBrand } from "@/components/arc/blocks/logo-marquee/logo-marquee";

/**
 * Platform / tool marks for the logo marquee. Every icon is already vendored in
 * public/icons (monochrome SVG), so the marquee draws them as masks in the text
 * colour — no hot-linked or coloured marks.
 */
const mark = (name: string, file: string): LogoMarqueeBrand => ({
  name,
  icon: `/icons/${file}.svg`,
});

export const overviewStack: LogoMarqueeBrand[] = [
  mark("AWS", "amazon-web-services"),
  mark("Microsoft Azure", "microsoft-azure"),
  mark("Google Cloud", "google-cloud"),
  mark("Kubernetes", "kubernetes"),
  mark("Docker", "docker"),
  mark("Terraform", "terraform"),
  mark("PostgreSQL", "postgresql"),
  mark("MongoDB", "mongodb"),
  mark("Redis", "redis"),
  mark("Python", "python"),
  mark("Node.js", "nodejs"),
  mark("React", "react"),
  mark("Next.js", "nextjs"),
  mark("TensorFlow", "tensorflow"),
  mark("Grafana", "grafana"),
  mark("Snowflake", "snowflake"),
];

const stacks: Record<string, LogoMarqueeBrand[]> = {
  telecom: [
    mark("AWS", "amazon-web-services"),
    mark("Microsoft Azure", "microsoft-azure"),
    mark("Kubernetes", "kubernetes"),
    mark("Docker", "docker"),
    mark("Terraform", "terraform"),
    mark("Apache Kafka", "apache-kafka"),
    mark("Grafana", "grafana"),
    mark("Prometheus", "prometheus"),
    mark("Node.js", "nodejs"),
    mark("Python", "python"),
  ],
  automotive: [
    mark("AWS", "amazon-web-services"),
    mark("Microsoft Azure", "microsoft-azure"),
    mark("Kubernetes", "kubernetes"),
    mark("Docker", "docker"),
    mark("Terraform", "terraform"),
    mark("TensorFlow", "tensorflow"),
    mark("PyTorch", "pytorch"),
    mark("NVIDIA", "nvidia"),
    mark("Python", "python"),
    mark("MongoDB", "mongodb"),
  ],
  bfsi: [
    mark("AWS", "amazon-web-services"),
    mark("Microsoft Azure", "microsoft-azure"),
    mark("Kubernetes", "kubernetes"),
    mark("PostgreSQL", "postgresql"),
    mark("MongoDB", "mongodb"),
    mark("Redis", "redis"),
    mark("Python", "python"),
    mark("Node.js", "nodejs"),
    mark("Salesforce", "salesforce"),
    mark("SAP", "sap"),
  ],
  healthcare: [
    mark("AWS", "amazon-web-services"),
    mark("Microsoft Azure", "microsoft-azure"),
    mark("Google Cloud", "google-cloud"),
    mark("Kubernetes", "kubernetes"),
    mark("PostgreSQL", "postgresql"),
    mark("MongoDB", "mongodb"),
    mark("Python", "python"),
    mark("TensorFlow", "tensorflow"),
    mark("Hugging Face", "hugging-face"),
    mark("GraphQL", "graphql"),
  ],
  finance: [
    mark("AWS", "amazon-web-services"),
    mark("Microsoft Azure", "microsoft-azure"),
    mark("Kubernetes", "kubernetes"),
    mark("PostgreSQL", "postgresql"),
    mark("Redis", "redis"),
    mark("Apache Kafka", "apache-kafka"),
    mark("Snowflake", "snowflake"),
    mark("Python", "python"),
    mark("Node.js", "nodejs"),
    mark("Grafana", "grafana"),
  ],
};

export function getStack(slug: string): LogoMarqueeBrand[] {
  return stacks[slug] ?? overviewStack;
}
