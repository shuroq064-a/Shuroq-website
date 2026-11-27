export type Competency = {
  id: string;
  name: string;
  /** The level a strong hire is expected to operate at. */
  level: string;
  /** Indicative share of the role's effort. */
  weight: number;
  /** What a hiring manager should look for. */
  signal: string;
};

export type RubricRole = {
  id: string;
  title: string;
  summary: string;
  competencies: Competency[];
};

export const rubricRoles: RubricRole[] = [
  {
    id: "sre",
    title: "Site Reliability Engineer",
    summary: "Keeps a running service running, and makes the next failure cheaper.",
    competencies: [
      {
        id: "slo",
        name: "Service level objectives and error budgets",
        level: "Advanced",
        weight: 25,
        signal: "Defines SLIs his own team is accountable for",
      },
      {
        id: "oncall",
        name: "Incident response and on-call operations",
        level: "Advanced",
        weight: 25,
        signal: "Runs the incident, not just the tooling around it",
      },
      {
        id: "observability",
        name: "Observability: metrics, logs, tracing",
        level: "Working to advanced",
        weight: 20,
        signal: "Traces a request end to end before changing anything",
      },
      {
        id: "toil",
        name: "Reliability automation and toil reduction",
        level: "Working",
        weight: 15,
        signal: "Has taken one repeated manual job off the rota",
      },
      {
        id: "review",
        name: "Post-incident reviews and corrective actions",
        level: "Working",
        weight: 15,
        signal: "Writes reviews that change the system, not just the notes",
      },
    ],
  },
  {
    id: "platform",
    title: "Platform Engineer",
    summary: "Builds the paved roads that other teams choose to travel.",
    competencies: [
      {
        id: "idp",
        name: "Internal developer platform foundations",
        level: "Advanced",
        weight: 25,
        signal: "Has stood up a portal other teams actually use",
      },
      {
        id: "golden",
        name: "Golden paths and reusable templates",
        level: "Advanced",
        weight: 20,
        signal: "Templates that are copied rather than rewritten",
      },
      {
        id: "devex",
        name: "Developer experience and self-service workflows",
        level: "Working to advanced",
        weight: 20,
        signal: "Measures time-to-first-deployment, not ticket volume",
      },
      {
        id: "policy",
        name: "Policy, governance, and platform security",
        level: "Working",
        weight: 20,
        signal: "Makes the safe path the easy path",
      },
      {
        id: "adoption",
        name: "Platform adoption and success metrics",
        level: "Working",
        weight: 15,
        signal: "Can prove the platform moved a number",
      },
    ],
  },
  {
    id: "kubernetes",
    title: "Kubernetes Engineer",
    summary: "Runs the substrate everything else is built on.",
    competencies: [
      {
        id: "architecture",
        name: "Cluster architecture and lifecycle operations",
        level: "Advanced",
        weight: 20,
        signal: "Has planned an upgrade with a rollback",
      },
      {
        id: "orchestration",
        name: "Workload orchestration and scaling strategies",
        level: "Advanced",
        weight: 25,
        signal: "Explains HPA behaviour without a diagram",
      },
      {
        id: "networking",
        name: "Networking, ingress, and service discovery",
        level: "Working to advanced",
        weight: 20,
        signal: "Debugs a service that resolves but never connects",
      },
      {
        id: "hardening",
        name: "Security hardening and runtime policies",
        level: "Working",
        weight: 20,
        signal: "Runs admission control as part of delivery",
      },
      {
        id: "troubleshooting",
        name: "Troubleshooting and performance optimization",
        level: "Working",
        weight: 15,
        signal: "Finds the node, not just the pod",
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps Engineer",
    summary: "Makes the path from commit to production boring.",
    competencies: [
      {
        id: "cicd",
        name: "CI/CD pipeline design and automation",
        level: "Advanced",
        weight: 25,
        signal: "Can explain every stage of the pipeline",
      },
      {
        id: "iac",
        name: "Infrastructure as code and environment management",
        level: "Working to advanced",
        weight: 20,
        signal: "Environments are reproducible from a pull request",
      },
      {
        id: "release",
        name: "Release governance and deployment safety",
        level: "Working",
        weight: 20,
        signal: "Rolls back without a war room",
      },
      {
        id: "feedback",
        name: "Monitoring and feedback loops",
        level: "Working",
        weight: 20,
        signal: "Closes the loop back into the pipeline",
      },
      {
        id: "collaboration",
        name: "Collaboration patterns across dev, ops, and security",
        level: "Working",
        weight: 15,
        signal: "Security is in the pipeline, not after it",
      },
    ],
  },
];

export const rubricAudience = [
  "Engineering leaders building cloud platforms",
  "Hiring teams assessing technical depth",
  "L&D teams planning upskilling paths",
  "Practitioners benchmarking role readiness",
];

export const rubricBenefits = [
  {
    title: "Assess capability",
    text: "Evaluate role readiness across fundamentals, tooling, and production practices using clear proficiency levels.",
  },
  {
    title: "Design learning paths",
    text: "Plan focused upskilling journeys for teams and individuals by mapping current level to target expectations.",
  },
  {
    title: "Scale team standards",
    text: "Bring consistency to hiring, onboarding, and internal growth across all cloud-native engineering functions.",
  },
];

export const rubricFaq = [
  {
    question: "What is a skill rubric?",
    answer:
      "A skill rubric is a structured way to define capabilities and proficiency levels for a specific role.",
  },
  {
    question: "How can engineering teams use these rubrics?",
    answer:
      "Teams can use them for hiring calibration, onboarding plans, promotion readiness, and focused upskilling.",
  },
  {
    question: "Can these rubrics work for both hiring and internal growth?",
    answer:
      "Yes. The same framework helps evaluate incoming candidates and benchmark current team capability over time.",
  },
  {
    question: "Are these rubrics only for Kubernetes teams?",
    answer:
      "No. They cover broader cloud-native roles including SRE, Platform Engineering, and DevOps practices.",
  },
  {
    question: "Do you support custom role definitions?",
    answer:
      "Yes. You can adapt categories and levels to your internal role architecture and technology stack.",
  },
];
