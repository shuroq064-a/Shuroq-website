import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/nav/site-nav";
import { AnimatedFooter } from "@/components/unlumen-ui/animated-footer";
import { LitBento } from "@/components/ui/lit-bento";
import { MotionCards } from "@/components/ui/motion-cards";
import { Timeline } from "@/components/ui/timeline";
import {
  SiteFooter,
  type SiteFooterColumn,
  type SiteFooterLink,
} from "@/components/arc/blocks/site-footer/site-footer";
import type { ServiceDetailData } from "./service-detail-content";
import styles from "./service-detail-page.module.css";

const footerColumns: SiteFooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "All services", href: "/services/" },
      { label: "Cutting Edge", href: "/cutting-edge/" },
      { label: "Assurance", href: "/assurance/" },
      { label: "Automate", href: "/automate/" },
      { label: "Data Analytics", href: "/data-analytics/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about/" },
      { label: "Careers", href: "/careers/" },
      { label: "The Shuroq Way", href: "/shuroq-way/" },
      { label: "Contact Us", href: "/contact/" },
    ],
  },
];

const footerLegal: SiteFooterLink[] = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
];

const dataVisualKinds = ["pipeline", "warehouse", "dashboard", "forecast", "quality"] as const;

function FeatureVisual({ kind }: { kind: (typeof dataVisualKinds)[number] }) {
  if (kind === "pipeline") {
    return <svg viewBox="0 0 220 160" fill="none" aria-hidden="true"><path d="M20 80h52m0 0h54m0 0h68" stroke="currentColor" strokeWidth="2" opacity=".35" />{[20, 74, 128, 194].map((x, i) => <circle key={x} cx={x} cy="80" r={i === 0 || i === 3 ? 10 : 16} fill="var(--card)" stroke="currentColor" strokeWidth="2" opacity={i === 3 ? ".8" : ".45"} />)}<circle cx="74" cy="80" r="3" fill="currentColor"/><circle cx="128" cy="80" r="3" fill="currentColor"/></svg>;
  }
  if (kind === "warehouse") {
    return <svg viewBox="0 0 220 160" fill="none" aria-hidden="true"><path d="M40 42h140v90H40zM58 60h104v20H58zM58 92h44v22H58zM118 92h44v22h-44z" stroke="currentColor" strokeWidth="2" opacity=".55"/><path d="M68 69h46m-46 32h24m38 0h24" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>;
  }
  if (kind === "dashboard") {
    return <svg viewBox="0 0 220 160" fill="none" aria-hidden="true"><path d="M44 128V36m0 92h136" stroke="currentColor" strokeWidth="2" opacity=".35"/><path d="m58 108 30-32 24 16 28-38 28 14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>{[58,88,112,140,168].map((x,i)=><circle key={x} cx={x} cy={[108,76,92,54,68][i]} r="4" fill="currentColor"/>)}</svg>;
  }
  if (kind === "forecast") {
    return <svg viewBox="0 0 220 160" fill="none" aria-hidden="true"><path d="M40 126V38m0 88h144" stroke="currentColor" strokeWidth="2" opacity=".35"/><path d="M56 108c20-2 24-36 46-34s25 26 43 8 20-31 35-42" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><path d="m164 40 16-2-2 16" stroke="currentColor" strokeWidth="2"/></svg>;
  }
  return <svg viewBox="0 0 220 160" fill="none" aria-hidden="true"><path d="M52 82 94 124 170 44" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/><circle cx="110" cy="82" r="62" stroke="currentColor" strokeWidth="2" opacity=".28"/></svg>;
}

const analyticsTags = ["Pipelines", "Platforms", "Reporting", "Forecasting", "Governance"];

export default function ServiceDetailPage({
  service,
}: {
  service: ServiceDetailData;
}) {
  return (
    <main className={styles.page}>
      <SiteNav />

      <section className={styles.hero} aria-labelledby={`${service.slug}-title`}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            <h1 id={`${service.slug}-title`}>{service.title}</h1>
            <p>{service.description}</p>
            <div className={styles.heroActions}>
              <Link href="/contact/" className="btn btn-pill btn-black">
                Talk to our team
              </Link>
              <Link href="/services/" className={styles.backLink}>
                All services <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
          <figure className={styles.heroArtwork}>
            <Image
              src={service.image}
              alt={service.imageAlt}
              width={service.image.endsWith(".svg") ? 640 : 768}
              height={service.image.endsWith(".svg") ? 800 : 960}
              priority
              sizes="(max-width: 760px) 82vw, 42vw"
            />
          </figure>
        </div>
      </section>

      <section className={styles.capabilities} aria-labelledby={`${service.slug}-capabilities`}>
        <div className={`container ${styles.sectionInner}`}>
          <header className={styles.sectionHeading}>
            <h2 id={`${service.slug}-capabilities`}>{service.capabilitiesTitle}</h2>
            <p>{service.capabilitiesIntro}</p>
          </header>
          {service.slug === "cutting-edge" ? (
            <div className={styles.componentGrid}>
              {service.capabilities.map((capability) => (
                <article className={`${styles.capability} ${styles.componentCapability}`} key={capability.title}>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </article>
              ))}
            </div>
          ) : service.slug === "assurance" ? (
            <MotionCards
              items={service.capabilities.map((capability, index) => ({
                id: `${service.slug}-${index}`,
                title: capability.title,
                description: capability.description,
              }))}
              showFilter={false}
              columns={2}
              stagger={0.045}
              bounce={0.12}
              className={styles.motionGrid}
            />
          ) : service.slug === "automate" ? (
            <MotionCards
              items={service.capabilities.map((capability, index) => ({
                  id: `${service.slug}-${index}`,
                  title: capability.title,
                  description: capability.description,
                }))}
              showFilter={false}
              columns={2}
              stagger={0.04}
              bounce={0.1}
              className={styles.motionGrid}
            />
          ) : service.slug === "data-analytics" ? (
            <div className={styles.litBentoWrap}>
              <LitBento
                items={service.capabilities.map((capability, index) => ({
                  title: capability.title,
                  description: capability.description,
                  visual: <FeatureVisual kind={dataVisualKinds[index] ?? "quality"} />,
                  tags: [analyticsTags[index] ?? "Data"],
                }))}
                filterMode
                className={styles.dataGrid}
              />
            </div>
          ) : (
            <div className={styles.capabilityList}>
              {service.capabilities.map((capability) => {
                return (
                  <article className={styles.capability} key={capability.title}>
                    <div>
                      <h3>{capability.title}</h3>
                      <p>{capability.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className={styles.approach} aria-labelledby={`${service.slug}-approach`}>
        <div className={`container ${styles.sectionInner}`}>
          <header className={styles.sectionHeading}>
            <h2 id={`${service.slug}-approach`}>{service.approachTitle}</h2>
            <p>{service.approachIntro}</p>
          </header>
          {service.slug === "automate" ? (
            <Timeline
              items={service.approach.map((step) => ({
                title: step.title,
                description: step.description,
              }))}
              color="var(--fg)"
              distance={18}
              className={styles.processTimeline}
            />
          ) : (
            <ol className={styles.approachList}>
              {service.approach.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>

      <section className={styles.contactBand}>
        <div className={`container ${styles.contactInner}`}>
          <div>
            <h2>{service.closingTitle}</h2>
            <p>{service.closingText}</p>
          </div>
          <Link href="/contact/" className="btn btn-pill btn-white">
            Start a conversation <span aria-hidden="true">↗</span>
          </Link>
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
