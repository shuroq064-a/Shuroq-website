import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import SiteNav from "@/components/nav/site-nav";
import { FlareWord } from "@/components/hero/flare/flare-word";
import { AnimatedFooter } from "@/components/unlumen-ui/animated-footer";
import {
  SiteFooter,
  type SiteFooterColumn,
  type SiteFooterLink,
} from "@/components/arc/blocks/site-footer/site-footer";
import { CardStampArc, type CardStampArcItem } from "@/components/cards/CardStampArc";
import Stepper, { Step } from "@/components/Stepper";

export const metadata: Metadata = {
  title: "The Shuroq Way — Shuroq",
  description:
    "How Shuroq consults, architects, implements and delivers scalable digital systems: structured engineering, automation-first execution and project-based precision.",
};

const footerColumns: SiteFooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "Automation", href: "/automate" },
      { label: "Data & Analytics", href: "/Data%20Analytics/" },
      { label: "Product Engineering", href: "/product-engineering/" },
      { label: "DevSecOps", href: "/devsec-ops/" },
      { label: "CI/CD & Dev Experience", href: "/ci-cd-dev/" },
      { label: "SRE Consultancy", href: "/sre-consultancy/" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Cloud Native", href: "/cloud-native/" },
      { label: "Platform Engineering", href: "/platformengineering/" },
      { label: "Kubernetes Services", href: "/kubernetes-services/" },
      { label: "Observability", href: "/observability-consult/" },
      { label: "Service Mesh", href: "/service-mesh/" },
      { label: "Progressive Delivery", href: "/progressive-delivery/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about/" },
      { label: "Careers", href: "/careers/" },
      { label: "The Shuroq Way", href: "/shuroq-way/" },
      { label: "Resources", href: "/resources/" },
      { label: "Events", href: "/events/" },
      { label: "Contact Us", href: "/contact/" },
    ],
  },
];

const footerLegal: SiteFooterLink[] = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
];

const footerSocials: SiteFooterLink[] = [
  { label: "Instagram", href: "https://instagram.com/shuroq_tech", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/shuroq/posts/?feedView=all",
    external: true,
  },
];

/** Shuroq company logo beside the footer wordmark. */
const footerBrandMark = (
  <Image
    src="/logo.png"
    alt=""
    aria-hidden="true"
    width={34}
    height={34}
    style={{ display: "block", width: 34, height: 34 }}
  />
);

/**
 * Bump when the card posters are replaced. The file names never change, so
 * without this the browser keeps serving the previously cached copies.
 */
const POSTER_VERSION = "?v=3";

/** The four commitments that separate the Shuroq Way from a task list. */
const differences: CardStampArcItem[] = [
  {
    eyebrow: "01 — Consulting",
    title: "Consulting with Engineering Depth",
    description:
      "We read the goal, find the bottleneck, draw the architecture and plan the automation — before writing a line of code.",
    image: `/images/stamp/consulting.webp${POSTER_VERSION}`,
  },
  {
    eyebrow: "02 — Automation",
    title: "Automation-First Execution",
    description:
      "Infrastructure, pipelines, tests, deployments and monitoring ship with the product — never as a follow-up ticket.",
    image: `/images/stamp/automation.webp${POSTER_VERSION}`,
  },
  {
    eyebrow: "03 — Delivery",
    title: "Agile & Iterative Delivery",
    description:
      "Short sprints, fast feedback, quick turns and milestones you can actually see.",
    image: `/images/stamp/delivery.webp${POSTER_VERSION}`,
  },
  {
    eyebrow: "04 — Precision",
    title: "Project-Based Precision",
    description:
      "Clear scope, honest timelines, no surprise invoices and results we can measure.",
    image: `/images/stamp/next.webp${POSTER_VERSION}`,
  },
  {
    eyebrow: "05 — Next",
    title: "Partner With Shuroq",
    description: "Bring us the messy part — we will bring the plan.",
    image: `/images/stamp/precision.webp${POSTER_VERSION}`,
    href: "/contact/",
  },
];

/** The delivery sequence — the same four phases on every engagement. */
const steps = [
  {
    title: "Discover & Define",
    desc: "We collaborate with stakeholders to understand product goals, analyse current infrastructure, identify scaling challenges and define technical roadmaps.",
  },
  {
    title: "Architect & Automate",
    desc: "We design cloud-native architectures built for scalability, security, observability and performance. Automation pipelines are implemented from day one.",
  },
  {
    title: "Implement & Integrate",
    desc: "We deliver production-ready systems through DevOps enablement, cloud deployment, platform engineering and data & AI integration all implemented with best engineering practices.",
  },
  {
    title: "Optimize & Stabilise",
    desc: "Post-deployment, we ensure performance tuning, cost optimisation, security hardening and reliability engineering.",
  },
];

/** Practice areas — functional marks, never decoration. */
/**
 * Bump when the brand marks are replaced — the file names never change, so
 * without this the browser keeps serving the previously cached copies.
 */
const ICON_VERSION = "?v=4";

/**
 * The practice areas, as brand marks. `light` is the variant for the paper
 * theme, `dark` the one for the ink theme, and `invert` flags the marks that
 * are plain black and simply flip in dark mode.
 */
const expertise: Array<{
  label: string;
  light: string;
  dark?: string;
  invert?: boolean;
}> = [
  // Frontend frameworks and styling
  { label: "React", light: `/icons/react.svg${ICON_VERSION}` },
  { label: "Next.js", light: `/icons/nextjs.svg${ICON_VERSION}`, invert: true },
  { label: "Vue", light: `/icons/vue.svg${ICON_VERSION}` },
  { label: "Angular", light: `/icons/angular.svg${ICON_VERSION}` },
  { label: "Svelte", light: `/icons/svelte.svg${ICON_VERSION}` },
  { label: "Astro", light: `/icons/astro.svg${ICON_VERSION}`, invert: true },
  { label: "Tailwind CSS", light: `/icons/tailwind-css.svg${ICON_VERSION}` },
  { label: "Redux", light: `/icons/redux.svg${ICON_VERSION}` },
  { label: "Vite", light: `/icons/vite.svg${ICON_VERSION}` },
  { label: "TypeScript", light: `/icons/typescript.svg${ICON_VERSION}` },
  { label: "Flutter", light: `/icons/flutter.svg${ICON_VERSION}` },
  // Backend languages and frameworks
  { label: "Node.js", light: `/icons/nodejs.svg${ICON_VERSION}` },
  { label: "Python", light: `/icons/python.svg${ICON_VERSION}` },
  {
    label: "Go",
    light: `/icons/go.svg${ICON_VERSION}`,
    dark: `/icons/go-dark.svg${ICON_VERSION}`,
  },
  {
    label: "Rust",
    light: `/icons/rust.svg${ICON_VERSION}`,
    dark: `/icons/rust-dark.svg${ICON_VERSION}`,
  },
  {
    label: "PHP",
    light: `/icons/php.svg${ICON_VERSION}`,
    dark: `/icons/php-dark.svg${ICON_VERSION}`,
  },
  { label: "Laravel", light: `/icons/laravel.svg${ICON_VERSION}` },
  { label: "Django", light: `/icons/django.svg${ICON_VERSION}` },
  { label: "FastAPI", light: `/icons/fastapi.svg${ICON_VERSION}` },
  { label: "NestJS", light: `/icons/nestjs.svg${ICON_VERSION}` },
  { label: "Spring Boot", light: `/icons/spring-boot.svg${ICON_VERSION}` },
  { label: ".NET", light: `/icons/dotnet.svg${ICON_VERSION}` },
  // Databases and APIs
  { label: "PostgreSQL", light: `/icons/postgresql.svg${ICON_VERSION}` },
  { label: "MongoDB", light: `/icons/mongodb.svg${ICON_VERSION}` },
  { label: "Redis", light: `/icons/redis.svg${ICON_VERSION}` },
  { label: "GraphQL", light: `/icons/graphql.svg${ICON_VERSION}` },
  { label: "Apache Kafka", light: `/icons/apache-kafka.svg${ICON_VERSION}`, invert: true },
  // Cloud
  {
    label: "AWS",
    light: `/icons/amazon-web-services.svg${ICON_VERSION}`,
    dark: `/icons/amazon-web-services-dark.svg${ICON_VERSION}`,
  },
  { label: "Google Cloud", light: `/icons/google-cloud.svg${ICON_VERSION}` },
  { label: "Microsoft Azure", light: `/icons/microsoft-azure.svg${ICON_VERSION}`, invert: true },
  { label: "Cloudflare", light: `/icons/cloudflare.svg${ICON_VERSION}`, invert: true },
  { label: "DigitalOcean", light: `/icons/digitalocean.svg${ICON_VERSION}` },
  { label: "Firebase", light: `/icons/firebase.svg${ICON_VERSION}` },
  {
    label: "Vercel",
    light: `/icons/vercel.svg${ICON_VERSION}`,
    dark: `/icons/vercel-dark.svg${ICON_VERSION}`,
  },
  // Kubernetes and platform engineering
  { label: "Docker", light: `/icons/docker.svg${ICON_VERSION}` },
  { label: "Kubernetes", light: `/icons/kubernetes.svg${ICON_VERSION}`, invert: true },
  { label: "Helm", light: `/icons/helm-mono.svg${ICON_VERSION}`, invert: true },
  { label: "Terraform", light: `/icons/terraform.svg${ICON_VERSION}`, invert: true },
  { label: "ArgoCD", light: `/icons/argocd.svg${ICON_VERSION}` },
  { label: "Istio", light: `/icons/istio.svg${ICON_VERSION}` },
  { label: "Rancher", light: `/icons/rancher.svg${ICON_VERSION}` },
  { label: "Backstage", light: `/icons/backstage.svg${ICON_VERSION}`, invert: true },
  { label: "GitHub", light: `/icons/github.svg${ICON_VERSION}`, invert: true },
  { label: "GitLab", light: `/icons/gitlab.svg${ICON_VERSION}` },
  { label: "Jenkins", light: `/icons/jenkins.svg${ICON_VERSION}` },
  // Data and observability
  { label: "Snowflake", light: `/icons/snowflake.svg${ICON_VERSION}` },
  { label: "Datadog", light: `/icons/datadog.svg${ICON_VERSION}` },
  { label: "Prometheus", light: `/icons/prometheus.svg${ICON_VERSION}` },
  { label: "Grafana", light: `/icons/grafana.svg${ICON_VERSION}` },
  // AI, ML and NLP
  {
    label: "OpenAI",
    light: `/icons/openai.svg${ICON_VERSION}`,
    dark: `/icons/openai-dark.svg${ICON_VERSION}`,
  },
  { label: "Gemini", light: `/icons/gemini.svg${ICON_VERSION}` },
  {
    label: "Anthropic",
    light: `/icons/anthropic.svg${ICON_VERSION}`,
    dark: `/icons/anthropic-dark.svg${ICON_VERSION}`,
  },
  { label: "LangGraph", light: `/icons/langgraph.svg${ICON_VERSION}`, invert: true },
  { label: "LangChain", light: `/icons/langchain.svg${ICON_VERSION}`, invert: true },
  { label: "PyTorch", light: `/icons/pytorch.svg${ICON_VERSION}` },
  { label: "TensorFlow", light: `/icons/tensorflow.svg${ICON_VERSION}` },
  { label: "Keras", light: `/icons/keras.svg${ICON_VERSION}` },
  { label: "scikit-learn", light: `/icons/scikit-learn.svg${ICON_VERSION}` },
  { label: "Hugging Face", light: `/icons/hugging-face.svg${ICON_VERSION}` },
  { label: "spaCy", light: `/icons/spacy.svg${ICON_VERSION}` },
  { label: "NVIDIA", light: `/icons/nvidia.svg${ICON_VERSION}` },
  { label: "Ollama", light: `/icons/ollama.svg${ICON_VERSION}`, invert: true },
  { label: "MLflow", light: `/icons/mlflow.svg${ICON_VERSION}`, invert: true },
  { label: "Pinecone", light: `/icons/pinecone.svg${ICON_VERSION}`, invert: true },
  // Applications and automation
  { label: "Salesforce", light: `/icons/salesforce.svg${ICON_VERSION}` },
  { label: "SAP", light: `/icons/sap.svg${ICON_VERSION}` },
  { label: "Zapier", light: `/icons/zapier.svg${ICON_VERSION}` },
  { label: "n8n", light: `/icons/n8n-legacy.svg${ICON_VERSION}` },
  // Quality, design and collaboration
  { label: "Cypress", light: `/icons/cypress.svg${ICON_VERSION}` },
  { label: "Figma", light: `/icons/figma.svg${ICON_VERSION}` },
  { label: "Jira", light: `/icons/jira.svg${ICON_VERSION}` },
  { label: "Slack", light: `/icons/slack.svg${ICON_VERSION}` },
  { label: "Stripe", light: `/icons/stripe.svg${ICON_VERSION}` },
];

/* Small centred hairline that closes each section. */
function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      style={{ display: "flex", justifyContent: "center", padding: "24px 0" }}
    >
      <hr
        style={{
          width: 220,
          margin: 0,
          border: 0,
          borderTop: "1px solid color-mix(in srgb, var(--fg) 14%, transparent)",
        }}
      />
    </div>
  );
}

export default function ShuroqWayPage() {
  return (
    <main>
      <SiteNav />

      {/* Hero — same black panel as home, about and careers, with the floating ASCII word */}
      <section
        className="hero-gradient-bg"
        style={{ marginTop: -80, padding: "250px 0 160px" }}
      >
        <div className="hero-ascii-word" aria-hidden>
          <FlareWord />
        </div>
        <div className="container">
          <h1 className="hero-headline">
            <span className="hero-headline-text">The Shuroq Way</span>
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              maxWidth: 560,
              marginTop: 12,
              fontSize: 16,
              lineHeight: 1.5,
            }}
          >
            Structured engineering. Automation-driven. Outcome-focused.
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              maxWidth: 560,
              marginTop: 16,
              fontSize: 16,
              lineHeight: 1.5,
            }}
          >
            At Shuroq, we believe technology should accelerate growth — not create
            operational complexity. The Shuroq Way defines how we consult, architect,
            implement and deliver scalable digital systems for startups and enterprises.
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap" }}>
            <a href="/contact/" className="btn btn-pill btn-black">
              Partner With Shuroq
            </a>
            <a href="#how-we-work" className="btn btn-pill btn-glass-dark">
              How We Work
            </a>
          </div>
        </div>
      </section>

      {/* What makes us different — four commitments, fanned out as ink stamps */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <div className="mono-label" style={{ marginBottom: 16 }}>
              Our Approach
            </div>
            <h2 className="section-title">What Makes Us Different</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              Four commitments that hold on every engagement, from the first
              conversation to the last handover.
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center", paddingBottom: 48 }}>
            <CardStampArc
              items={differences}
              cardWidth={260}
              cardHeight={380}
              spread={300}
              arc={18}
              yOffset={84}
            />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* How we work — the four delivery phases, closed until the reader presses + */}
      <section
        id="how-we-work"
        className="section"
        style={{ background: "var(--surface-warm)" }}
      >
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div style={{ position: "sticky", top: 96 }}>
            <div className="mono-label" style={{ marginBottom: 16 }}>
              Delivery
            </div>
            <h2 className="section-title">How We Work</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              The same four phases on every engagement, from discovery to
              stabilisation.
            </p>
          </div>
          <Stepper
            initialStep={1}
            backButtonText="Back"
            nextButtonText="Continue"
            theme="dark"
            width="100%"
            radius={20}
            completedContent={
              <div style={{ display: "grid", gap: 16 }}>
                <h3 className="feature-title">That is the Shuroq Way.</h3>
                <p className="body-lg" style={{ color: "var(--muted)" }}>
                  Four phases, one accountable team from the first conversation
                  to the last handover.
                </p>
                <div style={{ marginTop: 8 }}>
                  <a href="/contact/" className="btn btn-pill btn-black">
                    Partner With Shuroq
                  </a>
                </div>
              </div>
            }
          >
            {steps.map((s) => (
              <Step key={s.title} title={s.title} description={s.desc}>
                <p className="body-lg" style={{ color: "var(--muted)" }}>
                  {s.desc}
                </p>
              </Step>
            ))}
          </Stepper>
        </div>
      </section>

      <SectionDivider />

      {/* Our expertise — practice areas as hairline rows, icons inherit the text colour */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 40 }}>
            <div className="mono-label" style={{ marginBottom: 16 }}>
              Capabilities
            </div>
            <h2 className="section-title">Our Expertise</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              The engineering disciplines we staff and deliver in-house.
            </p>
          </div>
          <div className="sw-expertise-flow">
            <div className="sw-expertise-flow__track">
              {[...expertise, ...expertise].map((e, i) => (
                <div key={i} className="sw-expertise-flow__item">
                  <span className="sw-expertise-flow__tile" aria-hidden="true">
                    <span
                      className="sw-expertise-flow__mark"
                      data-invert={e.invert ? "true" : undefined}
                      style={
                        {
                          "--brand-light": `url("${e.light}")`,
                          "--brand-dark": e.dark ? `url("${e.dark}")` : undefined,
                        } as CSSProperties
                      }
                    />
                  </span>
                  <span className="sw-expertise-flow__label">{e.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          .sw-expertise-flow {
            position: relative;
            overflow: hidden;
            /* A centred, medium-width stage for the flow — not full bleed. */
            width: 100%;
            max-width: 880px;
            margin: 40px auto 0;
            border-radius: 20px;
            /* Fade the four corners of the box instead of a straight
               vertical line, so the marquee dissolves at the edges. */
            -webkit-mask-image: radial-gradient(ellipse 85% 75% at center, black 60%, transparent 100%);
            mask-image: radial-gradient(ellipse 85% 75% at center, black 60%, transparent 100%);
          }
          .sw-expertise-flow__track {
            display: flex;
            gap: 32px;
            width: max-content;
            /* One second per item keeps the drift speed constant as the list
               grows (72 items now); the track animates to -50% of its width. */
            animation: sw-expertise-marquee 72s linear infinite;
          }
          .sw-expertise-flow__track:hover { animation-play-state: paused; }
          @keyframes sw-expertise-marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .sw-expertise-flow__item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            width: 104px;
            flex: none;
          }
          /* The box the mark sits in. Its shadow is what makes the flow felt
             as an icon leaves the edge. */
          .sw-expertise-flow__tile {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 64px;
            height: 64px;
            border-radius: 16px;
            background: var(--surface);
            border: 1px solid var(--border);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06), 0 6px 16px rgba(0, 0, 0, 0.12);
          }
          .dark .sw-expertise-flow__tile {
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5), 0 8px 20px rgba(0, 0, 0, 0.6);
          }
          /* The mark itself: a background image so the theme can swap the
             variant without two elements fighting over the same box. */
          .sw-expertise-flow__mark {
            display: block;
            width: 40px;
            height: 40px;
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
            background-image: var(--brand-light);
          }
          .dark .sw-expertise-flow__mark {
            background-image: var(--brand-dark, var(--brand-light));
          }
          .dark .sw-expertise-flow__mark[data-invert="true"] {
            filter: invert(1);
          }
          .sw-expertise-flow__label {
            font-size: 12px;
            line-height: 1.3;
            text-align: center;
            color: var(--muted);
          }
          @media (prefers-reduced-motion: reduce) {
            .sw-expertise-flow__track { animation: none; }
          }
        `}</style>
      </section>

      <SectionDivider />

      {/* CTA — same closing block as home, about and careers */}
      <section
        className="section"
        style={{ background: "var(--fg)", color: "var(--bg)", textAlign: "center" }}
      >
        <div className="container">
          <h2 className="section-title" style={{ color: "var(--bg)" }}>
            We build systems that scale with ambition.
          </h2>
          <p
            className="body-lg"
            style={{ marginTop: 16, color: "rgba(255,255,255,0.7)" }}
          >
            Partner with Shuroq to turn complexity into structured, automated and
            resilient digital infrastructure.
          </p>
          <div style={{ marginTop: 32 }}>
            <a href="/contact/" className="btn btn-pill btn-white">
              Partner With Shuroq
            </a>
          </div>
        </div>
      </section>

      <SiteFooter
        className="site-footer-inverted"
        brand={{ name: "Shuroq", href: "/", mark: footerBrandMark }}
        tagline="Technology Services & Digital Engineering Company. Empowering businesses with cutting-edge technology solutions."
        columns={footerColumns}
        legal={footerLegal}
        socials={footerSocials}
        newsletter={null}
        status={null}
        year={2026}
      />

      <section
        className="relative h-[68vh] min-h-[520px] w-full overflow-hidden"
        aria-label="Shuroq closing footer"
      >
        <AnimatedFooter
          headingLines={["Shuroq"]}
          leftImage="/animated-footer/hand-left.jpg"
          rightImage="/animated-footer/hand-right.jpg"
          columns={80}
          cellSize={20}
          fontSize={18}
          parallaxStrength={18}
          hoverRadius={8}
        />
      </section>
    </main>
  );
}
