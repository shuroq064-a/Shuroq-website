import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AnimatedFooter } from "@/components/unlumen-ui/animated-footer";
import { SiteFooter } from "@/components/arc/blocks/site-footer/site-footer";
import SiteNav from "@/components/nav/site-nav";

import type { BlogArticle } from "./blogs-content";
import { blogFooterColumns, blogFooterLegal } from "./blogs-content";
import styles from "./blog-article-page.module.css";

const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export default function BlogArticlePage({
  post,
  related,
}: {
  post: BlogArticle;
  related: BlogArticle[];
}) {
  return (
    <main className={`${styles.page} arc-industry-tokens arc-service-tokens`}>
      <SiteNav />

      <article>
        <header className={styles.hero}>
          <div className="container">
            <Link href="/blogs" className={styles.back}>
              <ArrowLeft size={16} aria-hidden="true" /> All articles
            </Link>
            <span className={styles.category}>{post.category}</span>
            <h1>{post.title}</h1>
            <p className={styles.excerpt}>{post.excerpt}</p>
            <div className={styles.byline}>
              <span className={styles.bylineAuthor}>
                {/* eslint-disable-next-line @next/next/no-img-element -- plain images keep the article portable outside Next.js. */}
                <img src={post.author.avatar} alt="" width={38} height={38} />
                <span>
                  <strong>{post.author.name}</strong>
                  <span>{post.author.role}</span>
                </span>
              </span>
              <span className={styles.bylineFacts}>
                <time dateTime={post.date}>{dateFormat.format(new Date(`${post.date}T00:00:00Z`))}</time>
                <span>{post.readTime} min read</span>
              </span>
            </div>
          </div>
        </header>

        <div className={styles.body}>
          <div className={`container ${styles.bodyInner}`}>
            <div className={styles.article}>
              {post.blocks.map((block, index) => {
                if (block.kind === "h2") return <h2 key={index}>{block.text}</h2>;
                if (block.kind === "list") {
                  return (
                    <ul key={index}>
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={index}>{block.text}</p>;
              })}
            </div>

            <aside className={styles.related} aria-label="More articles">
              <h2>More from the journal</h2>
              <ul>
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/blogs/${item.slug}`}>
                      {item.title}
                      <span>
                        {item.category} · {item.readTime} min read
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </article>

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
