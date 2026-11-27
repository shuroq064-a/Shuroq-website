import { ArrowUpRight } from "lucide-react";

import SiteNav from "@/components/nav/site-nav";
import { FlareWord } from "@/components/hero/flare/flare-word";
import { AnimatedFooter } from "@/components/unlumen-ui/animated-footer";
import { SiteFooter } from "@/components/arc/blocks/site-footer/site-footer";

import {
  footerBrandMark,
  footerColumns,
  footerLegal,
  footerSocials,
} from "@/components/industry/industry-page";

/** The hero band is site-wide; only the copy changes between routes. */
export function ServiceHero({
  eyebrow,
  headline,
  lead,
}: {
  eyebrow: string;
  headline: string;
  lead: string;
}) {
  return (
    <>
      <SiteNav />
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
            {eyebrow}
          </p>
          <h1 className="hero-headline" style={{ marginTop: 16 }}>
            <span className="hero-headline-text">{headline}</span>
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
            {lead}
          </p>
          <div className="action-row">
            <a href="#services" className="btn btn-pill btn-white">
              What we do
            </a>
            <a href="/contact/" className="btn btn-pill btn-glass-light">
              Talk to us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

/** Closing band, footers and the hairline link to the sister service. */
export function ServiceClosing({
  crossLink,
  cta,
}: {
  crossLink: { eyebrow: string; title: string; text: string; href: string };
  cta: { title: string; text: string };
}) {
  return (
    <>
      <section className="section">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div>
            <p
              style={{
                color: "var(--muted)",
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {crossLink.eyebrow}
            </p>
            <h2 className="section-title" style={{ marginTop: 16 }}>
              Keep exploring
            </h2>
          </div>
          <a
            href={crossLink.href}
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 24,
              padding: "24px 0",
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
              color: "var(--fg)",
              textDecoration: "none",
            }}
          >
            <span>
              <span className="subheading" style={{ display: "block" }}>
                {crossLink.title}
              </span>
              <span style={{ display: "block", marginTop: 8, color: "var(--muted)" }}>
                {crossLink.text}
              </span>
            </span>
            <ArrowUpRight size={20} strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section
        className="section"
        style={{ background: "var(--fg)", color: "var(--bg)", textAlign: "center" }}
      >
        <div className="container">
          <h2 className="section-title" style={{ color: "var(--bg)" }}>
            {cta.title}
          </h2>
          <p className="body-lg" style={{ marginTop: 16, color: "rgba(255,255,255,0.7)" }}>
            {cta.text}
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
    </>
  );
}
