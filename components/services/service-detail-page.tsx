import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/nav/site-nav";
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
          <div className={styles.capabilityList}>
            {service.capabilities.map((capability) => (
              <article className={styles.capability} key={capability.title}>
                <span className={styles.capabilityMark} aria-hidden="true" />
                <div>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.approach} aria-labelledby={`${service.slug}-approach`}>
        <div className={`container ${styles.sectionInner}`}>
          <header className={styles.sectionHeading}>
            <h2 id={`${service.slug}-approach`}>{service.approachTitle}</h2>
            <p>{service.approachIntro}</p>
          </header>
          <ol className={styles.approachList}>
            {service.approach.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
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
        className="site-footer-inverted"
        brand={{ name: "Shuroq", href: "/", mark: null }}
        tagline="Technology Services & Digital Engineering Company. Focused on dependable digital systems."
        columns={footerColumns}
        legal={footerLegal}
        socials={[]}
        newsletter={null}
        status={null}
        year={2026}
      />
    </main>
  );
}
