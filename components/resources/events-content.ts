export type ShuroqEvent = {
  id: string;
  tag: string;
  title: string;
  description: string;
  /** ISO date of the session, in the event's own zone. */
  date: string;
  /** Human date, already in the event's zone. */
  day: string;
  time: string;
  zone: string;
  format: string;
  /** The countdown target: a wall-clock time in the event's zone. */
  target: string;
  timeZone: string;
};

export const shuroqEvents: ShuroqEvent[] = [
  {
    id: "reliability-playbook",
    tag: "Featured webinar",
    title: "Kubernetes Reliability Playbook 2027",
    description:
      "Deep-dive session on production readiness, observability baselines, and SRE runbooks for modern teams.",
    date: "2027-02-18",
    day: "Feb 18, 2027",
    time: "5:00 PM",
    zone: "IST",
    format: "Online",
    target: "2027-02-18T17:00",
    timeZone: "Asia/Kolkata",
  },
  {
    id: "build-sprint",
    tag: "Hackathon",
    title: "Shuroq Build Sprint 2027",
    description:
      "Our company hackathon. Teams build practical cloud, AI and automation solutions and present them to engineering mentors.",
    date: "2027-03-20",
    day: "Mar 20, 2027",
    time: "Full day",
    zone: "IST",
    format: "Hybrid",
    target: "2027-03-20T09:30",
    timeZone: "Asia/Kolkata",
  },
  {
    id: "platform-engineering",
    tag: "Workshop",
    title: "Platform Engineering in Practice",
    description:
      "Hands-on workshop to build internal developer platforms and improve developer experience at scale.",
    date: "2027-03-12",
    day: "Mar 12, 2027",
    time: "3:00 PM",
    zone: "IST",
    format: "Live session",
    target: "2027-03-12T15:00",
    timeZone: "Asia/Kolkata",
  },
  {
    id: "ai-devops",
    tag: "Community talk",
    title: "AI + DevOps: Smarter Delivery Pipelines",
    description:
      "How AI-assisted workflows can improve CI/CD efficiency, testing velocity, and release confidence.",
    date: "2027-03-26",
    day: "Mar 26, 2027",
    time: "6:30 PM",
    zone: "IST",
    format: "Community talk",
    target: "2027-03-26T18:30",
    timeZone: "Asia/Kolkata",
  },
];

export const eventBenefits = [
  {
    title: "Practical sessions",
    text: "Actionable insights you can apply immediately to engineering systems and team workflows.",
  },
  {
    title: "Expert speakers",
    text: "Learn from practitioners who run real cloud-native platforms and production-grade systems.",
  },
  {
    title: "Peer networking",
    text: "Connect with engineers, leaders, and teams solving similar technical and operational challenges.",
  },
];
