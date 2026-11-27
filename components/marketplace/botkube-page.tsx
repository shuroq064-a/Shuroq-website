import Link from "next/link";
import { ArrowRight, BellRing, ShieldCheck, Terminal, Workflow } from "lucide-react";

import SiteNav from "@/components/nav/site-nav";
import { AnimatedFooter } from "@/components/unlumen-ui/animated-footer";
import {
  SiteFooter,
  type SiteFooterColumn,
  type SiteFooterLink,
} from "@/components/arc/blocks/site-footer/site-footer";
import { ChatThread } from "@/components/arc/chat-thread/chat-thread";
import { Timeline, type TimelineEvent } from "@/components/arc/timeline/timeline";

import styles from "./botkube-page.module.css";

const footerColumns: SiteFooterColumn[] = [
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
      { label: "The Shuroq Way", href: "/shuroq-way" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const footerLegal: SiteFooterLink[] = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
];

const capabilities = [
  {
    icon: BellRing,
    title: "Alert intelligence",
    text: "Route high-signal Kubernetes events and suppress low-value noise with policy-driven filters.",
  },
  {
    icon: Terminal,
    title: "Unified ChatOps",
    text: "Run operations from collaboration tools with command controls, auditability, and role boundaries.",
  },
  {
    icon: ShieldCheck,
    title: "Governed access",
    text: "Enforce least-privilege execution and approval flows for production-safe day-2 operations.",
  },
  {
    icon: Workflow,
    title: "Faster incident response",
    text: "Trigger runbooks, enrich alerts with context, and speed up triage and remediation actions.",
  },
];

const useCases = [
  {
    title: "Platform teams",
    points: [
      "Standardize Kubernetes alert flows across clusters and environments",
      "Expose safe commands to app teams with audit logs",
      "Improve SRE handoffs with shared incident channels",
    ],
  },
  {
    title: "DevOps teams",
    points: [
      "Investigate deployment failures directly from ChatOps tools",
      "Link alerts to dashboards, logs, and runbook actions",
      "Reduce context switching during on-call operations",
    ],
  },
  {
    title: "Security and compliance",
    points: [
      "Track command execution history for governance reviews",
      "Restrict privileged operations by role and channel",
      "Improve response consistency for operational risk events",
    ],
  },
];

const delivery = [
  {
    step: "Step 01",
    title: "Readiness assessment",
    text: "Cluster topology, current alerting, and incident process mapping.",
  },
  {
    step: "Step 02",
    title: "Design and integration",
    text: "ChatOps architecture, RBAC model, and observability integrations.",
  },
  {
    step: "Step 03",
    title: "Implementation",
    text: "Policy setup, channel routing, command governance, and runbook automation.",
  },
  {
    step: "Step 04",
    title: "Enablement and optimization",
    text: "Playbooks, on-call coaching, KPI tuning, and operational handover.",
  },
];

const participants = [
  { id: "botkube", name: "Botkube" },
  { id: "sre", name: "Platform SRE", avatar: "/media/people/nathan-cole.svg" },
  { id: "priya", name: "Priya Raman", avatar: "/media/people/sofia-ramirez.svg" },
  { id: "you", name: "You", avatar: "/media/people/marcus-johnson.svg" },
];

/** The same incident as the responders saw it in the channel, and as the
    platform recorded it. The conversation is the page's argument; the record
    underneath it is the audit trail a platform team asks to see. */
const threadMessages = [
  {
    id: "m1",
    authorId: "botkube",
    text: "Alert routed — `HighMemoryUsage` on `payments-api-7d9c` (prod-eu). 94% of the container limit for 12 minutes. Policy `prod/noise-filters` allowed this one through.",
    createdAt: "2026-11-24T09:12:00Z",
  },
  {
    id: "m2",
    authorId: "sre",
    text: "Same pod was evicted three times yesterday. Pulling the last rollout before we touch anything.",
    createdAt: "2026-11-24T09:13:10Z",
  },
  {
    id: "m3",
    authorId: "sre",
    text: "Rolled back `deployment/payments-api` — second approval recorded against ticket OPS-4471. Command is in the audit log.",
    createdAt: "2026-11-24T09:14:02Z",
    reactions: [{ emoji: "👍", count: 2 }],
  },
  {
    id: "m4",
    authorId: "botkube",
    text: "Rollback complete. Memory back to 61%, six of six replicas healthy, error rate flat.",
    createdAt: "2026-11-24T09:14:44Z",
    reactions: [{ emoji: "🎉", count: 1 }],
  },
  {
    id: "m5",
    authorId: "priya",
    text: "Root cause was the config rollout. The memory limit came down from 512Mi to 256Mi and nobody flagged it.",
    createdAt: "2026-11-24T09:16:20Z",
  },
  {
    id: "m6",
    authorId: "you",
    text: "Then let the policy catch it. Any memory limit below 512Mi should need a second approval.",
    createdAt: "2026-11-24T09:18:05Z",
    status: "read" as const,
  },
];

/** The clock the record is rendered against, so the feed reads the same on the
    server and in the browser. */
const recordNow = Date.parse("2026-11-24T09:20:00Z");

const record: TimelineEvent[] = [
  {
    id: "r1",
    at: "2026-11-24T09:12:00Z",
    actor: "Botkube",
    title: "routed HighMemoryUsage on payments-api-7d9c",
    meta: "policy prod/noise-filters",
  },
  {
    id: "r2",
    at: "2026-11-24T09:13:10Z",
    actor: "Platform SRE",
    title: "opened the incident channel and attached the last rollout",
    meta: "channel #inc-4471",
  },
  {
    id: "r3",
    at: "2026-11-24T09:14:02Z",
    actor: "Platform SRE",
    title: "ran kubectl rollout undo deployment/payments-api",
    meta: "approved · ticket OPS-4471",
  },
  {
    id: "r4",
    at: "2026-11-24T09:14:44Z",
    actor: "Botkube",
    title: "reported 6/6 replicas healthy after the rollback",
    meta: "memory 61%",
  },
  {
    id: "r5",
    at: "2026-11-24T09:18:05Z",
    actor: "You",
    title: "raised a policy change for memory limits below 512Mi",
    meta: "awaiting review",
    tone: "neutral" as const,
  },
];

export default function BotkubePage() {
  return (
    <main className={`${styles.page} arc-industry-tokens arc-service-tokens`}>
      <SiteNav />

      <section className={styles.hero} aria-labelledby="botkube-title">
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Marketplace · ChatOps</p>
              <h1 id="botkube-title">Botkube Enterprise</h1>
              <p className={styles.heroLead}>
                Shuroq helps teams adopt and operate Botkube Enterprise to reduce
                MTTR, remove noisy alerts, and run consistent incident workflows
                across Slack, Teams, and cloud-native toolchains.
              </p>
              <div className={styles.heroActions}>
                <Link href="/contact" className="btn btn-pill btn-black">
                  Talk to our team
                </Link>
                <Link href="#chatops" className={styles.anchorLink}>
                  See an incident thread <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <aside className={styles.heroPanel} aria-label="Botkube Enterprise at a glance">
              <h2>At a glance</h2>
              <dl>
                <div>
                  <dt>Where it runs</dt>
                  <dd>Slack, Microsoft Teams, and the Kubernetes API</dd>
                </div>
                <div>
                  <dt>What it changes</dt>
                  <dd>Alert routing, command approval, and audit history</dd>
                </div>
                <div>
                  <dt>Who operates it</dt>
                  <dd>Shuroq, from readiness review to handover</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.chatops} id="chatops" aria-labelledby="botkube-chatops">
        <div className="container">
          <div className={styles.chatopsHead}>
            <header className={styles.lead}>
              <h2 id="botkube-chatops">The incident, where the team already is</h2>
              <p>
                Alerts do not need another tab. They arrive in the channel, with
                the right context, and the reply that fixes it is a governed
                command instead of a terminal.
              </p>
            </header>
            <p className={styles.chatopsNote}>
              A real shape of incident: one alert, one rollback, one policy
              change — and an audit trail for every command in between.
            </p>
          </div>
          <div className={styles.threadFrame}>
            <ChatThread
              participants={participants}
              currentUserId="you"
              defaultMessages={threadMessages}
              readBy={{ sre: "m4", priya: "m5", botkube: "m6" }}
              placeholder="Reply in the incident channel"
              label="Botkube Enterprise incident channel"
            />
          </div>
        </div>
      </section>

      <section className={styles.capabilities} aria-labelledby="botkube-capabilities">
        <div className="container">
          <header className={styles.lead}>
            <h2 id="botkube-capabilities">What you can do with Botkube Enterprise</h2>
            <p>
              Four capabilities, each one removing a step between an alert and a
              safe fix.
            </p>
          </header>
          <div className={styles.capabilityGrid}>
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <article className={styles.capability} key={capability.title}>
                  <span className={styles.capabilityIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" style={{ display: "inline-flex", marginTop: 14 }}>
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  <h3>{capability.title}</h3>
                  <p>{capability.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.useCases} aria-labelledby="botkube-usecases">
        <div className="container">
          <header className={styles.lead}>
            <h2 id="botkube-usecases">Common enterprise use cases</h2>
            <p>Where teams get the most out of a governed ChatOps channel.</p>
          </header>
          <div className={styles.useCaseGrid}>
            {useCases.map((useCase) => (
              <article className={styles.useCase} key={useCase.title}>
                <h3>{useCase.title}</h3>
                <ul>
                  {useCase.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.delivery} aria-labelledby="botkube-delivery">
        <div className="container">
          <header className={styles.lead}>
            <h2 id="botkube-delivery">How Shuroq delivers Botkube Enterprise</h2>
            <p>
              Four stages, from a map of your current alerting to a team that
              runs the channel themselves.
            </p>
          </header>
          <ol className={styles.deliveryRail}>
            {delivery.map((step) => (
              <li className={styles.deliveryStep} key={step.step}>
                <span>{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.record} aria-labelledby="botkube-record">
        <div className="container">
          <header className={styles.lead}>
            <h2 id="botkube-record">The same incident, as the platform recorded it</h2>
            <p>
              Every route, command and approval leaves a record. That record is
              what a governance review asks for and what an on-call handover
              relies on.
            </p>
          </header>
          <div className={styles.recordInner}>
            <header>
              <h3 style={{ margin: 0, fontSize: 24, fontWeight: 500, letterSpacing: "-0.03em" }}>
                Payments API · 24 Nov 2026
              </h3>
              <p style={{ margin: "10px 0 0", color: "var(--muted)", fontSize: 15, lineHeight: 1.55 }}>
                prod-eu · payments-api · ticket OPS-4471
              </p>
            </header>
            <div className={styles.recordFrame}>
              <Timeline
                events={record}
                now={recordNow}
                label="Platform record for the payments API incident"
                timeZone="UTC"
                headingLevel={4}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="botkube-cta">
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <h2 id="botkube-cta">Need production-grade ChatOps for Kubernetes?</h2>
              <p>
                Shuroq can implement Botkube Enterprise with the governance and
                reliability standards your teams require.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link href="/contact" className="btn btn-pill btn-black">
                Talk to our team
              </Link>
              <Link href="/kubernetes-services" className="btn btn-pill btn-glass-light">
                See managed Kubernetes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter
        className="site-footer-inverted service-page-footer"
        brand={{ name: "Shuroq", href: "/", mark: null }}
        tagline="Technology Services & Digital Engineering Company. Focused on dependable digital systems."
        columns={footerColumns}
        legal={footerLegal}
        socials={[]}
        newsletter={null}
        status={null}
        year={2026}
      />

      <section className={styles.animatedFooter} aria-label="Shuroq closing hands animation">
        <AnimatedFooter
          headingLines={["Shuroq"]}
          leftImage="/animated-footer/hand-left.jpg"
          rightImage="/animated-footer/hand-right.jpg"
          background="#000"
          textColor="#fff"
          handWidth="clamp(200px, 25vw, 360px)"
          headingBottomPadding="clamp(56px, 8vh, 80px)"
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
