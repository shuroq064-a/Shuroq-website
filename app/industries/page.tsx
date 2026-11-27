import type { Metadata } from "next";
import type { CSSProperties } from "react";

import { LogoMarquee } from "@/components/arc/blocks/logo-marquee/logo-marquee";
import { ExpandableText } from "@/components/arc/expandable-text/expandable-text";
import { overviewStack } from "@/components/industry/industry-stacks";
import SiteNav from "@/components/nav/site-nav";
import { FlareWord } from "@/components/hero/flare/flare-word";
import {
  HoverExpand,
  type HoverExpandItem,
} from "@/components/unlumen-ui/hover-expand";
import { AnimatedFooter } from "@/components/unlumen-ui/animated-footer";
import {
  SiteFooter,
} from "@/components/arc/blocks/site-footer/site-footer";

import { industries } from "@/components/industry/industry-data";
import {
  footerBrandMark,
  footerColumns,
  footerLegal,
  footerSocials,
  SectionDivider,
} from "@/components/industry/industry-page";

export const metadata: Metadata = {
  title: "Industries — Shuroq",
  description:
    "The sectors we work in: telecom, automotive, banking and financial services, healthcare and finance.",
};

const industryRows: HoverExpandItem[] = industries.map((industry) => ({
  label: industry.name,
  sublabel: industry.index,
  image: industry.image,
  imageAlt: industry.imageAlt,
  description: industry.heroLead,
}));

const approach = [
  {
    title: "Understand the sector",
    text: "We start with the constraints that make an industry different — its regulations, its systems of record, its pace of change.",
  },
  {
    title: "Build for the real workflow",
    text: "Platforms and automation are shaped around how teams actually work, not around a generic template.",
  },
  {
    title: "Measure what changed",
    text: "Every engagement has outcomes you can see: less downtime, faster decisions, clearer data, lower cost.",
  },
];

export default function IndustriesPage() {
  return (
    <main>
      <SiteNav />

      {/* Hero — same black panel as every other route. */}
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
            Industries
          </p>
          <h1 className="hero-headline" style={{ marginTop: 16 }}>
            <span className="hero-headline-text">
              Deep engineering, applied where it matters
            </span>
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
            We work across sectors that cannot afford to stand still. The
            technology changes; the discipline — precision, reliability,
            clarity — does not.
          </p>
          <div className="action-row">
            <a href="#sectors" className="btn btn-pill btn-white">
              Explore industries
            </a>
            <a href="/contact/" className="btn btn-pill btn-glass-light">
              Talk to us
            </a>
          </div>
        </div>
      </section>

      {/* Opening statement. */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div>
            <h2 className="section-title">One standard, many contexts</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              The same engineering approach, tuned to the realities of each
              sector.
            </p>
          </div>
          <div className="arc-industry-tokens">
            <ExpandableText lines={4}>
              <p>
                A telecom network, a hospital and a trading floor have almost
                nothing in common on the surface. Underneath, they all need
                systems that are reliable, secure and legible to the people
                running them. That is the layer we build — and we build it to
                last. We start from the constraints that make each sector
                different, shape the platforms around how teams actually work,
                and measure the change in terms the business already uses:
                uptime, speed, clarity and cost.
              </p>
            </ExpandableText>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Sector index — the same expanding rows used on the home page. */}
      <section className="section" id="sectors" style={{ background: "var(--surface-warm)" }}>
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div className="sticky-col">
            <h2 className="section-title">Where we work</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              Five sectors. Hover, focus or tap a row to see it, open a page to go
              deeper.
            </p>
          </div>
          <div style={{ minWidth: 0 }}>
            <HoverExpand items={industryRows} />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Approach — three quiet, hairline cards. */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">How we approach an industry</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: 24,
              marginTop: 48,
            }}
          >
            {approach.map((item, i) => (
              <div
                key={item.title}
                style={{
                  padding: 24,
                  borderRadius: 8,
                  border: "1px solid var(--border)",
                  background: "var(--bg)",
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    fontVariantNumeric: "tabular-nums",
                    letterSpacing: "0.04em",
                  }}
                >
                  0{i + 1}
                </span>
                <h3 className="subheading" style={{ marginTop: 16 }}>
                  {item.title}
                </h3>
                <p style={{ marginTop: 12, color: "var(--muted)", lineHeight: 1.5 }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms — the shared stack across every sector. */}
      <section className="section" style={{ background: "var(--surface-warm)" }}>
        <div
          className="container arc-industry-tokens"
          style={{ "--surface": "var(--surface-warm)" } as CSSProperties}
        >
          <LogoMarquee
            title="The platforms behind the work"
            description="A familiar set of clouds, data systems and frameworks stays close to every engagement."
            brands={overviewStack}
            tone="mono"
          />
        </div>
      </section>

      {/* CTA. */}
      <section
        className="section"
        style={{ background: "var(--fg)", color: "var(--bg)", textAlign: "center" }}
      >
        <div className="container">
          <h2 className="section-title" style={{ color: "var(--bg)" }}>
            Your sector, our engineering
          </h2>
          <p className="body-lg" style={{ marginTop: 16, color: "rgba(255,255,255,0.7)" }}>
            Tell us what you are trying to change. We will tell you what we
            would build.
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
