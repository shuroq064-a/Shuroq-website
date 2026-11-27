import type { CSSProperties } from "react";

import { ArcAccordion } from "@/components/arc/accordion/accordion";
import { ExpandableText } from "@/components/arc/expandable-text/expandable-text";
import { LogoMarquee } from "@/components/arc/blocks/logo-marquee/logo-marquee";
import { SectionDivider } from "@/components/industry/industry-page";

import { ServiceHero, ServiceClosing } from "./service-shell";
import {
  productCommitments,
  productCta,
  productCrossLink,
  productHero,
  productOverview,
  productProcess,
  productServices,
  productStack,
} from "./product-data";

/**
 * Product Engineering is laid out as an editorial service index: a bento grid
 * of service cards, a closed-by-default process accordion, then a ruled list
 * of commitments. It deliberately shares no section layout with /cloud-native
 * beyond the site-wide hero, dividers, marquee and closing band.
 */
export function ProductEngineeringPage() {
  return (
    <main>
      <ServiceHero {...productHero} />

      {/* Overview — sticky heading, expandable copy. */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div className="sticky-col">
            <h2 className="section-title">{productOverview.title}</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              {productOverview.lead}
            </p>
          </div>
          <div className="arc-industry-tokens">
            <ExpandableText lines={4}>
              {productOverview.paragraphs.map((paragraph) => (
                <p key={paragraph} style={{ marginTop: 16 }}>
                  {paragraph}
                </p>
              ))}
            </ExpandableText>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Service index — cards, not a list of disclosures. */}
      <section className="section" id="services" style={{ background: "var(--surface-warm)" }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: "end" }}>
            <h2 className="section-title">What we build</h2>
            <p className="body-lg" style={{ color: "var(--muted)" }}>
              Six practices, one engineering standard. Each one has a clear
              boundary and a measurable result.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
              gap: 24,
              marginTop: 48,
            }}
          >
            {productServices.map((service, i) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className={i === 0 ? "sm:col-span-2" : undefined}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 240,
                    padding: 24,
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    background: "var(--bg)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Icon size={22} strokeWidth={1.5} aria-hidden="true" />
                    <span
                      style={{
                        fontSize: 12,
                        color: "var(--muted)",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="subheading" style={{ marginTop: "auto", paddingTop: 32 }}>
                    {service.title}
                  </h3>
                  <p style={{ marginTop: 12, color: "var(--muted)", lineHeight: 1.5, maxWidth: 560 }}>
                    {service.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Process — the vendored Arc accordion, one step open at a time. */}
      <section className="section">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div className="sticky-col">
            <h2 className="section-title">How an engagement runs</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              Four steps, in order. Open the one you want to read.
            </p>
          </div>
          <div className="arc-industry-tokens">
            <ArcAccordion
              defaultOpen={-1}
              size="lg"
              items={productProcess.map((step) => ({
                title: step.title,
                content: step.content,
              }))}
            />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Commitments — a ruled two-column list. */}
      <section className="section" style={{ background: "var(--surface-warm)" }}>
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div>
            <h2 className="section-title">Why teams work with us</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              A delivery model built around clarity and long-term ownership.
            </p>
          </div>
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {productCommitments.map((item, i) => (
              <div
                key={item.title}
                style={{
                  display: "grid",
                  gridTemplateColumns: "32px minmax(0, 1fr)",
                  gap: 16,
                  padding: "20px 0",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span style={{ fontSize: 12, color: "var(--muted)", fontVariantNumeric: "tabular-nums" }}>
                  0{i + 1}
                </span>
                <div>
                  <h3 className="subheading">{item.title}</h3>
                  <p style={{ marginTop: 8, color: "var(--muted)", lineHeight: 1.5 }}>
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      <section className="section" style={{ background: "var(--surface-warm)" }}>
        <div
          className="container arc-industry-tokens"
          style={{ "--surface": "var(--surface-warm)" } as CSSProperties}
        >
          <LogoMarquee
            title={productStack.title}
            description={productStack.description}
            brands={productStack.brands}
            tone="mono"
          />
        </div>
      </section>

      <SectionDivider />

      <ServiceClosing cta={productCta} crossLink={productCrossLink} />
    </main>
  );
}

export default ProductEngineeringPage;
