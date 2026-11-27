import Image from "next/image";
import Link from "next/link";

import SiteNav from "@/components/nav/site-nav";
import { AnimatedFooter } from "@/components/unlumen-ui/animated-footer";
import {
  SiteFooter,
  type SiteFooterColumn,
  type SiteFooterLink,
} from "@/components/arc/blocks/site-footer/site-footer";
import { CodeBlock } from "@/components/arc/code-block/code-block";

import type { PlatformServiceData } from "./platform-service-content";
import { ServiceSections } from "./service-sections";
import styles from "./platform-service-page.module.css";

const footerColumns: SiteFooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "All services", href: "/services/" },
      { label: "Platform Engineering", href: "/platformengineering/" },
      { label: "CI/CD & Dev Experience", href: "/ci-cd-dev/" },
      { label: "SRE Consultancy", href: "/sre-consultancy/" },
      { label: "DevSecOps", href: "/devsec-ops/" },
      { label: "Observability", href: "/observability-consult/" },
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

/**
 * The opening band. Each service page opens differently — some with a framed
 * picture, some with the pipeline itself, one with the type alone — so the
 * pages are told apart before anything is read.
 */
function ServiceHero({ service }: { service: PlatformServiceData }) {
  const copy = (
    <div className={styles.heroCopy}>
      <p className={styles.eyebrow}>{service.eyebrow}</p>
      <h1 id={`${service.slug}-title`}>{service.title}</h1>
      <p className={styles.heroLead}>{service.subtitle}</p>
      <div className={styles.heroActions}>
        <Link href="/contact/" className="btn btn-pill btn-black">
          Talk to our team
        </Link>
        <Link href="/services/" className={styles.backLink}>
          All services <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  );

  const artwork = (
    <figure className={styles.heroArtwork}>
      <Image
        src={service.image}
        alt={service.imageAlt}
        width={768}
        height={960}
        priority
        sizes="(max-width: 760px) 82vw, 42vw"
      />
    </figure>
  );

  if (service.heroVariant === "centered") {
    return (
      <section
        className={styles.hero}
        data-hero="centered"
        aria-labelledby={`${service.slug}-title`}
      >
        <div className={`container ${styles.heroCentered}`}>{copy}</div>
      </section>
    );
  }

  if (service.heroVariant === "image") {
    return (
      <section
        className={styles.hero}
        data-hero="image"
        aria-labelledby={`${service.slug}-title`}
      >
        <div className={`container ${styles.heroImageBand}`}>
          {copy}
          {artwork}
        </div>
      </section>
    );
  }

  if (service.heroVariant === "imageLeft") {
    return (
      <section
        className={styles.hero}
        data-hero="image-left"
        aria-labelledby={`${service.slug}-title`}
      >
        <div className={`container ${styles.heroInnerReverse}`}>
          {artwork}
          {copy}
        </div>
      </section>
    );
  }

  if (service.heroVariant === "panel") {
    return (
      <section
        className={styles.hero}
        data-hero="panel"
        aria-labelledby={`${service.slug}-title`}
      >
        <div className={`container ${styles.heroInner}`}>
          {copy}
          <div className={styles.heroPanel}>
            <CodeBlock
              code={service.code.code}
              filename={service.code.filename}
              language={service.code.language}
              maxLines={16}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.hero} aria-labelledby={`${service.slug}-title`}>
      <div className={`container ${styles.heroInner}`}>
        {copy}
        {artwork}
      </div>
    </section>
  );
}

export default function PlatformServicePage({
  service,
}: {
  service: PlatformServiceData;
}) {
  return (
    <main className={`${styles.page} arc-industry-tokens arc-service-tokens`}>
      <SiteNav />

      <ServiceHero service={service} />

      <ServiceSections service={service} />

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
