import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/components/nav/site-nav";
import { FlareWord } from "@/components/hero/flare/flare-word";
import { AnimatedFooter } from "@/components/unlumen-ui/animated-footer";
import {
  SiteFooter,
  type SiteFooterColumn,
  type SiteFooterLink,
} from "@/components/arc/blocks/site-footer/site-footer";
import ServicesMotion from "./services-motion";
import styles from "./services-page.module.css";

export const metadata: Metadata = {
  title: "Technology Services — Shuroq",
  description:
    "Explore Shuroq's technology services: product engineering, assurance, intelligent automation, data analytics, DevSecOps, CI/CD, and site reliability engineering.",
};

const footerColumns: SiteFooterColumn[] = [
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
      { label: "Kubernetes Services", href: "/kubernetes-services/" },
      { label: "Observability", href: "/observability-consult/" },
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

const services = [
  {
    id: "product-engineering",
    image: "/images/services/generated/product-engineering.svg",
    imageWidth: 640,
    imageHeight: 800,
    imageAlt: "Modern product engineering service poster",
    title: "Product engineering",
    subtitle: "Technology shaped around the way your business works.",
    description:
      "From early product thinking to dependable enterprise software, we build digital experiences and systems around real operational needs.",
    capabilities: [
      "ERP and enterprise applications",
      "Web and mobile products",
      "Digital innovation and cloud services",
      "UI/UX design and product engineering",
    ],
    links: [
      { label: "Service details", href: "/cutting-edge/" },
      { label: "Product Engineering", href: "/product-engineering/" },
      { label: "UI/UX Design", href: "/UI/UX/" },
    ],
  },
  {
    id: "assurance",
    image: "/images/services/generated/assurance-devsecops.webp",
    imageWidth: 768,
    imageHeight: 960,
    imageAlt: "Abstract layered planes protecting a bright center, representing software assurance and security",
    title: "Assurance & DevSecOps",
    subtitle: "Quality and security through every stage.",
    description:
      "We bring quality engineering, testing, and security practices into the delivery lifecycle so teams can release with greater confidence.",
    capabilities: [
      "Quality engineering",
      "Comprehensive testing and assurance",
      "Security integrated into delivery",
    ],
    links: [
      { label: "Assurance", href: "/assurance/" },
      { label: "DevSecOps", href: "/devsec-ops/" },
    ],
  },
  {
    id: "automation",
    image: "/images/services/generated/intelligent-automation.webp",
    imageWidth: 768,
    imageHeight: 960,
    imageAlt: "Robotic arm guiding components along a precise automated path",
    title: "Intelligent automation",
    subtitle: "Less repetitive work. More room to move.",
    description:
      "We simplify business processes with intelligent workflows and modern delivery practices that reduce manual effort and improve operational flow.",
    capabilities: [
      "Process and workflow automation",
      "DevOps practices",
      "Agile delivery and collaboration",
    ],
    links: [{ label: "Explore Automation", href: "/automate/" }],
  },
  {
    id: "data-analytics",
    image: "/images/services/generated/data-analytics.webp",
    imageWidth: 768,
    imageHeight: 960,
    imageAlt: "Connected data points and flowing light paths representing analytics",
    title: "Data & analytics",
    subtitle: "Turn information into decisions you can act on.",
    description:
      "We connect, organise, and interpret business data through analytics and business intelligence built to support clearer strategic decisions.",
    capabilities: [
      "Data engineering",
      "Advanced analytics",
      "Business intelligence",
    ],
    links: [{ label: "Explore Data & Analytics", href: "/data-analytics/" }],
  },
  {
    id: "delivery",
    image: "/images/services/generated/platform-cicd.webp",
    imageWidth: 768,
    imageHeight: 960,
    imageAlt: "Organized server rack and modular deployment blocks representing platform engineering and CI/CD",
    title: "CI/CD & developer experience",
    subtitle: "Make every change easier to deliver.",
    description:
      "We help teams build reliable delivery pipelines and development platforms that shorten the path from a good idea to production.",
    capabilities: [
      "Continuous integration and delivery",
      "Developer experience",
      "Progressive delivery",
    ],
    links: [{ label: "CI/CD & Dev Experience", href: "/ci-cd-dev/" }],
  },
  {
    id: "reliability",
    image: "/images/services/generated/site-reliability.webp",
    imageWidth: 768,
    imageHeight: 960,
    imageAlt: "Resilient bridge structure spanning a deep gap, representing dependable infrastructure",
    title: "Site reliability engineering",
    subtitle: "Build systems teams can depend on.",
    description:
      "We strengthen the reliability, scalability, and performance of cloud-native services with practical site reliability engineering.",
    capabilities: [
      "Reliability engineering and operations",
      "Cloud-native infrastructure",
      "Performance and scalability",
    ],
    links: [{ label: "SRE Consultancy", href: "/sre-consultancy/" }],
  },
];

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

export default function ServicesPage() {
  return (
    <main className={styles.page}>
      <SiteNav />

      <section className={`hero-gradient-bg ${styles.hero}`}>
        <div className="hero-ascii-word" aria-hidden="true">
          <FlareWord />
        </div>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={styles.heroTitle}>Technology, built to scale</h1>
          <p className={styles.heroDescription}>
            Shuroq designs, builds, and operates the platforms, products, and
            workflows that help enterprise teams move forward.
          </p>
          <div className={styles.heroActions}>
            <Link href="/contact/" className="btn btn-pill btn-black">
              Talk to our team
            </Link>
            <a href="#service-catalog" className={styles.secondaryAction}>
              Explore our services <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>

      <section className={styles.intro} aria-labelledby="catalog-title">
        <div className={`container ${styles.introInner}`}>
          <h2 id="catalog-title" className="section-title">
            Engineering for the work ahead
          </h2>
          <p className="body-lg">
            From a single delivery challenge to a connected technology strategy,
            our teams bring product, platform, data, and operations expertise
            together.
          </p>
          <nav className={styles.serviceIndex} aria-label="Explore service areas">
            {services.map((service) => (
              <a key={service.id} href={`#${service.id}`}>
                {service.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div id="service-catalog" className={styles.catalog}>
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={`${styles.serviceSection} ${
              index % 2 === 1 ? styles.warmSection : ""
            }`}
            aria-labelledby={`${service.id}-title`}
          >
            <div
              className={`container ${styles.serviceRow} ${
                index % 2 === 1 ? styles.reverse : ""
              }`}
            >
              <figure className={`${styles.serviceArtwork} ${styles.reveal}`}>
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  width={service.imageWidth}
                  height={service.imageHeight}
                  sizes="(max-width: 820px) 88vw, 38vw"
                  loading={index === 0 ? "eager" : "lazy"}
                  className={styles.serviceImage}
                />
              </figure>
              <div className={`${styles.serviceCopy} ${styles.reveal}`}>
                <h2 id={`${service.id}-title`} className="section-title">
                  {service.title}
                </h2>
                <p className={styles.serviceSubtitle}>{service.subtitle}</p>
                <p className={styles.serviceDescription}>{service.description}</p>
                <ul className={styles.capabilityList}>
                  {service.capabilities.map((capability) => (
                    <li key={capability}>{capability}</li>
                  ))}
                </ul>
                <div className={styles.serviceLinks}>
                  {service.links.map((link) => (
                    <Link key={link.href} href={link.href}>
                      {link.label} <span aria-hidden="true">↗</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className={styles.cta}>
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <h2 className="section-title">Let’s build together.</h2>
              <p className="body-lg">
                Tell us what you’re working through. We’ll help you find the right
                next step.
              </p>
            </div>
            <Link href="/contact/" className="btn btn-pill btn-white">
              Start a conversation <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter
        className="site-footer-inverted"
        brand={{ name: "Shuroq", href: "/", mark: footerBrandMark }}
        tagline="Technology Services & Digital Engineering Company. Focused on dependable digital systems."
        columns={footerColumns}
        legal={footerLegal}
        socials={footerSocials}
        newsletter={null}
        status={null}
        year={2026}
      />

      <section className={styles.animatedFooter} aria-label="Shuroq closing footer">
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

      <ServicesMotion />
    </main>
  );
}
