import { AnimatedFooter } from "@/components/unlumen-ui/animated-footer";
import { SiteFooter } from "@/components/arc/blocks/site-footer/site-footer";
import { NewsletterSignup } from "@/components/arc/blocks/newsletter-signup/newsletter-signup";
import SiteNav from "@/components/nav/site-nav";

import { BlogsIndex } from "./blogs-index";
import { blogFooterColumns, blogFooterLegal } from "./blogs-content";
import styles from "./blogs-page.module.css";

export default function BlogsPage() {
  return (
    <main className={`${styles.page} arc-industry-tokens arc-service-tokens`}>
      <SiteNav />

      <section className={styles.hero} aria-labelledby="blogs-title">
        <div className="container">
          <div className={styles.masthead}>
            <div>
              <p className={styles.eyebrow}>The journal</p>
              <h1 id="blogs-title">Insights &amp; engineering excellence</h1>
              <p className={styles.standfirst}>
                Explore our expertise in Product Engineering, Platform
                Engineering, SRE, and DevSecOps — written by the people who run
                it, not by a content team.
              </p>
            </div>
            <dl className={styles.heroMeta}>
              <div>
                <dt>Articles</dt>
                <dd>5</dd>
              </div>
              <div>
                <dt>Practices covered</dt>
                <dd>5</dd>
              </div>
              <div>
                <dt>Latest</dt>
                <dd>Mar 5, 2026</dd>
              </div>
              <div>
                <dt>Written by</dt>
                <dd>The delivery teams</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <hr className={styles.rule} />

      <section className={styles.index} aria-label="Articles">
        <BlogsIndex />
      </section>

      <section className={styles.subscribe} aria-labelledby="blogs-subscribe">
        <div className="container">
          <div className={styles.subscribeInner}>
            <div className={styles.subscribeCopy}>
              <h2 id="blogs-subscribe">One email when something is worth sending</h2>
              <p>
                New articles, event invitations and the occasional note from a
                platform team. No drip sequence, no growth hacks — just the
                writing.
              </p>
            </div>
            <div className={styles.subscribeCard}>
              <NewsletterSignup
                variant="inline"
                title="Get the next article by email"
                description="A short digest of new posts from the Shuroq engineering teams."
                placeholder="name@company.com"
                buttonLabel="Subscribe"
                privacyNote="Unsubscribe with one click. We never sell the list."
                privacyLink={{ label: "Privacy policy", href: "/privacy/" }}
                publication={null}
                readers={null}
              />
            </div>
          </div>
        </div>
      </section>

      <SiteFooter
        className="site-footer-inverted service-page-footer"
        brand={{ name: "Shuroq", href: "/", mark: null }}
        tagline="Technology Services & Digital Engineering Company. Focused on dependable digital systems."
        columns={blogFooterColumns}
        legal={blogFooterLegal}
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
