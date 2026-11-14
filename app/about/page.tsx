import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/nav/site-nav";
import { FlareWord } from "@/components/hero/flare/flare-word";
import { AnimatedFooter } from "@/components/unlumen-ui/animated-footer";
import {
  SiteFooter,
  type SiteFooterColumn,
  type SiteFooterLink,
} from "@/components/arc/blocks/site-footer/site-footer";

export const metadata: Metadata = {
  title: "About Us — Shuroq",
  description:
    "Shuroq is a technology solutions company helping businesses modernize operations through intelligent digital solutions.",
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

const specializations = [
  "AI & Automation",
  "Cloud & DevOps",
  "Data Engineering & Analytics",
  "Enterprise Software Development",
  "Scalable Digital Platforms",
];

const whyChoose = [
  {
    title: "Business-First Approach",
    desc: "We focus on solving operational problems, not just delivering technology. Every solution is designed to improve efficiency, reduce manual effort, and support business growth.",
  },
  {
    title: "Scalable Engineering",
    desc: "Our systems are built with scalability, security, and long-term performance in mind, helping businesses grow without operational limitations.",
  },
  {
    title: "End-to-End Execution",
    desc: "From strategy and architecture to deployment and support, we manage the complete technology lifecycle with accountability and precision.",
  },
  {
    title: "Long-Term Technology Partnership",
    desc: "We work as strategic partners, helping businesses continuously optimize systems, operations, and digital performance.",
  },
];

const challenges = [
  "Manual and repetitive business workflows",
  "Slow deployment and operational delays",
  "Legacy infrastructure limitations",
  "Lack of real-time business visibility",
  "Disconnected business systems",
  "Inefficient reporting and analytics",
  "Scalability and performance bottlenecks",
  "High operational dependency on manual processes",
];

const outcomes = [
  "Operational Efficiency",
  "Scalability",
  "Automation",
  "Deployment Speed",
  "Business Visibility",
  "Customer Experience",
];

export default function AboutPage() {
  return (
    <main>
      <SiteNav />

      {/* Hero — same black panel as the home page, with the floating ASCII word */}
      <section
        className="hero-gradient-bg"
        style={{ marginTop: -80, padding: "250px 0 160px" }}
      >
        <div className="hero-ascii-word" aria-hidden>
          <FlareWord />
        </div>
        <div className="container">
          <h1 className="hero-headline">
            <span className="hero-headline-text">Technology that simplifies work</span>
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
            Shuroq is a technology solutions company focused on helping businesses
            modernize operations and solve complex operational challenges through
            intelligent digital solutions.
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap" }}>
            <a href="/contact/" className="btn btn-pill btn-black">
              Get Started
            </a>
            <a href="/shuroq-way/" className="btn btn-pill btn-glass-dark">
              The Shuroq Way
            </a>
          </div>
        </div>
      </section>

      {/* Company overview — split layout matching the home page's grid-2 sections */}
      <section className="section">
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div>
            <h2 className="section-title">Company Overview</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              Our approach combines technical expertise with operational understanding,
              allowing us to build solutions that improve efficiency, scalability,
              reliability, and long-term business performance.
            </p>
            <p className="body-lg" style={{ marginTop: 12, color: "var(--muted)" }}>
              We believe technology should simplify operations, reduce inefficiencies,
              and create measurable business value.
            </p>
          </div>
          <div
            className="card"
            style={{ background: "var(--surface)", color: "var(--fg)" }}
          >
            <h3 className="feature-title">We specialize in</h3>
            <ul style={{ marginTop: 16, display: "grid", gap: 10, padding: 0, listStyle: "none" }}>
              {specializations.map((s) => (
                <li
                  key={s}
                  style={{
                    padding: "10px 0",
                    borderBottom: "1px solid var(--border-soft)",
                  }}
                  className="body"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Mission & Vision — two fields of tone, no icon cards */}
      <section className="section" style={{ background: "var(--fg)", color: "var(--bg)" }}>
        <div className="container grid-2">
          <div>
            <h2 className="section-title" style={{ color: "var(--bg)" }}>
              Our Mission
            </h2>
            <p
              className="body-lg"
              style={{ marginTop: 16, color: "rgba(255,255,255,0.7)" }}
            >
              To deliver scalable, reliable, and performance-driven technology solutions
              that improve operational efficiency, accelerate business growth, and enable
              long-term digital success.
            </p>
          </div>
          <div>
            <h2 className="section-title" style={{ color: "var(--bg)" }}>
              Our Vision
            </h2>
            <p
              className="body-lg"
              style={{ marginTop: 16, color: "rgba(255,255,255,0.7)" }}
            >
              To become a trusted global technology partner helping organizations scale
              through intelligent automation, cloud modernization, and business-focused
              digital transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Why Businesses Choose Shuroq */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 40 }}>
            <h2 className="section-title">Why Businesses Choose Shuroq</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              Four reasons teams stay with us beyond the first delivery.
            </p>
          </div>
          <div className="grid-2">
            {whyChoose.map((w) => (
              <div
                key={w.title}
                style={{
                  padding: "24px 0",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <h3 className="feature-title">{w.title}</h3>
                <p className="body" style={{ marginTop: 8, color: "var(--muted)" }}>
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operational Challenges — plain text list closing the previous section's gap */}
      <section className="section" style={{ background: "var(--surface-warm)" }}>
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div style={{ position: "sticky", top: 96 }}>
            <h2 className="section-title">Operational Challenges We Solve</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              The problems that bring teams to us — in our clients&apos; own terms.
            </p>
          </div>
          <ul style={{ padding: 0, listStyle: "none", display: "grid" }}>
            {challenges.map((c) => (
              <li
                key={c}
                style={{
                  padding: "16px 0",
                  borderBottom: "1px solid var(--border-soft)",
                  color: "var(--fg)",
                }}
                className="body-lg"
              >
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Results */}
      <section className="section">
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 40 }}>
            <h2 className="section-title">
              Results Driven Technology Solutions Designed Around Business Outcomes
            </h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              Technology investments should create measurable operational value. Shuroq
              helps businesses reduce inefficiencies, automate processes, improve
              infrastructure performance, and enable faster business decision-making
              through scalable and intelligently designed technology solutions.
            </p>
          </div>
          <h3 className="feature-title" style={{ marginBottom: 8 }}>
            We focus on delivering systems that improve:
          </h3>
          <div className="grid-3">
            {outcomes.map((o) => (
              <div
                key={o}
                style={{
                  padding: "24px 0",
                  borderTop: "1px solid var(--border)",
                }}
                className="subheading"
              >
                {o}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA — same closing block as the home page */}
      <section
        className="section"
        style={{ background: "var(--fg)", color: "var(--bg)", textAlign: "center" }}
      >
        <div className="container">
          <h2 className="section-title" style={{ color: "var(--bg)" }}>
            Ready to Transform Your Business?
          </h2>
          <p
            className="body-lg"
            style={{ marginTop: 16, color: "rgba(255,255,255,0.7)" }}
          >
            Let&apos;s discuss how we can help you achieve your digital transformation
            goals.
          </p>
          <div style={{ marginTop: 32 }}>
            <a href="/contact/" className="btn btn-pill btn-white">
              Contact Us
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
