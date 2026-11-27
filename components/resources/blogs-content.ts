import type { BlogPost } from "@/components/arc/blocks/blog-grid/blog-grid";
import type {
  SiteFooterColumn,
  SiteFooterLink,
} from "@/components/arc/blocks/site-footer/site-footer";

/** One block of an article. The article page renders them in order. */
export type BlogBlock =
  | { kind: "h2"; text: string }
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] };

export type BlogArticle = {
  /** Used as the article route and as the post id in the index. */
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date. */
  date: string;
  readTime: number;
  author: { name: string; role: string; avatar: string };
  blocks: BlogBlock[];
};

const articlecloud_native_product_development: BlogArticle = {
  slug: "cloud-native-product-development",
  title: "Cloud-Native Product Development",
  excerpt: "Building scalable, resilient applications using modern cloud-native architecture.",
  category: "Product Engineering",
  date: "2026-02-05",
  readTime: 5,
  author: { name: "Engineering Team", role: "Cloud Architects", avatar: "/media/people/nathan-cole.svg" },
  blocks: [
    { kind: "h2", text: "Introduction" },
    { kind: "p", text: "Cloud-native development enables scalable and resilient systems that can adapt to changing business requirements. In this comprehensive guide, we'll explore the key principles and best practices for building cloud-native applications that deliver exceptional performance and reliability." },
    { kind: "h2", text: "What is Cloud-Native Development?" },
    { kind: "p", text: "Cloud-native development is an approach to building and running applications to take advantage of the distributed computing offered by the cloud delivery model. This involves using containers, microservices, and continuous delivery to build applications that are resilient, manageable, and observable." },
    { kind: "h2", text: "Key Benefits" },
    { kind: "list", items: ["Scalability: Automatically scale resources based on demand", "Resilience: Built-in fault tolerance and self-healing capabilities", "Faster deployments: Continuous integration and delivery pipelines", "Cost efficiency: Pay only for resources you consume", "Portability: Run anywhere - on-premises, cloud, or hybrid"] },
    { kind: "h2", text: "Core Technologies" },
    { kind: "p", text: "Modern cloud-native development relies on several key technologies:" },
    { kind: "list", items: ["Containers: Docker and container orchestration with Kubernetes", "Microservices: Decomposing applications into smaller, independent services", "DevOps: Automation of build, test, and deployment processes", "Observability: Monitoring, logging, and tracing capabilities"] },
    { kind: "h2", text: "Best Practices" },
    { kind: "p", text: "When implementing cloud-native architectures, consider these best practices:" },
    { kind: "list", items: ["Design for failure and implement proper error handling", "Use infrastructure as code (IaC) for reproducible environments", "Implement comprehensive monitoring and alerting", "Adopt a microservices architecture where appropriate", "Implement proper security measures at every layer"] },
    { kind: "h2", text: "Conclusion" },
    { kind: "p", text: "Cloud-native development represents a fundamental shift in how we build and deploy applications. By embracing these principles and technologies, organizations can build more resilient, scalable, and efficient systems that meet the demands of modern digital business." },
  ],
};

const articlefrom_monolith_to_microservices: BlogArticle = {
  slug: "from-monolith-to-microservices",
  title: "From Monolith to Microservices",
  excerpt: "A step-by-step guide to modernizing legacy applications for better scalability and maintainability.",
  category: "Architecture",
  date: "2026-02-12",
  readTime: 8,
  author: { name: "Platform Engineering Team", role: "Backend & Cloud Engineers", avatar: "/media/people/marcus-johnson.svg" },
  blocks: [
    { kind: "h2", text: "Understanding the Monolith Challenge" },
    { kind: "p", text: "For years, monolithic architecture has been the foundation of enterprise software systems. It offers simplicity, faster initial development, and easier deployment pipelines in early stages." },
    { kind: "p", text: "However, as businesses scale and user demands increase, monolithic systems often become bottlenecks. Teams struggle with slower releases, scalability issues, and increasing system complexity." },
    { kind: "p", text: "Modern digital products demand speed, flexibility, and resilience — and this is where microservices architecture becomes essential." },
    { kind: "h2", text: "What is a Monolithic Architecture?" },
    { kind: "p", text: "A monolithic application is built as a single, unified codebase where all modules — UI, business logic, and database interactions — are tightly coupled and deployed together." },
    { kind: "p", text: "Example: E-commerce app:" },
    { kind: "list", items: ["User authentication", "Product catalog", "Payment system", "All exist in one codebase"] },
    { kind: "h2", text: "Limitations of Monolithic Systems" },
    { kind: "p", text: "As the application grows, several issues start to emerge:" },
    { kind: "p", text: "🔴 1. Scalability Constraints" },
    { kind: "p", text: "Scaling requires duplicating the entire application, even if only one module (e.g., payments) needs scaling." },
    { kind: "p", text: "🔴 2. Deployment Risk" },
    { kind: "p", text: "A small change requires redeploying the entire system, increasing downtime risk." },
    { kind: "p", text: "🔴 3. Tight Coupling" },
    { kind: "p", text: "A bug in one module can impact the entire system." },
    { kind: "p", text: "🔴 4. Slow Development Velocity" },
    { kind: "p", text: "Large teams working on the same codebase cause merge conflicts and delays." },
    { kind: "p", text: "🔴 5. Technology Lock-in" },
    { kind: "p", text: "Difficult to introduce new technologies without rewriting major parts." },
    { kind: "h2", text: "Introduction to Microservices" },
    { kind: "p", text: "Microservices architecture breaks the application into small, independent services, each responsible for a specific business capability." },
    { kind: "p", text: "Each service:" },
    { kind: "list", items: ["Has its own codebase", "Can be deployed independently", "Communicates via APIs (REST / gRPC)"] },
    { kind: "h2", text: "Key Benefits of Microservices" },
    { kind: "p", text: "✅ Independent Scalability" },
    { kind: "p", text: "Scale only what is needed (e.g., payment service during peak sales)" },
    { kind: "p", text: "✅ Faster Deployment Cycles" },
    { kind: "p", text: "Deploy services independently without affecting others" },
    { kind: "p", text: "✅ Fault Isolation" },
    { kind: "p", text: "Failure in one service does not crash the entire system" },
    { kind: "p", text: "✅ Technology Flexibility" },
    { kind: "p", text: "Use different tech stacks for different services" },
    { kind: "p", text: "✅ Team Autonomy" },
    { kind: "p", text: "Small teams own services end-to-end" },
    { kind: "h2", text: "When Should You Move to Microservices?" },
    { kind: "p", text: "Microservices are not always the right choice." },
    { kind: "p", text: "👉 Consider migration when:" },
    { kind: "list", items: ["Your application has grown significantly", "Deployment cycles are slow", "Teams are large and blocked", "You need high scalability and availability"] },
    { kind: "p", text: "👉 Avoid if:" },
    { kind: "list", items: ["Your product is still in early stage", "Team size is small", "System complexity is manageable"] },
    { kind: "h2", text: "Migration Strategy (Step-by-Step)" },
    { kind: "p", text: "A successful transition requires a gradual and controlled approach:" },
    { kind: "list", items: ["Identify Service Boundaries\n                Break the application based on business domains (e.g., auth, payments)", "Apply the Strangler Pattern\n                Replace parts of the monolith gradually instead of rewriting everything", "Build APIs\n                Introduce API layers to enable communication", "Extract Services Incrementally\n                Move one service at a time", "Introduce DevOps Practices\n                Implement CI/CD pipelines for independent deployments", "Monitor & Optimize\n                Use observability tools to track performance"] },
    { kind: "h2", text: "Tools & Technologies" },
    { kind: "p", text: "Modern microservices ecosystems rely on:" },
    { kind: "list", items: ["Containerization: Docker", "Orchestration: Kubernetes", "CI/CD: Jenkins, GitHub Actions", "API Gateway: Kong, NGINX", "Service Mesh: Istio, Linkerd", "Monitoring: Prometheus, Grafana"] },
    { kind: "h2", text: "Challenges & Trade-offs" },
    { kind: "p", text: "Microservices bring power — but also complexity:" },
    { kind: "p", text: "⚠️ Distributed System Complexity\n            More services = harder to manage" },
    { kind: "p", text: "⚠️ Network Latency\n            Service-to-service communication adds delays" },
    { kind: "p", text: "⚠️ Data Consistency\n            Managing transactions across services is complex" },
    { kind: "p", text: "⚠️ DevOps Overhead\n            Requires strong infrastructure and automation" },
    { kind: "p", text: "⚠️ Debugging Difficulty\n            Tracing issues across services is harder" },
    { kind: "h2", text: "Conclusion" },
    { kind: "p", text: "Transitioning from monolith to microservices is a strategic decision, not just a technical upgrade." },
    { kind: "p", text: "Organizations that succeed:" },
    { kind: "list", items: ["Start small", "Invest in DevOps and observability", "Build strong engineering culture"] },
    { kind: "p", text: "Microservices enable businesses to achieve:" },
    { kind: "p", text: "👉 Scalability" },
    { kind: "p", text: "👉 Resilience" },
    { kind: "p", text: "👉 Faster innovation" },
    { kind: "p", text: "But the journey must be planned, phased, and aligned with business goals." },
  ],
};

const articlesite_reliability_engineering_in_practice: BlogArticle = {
  slug: "site-reliability-engineering-in-practice",
  title: "Site Reliability Engineering in Practice",
  excerpt: "Ensuring reliability, scalability, and performance at scale with proven SRE principles.",
  category: "SRE",
  date: "2026-02-19",
  readTime: 7,
  author: { name: "SRE Team", role: "Reliability Engineers", avatar: "/media/people/sofia-ramirez.svg" },
  blocks: [
    { kind: "h2", text: "What is Site Reliability Engineering?" },
    { kind: "p", text: "Site Reliability Engineering (SRE) is a discipline that incorporates aspects of software engineering and applies them to infrastructure and operations problems. The goal is to create ultra-reliable and scalable software systems." },
    { kind: "h2", text: "Core SRE Principles" },
    { kind: "p", text: "SRE is built on several fundamental principles that guide how we approach reliability:" },
    { kind: "list", items: ["Service Level Objectives (SLOs): Define measurable reliability targets", "Error Budgets: Allow for acceptable downtime within SLOs", "Automation: Automate repetitive tasks and operations", "Monitoring: Comprehensive observability of system health", "Incident Response: Structured approach to handling failures"] },
    { kind: "h2", text: "Service Level Objectives (SLOs)" },
    { kind: "p", text: "SLOs are specific, measurable targets for system reliability. They help teams understand what \"good enough\" looks like and prevent endless optimization. Common SLOs include:" },
    { kind: "list", items: ["99.9% uptime (8.76 hours downtime per month)", "99.95% uptime (21.9 minutes downtime per month)", "99.99% uptime (4.38 minutes downtime per month)"] },
    { kind: "h2", text: "Error Budgets" },
    { kind: "p", text: "Error budgets represent the amount of acceptable downtime within your SLO. They balance reliability with innovation. When you're within your error budget, you can take risks and innovate. When you exceed it, focus on stability." },
    { kind: "h2", text: "Automation in SRE" },
    { kind: "p", text: "Automation is crucial for SRE success. Key areas to automate include:" },
    { kind: "list", items: ["Deployment automation: CI/CD pipelines for reliable releases", "Monitoring automation: Automated alerting and remediation", "Infrastructure as code: Automated provisioning and configuration", "Incident response: Automated escalation and communication"] },
    { kind: "h2", text: "Monitoring and Observability" },
    { kind: "p", text: "Effective monitoring is the foundation of SRE. Implement the three pillars of observability:" },
    { kind: "list", items: ["Metrics: Quantitative data about system behavior", "Logs: Detailed event information for debugging", "Traces: Request flow across distributed systems"] },
    { kind: "h2", text: "Incident Management" },
    { kind: "p", text: "When incidents occur, follow a structured approach:" },
    { kind: "list", items: ["Detection: Automated monitoring identifies issues", "Response: On-call engineers address the incident", "Resolution: Fix the immediate issue", "Post-mortem: Learn and prevent future incidents"] },
    { kind: "h2", text: "Key SRE Practices" },
    { kind: "p", text: "Implement these practices to improve reliability:" },
    { kind: "list", items: ["Chaos Engineering: Proactively test system resilience", "Capacity Planning: Plan for future growth and demand", "Disaster Recovery: Prepare for major outages", "Performance Testing: Regularly test system limits"] },
    { kind: "h2", text: "Conclusion" },
    { kind: "p", text: "Site Reliability Engineering transforms how we approach system reliability. By combining engineering practices with operations, SRE enables organizations to build and maintain highly reliable, scalable systems that meet modern business demands." },
  ],
};

const articledevsecops_security_first_approach: BlogArticle = {
  slug: "devsecops-security-first-approach",
  title: "DevSecOps: Security First Approach",
  excerpt: "Integrating security into CI/CD pipelines effectively for robust application security.",
  category: "DevSecOps",
  date: "2026-02-26",
  readTime: 5,
  author: { name: "Security Team", role: "Security Engineers", avatar: "/media/people/daniel-kim.svg" },
  blocks: [
    { kind: "h2", text: "The Evolution of DevSecOps" },
    { kind: "p", text: "DevSecOps represents the evolution of DevOps, integrating security into every phase of the software development lifecycle. This approach ensures that security is not an afterthought but a fundamental component of the development process." },
    { kind: "h2", text: "Why DevSecOps Matters" },
    { kind: "p", text: "Traditional security approaches often create friction between development and security teams. DevSecOps addresses this by:" },
    { kind: "list", items: ["Making security everyone's responsibility", "Automating security checks in CI/CD pipelines", "Enabling faster, more secure deployments", "Reducing security debt over time", "Improving compliance and audit readiness"] },
    { kind: "h2", text: "Core DevSecOps Principles" },
    { kind: "p", text: "Successful DevSecOps implementation relies on these key principles:" },
    { kind: "list", items: ["Security as Code: Treat security policies and configurations as code", "Automation First: Automate security testing and enforcement", "Continuous Monitoring: Monitor security posture in real-time", "Shift Left: Address security early in development", "Culture of Shared Responsibility: Everyone owns security"] },
    { kind: "h2", text: "Implementing Security in CI/CD" },
    { kind: "p", text: "Integrate security checks at each stage of your pipeline:" },
    { kind: "list", items: ["Pre-commit: Code quality and basic security scans", "Build: Dependency scanning and vulnerability assessment", "Test: Dynamic application security testing (DAST)", "Deploy: Infrastructure security validation", "Runtime: Continuous monitoring and threat detection"] },
    { kind: "h2", text: "Key Security Tools" },
    { kind: "p", text: "Modern DevSecOps relies on various tools and technologies:" },
    { kind: "list", items: ["Static Analysis: SAST tools like SonarQube, Checkmarx", "Dependency Scanning: Snyk, OWASP Dependency-Check", "Container Security: Clair, Trivy, Aqua Security", "Infrastructure Security: Terraform security modules, CloudGuard", "Runtime Protection: Falco, Aqua CSP, Sysdig Secure"] },
    { kind: "h2", text: "Security Best Practices" },
    { kind: "p", text: "Follow these practices to enhance your security posture:" },
    { kind: "list", items: ["Least Privilege: Grant minimum necessary permissions", "Defense in Depth: Multiple layers of security controls", "Regular Updates: Keep dependencies and systems patched", "Secrets Management: Proper handling of sensitive data", "Network Segmentation: Isolate critical systems"] },
    { kind: "h2", text: "Measuring Security Success" },
    { kind: "p", text: "Track key metrics to evaluate your DevSecOps effectiveness:" },
    { kind: "list", items: ["Mean Time to Detect (MTTD): How quickly you find vulnerabilities", "Mean Time to Remediate (MTTR): How quickly you fix issues", "Vulnerability Density: Number of vulnerabilities per code unit", "Security Test Coverage: Percentage of code tested for security"] },
    { kind: "h2", text: "Common Challenges" },
    { kind: "p", text: "Be prepared to face these DevSecOps challenges:" },
    { kind: "list", items: ["Cultural resistance to change", "Tool integration complexity", "False positives in security scans", "Balancing security with development speed", "Skill gaps in security knowledge"] },
    { kind: "h2", text: "Conclusion" },
    { kind: "p", text: "DevSecOps is not just about tools and processes—it's about culture. By embedding security into every aspect of development, organizations can build more secure, resilient systems while maintaining the agility needed to compete in today's fast-paced digital landscape." },
  ],
};

const articleobservability_with_prometheus_and_grafana: BlogArticle = {
  slug: "observability-with-prometheus-and-grafana",
  title: "Observability with Prometheus & Grafana",
  excerpt: "Gain full visibility into your systems with modern monitoring and observability tools.",
  category: "Observability",
  date: "2026-03-05",
  readTime: 6,
  author: { name: "Observability Team", role: "Monitoring Engineers", avatar: "/media/people/emma-collins.svg" },
  blocks: [
    { kind: "h2", text: "Understanding Observability" },
    { kind: "p", text: "Observability goes beyond traditional monitoring by providing deep insights into system behavior. It's the ability to understand a system's internal state from its external outputs, enabling you to ask questions about your system that you haven't anticipated." },
    { kind: "h2", text: "The Three Pillars of Observability" },
    { kind: "p", text: "Modern observability is built on three fundamental pillars:" },
    { kind: "list", items: ["Metrics: Numerical data points collected over time", "Logs: Timestamped records of discrete events", "Traces: Records of requests as they move through distributed systems"] },
    { kind: "h2", text: "Introduction to Prometheus" },
    { kind: "p", text: "Prometheus is an open-source monitoring and alerting toolkit designed for reliability and scalability. It has become the de facto standard for metrics collection in cloud-native environments." },
    { kind: "h2", text: "Key Prometheus Features" },
    { kind: "list", items: ["Multi-dimensional data model: Time series data identified by metric name and key-value pairs", "PromQL: Powerful query language for data aggregation and analysis", "Pull-based collection: Efficient HTTP-based metric collection", "Service discovery: Automatic detection of monitoring targets", "Alerting: Built-in alerting with flexible rule definitions"] },
    { kind: "h2", text: "Introduction to Grafana" },
    { kind: "p", text: "Grafana is an open-source visualization platform that works seamlessly with Prometheus. It provides beautiful dashboards and analytics capabilities that make observability data actionable." },
    { kind: "h2", text: "Grafana Key Features" },
    { kind: "list", items: ["Flexible dashboards: Create custom visualizations with drag-and-drop interface", "Multiple data sources: Connect to Prometheus, InfluxDB, Elasticsearch, and more", "Alerting: Advanced alerting with multiple notification channels", "Templating: Dynamic dashboards with variable substitution", "Annotations: Mark important events on graphs"] },
    { kind: "h2", text: "Setting Up Prometheus" },
    { kind: "p", text: "Getting started with Prometheus is straightforward:" },
    { kind: "list", items: ["Download and install Prometheus", "Configure prometheus.yml with your targets", "Set up service discovery for automatic target detection", "Configure alerting rules", "Start collecting metrics from your applications"] },
    { kind: "h2", text: "Instrumenting Applications" },
    { kind: "p", text: "To monitor your applications effectively, you need to instrument them with Prometheus client libraries:" },
    { kind: "list", items: ["Counter: Monotonically increasing values (requests, errors)", "Gauge: Values that can go up or down (memory usage, connections)", "Histogram: Distribution of values (request durations)", "Summary: Similar to histogram with client-side aggregation"] },
    { kind: "h2", text: "Creating Effective Dashboards" },
    { kind: "p", text: "Design dashboards that provide actionable insights:" },
    { kind: "list", items: ["Start with high-level system health metrics", "Include business metrics alongside technical metrics", "Use appropriate visualization types for different data", "Set up clear thresholds and alerting", "Regularly review and refine dashboards"] },
    { kind: "h2", text: "Best Practices" },
    { kind: "p", text: "Follow these practices for effective observability:" },
    { kind: "list", items: ["Define meaningful metrics: Focus on business-relevant data", "Use consistent naming conventions: Follow Prometheus naming guidelines", "Implement proper labeling: Use labels for effective filtering and aggregation", "Set up alerting: Proactively notify about issues", "Monitor your monitoring: Ensure observability systems are reliable"] },
    { kind: "h2", text: "Advanced Topics" },
    { kind: "p", text: "As your observability needs grow, consider these advanced topics:" },
    { kind: "list", items: ["Distributed tracing: Add Jaeger or Zipkin for request tracing", "Log aggregation: Use Loki or ELK stack for centralized logging", "Service meshes: Istio or Linkerd for automatic observability", "Chaos engineering: Test system resilience with controlled failures"] },
    { kind: "h2", text: "Conclusion" },
    { kind: "p", text: "Observability with Prometheus and Grafana provides the foundation for understanding and improving your systems. By implementing comprehensive monitoring, alerting, and visualization, you can build more reliable, performant applications that meet the demands of modern users." },
  ],
};

export const blogArticles: BlogArticle[] = [
  articlecloud_native_product_development,
  articlefrom_monolith_to_microservices,
  articlesite_reliability_engineering_in_practice,
  articledevsecops_security_first_approach,
  articleobservability_with_prometheus_and_grafana,
];

/** The index reads the same article list. */
export const blogIndexPosts: BlogPost[] = blogArticles.map((article) => ({
  id: article.slug,
  title: article.title,
  excerpt: article.excerpt,
  category: article.category,
  date: article.date,
  readTime: article.readTime,
  author: {
    name: article.author.name,
    role: article.author.role,
    avatar: article.author.avatar,
  },
}));

export const blogCategories = ["Product Engineering", "Architecture", "SRE", "DevSecOps", "Observability"];

/** The index and the articles share one footer. */
export const blogFooterColumns: SiteFooterColumn[] = [
  {
    title: "Resources",
    links: [
      { label: "Blogs", href: "/blogs" },
      { label: "Events", href: "/events" },
      { label: "Skill Rubrics", href: "/skill-rubrics" },
    ],
  },
  {
    title: "Marketplace",
    links: [
      { label: "Botkube Enterprise", href: "/botkube" },
      { label: "Managed Services for Kubernetes", href: "/kubernetes-services" },
      { label: "Fission", href: "/fission" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export const blogFooterLegal: SiteFooterLink[] = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
];
