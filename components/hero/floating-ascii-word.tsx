"use client";

import * as React from "react";

/**
 * Floating ASCII wordmark.
 *
 * The word is rasterised into a monospace character grid (sampled at 3× and
 * averaged down to per-cell coverage), then animated with drift, a slow wave,
 * a decaying wake field and pointer-reactive brightening. Pausing off-screen
 * and the static frame under reduced motion are adapted from
 * stackedlol/ascii-sharks — MIT — https://github.com/stackedlol/ascii-sharks
 */
const CREAM: [number, number, number] = [255, 234, 219];
const ORANGE: [number, number, number] = [255, 126, 43];

function hash3(x: number, y: number, z: number) {
  let h = (x | 0) * 374761393 + (y | 0) * 668265263 + (z | 0) * 1442695041;
  h = (h ^ (h >>> 13)) * 1274126177;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function mix(a: [number, number, number], b: [number, number, number], t: number) {
  const k = Math.max(0, Math.min(1, t));
  return [
    Math.round(a[0] + (b[0] - a[0]) * k),
    Math.round(a[1] + (b[1] - a[1]) * k),
    Math.round(a[2] + (b[2] - a[2]) * k),
  ];
}

export interface FloatingAsciiWordProps {
  /** Word drawn as ASCII. Defaults to "Shuroq". */
  word?: string;
  className?: string;
}

export function FloatingAsciiWord({ word = "Shuroq", className }: FloatingAsciiWordProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = reducedQuery.matches;

    let cssW = 0;
    let cssH = 0;
    let cols = 0;
    let rows = 0;
    let cellW = 6;
    let cellH = 10;
    let dpr = 1;
    let mask = new Float32Array(0);
    let wake = new Float32Array(0);
    let raf = 0;
    let running = false;
    let time = 0;
    let last = 0;
    let pointerX = -1e4;
    let pointerY = -1e4;

    const plankton = Array.from({ length: 30 }, (_, i) => ({
      x: hash3(i, 1, 7),
      y: hash3(i, 2, 7),
      speed: 0.3 + hash3(i, 3, 7) * 0.9,
      phase: hash3(i, 4, 7) * Math.PI * 2,
      depth: 0.25 + hash3(i, 5, 7) * 0.75,
    }));

    const wordFont = '800 100px "Manrope Variable", Manrope, system-ui, sans-serif';
    const monoFont = 'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace';

    /** Sample the word into a coverage grid: one value per ASCII cell. */
    const build = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width < 20 || rect.height < 20) return;

      cssW = rect.width;
      cssH = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // ASCII cells are ~0.58 as wide as they are tall (the aspect of a
      // monospace glyph), so the grid uses narrow columns and tall rows.
      // On a square grid each glyph floats in an empty square and the word
      // reads as columns of tiles instead of letters.
      cellW = Math.max(4.4, Math.min(7, cssW / 122));
      cellH = cellW / 0.58;
      cols = Math.ceil(cssW / cellW);
      rows = Math.ceil(cssH / cellH);
      mask = new Float32Array(cols * rows);
      wake = new Float32Array(cols * rows);

      // Rasterise the word at SSR× the cell grid, then average each block down
      // to one coverage value. Sampling at exactly one pixel per cell (the
      // naive approach) quantises the type into unreadable slabs.
      const SSR = 3;
      const off = document.createElement("canvas");
      off.width = cols * SSR;
      off.height = rows * SSR;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;

      const maskW = off.width;
      const maskH = off.height;
      octx.clearRect(0, 0, maskW, maskH);
      octx.fillStyle = "#fff";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.font = wordFont;

      const measured = octx.measureText(word);
      // Fit the glyphs' ink box, not the advance width — the Q's tail hangs
      // outside it and would otherwise touch the canvas edge while drifting.
      const inkWidth = Math.max(
        1,
        measured.actualBoundingBoxLeft + measured.actualBoundingBoxRight,
      );
      const sizeForWidth = ((maskW * 0.82) / inkWidth) * 100;
      const inkCenter =
        (measured.actualBoundingBoxRight - measured.actualBoundingBoxLeft) / 2;
      const inkOffset = (inkCenter * sizeForWidth) / 100;
      // Compensate for the tall cell so the word keeps its true proportions.
      const squash = cellW / cellH;
      octx.save();
      octx.translate(maskW / 2, maskH / 2 + maskH * 0.02);
      octx.scale(1, squash);

      // A very light stroke holds thin joins together after downsampling.
      octx.font = `800 ${sizeForWidth}px "Manrope Variable", Manrope, system-ui, sans-serif`;
      octx.lineJoin = "round";
      octx.lineCap = "round";
      octx.lineWidth = Math.max(0.5, sizeForWidth * 0.016);
      octx.strokeStyle = "#fff";
      octx.strokeText(word, -inkOffset, 0);
      octx.fillText(word, -inkOffset, 0);
      octx.restore();

      const data = octx.getImageData(0, 0, maskW, maskH).data;
      const samples = SSR * SSR;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          let sum = 0;
          for (let sy = 0; sy < SSR; sy++) {
            const py = row * SSR + sy;
            if (py >= maskH) break;
            for (let sx = 0; sx < SSR; sx++) {
              const px = col * SSR + sx;
              if (px >= maskW) break;
              sum += data[(py * maskW + px) * 4 + 3];
            }
          }
          // Normalise against the full block so edge cells stay soft, then
          // lift slightly so half-covered cells still read as ink.
          mask[row * cols + col] = Math.min(1, (sum / samples / 255) * 1.25);
        }
      }
    };

    /** Snap to the device pixel grid so small glyphs stay crisp, not fuzzy. */
    const snap = (value: number) => Math.round(value * dpr) / dpr;

    const draw = (dt: number, still = false) => {
      if (cssW < 2 || cssH < 2) return;
      ctx.clearRect(0, 0, cssW, cssH);

      const t = still ? 3.2 : time;
      const cx = cssW / 2;
      const cy = cssH / 2;

      const dx =
        Math.sin(t * 0.23) * cssW * 0.018 + Math.sin(t * 0.09 + 2.1) * cssW * 0.01;
      const dy = Math.sin(t * 0.31 + 1.1) * cssH * 0.034;
      const breathe = 1 + Math.sin(t * 0.47) * 0.012;
      const tilt = Math.sin(t * 0.21) * 0.016;

      // ── Wake: dots left behind by the word, fading as they cool ──────────
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `${cellH * 0.7}px ${monoFont}`;
      for (let i = 0; i < wake.length; i++) {
        const value = wake[i];
        if (value <= 0.05) {
          wake[i] = 0;
          continue;
        }
        const col = i % cols;
        const row = (i / cols) | 0;
        ctx.fillStyle = `rgba(${ORANGE[0]}, ${ORANGE[1]}, ${ORANGE[2]}, ${value * 0.4})`;
        ctx.fillText(".", snap(col * cellW + cellW / 2), snap(row * cellH + cellH / 2));
        wake[i] = value * Math.max(0, 1 - dt * 2.1);
      }

      // ── Plankton drifting through the space ─────────────────────────────
      for (let i = 0; i < plankton.length; i++) {
        const p = plankton[i];
        const x = ((p.x + t * 0.008 * p.speed) % 1) * cssW;
        const y = p.y * cssH + Math.sin(t * 0.42 + p.phase) * 9;
        ctx.fillStyle = `rgba(${CREAM[0]}, ${CREAM[1]}, ${CREAM[2]}, ${0.05 + p.depth * 0.1})`;
        ctx.fillText(".", snap(x), snap(y));
      }

      // ── The word ────────────────────────────────────────────────────────
      ctx.font = `${Math.max(7, Math.round(cellH * 1.06 * dpr) / dpr)}px ${monoFont}`;
      const cos = Math.cos(tilt);
      const sin = Math.sin(tilt);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ink = mask[row * cols + col];
          if (ink < 0.1) continue;

          const lx = (col - cols / 2) * cellW;
          const ly = (row - rows / 2) * cellH;
          const wave =
            Math.sin(col * 0.33 - t * 1.7 + row * 0.09) * cellH * 0.1 +
            Math.sin(col * 0.11 + t * 0.6) * cellH * 0.05;
          const x = cx + (lx * cos - ly * sin) * breathe + dx;
          const y = cy + (lx * sin + ly * cos) * breathe + dy + wave;

          const flicker = 0.78 + 0.22 * hash3(col >> 1, row >> 1, Math.floor(t * 6));
          const shimmer = hash3(col, row, 11);

          let tone = Math.min(1, ink * 1.05 * flicker);
          let warm = 0.1 + shimmer * 0.22;

          if (!still) {
            const dist = Math.hypot(x - pointerX, y - pointerY);
            const near = Math.max(0, 1 - dist / (cellH * 9));
            if (near > 0) {
              tone = Math.min(1, tone + near * 0.6);
              warm = Math.min(1, warm + near * 0.9);
            }
          }

          // Solid cells carry the letterform, half-cells soften the contour.
          const glyph =
            ink >= 0.62 ? (tone > 0.92 ? "@" : "#") : ink >= 0.34 ? "+" : ".";
          const color = mix(CREAM, ORANGE, warm);
          ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${0.28 + tone * 0.7})`;
          ctx.fillText(glyph, snap(x), snap(y));

          if (ink > 0.6) {
            const wc = Math.round(x / cellW);
            const wr = Math.round(y / cellH);
            if (wc >= 0 && wc < cols && wr >= 0 && wr < rows) {
              const index = wr * cols + wc;
              wake[index] = Math.max(wake[index], 0.35 + ink * 0.3);
            }
          }
        }
      }
    };

    const frame = (now: number) => {
      if (!running) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      time += dt;
      draw(dt);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) start();
          else stop();
        }
      },
      { rootMargin: "240px 0px" },
    );
    observer.observe(canvas);

    const resizeObserver = new ResizeObserver(() => {
      build();
      if (reduced) draw(0, true);
    });
    resizeObserver.observe(canvas);

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      ) {
        pointerX = event.clientX - rect.left;
        pointerY = event.clientY - rect.top;
      } else {
        pointerX = -1e4;
        pointerY = -1e4;
      }
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const onMotionChange = () => {
      reduced = reducedQuery.matches;
      if (reduced) {
        stop();
        draw(0, true);
      } else {
        start();
      }
    };
    reducedQuery.addEventListener("change", onMotionChange);

    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else if (!reduced) start();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    build();
    if (reduced) draw(0, true);

    // Canvas text can't trigger a webfont load; redraw once Manrope is in.
    document.fonts?.ready.then(() => {
      build();
      if (reduced) draw(0, true);
    });

    return () => {
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      reducedQuery.removeEventListener("change", onMotionChange);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [word]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
