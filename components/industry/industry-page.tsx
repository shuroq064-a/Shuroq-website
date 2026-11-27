import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { LogoMarquee } from "@/components/arc/blocks/logo-marquee/logo-marquee";
import { ExpandableText } from "@/components/arc/expandable-text/expandable-text";
import { ArcAccordion } from "@/components/arc/accordion/accordion";
import { getStack } from "./industry-stacks";
import SiteNav from "@/components/nav/site-nav";
import { FlareWord } from "@/components/hero/flare/flare-word";
import { AnimatedFooter } from "@/components/unlumen-ui/animated-footer";
import {
  SiteFooter,
  type SiteFooterColumn,
  type SiteFooterLink,
} from "@/components/arc/blocks/site-footer/site-footer";

import { IndustryStats } from "./industry-stats";
import type { Industry } from "./industry-data";

export const footerColumns: SiteFooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "Automation", href: "/automate" },
      { label: "Data & Analytics", href: "/data-analytics/" },
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
      { label: "Kubernetes Services", href: "/kubernetes-services" },
      { label: "Observability", href: "/observability-consult/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about/" },
      { label: "Careers", href: "/careers/" },
      { label: "The Shuroq Way", href: "/shuroq-way/" },
      { label: "Industries", href: "/industries/" },
      { label: "Blogs", href: "/blogs" },
      { label: "Contact Us", href: "/contact/" },
    ],
  },
];

export const footerLegal: SiteFooterLink[] = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
];

export const footerSocials: SiteFooterLink[] = [
  { label: "Instagram", href: "https://instagram.com/shuroq_tech", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/shuroq/posts/?feedView=all",
    external: true,
  },
];

export const footerBrandMark = (
  <Image
    src="/logo.png"
    alt=""
    aria-hidden="true"
    width={34}
    height={34}
    style={{ display: "block", width: 34, height: 34 }}
  />
);

export function SectionDivider() {
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

interface IndustryPageProps {
  industry: Industry;
  related: Industry[];
}

export function IndustryPage({ industry, related }: IndustryPageProps) {
  return (
    <main>
      <SiteNav />

      {/* Hero — the same black band used across the site. */}
      <section
        className="hero-gradient-bg hero-band"
        style={{ marginTop: -80 }}
      >
        <div className="hero-ascii-word" aria-hidden>
          <FlareWord />
        </div>
        <div className="container">
          <p
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Industry {industry.index} / {industry.name}
          </p>
          <h1 className="hero-headline" style={{ marginTop: 16 }}>
            <span className="hero-headline-text">{industry.heroHeadline}</span>
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              maxWidth: 620,
              marginTop: 16,
              fontSize: 16,
              lineHeight: 1.5,
            }}
          >
            {industry.heroLead}
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap" }}>
            <a href="/industries/" className="btn btn-pill btn-white">
              All industries
            </a>
            <a href="/contact/" className="btn btn-pill btn-glass-light">
              Talk to us
            </a>
          </div>
        </div>
      </section>

      {/* Overview — text and a single image, held in hairlines. */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div className="sticky-col">
            <h2 className="section-title">{industry.introTitle}</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              {industry.name}, seen through the systems that make it work.
            </p>
          </div>
          <div>
            <div className="arc-industry-tokens">
              <ExpandableText lines={4}>
                <p>{industry.intro}</p>
              </ExpandableText>
            </div>
            <div
              style={{
                position: "relative",
                marginTop: 32,
                aspectRatio: "16 / 10",
                overflow: "hidden",
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--surface-warm)",
              }}
            >
              <Image
                src={industry.image}
                alt={industry.imageAlt}
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Solutions — four numbered rows, closed until pressed. */}
      <section className="section" style={{ background: "var(--surface-warm)" }}>
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div className="sticky-col">
            <h2 className="section-title">Key solutions</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              What we deliver in {industry.name}.
            </p>
          </div>
          <ArcAccordion
            defaultOpen={-1}
            size="lg"
            items={industry.solutions.map((solution) => ({
              title: solution.title,
              content: solution.desc,
            }))}
          />
        </div>
      </section>

      <SectionDivider />

      {/* Impact — count-up numbers adapted from the design-master stats band. */}
      <IndustryStats
        stats={industry.stats}
        title="Industry impact"
        description="A few of the outcomes our work has produced in this sector."
      />

      <SectionDivider />

      {/* Platforms — a quiet moving row of the marks this sector runs on. */}
      <section className="section" style={{ background: "var(--surface-warm)" }}>
        <div
          className="container arc-industry-tokens"
          style={{ "--surface": "var(--surface-warm)" } as CSSProperties}
        >
          <LogoMarquee
            title={`The stack behind ${industry.name}`}
            description="The clouds, data systems and frameworks this sector's work runs on."
            brands={getStack(industry.slug)}
            tone="mono"
          />
        </div>
      </section>

      <SectionDivider />

      {/* Continue exploring — hairline index of the other industries. */}
      <section className="section">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div>
            <h2 className="section-title">Explore other industries</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              The same engineering discipline, applied in a different context.
            </p>
          </div>
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {related.map((item) => (
              <a
                key={item.slug}
                href={`/industries/${item.slug}/`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  padding: "20px 0",
                  borderBottom: "1px solid var(--border)",
                  color: "var(--fg)",
                  textDecoration: "none",
                }}
              >
                <span style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
                  <span style={{ fontSize: 12, color: "var(--muted)", fontVariantNumeric: "tabular-nums" }}>
                    {item.index}
                  </span>
                  <span className="subheading">{item.name}</span>
                </span>
                <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — the same closing band as the other routes. */}
      <section
        className="section"
        style={{ background: "var(--fg)", color: "var(--bg)", textAlign: "center" }}
      >
        <div className="container">
          <h2 className="section-title" style={{ color: "var(--bg)" }}>
            {industry.ctaTitle}
          </h2>
          <p className="body-lg" style={{ marginTop: 16, color: "rgba(255,255,255,0.7)" }}>
            {industry.ctaLead}
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
