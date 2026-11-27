import Link from "next/link";

import { AnimatedFooter } from "@/components/unlumen-ui/animated-footer";
import { SiteFooter } from "@/components/arc/blocks/site-footer/site-footer";
import SiteNav from "@/components/nav/site-nav";

import {
  rubricAudience,
  rubricBenefits,
  rubricFaq,
  rubricRoles,
} from "./skill-rubrics-content";
import { SkillRubricsTable } from "./skill-rubrics-table";
import { SkillRubricsWeights } from "./skill-rubrics-weights";
import styles from "./skill-rubrics-page.module.css";

const footerColumns = [
  {
    title: "Resources",
    links: [
      { label: "Blogs", href: "/blogs" },
      { label: "Events", href: "/events" },
      { label: "Skill Rubrics", href: "/skill-rubrics" },
    ],
  },
  {
    title: "Marketplace",
    links: [
      { label: "Botkube Enterprise", href: "/botkube" },
      { label: "Managed Services for Kubernetes", href: "/kubernetes-services" },
      { label: "Fission", href: "/fission" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const footerLegal = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
];

export default function SkillRubricsPage() {
  return (
    <main className={`${styles.page} arc-industry-tokens arc-service-tokens`}>
      <SiteNav />

      <section className={styles.hero} aria-labelledby="rubrics-title">
        <div className="container">
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.badge}>Cloud native skills framework</p>
              <h1 id="rubrics-title">
                Build the right cloud team with role-based skill rubrics
              </h1>
              <p className={styles.heroLead}>
                Standardize how you hire, evaluate, and grow cloud-native talent
                with practical skill rubrics aligned to real production work.
              </p>
              <div className={styles.heroActions}>
                <Link href="#role-rubrics" className="btn btn-pill btn-black">
                  Explore rubrics
                </Link>
                <Link href="/contact" className="btn btn-pill btn-glass-dark">
                  Talk to us
                </Link>
              </div>
            </div>

            <aside className={styles.scorecard} aria-label="What a rubric contains">
              <h2>What a rubric holds</h2>
              <dl>
                <div>
                  <dt>Roles covered</dt>
                  <dd>{rubricRoles.length} cloud-native roles</dd>
                </div>
                <div>
                  <dt>Competency areas</dt>
                  <dd>
                    {rubricRoles.reduce((total, role) => total + role.competencies.length, 0)}{" "}
                    in total
                  </dd>
                </div>
                <div>
                  <dt>Proficiency levels</dt>
                  <dd>Working, working to advanced, advanced</dd>
                </div>
                <div>
                  <dt>Evidence</dt>
                  <dd>What good looks like, per area</dd>
                </div>
              </dl>
            </aside>
          </div>

          <div className={styles.audience}>
            {rubricAudience.map((item) => (
              <div className={styles.audienceItem} key={item}>
                <strong>For</strong>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.benefits} aria-labelledby="rubrics-benefits">
        <div className="container">
          <header className={styles.lead}>
            <h2 id="rubrics-benefits">How skill rubrics help you</h2>
            <p>
              Get the right cloud skills in minutes, not days — move from
              subjective assessment to measurable capability planning.
            </p>
          </header>
          <div className={styles.benefitGrid}>
            {rubricBenefits.map((benefit, index) => (
              <article className={styles.benefit} key={benefit.title}>
                <span className={styles.benefitIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.rubrics} id="role-rubrics" aria-labelledby="rubrics-role-title">
        <div className="container">
          <div className={styles.rubricsHead}>
            <header className={styles.lead}>
              <h2 id="rubrics-role-title">Role based skill rubrics</h2>
              <p>
                Expand a role to see its competency areas, the level expected, and
                the evidence a hiring manager should look for.
              </p>
            </header>
            <p className={styles.rubricsNote}>
              Check a row to shortlist the areas you want to talk about in an
              interview or a growth plan.
            </p>
          </div>
          <div className={styles.rubricTable}>
            <SkillRubricsTable />
          </div>
        </div>
      </section>

      <section className={styles.weights} aria-labelledby="rubrics-weights">
        <div className="container">
          <header className={styles.lead}>
            <h2 id="rubrics-weights">Where the rubric puts its weight</h2>
            <p>
              A rubric built by cloud-native experts, for cloud-native teams.
              These frameworks reflect field-tested expectations from real
              delivery environments.
            </p>
          </header>
          <div className={styles.weightsInner}>
            <p style={{ margin: 0, color: "var(--muted)", fontSize: 16, lineHeight: 1.65 }}>
              Each tile is one competency area, sized by the share of the role it
              takes. A site reliability engineer spends more time on incident
              response than on writing a post-incident review — and a rubric
              that pretends otherwise will not survive contact with a real
              hiring loop.
            </p>
            <div className={styles.weightsPanel}>
              <SkillRubricsWeights />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="rubrics-faq">
        <div className="container">
          <header className={styles.lead}>
            <h2 id="rubrics-faq">Frequently asked questions</h2>
            <p>What teams ask before they adopt a rubric.</p>
          </header>
          <div className={styles.faqList}>
            {rubricFaq.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="rubrics-cta">
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <h2 id="rubrics-cta">Bring a rubric to your next hiring bar</h2>
              <p>
                We adapt the categories and levels to your role architecture and
                technology stack.
              </p>
            </div>
            <div className={styles.ctaActions}>
              <Link href="/contact" className="btn btn-pill btn-black">
                Talk to our team
              </Link>
              <Link href="/fission" className="btn btn-pill btn-glass-light">
                Find talent on Fission
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
