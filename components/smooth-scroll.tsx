"use client";

import { useEffect } from "react";
import Lenis from "lenis";

import "lenis/dist/lenis.css";

/**
 * Site-wide smooth scrolling (Lenis). Mounted once in the root layout so every
 * route gets the same eased scroll feel.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      duration: 3,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}

export default SmoothScroll;
