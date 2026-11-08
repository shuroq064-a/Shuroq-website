"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export interface StickyCardStackCard {
  id: number | string;
  image: string;
  alt?: string;
}

export interface StickyCardStackProps {
  cards: StickyCardStackCard[];
  /** Additional classes on the scroll section. */
  className?: string;
  /** Additional classes on the card frame. */
  containerClassName?: string;
  /** Additional classes on each image. */
  imageClassName?: string;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Sticky card deck. The section holds a CSS-sticky frame while the scroll
 * position drives the transition: every poster keeps the same size and simply
 * slides up over the previous one. A ticker lerp keeps the motion soft between
 * scroll events.
 * Adapted from Skiper UI's StickyCard002.
 */
export function StickyCardStack({
  cards,
  className,
  containerClassName,
  imageClassName,
}: StickyCardStackProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || cards.length === 0) return;

    const imageElements = imageRefs.current.filter(
      (el): el is HTMLDivElement => el !== null,
    );
    if (imageElements.length === 0) return;

    let targetProgress = 0;
    let currentProgress = 0;

    const timeline = gsap.timeline({ paused: true, defaults: { ease: "none" } });

    gsap.set(imageElements[0], { yPercent: 0 });
    for (let i = 1; i < imageElements.length; i += 1) {
      // A hair past 100% so subpixel rounding never shows the next poster's
      // edge as a thin line under the resting card.
      gsap.set(imageElements[i], { yPercent: 101.5 });
    }

    // All cards keep the exact same footprint; each new poster simply slides
    // up over the previous one.
    for (let i = 0; i < imageElements.length - 1; i += 1) {
      timeline.to(imageElements[i + 1], { yPercent: 0, duration: 1 }, i);
    }

    const readScroll = () => {
      const rect = root.getBoundingClientRect();
      const scrollRange = rect.height - window.innerHeight;
      targetProgress =
        scrollRange > 0 ? clamp(-rect.top / scrollRange, 0, 1) : 0;
    };

    readScroll();
    currentProgress = targetProgress;
    timeline.progress(currentProgress);

    const tick = () => {
      const delta = targetProgress - currentProgress;
      if (Math.abs(delta) < 0.0004) return;
      currentProgress += delta * 0.16;
      timeline.progress(currentProgress);
    };

    gsap.ticker.add(tick);
    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("resize", readScroll);

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("resize", readScroll);
      timeline.kill();
    };
  }, [cards]);

  return (
    <div
      ref={rootRef}
      className={cn("relative w-full", className)}
      style={{ height: `${cards.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center px-4 py-6 lg:px-8">
        <div
          className={cn(
            "relative aspect-[4/5] h-[64%] w-auto max-w-[86vw] overflow-hidden rounded-2xl shadow-[0_32px_90px_-40px_rgba(0,0,0,0.5)]",
            containerClassName,
          )}
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              className="absolute inset-0 overflow-hidden rounded-2xl"
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
            >
              <img
                src={card.image}
                alt={card.alt ?? ""}
                className={cn(
                  "h-full w-full scale-[1.04] object-cover",
                  imageClassName,
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StickyCardStack;
