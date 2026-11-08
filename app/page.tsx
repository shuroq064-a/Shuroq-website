"use client";

import Script from "next/script";
import SiteNav from "@/components/nav/site-nav";
import { HeroHeadline } from "@/components/hero/hero-intro";
import { FloatingAsciiWord } from "@/components/hero/floating-ascii-word";
import { HoverExpand, type HoverExpandItem } from "@/components/unlumen-ui/hover-expand";
import { OrbitalImageWheel, type OrbitalImageWheelImage } from "@/components/unlumen-ui/orbital-image-wheel";
import { StickyCardStack, type StickyCardStackCard } from "@/components/unlumen-ui/sticky-card-stack";
import { AnimatedFooter } from "@/components/unlumen-ui/animated-footer";
import { ConnectedTools } from "@/components/showcase/connected-tools";
import {
  SiteFooter,
  type SiteFooterColumn,
  type SiteFooterLink,
} from "@/components/arc/blocks/site-footer/site-footer";

const serviceImages: OrbitalImageWheelImage[] = [
  {
    src: "/images/services/automation.png",
    label: "Automation",
    subtitle: "Workflows, simplified",
    alt: "Intelligent Automation",
    href: "/automate",
  },
  {
    src: "/images/services/data-engineering.png",
    label: "Data & Analytics",
    subtitle: "Turn data into insight",
    alt: "Data Engineering & Analytics",
    href: "/Data%20Analytics/",
  },
  {
    src: "/images/services/product-engineering.png",
    label: "Product",
    subtitle: "Built to scale",
    alt: "Product Engineering",
    href: "/product-engineering/",
  },
  {
    src: "/images/services/devsecops.png",
    label: "DevSecOps",
    subtitle: "Security at every step",
    alt: "DevSecOps",
    href: "/devsec-ops/",
  },
  {
    src: "/images/services/cicd.png",
    label: "CI/CD",
    subtitle: "Automated delivery",
    alt: "CI/CD Pipelines",
    href: "/ci-cd-dev/",
  },
  {
    src: "/images/services/sre.png",
    label: "Reliability",
    subtitle: "Always on",
    alt: "Site Reliability Engineering",
    href: "/sre-consultancy/",
  },
];

/** Two cycles keep the orbital arc dense with only six unique posters. */
const wheelImages: OrbitalImageWheelImage[] = [
  ...serviceImages,
  ...serviceImages,
];

const engagementCards: StickyCardStackCard[] = [
  {
    id: "project-based",
    image: "/images/engagement/project-based-delivery.png",
    alt: "Project Based Delivery — for clear requirements with a fixed scope and timeline",
  },
  {
    id: "dedicated-teams",
    image: "/images/engagement/dedicated-teams.png",
    alt: "Dedicated Teams — a skilled, scalable team working exclusively on your project",
  },
  {
    id: "managed-services",
    image: "/images/engagement/managed-services.png",
    alt: "Managed Services — proactive management, monitoring and optimisation",
  },
  {
    id: "consulting",
    image: "/images/engagement/consulting-advisory.png",
    alt: "Consulting & Advisory — expert guidance for technology and business decisions",
  },
];

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

/** Sunrise mark beside the footer wordmark, echoing the Shuroq logo. */
const footerBrandMark = (
  <svg
    viewBox="0 0 48 48"
    width={34}
    height={34}
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="24" cy="29" r="12.5" />
    <path d="M24 6v5.5" />
    <path d="M11.9 11.9l3.9 3.9" />
    <path d="M36.1 11.9l-3.9 3.9" />
  </svg>
);

const industries: HoverExpandItem[] = [
  {
    label: "Telecom",
    sublabel: "Networks",
    description: "5G core, OSS/BSS modernisation and edge-ready infrastructure",
    image: "/images/hover/kyoto.svg",
    imageAlt: "Abstract geometric artwork",
  },
  {
    label: "Automotive",
    sublabel: "Mobility",
    description: "Connected vehicle platforms and software-defined manufacturing",
    image: "/images/hover/lisbon.svg",
    imageAlt: "Abstract geometric artwork",
  },
  {
    label: "BFSI",
    sublabel: "Financial services",
    description: "Secure, compliant core banking and payments modernisation",
    image: "/images/hover/marrakech.svg",
    imageAlt: "Abstract geometric artwork",
  },
  {
    label: "Healthcare",
    sublabel: "Life sciences",
    description: "Interoperable patient platforms and regulated cloud",
    image: "/images/hover/reykjavik.svg",
    imageAlt: "Abstract geometric artwork",
  },
  {
    label: "Finance",
    sublabel: "Capital markets",
    description: "Real-time risk, reconciliation and reporting systems",
    image: "/images/hover/oaxaca.svg",
    imageAlt: "Abstract geometric artwork",
  },
];

export default function Home() {
  return (
    <main>
      <SiteNav />

      {/* Hero */}
      <section className="hero-gradient-bg" style={{ marginTop: -80, padding: "250px 0 96px" }}>
        <div className="hero-ascii-word" aria-hidden>
          <FloatingAsciiWord word="Shuroq" />
        </div>
        <div className="container">
          <HeroHeadline />
          <p className="body-lg" style={{ color: "rgba(255,255,255,0.72)", maxWidth: 560, marginTop: 12, fontSize: 16, lineHeight: 1.5 }}>
            Shuroq partners with enterprise teams to design, build, and operate cloud-native platforms, resilient infrastructure, and intelligent automation — so every release is faster, safer, and more predictable.
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap" }}>
            <a href="/contact/" className="btn btn-pill btn-black">Get Started</a>
            <a href="/fission/" className="btn btn-pill btn-glass-dark">Learn More</a>
          </div>

          <div style={{ marginTop: 64, display: "flex", gap: 32, flexWrap: "wrap" }} />
        </div>
      </section>

      {/* AI Automation */}
      <section className="section">
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div>
            <div className="mono-label" style={{ marginBottom: 16 }}>Intelligent Automation</div>
            <h2 className="section-title">Intelligent Automation for the Modern Core</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              Empower your business with self-learning systems, predictive capabilities, and autonomous workflows to drive efficiency and innovation.
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
              <a href="/contact" className="btn btn-pill btn-black">Get Started</a>
              <a href="/fission/" className="btn btn-pill btn-glass-dark">Learn More</a>
            </div>
          </div>
          <ConnectedTools />
        </div>
      </section>

      {/* DevOps */}
      <section className="section" style={{ background: "var(--fg)", color: "var(--bg)" }}>
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div>
            <div className="mono-label" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>Digital Velocity</div>
            <h2 className="section-title" style={{ color: "var(--bg)" }}>Accelerate Your Digital Velocity</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "rgba(255,255,255,0.7)" }}>
              Empower your software delivery with intelligent automation, scalable infrastructure, and analytics-driven governance.
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 32, flexWrap: "wrap" }}>
              <a href="/devsec-ops/" className="btn btn-pill btn-white">Explore DevOps Solutions</a>
              <a href="/contact/" className="btn btn-pill btn-glass-light">Get Started</a>
            </div>
          </div>
          <div style={{ minHeight: 280 }} />
        </div>
      </section>

      {/* Services */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div className="mono-label" style={{ marginBottom: 16 }}>Our Services</div>
            <h2 className="section-title">Our Services</h2>
          </div>
        </div>
        <OrbitalImageWheel
          images={wheelImages}
          turns={1.4}
          wheelSize={1600}
          scrollLength={180}
          cropRatio={0.7}
          itemWidth={300}
          itemHeight={400}
          captionOffset={6}
          scrollSensitivity={0.48}
          subtitleDirection="bottom"
          safeTop={72}
        />
      </section>

      {/* About */}
      <section className="section" style={{ background: "var(--surface-warm)" }}>
        <div className="container">
          <div style={{ maxWidth: 720, marginBottom: 40 }}>
            <div className="mono-label" style={{ marginBottom: 16 }}>About Shuroq</div>
            <h2 className="section-title">Where we make an impact</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              We empower organizations with future-ready technology solutions and strategic insights to drive sustainable growth and innovation.
            </p>
          </div>
          <HoverExpand items={industries} />
        </div>
      </section>

      {/* Engagement Models — sticky poster stack */}
      <section style={{ padding: 0 }}>
        <StickyCardStack cards={engagementCards} />
      </section>

      {/* Contact CTA */}
      <section className="section" style={{ background: "var(--fg)", color: "var(--bg)", textAlign: "center" }}>
        <div className="container">
          <div className="mono-label" style={{ color: "var(--bg)", opacity: 0.7, marginBottom: 16 }}>Move Forward</div>
          <h2 className="section-title" style={{ color: "var(--bg)" }}>From vision to execution — we deliver digital excellence</h2>
          <div style={{ marginTop: 32 }}>
            <a href="/contact/" className="btn btn-pill btn-white">Contact Us</a>
          </div>
        </div>
      </section>

      {/* Site footer */}
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

      {/* Closing stage — the animated ASCII footer reveals itself once the
          visitor scrolls past the site footer. */}
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

      <Script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js" strategy="afterInteractive" />
      <Script src="/js/homepage.js" strategy="afterInteractive" />
    </main>
  );
}
