"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

export interface MotionSubtitleProps {
  text: string;
  /** Direction the characters enter from. @default "top" */
  direction?: "top" | "bottom";
  /** Speed multiplier for the reveal. @default 1 */
  speed?: number;
  /** Delay between character reveals in seconds. @default 0.018 */
  stagger?: number;
  className?: string;
}

const EASE = [0.23, 1, 0.32, 1] as const;

/**
 * Small per-character reveal used by the orbital image wheel caption.
 * Characters fade and slide in, staggered, each time the text changes.
 */
export function MotionSubtitle({
  text,
  direction = "top",
  speed = 1,
  stagger = 0.018,
  className,
}: MotionSubtitleProps) {
  const safeSpeed = Math.max(0.3, speed);
  const safeStagger = Math.max(0, stagger);
  const offset = direction === "bottom" ? 14 : -14;
  const characters = React.useMemo(() => Array.from(text), [text]);

  return (
    <div className={cn("relative", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="inline-block">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={text} className="inline-block">
            {characters.map((character, index) => (
              <motion.span
                key={`${character}-${index}`}
                className="inline-block whitespace-pre"
                initial={{ opacity: 0, y: offset }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.34 / safeSpeed,
                    delay: (index * safeStagger) / safeSpeed,
                    ease: EASE,
                  },
                }}
                exit={{
                  opacity: 0,
                  y: -offset,
                  transition: {
                    duration: 0.16 / safeSpeed,
                    delay: (index * safeStagger) / safeSpeed,
                  },
                }}
              >
                {character}
              </motion.span>
            ))}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}

export default MotionSubtitle;
