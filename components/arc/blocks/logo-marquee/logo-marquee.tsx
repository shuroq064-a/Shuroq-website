/**
 * Vendored from the Arc UI registry — "Logo marquee" (https://uiarc.dev).
 * Retrieved via the design-master MCP and adapted to this site: it is always
 * rendered in `mono` tone so every mark follows the ink/paper text token, and
 * its Arc design tokens are remapped onto Shuroq tokens by `.arc-industry-tokens`
 * in app/globals.css. The marquee pauses on hover and becomes static under
 * reduced motion; the visible pause button is intentionally omitted.
 */
"use client";

import { useId } from "react";
import styles from "./logo-marquee.module.css";

export interface LogoMarqueeBrand {
  name: string;
  /** Monochrome SVG, drawn as a mask in the text color. */
  icon: string;
  /** Single brand color for the mark in color tone. Leave out for brands whose mark is black or white. */
  color?: string;
  /** Full color SVG for multicolor marks, used in color tone instead of `icon`. */
  colorIcon?: string;
}

export type LogoMarqueeTone = "color" | "mono";

export interface LogoMarqueeProps {
  title?: string;
  description?: string;
  brands?: LogoMarqueeBrand[];
  /** `color` shows each mark in its official colors; `mono` draws every mark in the text color. */
  tone?: LogoMarqueeTone;
}

function BrandMark({ brand, tone }: { brand: LogoMarqueeBrand; tone: LogoMarqueeTone }) {
  if (tone === "color" && brand.colorIcon) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={styles.brandMark} src={brand.colorIcon} alt="" width={22} height={22} draggable={false} />;
  }
  return (
    <span
      className={styles.brandMark}
      style={{ maskImage: `url("${brand.icon}")`, WebkitMaskImage: `url("${brand.icon}")`, color: tone === "color" ? brand.color : undefined }}
      aria-hidden="true"
    />
  );
}

function BrandList({ brands, tone, duplicate = false }: { brands: LogoMarqueeBrand[]; tone: LogoMarqueeTone; duplicate?: boolean }) {
  return (
    <ul className={styles.brandList} aria-label={duplicate ? undefined : "Platforms and tools"} aria-hidden={duplicate || undefined}>
      {brands.map((brand, index) => (
        <li className={styles.brand} key={`${brand.name}-${index}`}>
          <BrandMark brand={brand} tone={tone} />
          <span className={styles.brandName}>{brand.name}</span>
        </li>
      ))}
    </ul>
  );
}

export function LogoMarquee({
  title = "The platforms behind the work",
  description = "A familiar set of clouds, data systems and frameworks stays close to every engagement.",
  brands = [],
  tone = "mono",
}: LogoMarqueeProps) {
  const titleId = useId();

  return (
    <section className={styles.section} data-tone={tone} aria-labelledby={titleId}>
      <div className={styles.intro}>
        <h2 id={titleId}>{title}</h2>
        <p>{description}</p>
      </div>

      <div className={styles.marquee} role="region" aria-label="Platforms and tools">
        <div className={styles.track}>
          <BrandList brands={brands} tone={tone} />
          <BrandList brands={brands} tone={tone} duplicate />
        </div>
      </div>
    </section>
  );
}

export default LogoMarquee;
