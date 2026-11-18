"use client";

import type { ReactNode } from "react";
import { Children } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface BentoGridProps {
  children: ReactNode;
  /** Columns on wide screens (collapses to one column on small screens). */
  columns?: number;
  /** Row height in px. */
  rowHeight?: number;
  /** Gap between tiles in px. */
  gap?: number;
  className?: string;
}

export function BentoGrid({
  children,
  columns = 3,
  rowHeight = 176,
  gap = 12,
  className,
}: BentoGridProps) {
  return (
    <div
      className={`group/grid grid w-full grid-cols-1 md:[grid-template-columns:repeat(var(--bento-cols),minmax(0,1fr))] ${className ?? ""}`}
      style={{ "--bento-cols": columns, gridAutoRows: rowHeight, gap } as React.CSSProperties}
    >
      {Children.map(children, (child, index) => (
        <div
          className="min-h-0"
          key={index}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

export interface BentoCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  /** Decorative visual that fills the top of the tile. Style it with `group-hover/bento:` for hover motion. */
  visual?: ReactNode;
  /** Link for the reveal-on-hover call to action. */
  href?: string;
  cta?: string;
  /** Use for spans, e.g. "md:col-span-2 md:row-span-2". */
  className?: string;
}

export function BentoCard({ title, description, icon, visual, href, cta = "Learn more", className }: BentoCardProps) {
  return (
    <div
      data-bento-card
      className={`group/bento relative isolate overflow-hidden rounded-[20px] bg-card text-card-foreground transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-secondary ${className ?? ""}`}
    >
      {visual && (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover/bento:scale-[1.04]"
        >
          {visual}
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4">
        {icon ? (
          <span className="mb-1 grid size-8 origin-bottom-left place-items-center rounded-lg bg-secondary text-foreground transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover/bento:-rotate-6 group-hover/bento:scale-110 [&>svg]:size-4">
            {icon}
          </span>
        ) : null}
        <h3 className="line-clamp-1 text-[15px] font-semibold tracking-[-0.015em] text-foreground">{title}</h3>
        <p className="line-clamp-2 max-w-sm text-[13px] leading-relaxed text-muted-foreground">{description}</p>
        {href && (
          <Link
            href={href}
            className="mt-1 inline-flex w-fit items-center gap-1 rounded text-[13px] font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {cta}
            <ArrowRight className="size-3.5 transition-transform group-hover/bento:translate-x-0.5" />
          </Link>
        )}
      </div>
    </div>
  );
}
