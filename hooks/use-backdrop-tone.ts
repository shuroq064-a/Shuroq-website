"use client";

/**
 * Reports the tone of the surface currently scrolling behind a fixed/sticky
 * overlay.
 *
 * A glass overlay cannot ask the browser what is painted behind it, so we probe
 * `elementsFromPoint` just inside the overlay's own footprint: walk the hit
 * stack, skip anything inside the overlay (or an ancestor of it — those are the
 * page chrome around the sticky bar, not what sits behind it), then walk up
 * from each remaining hit to the first element with an effectively opaque
 * background and read its luminance. Three sample points along the overlay's
 * width make the answer follow the majority surface while the overlay straddles
 * a boundary.
 *
 * Falls back to the ambient theme when nothing opaque is hit (for example over
 * a photo or a gradient-only section).
 *
 * Adapted from kostyniuk/glasscn-components (MIT).
 */
import { type RefObject, useEffect, useLayoutEffect, useState } from "react";

export type BackdropTone = "light" | "dark";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

function channel(value: number) {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(r: number, g: number, b: number) {
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function parseColor(value: string) {
  const match = value.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?\s*\)/);
  if (!match) return null;
  return {
    r: Number(match[1]),
    g: Number(match[2]),
    b: Number(match[3]),
    a: match[4] === undefined ? 1 : Number(match[4]),
  };
}

function contains(ancestor: Element, node: Element | null) {
  let cursor = node;
  while (cursor) {
    if (cursor === ancestor) return true;
    cursor = cursor.parentElement;
  }
  return false;
}

function toneAtPoint(x: number, y: number, overlay: HTMLElement): BackdropTone | null {
  const stack = document.elementsFromPoint(x, y);
  const usable = stack.filter((hit) => !overlay.contains(hit) && !contains(hit, overlay));

  // First pass: the real surfaces painted behind the bar. Stop at the overlay's
  // own ancestors so the page chrome (sticky wrapper, main) cannot masquerade
  // as the backdrop.
  for (const hit of usable) {
    let node: Element | null = hit;
    while (node && node !== document.documentElement) {
      if (node !== hit && contains(node, overlay)) break;

      const parsed = parseColor(getComputedStyle(node).backgroundColor);
      if (parsed && parsed.a > 0.55) {
        return luminance(parsed.r, parsed.g, parsed.b) < 0.36 ? "dark" : "light";
      }
      node = node.parentElement;
    }
  }

  // Second pass: transparent sections over the page canvas. The canvas colour
  // is genuinely what shows through the glass here.
  for (const canvas of [document.body, document.documentElement]) {
    const parsed = parseColor(getComputedStyle(canvas).backgroundColor);
    if (parsed && parsed.a > 0.55) {
      return luminance(parsed.r, parsed.g, parsed.b) < 0.36 ? "dark" : "light";
    }
  }

  return null;
}

export type BackdropToneState = {
  /** `null` until the first client measurement, so SSR cannot commit to a tone. */
  tone: BackdropTone | null;
  /** False until the first measurement has painted. */
  ready: boolean;
};

export function useBackdropTone(
  ref: RefObject<HTMLElement | null>,
  fallback: BackdropTone,
): BackdropToneState {
  const [tone, setTone] = useState<BackdropTone | null>(null);
  const [ready, setReady] = useState(false);

  // Transitions turn on one frame after mount, so the first tone application
  // snaps into place instead of fading in from the SSR default.
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useIsomorphicLayoutEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const overlay = ref.current;
      if (!overlay) return;
      const box = overlay.getBoundingClientRect();
      if (box.width < 2 || box.height < 2) return;

      const y = box.top + box.height / 2;
      const points = [0.18, 0.5, 0.82];
      let dark = 0;
      let light = 0;
      for (const p of points) {
        const result = toneAtPoint(box.left + box.width * p, y, overlay);
        if (result === "dark") dark += 1;
        else if (result === "light") light += 1;
      }

      const next = dark === light || (dark === 0 && light === 0) ? null : dark > light ? "dark" : "light";
      setTone((prev) => (prev === next ? prev : next));
    };

    const schedule = () => {
      frame ||= requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref]);

  // Until the first probe lands the hook reports no tone, which keeps the
  // server markup and the hydrating render identical (React does not repair
  // attribute mismatches found during hydration).
  return { tone: tone ?? (ready ? fallback : null), ready };
}
