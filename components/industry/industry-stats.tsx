"use client";

import { useEffect, useMemo, useRef } from "react";
import type { CSSProperties } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

import type { IndustryStat } from "./industry-data";
import styles from "./industry-stats.module.css";

interface IndustryStatsProps {
  stats: IndustryStat[];
  title: string;
  description?: string;
  className?: string;
}

/** Format a value once for the sizer, then again on every animation frame. */
function makeFormatter(stat: IndustryStat) {
  if (stat.compact) {
    const compact = new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => compact.format(value);
  }
  const decimals = stat.decimals ?? 0;
  const digits = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (value: number) => digits.format(value);
}

function CountUp({
  stat,
  run,
  reduced,
}: {
  stat: IndustryStat;
  run: boolean;
  reduced: boolean;
}) {
  const live = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  const format = useMemo(() => makeFormatter(stat), [stat]);
  const final = format(stat.value);

  useEffect(() => {
    const node = live.current;
    if (!node) return;
    if (reduced) {
      node.textContent = final;
      done.current = true;
      return;
    }
    if (!run || done.current) return;

    const controls = animate(0, stat.value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = format(latest);
      },
      onComplete: () => {
        node.textContent = final;
        done.current = true;
      },
    });
    return () => controls.stop();
  }, [run, reduced, stat.value, final, format]);

  return (
    <>
      <span className={styles.srOnly}>
        {stat.prefix}
        {final}
        {stat.suffix}
      </span>
      <span className={styles.number} aria-hidden="true">
        {stat.prefix && <span className={styles.affix}>{stat.prefix}</span>}
        <span className={styles.digits}>
          <span className={styles.sizer}>{final}</span>
          <span ref={live} className={styles.live}>
            {final}
          </span>
        </span>
        {stat.suffix && <span className={styles.affix}>{stat.suffix}</span>}
      </span>
    </>
  );
}

/**
 * The count-up impact band. Adapted from the design-master `@uiarc/stats-band`
 * pattern to this site's own tokens: hairlines instead of tinted visuals, one
 * ember-free palette, and a static state under reduced motion.
 */
export function IndustryStats({
  stats,
  title,
  description,
  className,
}: IndustryStatsProps) {
  const list = useRef<HTMLDListElement>(null);
  const inView = useInView(list, { once: true, amount: 0.4 });
  const reduced = Boolean(useReducedMotion());

  return (
    <section
      className={[styles.band, className].filter(Boolean).join(" ")}
      data-in-view={inView || reduced ? "" : undefined}
      aria-label={title}
    >
      <div className="container">
        <header className={styles.header}>
          <h2 className="section-title">{title}</h2>
          {description && <p className={styles.description}>{description}</p>}
        </header>
        <dl ref={list} className={styles.stats} style={{ "--count": stats.length } as CSSProperties}>
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={styles.stat}
              style={{ "--i": index } as CSSProperties}
              tabIndex={stat.context ? 0 : undefined}
              data-context={stat.context && stat.detail ? "" : undefined}
            >
              <dt className={styles.label}>{stat.label}</dt>
              <dd className={styles.figure}>
                <CountUp stat={stat} run={inView} reduced={reduced} />
              </dd>
              {(stat.detail || stat.context) && (
                <dd className={styles.caption}>
                  {stat.detail && <span className={styles.detail}>{stat.detail}</span>}
                  {stat.context && <span className={styles.context}>{stat.context}</span>}
                </dd>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
