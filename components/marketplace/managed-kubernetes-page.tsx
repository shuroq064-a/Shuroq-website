import Link from "next/link";

import SiteNav from "@/components/nav/site-nav";
import { AnimatedFooter } from "@/components/unlumen-ui/animated-footer";
import {
  SiteFooter,
  type SiteFooterColumn,
  type SiteFooterLink,
} from "@/components/arc/blocks/site-footer/site-footer";
import {
  PlanComparison,
  type ComparisonFeature,
  type ComparisonPlan,
} from "@/components/arc/blocks/plan-comparison/plan-comparison";
import { UsageMeter } from "@/components/arc/usage-meter/usage-meter";

import styles from "./managed-kubernetes-page.module.css";

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
    title: "Services",
    links: [
      { label: "All services", href: "/services" },
      { label: "Platform Engineering", href: "/platformengineering" },
      { label: "SRE Consultancy", href: "/sre-consultancy" },
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

const footerLegal: SiteFooterLink[] = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
];

const disciplines = [
  {
    term: "Cluster operations",
    summary:
      "Provisioning, upgrades, patching, backup policies, and runtime health checks for production clusters.",
    tags: ["Provisioning", "Upgrades", "Patching", "Backup policy", "Health checks"],
  },
  {
    term: "Security and compliance",
    summary:
      "Hardening baselines, access control, policy enforcement, and operational compliance practices.",
    tags: ["Hardening baselines", "Access control", "Policy enforcement", "Compliance"],
  },
  {
    term: "Reliability engineering",
    summary:
      "24x7 monitoring, SLO-driven operations, incident management, and post-incident improvement loops.",
    tags: ["24x7 monitoring", "SLO operations", "Incident management", "Review loops"],
  },
  {
    term: "Performance and cost",
    summary:
      "Resource optimization, right-sizing, scaling strategy, and cost controls across workloads.",
    tags: ["Right-sizing", "Scaling strategy", "Resource tuning", "Cost controls"],
  },
];

const plans: ComparisonPlan[] = [
  {
    id: "operate",
    name: "Operate",
    tagline: "Daily Kubernetes operations",
    priceNote: "Scoped to your estate",
    action: "Choose Operate",
  },
  {
    id: "optimize",
    name: "Operate + Optimize",
    tagline: "Reliability and cost, kept improving",
    priceNote: "Scoped to your estate",
    action: "Choose Operate + Optimize",
  },
  {
    id: "pod",
    name: "Dedicated SRE Pod",
    tagline: "A team embedded with your engineers",
    priceNote: "A managed team",
    action: "Choose a dedicated pod",
  },
];

const features: ComparisonFeature[] = [
  {
    label: "Cluster operations and upgrades",
    values: { operate: "Included", optimize: "Included", pod: "Included" },
    shared: true,
  },
  {
    label: "Monitoring and incident response",
    values: { operate: "Business hours", optimize: "24×7", pod: "24×7" },
  },
  {
    label: "Reliability tuning and platform improvement",
    values: { operate: "Not included", optimize: "Included", pod: "Included" },
  },
  {
    label: "Cost optimization",
    values: { operate: "Advisory", optimize: "Included", pod: "Included" },
  },
  {
    label: "Security and compliance operations",
    values: { operate: "Baseline", optimize: "Baseline + policy", pod: "Custom baseline" },
  },
  {
    label: "Embedded SRE team",
    values: { operate: "Not included", optimize: "Not included", pod: "Included" },
  },
  {
    label: "Release and change governance",
    values: { operate: "Shared calendar", optimize: "Shared calendar", pod: "Own pipeline" },
  },
  {
    label: "Reporting cadence",
    values: { operate: "Monthly", optimize: "Weekly", pod: "Continuous" },
  },
  {
    label: "Capacity planning",
    values: { operate: "Not included", optimize: "Quarterly", pod: "Continuous" },
  },
];

export default function ManagedKubernetesPage() {
  return (
    <main className={`${styles.page} arc-industry-tokens arc-service-tokens`}>
      <SiteNav />

      <section className={styles.hero} aria-labelledby="managed-kubernetes-title">
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Managed Kubernetes</p>
              <h1 id="managed-kubernetes-title">Managed Services for Kubernetes</h1>
              <p className={styles.heroLead}>
                We run your Kubernetes platform with SRE discipline, security
                guardrails, and cost-aware operations so your teams can focus on
                product delivery.
              </p>
              <div className={styles.heroActions}>
                <Link href="/contact" className="btn btn-pill btn-black">
                  Scope an engagement
                </Link>
                <Link href="#models" className="btn btn-pill btn-glass-dark">
                  Compare engagement models
                </Link>
              </div>
            </div>

            <aside className={styles.index} aria-label="The disciplines we manage">
              <h2>Under management</h2>
              <ul className={styles.indexList}>
                {disciplines.map((discipline, index) => (
                  <li key={discipline.term}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{discipline.term}</strong>
                      <em>{discipline.summary}</em>
                    </div>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.managed} aria-labelledby="managed-title">
        <div className="container">
          <header className={styles.lead}>
            <h2 id="managed-title">What we manage</h2>
            <p>
              Four disciplines, one accountable team. Each row below is work we
              take on, not a dashboard you have to check yourself.
            </p>
          </header>
          <dl className={styles.specs}>
            {disciplines.map((discipline, index) => (
              <div className={styles.specRow} key={discipline.term}>
                <dt className={styles.specTerm}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{discipline.term}</h3>
                </dt>
                <dd className={styles.specBody}>
                  <p>{discipline.summary}</p>
                  <ul className={styles.specTags}>
                    {discipline.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={styles.models} id="models" aria-labelledby="managed-models">
        <div className="container">
          <div className={styles.modelsHead}>
            <header className={styles.lead}>
              <h2 id="managed-models">Engagement models</h2>
              <p>Three ways to hand the platform over, from run it to run it with us.</p>
            </header>
            <p className={styles.modelsNote}>
              Turn on &ldquo;show differences only&rdquo; to see the rows that
              actually separate the three models.
            </p>
          </div>
          <PlanComparison
            title="Choose how much you want to carry"
            description="The same SRE standard underneath. What changes is how much of the day we take."
            plans={plans}
            features={features}
            showBilling={false}
            matrixLabel="Operate, Operate + Optimize and Dedicated SRE Pod comparison"
            columnLabel="What changes"
            differencesLabel="Show differences only"
            featureCountLabel="lines of coverage"
            footnote="Every model is scoped after a readiness review, so coverage is agreed against your clusters rather than a seat count."
          />
        </div>
      </section>

      <section className={styles.effort} aria-labelledby="managed-effort">
        <div className="container">
          <div className={styles.effortInner}>
            <header className={styles.lead}>
              <h2 id="managed-effort">Where the monthly effort goes</h2>
              <p>
                A managed service is a capacity decision. This is roughly how a
                standard month splits across the four disciplines — and how much
                is left for change.
              </p>
              <p className={styles.effortNote}>
                The split moves with your estate. A cluster estate in its first
                year of automation looks different from one that has been
                running for five.
              </p>
            </header>
            <div className={styles.effortPanel}>
              <UsageMeter
                label="Monthly management capacity"
                unit="%"
                limit={100}
                decimals={0}
                warnAt={0.95}
                freeLabel="Change buffer"
                overLabel="Over capacity"
                segments={[
                  { id: "cluster", label: "Cluster operations", value: 34 },
                  { id: "reliability", label: "Reliability engineering", value: 22 },
                  { id: "security", label: "Security and compliance", value: 15 },
                  { id: "cost", label: "Performance and cost", value: 14 },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="managed-cta">
        <div className="container">
          <div className={styles.ctaInner}>
            <h2 id="managed-cta">Need production-grade Kubernetes operations?</h2>
            <p>
              Get a managed service plan aligned to your scale, security needs,
              and release velocity.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/contact" className="btn btn-pill btn-black">
                Talk to our team
              </Link>
              <Link href="/botkube" className="btn btn-pill btn-glass-light">
                Add governed ChatOps
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
