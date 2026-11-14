/**
 * The word raster for the flare.
 *
 * Upstream rasterises its logo by building an SVG string, decoding it through
 * an Image and drawing it onto a canvas — this mirrors that flow exactly, with
 * the Next.js glyph paths swapped for the "Shuroq" wordmark: a `<text>` drawn
 * `fill="none" stroke-width="2"` with a gradient that fades only near the end
 * of the strokes, like upstream's paths. The flare's rim pass and ray march
 * are built for those thin strokes; a filled mark would blow out into a blob.
 *
 * The font bytes travel inside the SVG (see `word-font.ts`): an SVG decoded
 * through an Image element cannot fetch external resources or see document
 * fonts, only data URIs. The embedded face is the site's own Manrope woff2 —
 * the exact file `@fontsource-variable/manrope` loads — so the raster draws the
 * wordmark with the face the rest of the site renders with. The word is
 * measured against that same face first, so metrics and render agree.
 *
 * The renderer sizes this canvas 1:1 with the scene target's logo box
 * (`logoRasterSize`), so the 2px stroke lands on the scene exactly as
 * upstream's does.
 */
import { MANROPE_WOFF2_BASE64 } from "./word-font";

const WORD = "Shuroq";
// The site's own face (loaded by `@fontsource-variable/manrope/index.css`),
// used to measure the word before the SVG is built.
const FONT_FAMILY = '"Manrope Variable"';
const FONT_WEIGHT = 800;
const FONT = `${FONT_WEIGHT} 100px ${FONT_FAMILY}`;
const SVG_FONT_FAMILY = "ManropeFlare";
// Upstream's non-scaling stroke width, in raster (scene) pixels.
const STROKE_WIDTH = 2;
const PAD = 3;
const FONT_DATA_URI = `data:font/woff2;base64,${MANROPE_WOFF2_BASE64}`;

export async function rasterizeLogo(
  width: number,
  height: number,
  signal?: AbortSignal
): Promise<HTMLCanvasElement> {
  if (signal?.aborted)
    throw new DOMException("Word rasterization aborted.", "AbortError");

  // Measure against the real face, not the fallback, or the word lands at the
  // wrong size inside the box and never gets corrected.
  if (typeof document !== "undefined" && document.fonts?.load) {
    try {
      await document.fonts.load(`${FONT_WEIGHT} 100px ${FONT_FAMILY}`, WORD);
      await document.fonts.ready;
    } catch {
      // A font failure is not fatal: the fallback face still renders.
    }
  }
  if (signal?.aborted)
    throw new DOMException("Word rasterization aborted.", "AbortError");

  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));
  const canvas = document.createElement("canvas");
  canvas.width = w + PAD * 2;
  canvas.height = h + PAD * 2;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not create the word raster canvas.");

  // Metrics at 100px, then scale the type to fit the box. Measure with the
  // same alignment the SVG text uses (`text-anchor="middle"`):
  // actualBoundingBoxLeft/Right are relative to the alignment point, so their
  // values only line up when both use the advance centre as the origin.
  context.textAlign = "center";
  context.textBaseline = "alphabetic";
  context.font = FONT;
  const probe = context.measureText(WORD);
  const inkWidth = probe.actualBoundingBoxLeft + probe.actualBoundingBoxRight;
  const inkHeight =
    probe.actualBoundingBoxAscent + probe.actualBoundingBoxDescent;
  if (!inkWidth || !inkHeight) {
    throw new Error("Could not measure the wordmark.");
  }
  const fontPx =
    Math.min((w * 0.9) / inkWidth, (h * 0.86) / inkHeight) * 100;
  const scale = fontPx / 100;

  // Centre on the ink, not on the advance box: the bearing on the "S" and "q"
  // would otherwise pull the word off-centre inside the flare's glow.
  const x =
    w / 2 -
    ((probe.actualBoundingBoxRight - probe.actualBoundingBoxLeft) / 2) * scale;
  const baseline =
    h / 2 +
    ((probe.actualBoundingBoxAscent - probe.actualBoundingBoxDescent) / 2) *
      scale;
  const inkTop = baseline - probe.actualBoundingBoxAscent * scale;
  const inkBottom = baseline + probe.actualBoundingBoxDescent * scale;

  // The demo's strokes stay opaque for most of their length and fade only near
  // the end, so the caps stay rim-lit while the tails dissolve.
  const svg =
    `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" ` +
    'xmlns="http://www.w3.org/2000/svg"><defs>' +
    "<style>@font-face{font-family:'ManropeFlare';font-style:normal;" +
    "font-weight:200 800;src:url(" +
    FONT_DATA_URI +
    ") format('woff2');}</style>" +
    `<linearGradient id="fade" x1="0" y1="${inkTop}" x2="0" y2="${inkBottom}" ` +
    'gradientUnits="userSpaceOnUse"><stop stop-color="#EDEDED"/>' +
    '<stop offset=".72" stop-color="#EDEDED"/><stop offset="1" ' +
    'stop-color="#EDEDED" stop-opacity=".2"/></linearGradient></defs>' +
    `<text x="${x}" y="${baseline}" font-family="${SVG_FONT_FAMILY}" ` +
    `font-weight="${FONT_WEIGHT}" font-size="${fontPx}" fill="none" ` +
    `stroke="url(#fade)" stroke-width="${STROKE_WIDTH}" ` +
    `text-anchor="middle">${WORD}</text></svg>`;

  const image = new Image();
  let abort: (() => void) | undefined;
  const loaded = new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () =>
      reject(new Error("Could not decode the wordmark SVG."));
    abort = () => {
      image.onload = null;
      image.onerror = null;
      image.src = "";
      reject(new DOMException("Word rasterization aborted.", "AbortError"));
    };
    signal?.addEventListener("abort", abort, { once: true });
  });
  if (signal?.aborted) abort?.();
  else
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  try {
    await loaded;
  } finally {
    image.onload = null;
    image.onerror = null;
    if (abort) signal?.removeEventListener("abort", abort);
  }
  if (signal?.aborted)
    throw new DOMException("Word rasterization aborted.", "AbortError");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, PAD, PAD, w, h);
  return canvas;
}
