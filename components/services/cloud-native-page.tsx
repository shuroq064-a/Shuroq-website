import type { CSSProperties } from "react";

import { ExpandableText } from "@/components/arc/expandable-text/expandable-text";
import { ExpandableCard } from "@/components/arc/expandable-card/expandable-card";
import { LogoMarquee } from "@/components/arc/blocks/logo-marquee/logo-marquee";
import { SectionDivider } from "@/components/industry/industry-page";

import { ServiceHero, ServiceClosing } from "./service-shell";
import { CloudStartTabs } from "./cloud-start-tabs";
import {
  cloudCapabilities,
  cloudCta,
  cloudCrossLink,
  cloudHero,
  cloudLayers,
  cloudOverview,
  cloudStack,
  cloudStartingPoints,
  cloudUseCases,
} from "./cloud-data";

/**
 * Cloud Native has a different shape from /product-engineering: spring-driven
 * expandable capabilities, a segmented "where to start" switcher, a typographic
 * layer diagram and ruled use cases. Only the site-wide bands are shared.
 */
export function CloudNativePage() {
  return (
    <main>
      <ServiceHero {...cloudHero} />

      {/* Overview — the same quiet expandable copy treatment. */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div className="sticky-col">
            <h2 className="section-title">{cloudOverview.title}</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              {cloudOverview.lead}
            </p>
          </div>
          <div className="arc-industry-tokens">
            <ExpandableText lines={4}>
              {cloudOverview.paragraphs.map((paragraph) => (
                <p key={paragraph} style={{ marginTop: 16 }}>
                  {paragraph}
                </p>
              ))}
            </ExpandableText>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Capabilities — vendored Expandable Card, all closed at first paint. */}
      <section className="section" id="services" style={{ background: "var(--surface-warm)" }}>
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div className="sticky-col">
            <h2 className="section-title">What we deliver</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              The practices that make a cloud product dependable in production.
            </p>
          </div>
          <div className="arc-industry-tokens arc-service-tokens" style={{ display: "grid", gap: 12 }}>
            {cloudCapabilities.map((item) => (
              <ExpandableCard key={item.title} title={item.title} description={item.summary}>
                <ul style={{ margin: 0, paddingLeft: 18, color: "var(--muted)", lineHeight: 1.5 }}>
                  {item.details.map((detail) => (
                    <li key={detail} style={{ padding: "4px 0" }}>
                      {detail}
                    </li>
                  ))}
                </ul>
              </ExpandableCard>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Where to start — vendored Arc segmented control, three views. */}
      <section className="section">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div className="sticky-col">
            <h2 className="section-title">Where to start</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              The right entry point depends on what you are running today.
            </p>
          </div>
          <CloudStartTabs points={cloudStartingPoints} />
        </div>
      </section>

      <SectionDivider />

      {/* Platform layers — a typographic stack, not a card grid. */}
      <section className="section" style={{ background: "var(--surface-warm)" }}>
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div className="sticky-col">
            <h2 className="section-title">The platform, layer by layer</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              Each layer has one job and a clear boundary with the next.
            </p>
          </div>
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {cloudLayers.map((layer, i) => (
              <div
                key={layer.title}
                className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 sm:gap-6"
                style={{ padding: "20px 0", borderBottom: "1px solid var(--border)" }}
              >
                <div>
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--muted)",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <h3 className="subheading" style={{ marginTop: 8 }}>
                    {layer.title}
                  </h3>
                  <p style={{ marginTop: 4, color: "var(--muted)" }}>{layer.detail}</p>
                </div>
                <p
                  style={{
                    alignSelf: "center",
                    fontFamily: "var(--font-mono)",
                    fontSize: 14,
                    color: "var(--fg)",
                    lineHeight: 1.7,
                  }}
                >
                  {layer.tools.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Use cases — ruled rows with a number, not filled cards. */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Where this applies</h2>
          <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
            Four situations where cloud-native engineering makes a measurable difference.
          </p>
          <div style={{ marginTop: 48, borderTop: "1px solid var(--border)" }}>
            {cloudUseCases.map((item, i) => (
              <div key={item.title} className="rule-row">
                <span style={{ fontSize: 12, color: "var(--muted)", fontVariantNumeric: "tabular-nums" }}>
                  0{i + 1}
                </span>
                <h3 className="subheading">{item.title}</h3>
                <p style={{ color: "var(--muted)", lineHeight: 1.5 }}>{item.text}</p>
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
            title={cloudStack.title}
            description={cloudStack.description}
            brands={cloudStack.brands}
            tone="mono"
          />
        </div>
      </section>

      <SectionDivider />

      <ServiceClosing cta={cloudCta} crossLink={cloudCrossLink} />
    </main>
  );
}

export default CloudNativePage;
