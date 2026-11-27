import Link from "next/link";

import SiteNav from "@/components/nav/site-nav";
import { AnimatedFooter } from "@/components/unlumen-ui/animated-footer";
import {
  SiteFooter,
  type SiteFooterColumn,
  type SiteFooterLink,
} from "@/components/arc/blocks/site-footer/site-footer";

import { FissionMatching } from "./fission-matching";
import styles from "./fission-page.module.css";

const footerColumns: SiteFooterColumn[] = [
  {
    title: "Marketplace",
    links: [
      { label: "Botkube Enterprise", href: "/botkube" },
      { label: "Managed Services for Kubernetes", href: "/kubernetes-services" },
      { label: "Fission", href: "/fission" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blogs", href: "/blogs" },
      { label: "Events", href: "/events" },
      { label: "Skill Rubrics", href: "/skill-rubrics" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "The Shuroq Way", href: "/shuroq-way" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const footerLegal: SiteFooterLink[] = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
];

const steps = [
  { title: "Describe your need", text: "Tell us what you need help with in simple terms." },
  { title: "Get matched", text: "Fission finds the professionals who fit your requirements." },
  { title: "View pricing", text: "See transparent pricing and provider information upfront." },
  { title: "Book instantly", text: "Confirm your booking with a few clicks." },
  { title: "Track the work", text: "Follow the delivery and see progress as it happens." },
];

const benefits = [
  {
    title: "Find the right people, quickly",
    text: "Matching weighs discipline, availability and prior work rather than a keyword.",
  },
  {
    title: "Transparent pricing upfront",
    text: "Clear rates and scope before you book. No hidden fees, no surprise line items.",
  },
  {
    title: "A booking process that is quick",
    text: "Book services in minutes through a flow that stays short.",
  },
  {
    title: "Vetted providers only",
    text: "Every professional is reviewed before they appear in a search result.",
  },
  {
    title: "Secure end to end",
    text: "Encrypted platform, protected data and documented payments.",
  },
];

export default function FissionPage() {
  return (
    <main className={`${styles.page} arc-industry-tokens arc-service-tokens`}>
      <SiteNav />

      <section className={styles.hero} aria-labelledby="fission-title">
        <div className="container">
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>Fission</p>
            <h1 id="fission-title">The AI marketplace for people who ship</h1>
            <p className={styles.heroLead}>
              Connect with trusted professionals instantly — smart matching,
              transparent pricing, seamless booking.
            </p>
            <div className={styles.matchBar}>
              <div className={styles.matchField}>
                <span>What you need</span>
                <strong>A Kubernetes platform for 40 engineers</strong>
              </div>
              <div className={styles.matchField}>
                <span>When</span>
                <strong>This quarter</strong>
              </div>
              <div className={styles.matchField}>
                <span>Budget</span>
                <strong>Scoped before booking</strong>
              </div>
              <button type="button" className={styles.matchButton}>
                Find a match
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.flow} aria-labelledby="fission-flow">
        <div className="container">
          <header className={styles.lead}>
            <h2 id="fission-flow">How it works</h2>
            <p>Five steps from a plain description of the work to a booked expert.</p>
          </header>
          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.experts} aria-labelledby="fission-experts">
        <div className="container">
          <div className={styles.expertsHead}>
            <header className={styles.lead}>
              <h2 id="fission-experts">Experts you can book this week</h2>
              <p>
                Sort by rating, rate, or reviews. Select the ones you want to
                compare and the platform holds them for you.
              </p>
            </header>
            <p className={styles.expertsNote}>
              Every listing below passed the same vetting: identity, references,
              and a sample of delivered work.
            </p>
          </div>
          <div className={styles.expertTable}>
            <FissionMatching />
          </div>
        </div>
      </section>

      <section className={styles.benefits} aria-labelledby="fission-benefits">
        <div className="container">
          <header className={styles.lead}>
            <h2 id="fission-benefits">Key benefits</h2>
            <p>Why teams book through Fission instead of a spreadsheet of contacts.</p>
          </header>
          <div className={styles.benefitStrip}>
            {benefits.map((benefit) => (
              <article className={styles.benefit} key={benefit.title}>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="fission-cta">
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <h2 id="fission-cta">Find the perfect service provider today.</h2>
              <p>
                Experience smart matching, transparent pricing, and seamless
                booking.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link href="/contact" className="btn btn-pill btn-black">
                Talk to our team
              </Link>
              <Link href="/events" className="btn btn-pill btn-glass-light">
                Meet us at an event
              </Link>
            </div>
          </div>
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
