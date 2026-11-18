export type ServiceDetailData = {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  capabilitiesTitle: string;
  capabilitiesIntro: string;
  capabilities: { title: string; description: string }[];
  approachTitle: string;
  approachIntro: string;
  approach: { title: string; description: string }[];
  closingTitle: string;
  closingText: string;
};

export const serviceDetails: Record<string, ServiceDetailData> = {
  "cutting-edge": {
    slug: "cutting-edge",
    title: "Products built for work",
    description:
      "From enterprise platforms to new digital products, Shuroq helps teams modernize essential systems and turn complex needs into dependable technology.",
    image: "/images/services/generated/product-engineering.svg",
    imageAlt: "Layered digital product interface being assembled from modular components",
    capabilitiesTitle: "Build what the work needs",
    capabilitiesIntro:
      "Bring core operations, customer experiences, and modern infrastructure together through engineering that starts with the real problem.",
    capabilities: [
      {
        title: "Enterprise resource planning",
        description:
          "Assess business needs, select and configure systems, migrate data, and prepare teams for a dependable ERP launch.",
      },
      {
        title: "Product engineering",
        description:
          "Move from product discovery and UX through architecture, development, testing, and deployment.",
      },
      {
        title: "Digital modernization",
        description:
          "Modernize legacy systems, connect emerging technologies, and improve the digital journeys people rely on.",
      },
      {
        title: "Cloud services",
        description:
          "Plan cloud migration and build infrastructure that supports secure, scalable day-to-day operations.",
      },
    ],
    approachTitle: "From need to working system",
    approachIntro:
      "A practical delivery path keeps business priorities visible at every stage, from the first assessment to the transition into live use.",
    approach: [
      {
        title: "Understand the operation",
        description:
          "Map the processes, users, systems, and constraints the solution has to serve.",
      },
      {
        title: "Shape the solution",
        description:
          "Choose a fit-for-purpose architecture, scope the work, and align the experience to the people using it.",
      },
      {
        title: "Build and validate",
        description:
          "Develop in clear increments, test against real requirements, and prepare data and integrations.",
      },
      {
        title: "Launch with continuity",
        description:
          "Support rollout, knowledge transfer, and the next improvements after go-live.",
      },
    ],
    closingTitle: "Have a system to modernize?",
    closingText:
      "Tell us where the current tools or workflows are getting in the way.",
  },
  assurance: {
    slug: "assurance",
    title: "Quality for every release",
    description:
      "Quality engineering brings testing, risk reduction, and user needs into the full software lifecycle—not just the final check before launch.",
    image: "/images/services/generated/assurance-quality.svg",
    imageAlt: "Precision inspection instrument testing a circuit board, representing software quality engineering",
    capabilitiesTitle: "Test the things that matter",
    capabilitiesIntro:
      "A balanced assurance practice checks behavior, performance, security, and usability across the systems people depend on.",
    capabilities: [
      {
        title: "Functional and integration testing",
        description:
          "Validate requirements from unit and system checks through end-to-end, regression, and acceptance testing.",
      },
      {
        title: "Performance and scalability",
        description:
          "Assess load, stress, endurance, and capacity to understand how applications behave under real demand.",
      },
      {
        title: "Security testing",
        description:
          "Review code, access controls, and application behavior to identify and address security risks.",
      },
      {
        title: "Automation and API testing",
        description:
          "Build repeatable checks for APIs, services, and release pipelines so teams can validate changes continuously.",
      },
      {
        title: "Mobile and user acceptance testing",
        description:
          "Check device compatibility, accessibility, usability, and readiness with the people who will use the solution.",
      },
    ],
    approachTitle: "Make quality part of delivery",
    approachIntro:
      "Assurance is most useful when teams can see risks early and act on clear evidence throughout delivery.",
    approach: [
      {
        title: "Set a risk-based strategy",
        description:
          "Connect test coverage and acceptance criteria to business goals and technical risk.",
      },
      {
        title: "Design useful coverage",
        description:
          "Create traceable test cases, representative data, and reliable environments.",
      },
      {
        title: "Run and report checks",
        description:
          "Combine exploratory and automated testing with clear reporting for delivery teams.",
      },
      {
        title: "Learn from defects",
        description:
          "Prioritize issues, understand root causes, and feed improvements back into the pipeline.",
      },
    ],
    closingTitle: "Make your next release more predictable.",
    closingText:
      "We can help you focus testing where it protects your users and your operation.",
  },
  automate: {
    slug: "automate",
    title: "Make complex work flow",
    description:
      "Connect teams, tools, and workflows with practical automation—from software delivery pipelines and infrastructure to repeatable business processes.",
    image: "/images/services/generated/automation-workflow.webp",
    imageAlt: "A precise robotic arm guiding a component along an automated path",
    capabilitiesTitle: "Automate across the operation",
    capabilitiesIntro:
      "Reduce handoffs and repetitive effort while keeping the process visible, maintainable, and in the control of your teams.",
    capabilities: [
      {
        title: "CI/CD pipelines",
        description:
          "Automate validation, builds, testing, and deployment to make software delivery more repeatable.",
      },
      {
        title: "Infrastructure as code",
        description:
          "Provision and manage environments through versioned code and consistent configuration practices.",
      },
      {
        title: "Process and workflow automation",
        description:
          "Simplify recurring operational work with well-defined workflows and robotic process automation where it fits.",
      },
      {
        title: "Monitoring and response",
        description:
          "Connect logs, performance signals, and alerts to help teams identify and respond to issues.",
      },
      {
        title: "Agile delivery practices",
        description:
          "Help teams plan and deliver in smaller increments, with collaboration and feedback built into the work.",
      },
    ],
    approachTitle: "Start with the friction",
    approachIntro:
      "Good automation removes unnecessary effort without hiding how work gets done or making change harder later.",
    approach: [
      {
        title: "Find repeatable work",
        description:
          "Identify bottlenecks, manual handoffs, and common failure points across the workflow.",
      },
      {
        title: "Design the flow",
        description:
          "Agree on triggers, permissions, exceptions, and the points where people stay in control.",
      },
      {
        title: "Integrate and automate",
        description:
          "Connect the tools and implement maintainable automation with clear ownership.",
      },
      {
        title: "Measure and improve",
        description:
          "Review outcomes with the team and refine the process as the operation changes.",
      },
    ],
    closingTitle: "Which workflow should work better?",
    closingText:
      "Let’s find the repeatable work that is slowing your team down.",
  },
  "data-analytics": {
    slug: "data-analytics",
    title: "Data teams can trust",
    description:
      "Build the pipelines, platforms, and reporting foundations that turn scattered business data into information teams can use with confidence.",
    image: "/images/services/generated/data-analytics-insight.webp",
    imageAlt: "Connected data points and flowing paths representing a unified data ecosystem",
    capabilitiesTitle: "A trusted data foundation",
    capabilitiesIntro:
      "Reliable analytics starts with data that is connected, well-governed, and shaped around the questions the business needs to answer.",
    capabilities: [
      {
        title: "Data pipeline engineering",
        description:
          "Design ETL and ELT pipelines to collect, process, and transform data from business systems.",
      },
      {
        title: "Warehousing and integration",
        description:
          "Bring platforms, applications, and databases together in a scalable, organized data ecosystem.",
      },
      {
        title: "Business intelligence",
        description:
          "Create reporting and dashboards that make operational information easier to understand.",
      },
      {
        title: "Analytics and forecasting",
        description:
          "Explore trends, customer behavior, and operational patterns to support planning and decisions.",
      },
      {
        title: "Governance and data quality",
        description:
          "Improve accuracy, consistency, access, and confidence across the data lifecycle.",
      },
    ],
    approachTitle: "From source data to shared insight",
    approachIntro:
      "The work connects technical foundations to practical use, so reporting is not only available but trusted and relevant.",
    approach: [
      {
        title: "Connect the sources",
        description:
          "Understand where important data lives and how it can be accessed responsibly.",
      },
      {
        title: "Prepare and organize",
        description:
          "Build reliable pipelines and models with quality checks and clear definitions.",
      },
      {
        title: "Make it usable",
        description:
          "Shape analytics and reporting around the decisions different teams need to make.",
      },
      {
        title: "Maintain trust",
        description:
          "Keep governance, documentation, and data quality practices part of ongoing operations.",
      },
    ],
    closingTitle: "Turn data into decisions",
    closingText:
      "Share the reporting or data challenge your teams are working through.",
  },
};
