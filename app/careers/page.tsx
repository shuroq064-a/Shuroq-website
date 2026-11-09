import type { Metadata } from "next";
import Image from "next/image";
import SiteNav from "@/components/nav/site-nav";
import { FloatingAsciiWord } from "@/components/hero/floating-ascii-word";
import { Carousel_001, type CarouselSlide } from "@/components/skiper/skiper47";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { OrganicCardSmall } from "@/components/ui/organic-card-small";
import { AnimatedFooter } from "@/components/unlumen-ui/animated-footer";
import {
  SiteFooter,
  type SiteFooterColumn,
  type SiteFooterLink,
} from "@/components/arc/blocks/site-footer/site-footer";

export const metadata: Metadata = {
  title: "Careers — Shuroq",
  description:
    "Join Shuroq's team and build your career in technology. Explore internship opportunities in ML and DevOps.",
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

const whyWork: CarouselSlide[] = [
  { src: "/images/careers/career-1.png", alt: "Life at Shuroq" },
  { src: "/images/careers/career-2.png", alt: "Life at Shuroq" },
  { src: "/images/careers/career-3.png", alt: "Life at Shuroq" },
  { src: "/images/careers/career-4.png", alt: "Life at Shuroq" },
  { src: "/images/careers/career-5.png", alt: "Life at Shuroq" },
  { src: "/images/careers/career-6.png", alt: "Life at Shuroq" },
  { src: "/images/careers/career-7.png", alt: "Life at Shuroq" },
  { src: "/images/careers/career-8.png", alt: "Life at Shuroq" },
  { src: "/images/careers/career-9.png", alt: "Life at Shuroq" },
];

const steps = [
  {
    title: "Submit Application",
    desc: "Send your resume and cover letter to our careers email with the position title in the subject line.",
  },
  {
    title: "Initial Screening",
    desc: "Our team reviews your application and assesses your fit for the position.",
  },
  {
    title: "Technical Interview",
    desc: "Technical assessment and interview with our team members.",
  },
  {
    title: "Final Decision",
    desc: "We will notify you of our decision and discuss next steps.",
  },
];

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

export default function CareersPage() {
  return (
    <main>
      <SiteNav />

      {/* Hero — same black panel as home and about, with the floating ASCII word */}
      <section
        className="hero-gradient-bg"
        style={{ marginTop: -80, padding: "250px 0 160px" }}
      >
        <div className="hero-ascii-word" aria-hidden>
          <FloatingAsciiWord word="Careers" />
        </div>
        <div className="container">
          <h1 className="hero-headline">
            <span className="hero-headline-text">Build your career with Shuroq</span>
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
            A collaborative environment where talented professionals work on impactful
            projects, modern technologies, and scalable digital solutions.
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 40, flexWrap: "wrap" }}>
            <a
              href="mailto:hr-team@shuroq.com?subject=Application"
              className="btn btn-pill btn-black"
            >
              Apply now
            </a>
            <a href="/about/" className="btn btn-pill btn-glass-dark">
              About Shuroq
            </a>
          </div>
        </div>
      </section>

      {/* Why Work With Shuroq — text on the left, perspective carousel on the right. */}
      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div>
            <h2 className="section-title">Why Work With Shuroq</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              Drag through nine reasons people choose to build their careers here.
            </p>
          </div>
          <div style={{ minWidth: 0 }}>
            <Carousel_001
              images={whyWork}
              showPagination={true}
              showNavigation={false}
              loop={true}
              autoplay={true}
              spaceBetween={12}
            />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Application Process — real ordered steps, numbers from a list, no icon chips */}
      <section className="section" style={{ background: "var(--surface-warm)" }}>
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div style={{ position: "sticky", top: 96 }}>
            <h2 className="section-title">Application Process</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              Four steps from application to decision.
            </p>
          </div>
          <Accordion
            type="multiple"
            variant="filled"
            indicator="plus"
            defaultValue={steps.map((_, i) => String(i))}
            className="w-full"
          >
            {steps.map((s, i) => (
              <AccordionItem key={s.title} value={String(i)}>
                <AccordionTrigger>
                  <span style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                    <span className="subheading" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span>{s.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent>{s.desc}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <SectionDivider />

      {/* How to Apply — same two-column section rhythm as the rest of the page. */}
      <section className="section">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div>
            <h2 className="section-title">How to Apply</h2>
            <p className="body-lg" style={{ marginTop: 16, color: "var(--muted)" }}>
              Send your resume to our careers email. We review every application and
              reply with the next steps.
            </p>
          </div>
          <OrganicCardSmall
            className="max-w-none"
            category="Careers"
            date="Open"
            href="mailto:hr-team@shuroq.com?subject=Application"
            image="/images/careers/how-to-apply.png"
            imageAlt="Shuroq team collaborating around a table"
            title="Send your resume to hr-team@shuroq.com"
            cta="Send your resume"
          />
        </div>
      </section>

      <SectionDivider />

      {/* CTA — same closing block as home and about */}
      <section
        className="section"
        style={{ background: "var(--fg)", color: "var(--bg)", textAlign: "center" }}
      >
        <div className="container">
          <h2 className="section-title" style={{ color: "var(--bg)" }}>
            Ready to Start Your Journey
          </h2>
          <p
            className="body-lg"
            style={{ marginTop: 16, color: "rgba(255,255,255,0.7)" }}
          >
            Join Shuroq and be part of innovative technology solutions that shape the
            future.
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
