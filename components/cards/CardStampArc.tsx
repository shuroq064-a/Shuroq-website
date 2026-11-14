"use client";

/**
 * CardStampArc — Amicro.
 *
 * Upstream: https://github.com/Subhan-code/Amicro--Micro-transitions- — MIT.
 * Installed via the shadcn registry item `@amicro/card-stamp-arc`
 * (https://amicro.dev). Vendored here under the Shuroq design system:
 *
 *  - the upstream colour swatches (red / blue / emerald / amber / purple) are
 *    dropped — this site runs on ink, paper and warm paper only, so every stamp
 *    is a black card that reads the same in both themes;
 *  - each stamp can carry its own heading and one line of copy, so the arc can
 *    hold real content instead of empty tiles;
 *  - hovering a single stamp pops it to the front and lifts it clear of the
 *    cards it overlaps, so covered copy stays readable;
 *  - the fan collapses to a static deck under `prefers-reduced-motion`, and
 *    becomes a plain stacked list when the viewport is too narrow for the arc.
 *
 * Keep the attribution above — the upstream licence asks for credit.
 */

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";

export interface CardStampArcItem {
  /** Bold heading on the stamp. */
  title: string;
  /** One short line under the heading. */
  description?: string;
  /** Small label at the top of the stamp. Defaults to the card number. */
  eyebrow?: string;
  /** Poster image that fills the space between the rule and the copy. */
  image?: string;
  /** Turns the stamp into a link. */
  href?: string;
}

export interface CardStampArcProps {
  /** Radial arc angle curvature. */
  arc?: number;
  /** Spread offset distance of the outer stamps. */
  spread?: number;
  /** Vertical offset of the outer stamps. */
  yOffset?: number;
  /** Duration in seconds of the copy fade. */
  duration?: number;
  /** Scale the whole fan by this factor. */
  hoverIntensity?: number;
  /** Additional CSS classes for the wrapper. */
  className?: string;
  /** Forces the spread state on or off. */
  hovered?: boolean;
  /** Copy for each stamp, in order. */
  items?: CardStampArcItem[];
  /** Stamp size in pixels. */
  cardWidth?: number;
  cardHeight?: number;
  /** Optional background image per stamp. */
  images?: string[];
}

export const CardStampArc = React.memo(function CardStampArc({
  arc = 18,
  spread = 300,
  yOffset = 84,
  duration = 0.25,
  hoverIntensity = 1,
  className = "",
  hovered,
  items = [],
  cardWidth = 260,
  cardHeight = 380,
  images = [],
}: CardStampArcProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [poppedCard, setPoppedCard] = React.useState<number | null>(null);
  const [viewportWidth, setViewportWidth] = React.useState(0);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  const active = hovered !== undefined ? hovered : isHovered;

  React.useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Reduced motion keeps the deck closed and still.
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // The arc needs room for the cards, for the sideways swing of the rotation
  // and for the page gutters. Below that it becomes a stacked list, which
  // stays readable. Reduced motion takes the same path: a static list, never
  // an animation.
  const radians = (arc * Math.PI) / 180;
  const halfSpan =
    spread + cardWidth * Math.cos(radians) + cardHeight * Math.sin(radians);
  const stacked =
    reducedMotion || (viewportWidth > 0 && viewportWidth < halfSpan * 2 + 80);

  const spreadOpen = active && !reducedMotion && !stacked;

  const stamps = React.useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        dist: i - 2,
        item: items[i],
        image: images[i % images.length],
      })),
    [items, images],
  );

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setPoppedCard(null);
      }}
      className={`group relative flex items-center justify-center ${
        stacked ? "w-full flex-col gap-3" : "mx-auto"
      } ${className}`}
      style={stacked ? undefined : { width: cardWidth, height: cardHeight }}
    >
      {stamps.map(({ id, dist, item, image }) => {
        let targetRotate = 0;
        let targetX = 0;
        let targetY = 0;

        if (spreadOpen) {
          if (id === 0) {
            targetRotate = -1 * arc;
            targetX = -1 * spread;
            targetY = yOffset;
          } else if (id === 1) {
            targetRotate = -0.48 * arc;
            targetX = -0.5 * spread;
            targetY = 0.25 * yOffset;
          } else if (id === 2) {
            targetRotate = 0;
            targetX = 0;
            targetY = -0.25 * yOffset;
          } else if (id === 3) {
            targetRotate = 0.48 * arc;
            targetX = 0.5 * spread;
            targetY = 0.25 * yOffset;
          } else if (id === 4) {
            targetRotate = arc;
            targetX = spread;
            targetY = yOffset;
          }

          targetRotate *= hoverIntensity;
          targetX *= hoverIntensity;
          targetY *= hoverIntensity;
        } else if (!stacked) {
          // Closed: a tight deck with the edges tipped out, so it reads as a
          // stack of cards rather than a single flat panel.
          targetRotate = dist * 0.7;
          targetX = dist * 5;
        }

        // The stamp under the pointer comes to the front and lifts clear of
        // the cards it overlaps, so its own copy can be read.
        const popped = poppedCard === id;
        const popLift = popped ? -32 : 0;

        const springConfig = {
          type: "spring" as const,
          stiffness: 180,
          damping: 23,
          mass: 0.8,
        };

        const body = (
          <>
            <span className="block">
              <span className="block font-mono text-[12px] uppercase tracking-[0.06em] text-[var(--stamp-eyebrow)]">
                {item?.eyebrow ?? String(id + 1).padStart(2, "0")}
              </span>
              <span className="mt-3 block h-px w-full bg-[var(--stamp-rule)]" />
            </span>
            {item?.image ? (
              <span className="relative mt-4 block min-h-0 flex-1 overflow-hidden rounded-2xl">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 260px"
                  className="object-cover"
                />
              </span>
            ) : null}
            <span className="mt-4 block">
              {item?.title ? (
                <span className="block font-semibold text-[var(--stamp-fg)] text-[18px] leading-[1.25] tracking-[-0.26px]">
                  {item.title}
                </span>
              ) : null}
              {item?.description ? (
                <span className="mt-3 block text-[16px] leading-[1.4] text-[var(--stamp-muted)]">
                  {item.description}
                </span>
              ) : null}
            </span>
          </>
        );

        // While the deck is closed only the top card carries copy — otherwise
        // the cards behind it leak fragments of their own text past the edge.
        const copyVisible = stacked || active || id === 0;

        return (
          <motion.div
            key={id}
            onMouseEnter={() => setPoppedCard(id)}
            onMouseLeave={() =>
              setPoppedCard((current) => (current === id ? null : current))
            }
            animate={{
              rotate: targetRotate,
              x: targetX,
              y: targetY + popLift,
              scale: popped ? 1.04 : spreadOpen ? (dist === 0 ? 1.05 : 1) : 1,
              // The stacking order is animated too. Flipping it instantly made
              // the stamp jump in front of its neighbours while it was still
              // lifting, which read as a snap instead of a movement.
              zIndex: popped ? 20 : 5 - id,
            }}
            transition={{
              ...springConfig,
              zIndex: { type: "tween", duration: 0.3, ease: "easeOut" },
            }}
            style={{
              originX: 0.5,
              originY: 1,
              willChange: "transform",
              backgroundImage: image ? `url(${image})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className={`overflow-hidden rounded-3xl border-2 border-dashed border-[var(--stamp-border)] bg-[var(--stamp-card)] text-[var(--stamp-fg)] shadow-[0_4px_16px_rgba(0,0,0,0.08)] transition-[border-color,box-shadow] duration-200 hover:border-[var(--stamp-rim)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.28)] ${
              stacked ? "relative w-full" : "absolute inset-0"
            } ${item?.href ? "cursor-pointer" : ""}`}
          >
            {item?.href ? (
              <a
                href={item.href}
                className={`flex w-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  stacked ? "" : "h-full"
                }`}
              >
                <motion.span
                  className={`flex w-full flex-col justify-between p-5 ${
                    stacked ? "" : "h-full"
                  }`}
                  initial={false}
                  animate={{ opacity: copyVisible ? 1 : 0 }}
                  transition={{ duration }}
                >
                  {body}
                </motion.span>
              </a>
            ) : (
              <div
                className={`flex w-full ${
                  stacked ? "" : "h-full"
                }`}
              >
                <motion.span
                  className={`flex w-full flex-col justify-between p-5 ${
                    stacked ? "" : "h-full"
                  }`}
                  initial={false}
                  animate={{ opacity: copyVisible ? 1 : 0 }}
                  transition={{ duration }}
                >
                  {body}
                </motion.span>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
});
