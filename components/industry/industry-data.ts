/**
 * Content for the industries section. Ported from the legacy static page and
 * shaped for the design-system routes. Nothing here renders library names.
 */

export interface IndustrySolution {
  title: string;
  desc: string;
}

export interface IndustryStat {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  compact?: boolean;
  label: string;
  detail?: string;
  context?: string;
}

export interface Industry {
  slug: string;
  index: string;
  name: string;
  heroHeadline: string;
  heroLead: string;
  introTitle: string;
  intro: string;
  image: string;
  imageAlt: string;
  solutions: IndustrySolution[];
  stats: IndustryStat[];
  ctaTitle: string;
  ctaLead: string;
}

export const industries: Industry[] = [
  {
    slug: "telecom",
    index: "01",
    name: "Telecom",
    heroHeadline: "Networks that carry what comes next",
    heroLead:
      "Scalable digital solutions for telecom providers — from 5G rollout to network optimisation and data-led decisions.",
    introTitle: "Built for the connected era",
    intro:
      "We support telecom providers with scalable digital solutions that enhance network operations, optimise customer experiences, and enable data-driven decision-making. Our comprehensive telecom expertise covers 5G implementation, network optimisation, and digital transformation strategies.",
    image: "/images/telecom.png",
    imageAlt: "Telecommunications network infrastructure",
    solutions: [
      {
        title: "5G Network Implementation",
        desc: "End-to-end deployment and optimisation of 5G infrastructure with a 99.9% uptime guarantee.",
      },
      {
        title: "Network Virtualisation",
        desc: "SD-WAN and NFV solutions reducing operational costs by up to 40%.",
      },
      {
        title: "Customer Experience Platforms",
        desc: "AI-powered analytics improving customer satisfaction by 35%.",
      },
      {
        title: "IoT Integration",
        desc: "Connected device management supporting 10M+ concurrent connections.",
      },
    ],
    stats: [
      {
        value: 50,
        suffix: "+",
        label: "Telecom operators supported",
        detail: "Across 15 countries",
        context: "From regional carriers to national networks",
      },
      {
        value: 60,
        suffix: "%",
        label: "Less network downtime",
        detail: "Through predictive maintenance",
        context: "Fewer interruptions, better service",
      },
      {
        value: 300,
        suffix: "%",
        label: "Faster data processing",
        detail: "With edge computing",
        context: "Decisions made closer to the network edge",
      },
      {
        value: 2,
        prefix: "$",
        suffix: "B+",
        label: "New revenue enabled",
        detail: "Through digital services",
        context: "New products on modern platforms",
      },
    ],
    ctaTitle: "Modernise your network",
    ctaLead:
      "Let's talk about the infrastructure, platforms and data systems your network needs next.",
  },
  {
    slug: "automotive",
    index: "02",
    name: "Automotive",
    heroHeadline: "Engineering the automotive value chain",
    heroLead:
      "From connected vehicles to smart manufacturing, we bring efficiency, visibility and agility to every link of the chain.",
    introTitle: "Innovation at every link",
    intro:
      "We enable greater efficiency, visibility, and agility throughout the automotive value chain. From connected vehicles to manufacturing automation, we deliver solutions that drive innovation and operational excellence in the automotive sector.",
    image: "/images/automotive.png",
    imageAlt: "Automotive manufacturing and connected vehicles",
    solutions: [
      {
        title: "Connected Vehicle Platforms",
        desc: "IoT-enabled telematics processing 1B+ data points every day.",
      },
      {
        title: "Manufacturing Automation",
        desc: "Smart factory solutions increasing production efficiency by 45%.",
      },
      {
        title: "Supply Chain Optimisation",
        desc: "Real-time tracking reducing inventory costs by 30%.",
      },
      {
        title: "Autonomous Driving Systems",
        desc: "AI-powered computer vision with 99.7% accuracy.",
      },
    ],
    stats: [
      {
        value: 25,
        suffix: "+",
        label: "Manufacturers partnered",
        detail: "Across global markets",
        context: "Long-term engineering partnerships",
      },
      {
        value: 40,
        suffix: "%",
        label: "Shorter development cycles",
        detail: "Through digital twins",
        context: "Fewer physical prototypes, faster iteration",
      },
      {
        value: 85,
        suffix: "%",
        label: "Better quality control",
        detail: "With AI inspection",
        context: "Defects caught earlier on the line",
      },
      {
        value: 500000,
        compact: true,
        suffix: "+",
        label: "Connected vehicles enabled",
        detail: "With advanced telematics",
        context: "Fleet data turned into usable signals",
      },
    ],
    ctaTitle: "Build what drives you forward",
    ctaLead:
      "Let's discuss the platforms and automation that will move your automotive operation forward.",
  },
  {
    slug: "bfsi",
    index: "03",
    name: "BFSI",
    heroHeadline: "Trust, built into every transaction",
    heroLead:
      "Digital banking, risk, analytics and automation — engineered for regulatory rigour and customer trust.",
    introTitle: "Modern finance, without compromise",
    intro:
      "Our expertise supports digital banking, risk management, data analytics, and operational automation while ensuring regulatory adherence and customer trust. We help financial institutions modernise their infrastructure and enhance customer experiences.",
    image: "/images/bfsi.png",
    imageAlt: "Banking and financial services infrastructure",
    solutions: [
      {
        title: "Digital Banking Platforms",
        desc: "Mobile-first solutions serving 10M+ customers with 99.95% uptime.",
      },
      {
        title: "Risk Management Systems",
        desc: "AI-powered fraud detection reducing false positives by 70%.",
      },
      {
        title: "Regulatory Compliance",
        desc: "Automated compliance reporting saving 200+ hours every month.",
      },
      {
        title: "Blockchain Integration",
        desc: "Secure transaction processing with three-second settlement times.",
      },
    ],
    stats: [
      {
        value: 40,
        suffix: "+",
        label: "Institutions transformed",
        detail: "Banks and financial bodies",
        context: "Core systems made ready for digital",
      },
      {
        value: 35,
        suffix: "%",
        label: "Lower operating costs",
        detail: "Through automation",
        context: "Manual work removed from critical flows",
      },
      {
        value: 80,
        suffix: "%",
        label: "Faster loan processing",
        detail: "With AI underwriting",
        context: "Quicker decisions for customers",
      },
      {
        value: 500,
        prefix: "$",
        suffix: "M+",
        label: "Potential fraud prevented",
        detail: "Stronger security posture",
        context: "Risk caught before it lands",
      },
    ],
    ctaTitle: "Modernise with confidence",
    ctaLead:
      "Let's talk about secure, compliant systems that make your institution faster without loosening control.",
  },
  {
    slug: "healthcare",
    index: "04",
    name: "Healthcare",
    heroHeadline: "AI solutions for healthcare operations",
    heroLead:
      "Secure, data-driven systems that improve patient outcomes and the way care organisations actually run.",
    introTitle: "Care, supported by better systems",
    intro:
      "We enable healthcare organisations to improve patient outcomes and operational efficiency through secure, data-driven solutions. Our approach supports interoperability, digital workflows, analytics, and compliance with healthcare standards.",
    image: "/images/healthcare.png",
    imageAlt: "Healthcare operations and digital patient care",
    solutions: [
      {
        title: "Electronic Health Records",
        desc: "Integrated systems managing 50M+ patient records with HIPAA compliance.",
      },
      {
        title: "Telemedicine Platforms",
        desc: "Virtual care solutions facilitating 100K+ daily consultations.",
      },
      {
        title: "AI Diagnostics",
        desc: "Machine-learning models reaching 94% accuracy in medical imaging analysis.",
      },
      {
        title: "Hospital Management Systems",
        desc: "End-to-end workflow automation reducing administrative time by 60%.",
      },
    ],
    stats: [
      {
        value: 200,
        suffix: "+",
        label: "Providers supported",
        detail: "Hospitals and care organisations",
        context: "Systems that fit real clinical workflows",
      },
      {
        value: 45,
        suffix: "%",
        label: "Shorter patient wait times",
        detail: "Through optimised scheduling",
        context: "Better flow through every department",
      },
      {
        value: 30,
        suffix: "%",
        label: "Better diagnostic accuracy",
        detail: "With AI assistance",
        context: "Clinicians supported, not replaced",
      },
      {
        value: 1,
        prefix: "$",
        suffix: "B+",
        label: "In operational savings",
        detail: "Through efficiency gains",
        context: "More capacity for patient care",
      },
    ],
    ctaTitle: "Improve care with better systems",
    ctaLead:
      "Let's discuss the workflows, data and platforms that support your clinical and operational teams.",
  },
  {
    slug: "finance",
    index: "05",
    name: "Finance",
    heroHeadline: "Real-time insight for modern finance",
    heroLead:
      "Modernise systems, streamline operations and see the whole picture — with scalable, secure technology.",
    introTitle: "Clarity at financial speed",
    intro:
      "We help financial enterprises modernise systems, streamline operations, and gain real-time insights through scalable and secure technology solutions. Our services include fintech development, blockchain integration, and financial analytics.",
    image: "/images/finance.png",
    imageAlt: "Financial analytics and trading systems",
    solutions: [
      {
        title: "Trading Platforms",
        desc: "High-frequency systems processing 1M+ transactions per second.",
      },
      {
        title: "Risk Analytics",
        desc: "Real-time portfolio analysis with 99.8% accuracy in risk prediction.",
      },
      {
        title: "Wealth Management",
        desc: "Robo-advisory platforms managing $10B+ in assets.",
      },
      {
        title: "RegTech Solutions",
        desc: "Automated compliance monitoring reducing violations by 90%.",
      },
    ],
    stats: [
      {
        value: 30,
        suffix: "+",
        label: "Institutions partnered",
        detail: "Financial firms and investment groups",
        context: "Systems built for regulated environments",
      },
      {
        value: 70,
        suffix: "%",
        label: "More trading efficiency",
        detail: "Through algorithmic optimisation",
        context: "Faster execution, tighter control",
      },
      {
        value: 50,
        suffix: "%",
        label: "Lower compliance costs",
        detail: "With automated monitoring",
        context: "Less manual oversight, more coverage",
      },
      {
        value: 25,
        suffix: "%",
        label: "Better portfolio returns",
        detail: "Through AI-driven insight",
        context: "Decisions backed by live data",
      },
    ],
    ctaTitle: "Move at financial speed",
    ctaLead:
      "Let's talk about the platforms that give your teams faster, safer, clearer decisions.",
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((industry) => industry.slug === slug);
}
