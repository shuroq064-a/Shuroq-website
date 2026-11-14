import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/nav/site-nav";
import { FlareWord } from "@/components/hero/flare/flare-word";
import { AnimatedFooter } from "@/components/unlumen-ui/animated-footer";
import {
  SiteFooter,
  type SiteFooterColumn,
  type SiteFooterLink,
} from "@/components/arc/blocks/site-footer/site-footer";
import {
  ContactChannelsSection,
  ContactFormSection,
} from "@/components/contact/contact-panels";

export const metadata: Metadata = {
  title: "Contact — Shuroq",
  description:
    "Talk to Shuroq about cloud, DevOps, data and product engineering. We read every message and reply within one business day.",
};

const footerColumns: SiteFooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "Automation", href: "/automate" },
      { label: "Data & Analytics", href: "/Data%20Analytics/" },
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
      { label: "Service Mesh", href: "/service-mesh/" },
      { label: "Progressive Delivery", href: "/progressive-delivery/" },
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

/** Shuroq company logo beside the footer wordmark. */
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

/* Small centered hairline that closes each section. */
function SectionDivider() {
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

export default function ContactPage() {
  return (
    <main>
      <SiteNav />

      {/* Hero — same black panel as home, about, careers and the Shuroq Way */}
      <section
        className="hero-gradient-bg"
        style={{ marginTop: -80, padding: "250px 0 160px" }}
      >
        <div className="hero-ascii-word" aria-hidden>
          <FlareWord />
        </div>
        <div className="container">
          <h1 className="hero-headline">
            <span className="hero-headline-text">Let&rsquo;s build what scales</span>
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              maxWidth: 560,
              marginTop: 12,
              fontSize: 16,
              lineHeight: 1.5,
            }}
          >
            Modernising operations, automating workflows or replacing a system
            that no longer scales. Tell us what you are trying to move and we
            will bring the engineering.
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap" }}>
            <a href="#talk" className="btn btn-pill btn-black">
              Send a message
            </a>
            <a href="mailto:contact@shuroq.com" className="btn btn-pill btn-glass-dark">
              contact@shuroq.com
            </a>
          </div>
        </div>
      </section>

      {/* The form — Arc contact section on paper */}
      <section className="section arc-contact" id="talk" style={{ paddingBottom: 0 }}>
        <ContactFormSection />
      </section>

      <SectionDivider />

      {/* Channels — email, phone, office and support hours on warm paper */}
      <section className="section arc-contact" style={{ background: "var(--surface-warm)" }}>
        <ContactChannelsSection />
      </section>

      {/* CTA — same closing block as home, about and careers */}
      <section
        className="section"
        style={{ background: "var(--fg)", color: "var(--bg)", textAlign: "center" }}
      >
        <div className="container">
          <h2 className="section-title" style={{ color: "var(--bg)" }}>
            Start with one conversation.
          </h2>
          <p
            className="body-lg"
            style={{ marginTop: 16, color: "rgba(255,255,255,0.7)" }}
          >
            Bring the messy part. We will bring the plan, the architecture and
            the people to deliver it.
          </p>
          <div style={{ marginTop: 32 }}>
            <a href="mailto:contact@shuroq.com" className="btn btn-pill btn-white">
              Email us
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
