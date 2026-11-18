"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";

export interface MotionCardItem {
  id: string;
  title: string;
  description?: string;
  image?: string;
  tags?: string[];
  icon?: ReactNode;
  /** Makes the whole card a link. */
  href?: string;
}

export interface MotionCardsProps {
  items: MotionCardItem[];
  /** Label of the "show everything" filter; empty string hides it. */
  allLabel?: string;
  /** Grid columns on wide screens. */
  columns?: number;
  /** Seconds between each card's entrance. */
  stagger?: number;
  /** Spring bounce for entrances and reordering, 0 to 0.5. */
  bounce?: number;
  /** Show the tag filter bar. */
  showFilter?: boolean;
  onFilterChange?: (tag: string | null) => void;
  className?: string;
}

/**
 * A card grid that springs in with a stagger and, when filtered by tag, lets leaving cards
 * shrink away while the rest glide into their new cells.
 */
function CardBody({ item, tag }: { item: MotionCardItem; tag: string | null }) {
  return (
    <>
      {item.image && (
      <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] bg-muted">
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 34vw"
            draggable={false}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-4 text-card-foreground">
        <div className="min-w-0">
          {item.icon && <span className="mb-2 grid size-9 place-items-center rounded-xl bg-secondary text-foreground [&>svg]:size-[18px]">{item.icon}</span>}
          <h3 className="mt-1 text-[15px] font-semibold leading-snug tracking-[-0.015em] text-foreground">{item.title}</h3>
        </div>
        {item.description && <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-muted-foreground">{item.description}</p>}
        {item.tags && item.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {item.tags.map((t) => (
              <span key={t} className={`rounded-full px-2 py-0.5 text-[10px] ${t === tag ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export function MotionCards({
  items,
  allLabel = "All",
  columns = 4,
  stagger = 0.06,
  bounce = 0.25,
  showFilter = true,
  onFilterChange,
  className,
}: MotionCardsProps) {
  const [tag, setTag] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const uid = useId();
  const tags = useMemo(() => [...new Set(items.flatMap((i) => i.tags ?? []))], [items]);
  const shown = tag ? items.filter((i) => i.tags?.includes(tag)) : items;
  const spring = reduce ? { duration: 0 } : { type: "spring" as const, bounce, duration: 0.6 };

  const pick = (t: string | null) => {
    setTag(t);
    onFilterChange?.(t);
  };

  const filters: [string | null, string][] = [...(allLabel ? [[null, allLabel] as [null, string]] : []), ...tags.map((t) => [t, t] as [string, string])];

  return (
    <div className={`flex w-full flex-col gap-5 ${className ?? ""}`}>
      {showFilter && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <LayoutGroup id={uid}>
                <div role="group" aria-label="Filter by tag" className="flex flex-wrap gap-1 rounded-full bg-secondary p-1">
              {filters.map(([value, label]) => {
                const on = tag === value;
                return (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={on}
                    onClick={() => pick(value)}
                    className={`relative rounded-full px-3.5 py-1.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring ${
                      on ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {on && <motion.span layoutId="pill" transition={spring} className="absolute inset-0 rounded-full bg-background" />}
                    <span className="relative">{label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
          <p aria-live="polite" className="text-sm tabular-nums text-muted-foreground">
            {shown.length} {shown.length === 1 ? "item" : "items"}
          </p>
        </div>
      )}

      <ul className="grid gap-3" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, max(150px, calc((100% - ${(columns - 1) * 12}px) / ${columns}))), 1fr))` }}>
        <AnimatePresence mode="popLayout" initial={!reduce}>
          {shown.map((item, i) => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.92, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.85, filter: "blur(6px)", transition: { duration: reduce ? 0 : 0.25 } }}
              transition={reduce ? { duration: 0 } : { ...spring, delay: Math.min(i, 8) * stagger, layout: spring }}
              whileHover={reduce ? undefined : { y: -4 }}
              className="group overflow-hidden rounded-[20px] bg-card text-card-foreground transition-colors hover:bg-secondary"
            >
              {item.href ? (
                <Link href={item.href} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <CardBody item={item} tag={tag} />
                </Link>
              ) : (
                <CardBody item={item} tag={tag} />
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
