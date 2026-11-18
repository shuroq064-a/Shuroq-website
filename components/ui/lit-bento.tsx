"use client";

import { useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface BentoItem {
  title: string;
  description: string;
  visual?: ReactNode;
  tags?: string[];
}

export interface LitBentoProps {
  items: BentoItem[];
  className?: string;
  filterMode?: boolean;
  allLabel?: string;
}

export function LitBento({ items, className, filterMode = false, allLabel = "All" }: LitBentoProps) {
  const reduce = useReducedMotion();
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const tags = [...new Set(items.flatMap((item) => item.tags ?? []))];
  const visibleItems = activeTag ? items.filter((item) => item.tags?.includes(activeTag)) : items;

  return (
    <div className={`grid w-full grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4 ${className ?? ""}`}>
      {filterMode && tags.length > 0 && (
        <div className="col-span-full mb-2 flex flex-wrap gap-1 rounded-full bg-secondary p-1" role="group" aria-label="Filter data capabilities">
          {[allLabel, ...tags].map((tag) => {
            const value = tag === allLabel ? null : tag;
            const active = activeTag === value;
            return (
              <button
                key={tag}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveTag(value)}
                className={`relative rounded-full px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${active ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {active && <motion.span layoutId="data-filter" transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.12, duration: 0.45 }} className="absolute inset-0 rounded-full bg-background" />}
                <span className="relative">{tag}</span>
              </button>
            );
          })}
        </div>
      )}
      {visibleItems.map((item, index) => (
        <motion.article
          key={item.title}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.4, delay: index * 0.04 }}
          className="group relative flex min-h-48 flex-col justify-end overflow-hidden rounded-[20px] bg-card p-5 transition-colors hover:bg-secondary md:min-h-56"
        >
          {item.visual && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-end opacity-20 transition-opacity duration-500 group-hover:opacity-35 [&>svg]:h-full [&>svg]:w-1/2">
              {item.visual}
            </div>
          )}
          <div className="relative">
            <h3 className="text-base font-semibold tracking-[-0.02em] text-foreground">{item.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
