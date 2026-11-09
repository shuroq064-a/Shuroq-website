---
version: alpha
name: Shuroq
description: Monochrome, editorial design system for the Shuroq technology-services marketing site — ink on paper, warm paper surfaces, refracted glass, ASCII/canvas art, and one ember glow.
---

# Shuroq Design System

_Last updated: 2026-11-09_

This document is the **source of truth** for the Shuroq site. It states **how the
design should be** — if the code disagrees with this file, the code is wrong.

It follows the DESIGN.md open format (`google-labs-code/design.md`), so the
tokens below are machine-readable YAML and the prose is the human rationale.

---

## Overview

Shuroq is a technology-services and digital-engineering company. The site has to
read as **engineering competence, stated quietly** — editorial, technical, calm,
and expensive-looking. Not playful, not "startup-y", not a template.

The visual model is a printed technical journal:

- **Ink on paper.** Almost everything is `#000000` on `#ffffff`, or the reverse.
- **Band rhythm.** Pages alternate three surfaces — paper, warm paper, inverted
  ink — so long pages read as chapters rather than a scroll of cards.
- **One accent of warmth.** A single ember radial glow behind the hero ASCII
  word. Nothing else is coloured except photography and customer marks.
- **Typography carries the brand.** 64–86px display headlines at low weight with
  tight tracking, then deliberately quiet 16–20px body copy at 55% ink.
- **Motion is slow and physical.** Spring-driven, single-purpose, never looping
  for decoration except the ASCII footer and the integration beam pulses.

Audience: enterprise buyers and engineering leaders evaluating a partner.
Emotional target: *"these people are precise."*

### Rules that override everything else

1. **One visual language across every route.** Home, `/about` and `/careers`
   must look like the same site. Never introduce a section style on one page.
2. **Never name a component library, registry, author or source file in any
   user-facing copy.** Credits live in code comments and in §Component sources —
   not on the site.
3. **Change only what was asked.** No opportunistic restyling.
4. **Keep the carousel card size and radius** — square, 48px, inset hairline.
5. **Reduced motion is a first-class path.** Every animation degrades to a
   static state under `prefers-reduced-motion: reduce`.
6. **Light and dark are both real.** Nothing may be hard-coded to one theme
   except the black hero band and the inverted footer, which are black in both.

---

## Colors

The palette is rooted in high-contrast neutrals with a single warm accent. The
whole site runs on five colours; every other value is alpha or a derived mix.

- **Primary — Ink `#000000`.** Text, inverted bands, primary buttons, and the
  hero background. Permanence and maximum readability.
- **Secondary — Paper `#ffffff`.** The page itself, cards, and text on ink.
- **Neutral — Warm paper `#f0eee9`.** The organic card surface and the poster
  paper tone. Softer than pure white, which is what makes photography sit well.
- **Surface (dark) — Charcoal `#0a0a0a` / `#111111`.** Dark-theme page and the
  elevated surface above it.
- **Tertiary — Ember `#ff7e2b` at 5–12% alpha.** The *only* warm accent: a
  blurred radial glow behind the hero ASCII word. It is **not** available for
  buttons, text, borders or charts.
- **Error `#dc2626`, Success `oklch(73.29% 0.1935 150.81)`, Warning `#eab308`.**
  Status only; never decorative.

Supporting greys are always alpha on ink or alpha on paper — never a flat grey:
`55%` body copy, `40%` meta, `12%` borders, `6%` soft borders, `8%` press wash.

There is **no brand blue, no gradient text, no coloured button.**

```yaml
colors:
  primary: "#000000"
  secondary: "#ffffff"
  neutral: "#f0eee9"
  surface: "#ffffff"
  surface-warm: "#f0eee9"
  surface-dark: "#111111"
  background-dark: "#0a0a0a"
  on-surface: "#000000"
  on-surface-dark: "#ffffff"
  muted: "rgba(0, 0, 0, 0.55)"
  muted-dark: "rgba(255, 255, 255, 0.60)"
  meta: "rgba(0, 0, 0, 0.40)"
  meta-dark: "rgba(255, 255, 255, 0.45)"
  border: "rgba(0, 0, 0, 0.12)"
  border-dark: "rgba(255, 255, 255, 0.12)"
  border-soft: "rgba(0, 0, 0, 0.06)"
  tertiary: "#ff7e2b"
  ember-glow: "rgba(255, 126, 43, 0.12)"
  error: "#dc2626"
  error-dark: "#f87171"
  success: "oklch(73.29% 0.1935 150.81)"
  warning: "#eab308"
  glass-bg: "oklch(100% 0 0 / 0.55)"
  glass-bg-dark: "oklch(17% 0.002 265 / 0.55)"
  glass-border: "oklch(15% 0 0 / 0.08)"
```

**Usage rules**

- Body copy is **never pure black** — use `muted`.
- Borders are `12%`; dividers inside cards use `6%`.
- The ember glow may only appear in the hero, as an `rgba()` radial gradient
  blurred ~18px behind the ASCII word.
- A new colour must be added as a token in `:root` **and** `.dark`, documented
  here, and approved — never inlined into a component.

---

## Typography

The typography strategy pairs one geometric display face with the Figma-exported
UI face, plus a handwritten face reserved for the hero.

- **Display — Manrope Variable** (`--font-display`), with `figmaSans` → SF Pro
  Display → system-ui as fallback. Used for every headline.
- **Body — figmaSans** (`--font-body`) with SF Pro Display fallback. Used for
  UI and body copy.
- **Mono — figmaMono** (`--font-mono`) for technical strings.
- **Handwritten — Caveat Variable**, used *only* for the typed hero headline.

Voice: big, tight, low-contrast. Weights stay between **330 and 540** across the
site; 700+ appears only inside poster artwork and `.feature-title`. Tracking
tightens as size grows (−2.6px at 86px, −1.4px at 64px) so the type reads as one
block, not as letters.

```yaml
typography:
  display:
    fontFamily: "Manrope Variable"
    fontSize: 86px
    fontWeight: 520
    lineHeight: 1.02
    letterSpacing: -2.6px
  headline:
    fontFamily: "Manrope Variable"
    fontSize: 64px
    fontWeight: 460
    lineHeight: 1.10
    letterSpacing: -1.4px
  subheading:
    fontFamily: "Manrope Variable"
    fontSize: 26px
    fontWeight: 540
    lineHeight: 1.35
    letterSpacing: -0.26px
  body-lg:
    fontFamily: "figmaSans"
    fontSize: 20px
    fontWeight: 330
    lineHeight: 1.40
    letterSpacing: -0.14px
  body:
    fontFamily: "figmaSans"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.40
    letterSpacing: -0.14px
  label:
    fontFamily: "figmaSans"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.10
    letterSpacing: 0.04em
  meta:
    fontFamily: "figmaSans"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.30
    letterSpacing: -0.10px
  handwritten:
    fontFamily: "Caveat Variable"
    fontSize: 86px
    fontWeight: 500
    lineHeight: 1.00
    letterSpacing: -1px
```

**Rules**

- One `<h1>` per page, inside the hero.
- Section headings use `headline` — never a smaller variant for a new section.
- Lead paragraphs use `body-lg`, capped at ~72 characters per line.
- Captions and overlines use `label` (uppercase) or `meta` — never `body`.

---

## Layout

Layout is a **fixed-max-width fluid container** with a strict 8px-derived
spacing scale and three section bands.

- **Container:** max `1920px`, centred, `40px` gutters on desktop, `24px` on
  tablet, `16px` on phone.
- **Two-column block:** `.grid-2` = `1fr 1fr`, `24px` gap. Heading and lead on
  the left, the artefact (accordion, card, carousel) on the right. Sticky
  columns pin at `top: 96px`.
- **Section rhythm:** every section uses `.section` = `96px` top and bottom
  (64 tablet / 40 phone). A section that sits directly above another opts out
  with `padding-bottom: 0`.
- **Bands:** paper (default) → warm surface → inverted ink. Never two inverted
  bands in a row.
- **Page ending (always the same):** inverted CTA band → animated ASCII footer
  → site footer.

```yaml
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  2xl: 24px
  3xl: 32px
  4xl: 48px
  section: 96px
  section-tablet: 64px
  section-phone: 40px
  gutter: 40px
  gutter-phone: 16px
  container-max: 1920px
  grid-gap: 24px
  sticky-offset: 96px
```

---

## Elevation & Depth

Hierarchy comes from **tonal bands and hairlines**, not shadows. Sections are
flat; a surface is separated from the page by its background tone or a 1px
border.

Depth is used in exactly four places:

1. **The floating nav** — refracted glass (a real SVG displacement filter feeding
   `backdrop-filter`), an 8% white pane, a 1px rim. No drop shadow.
2. **The sticky card deck** — a `0 4px 16px rgba(0,0,0,.08)` rest state and a
   3-layer surface shadow in light mode; in dark mode the shadow collapses to an
   inset rim.
3. **Floating panels** (menu dropdown, popovers) — `--overlay-shadow`: 1px rim
   plus soft drops; dark mode swaps to an inset white rim.
4. **The organic card** — a `drop-shadow` chain so the shadow follows the
   *painted* silhouette rather than the border box.

Depth values are listed with the other component tokens under §Components
(`elevation-*`), so the document keeps a single machine-readable token tree.

> Shadows never decorate. If a section looks "flat", fix it with space or a
> band, not with a shadow.

---

## Shapes

The shape language is **soft industrial**: pills for anything you press, an 8px
radius for anything you read, and two deliberate exceptions.

- **Pills (9999px / 50px)** — nav bar, all buttons, tags, status.
- **8px** — cards, inputs, panels, accordion rows, dropdowns.
- **48px** — the poster carousel slides. This is the "cute" shape and it was
  explicitly approved; do not change it.
- **Organic** — the feature card's bottom-left corner is cut by an animated SVG
  path, so it has no `border-radius` at all.
- **Hairlines** — 1.5px inset rim on carousel slides, 1px borders elsewhere.
  Section dividers are a 220px centred rule at 14% ink.

```yaml
rounded:
  none: 0px
  sm: 8px
  md: 8px
  lg: 8px
  carousel: 48px
  pill-button: 50px
  full: 9999px
```

---

## Components

### Navigation

Floating glass pill, sticky at `16px` from the top. **48px tall, max 900px wide,
optically centred** — empty left spacer, menu in the middle, theme switch right.
Links: About Us · Services · Solutions · Resources, each opening a spring-driven
dropdown with a layout-animated highlight. Auto-detects backdrop tone and flips
to white text over the black hero. Below `md` it collapses to a plain stacked
list.

### Buttons

Pill shape, 50px radius, `8px 18px 10px` padding. Primary is ink fill with paper
text; secondary is a translucent glass pane with a 1px light border. On the black
hero both invert automatically. Press state is a `0.98` scale.

### Cards

8px radius, 1px `border`, flat. The organic card is the exception: SVG cutout,
`drop-shadow` silhouette, animated path on hover, and a `cta` label under the
meta row.

### Poster carousel

Square slides (1:1) at 48px radius, `overflow: hidden`, with a 1.5px inset
hairline at 30% ink. Coverflow with `rotate: 0`, `depth: 100`, `modifier: 2.5`,
no slide shadows. Slides per view 1.1 → 1.35 (≥640) → 1.55 (≥1024), 12px gap.
Neighbours sit at 55% opacity. The viewport's hard clip is dissolved by a
horizontal mask (opaque 6%→94%), so no sharp vertical line ever appears beside
the card. Dots sit 50px below.

### Accordion

Filled rows, 8px radius, `+` indicator that rotates to `×`. Multiple items may be
open at once, but **everything starts closed** — the user clicks `+`.

### Dividers

220px centred hairline, `color-mix(in srgb, var(--fg) 14%, transparent)`, 24px
above and below. Never after the hero.

### Footer

Black surface, white text, in both themes. Brand mark is the real company logo
(`logo.png`, 34×34) beside the `Shuroq` wordmark on **every** page. Three link
columns (Services, Solutions, Company), then legal (Privacy, Terms) and socials
(Instagram, LinkedIn).

```yaml
components:
  elevation-flat:
    boxShadow: none
  elevation-ring:
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.12)"
  elevation-raised:
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)"
  elevation-overlay:
    boxShadow: "0 0 0 1px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.06), 0 14px 28px rgba(0,0,0,0.08)"
  elevation-focus:
    boxShadow: "0 0 0 2px rgba(0, 0, 0, 0.8)"
  nav:
    backgroundColor: "{colors.glass-bg}"
    textColor: "{colors.on-surface}"
    height: 48px
    width: 900px
    rounded: "{rounded.full}"
    padding: 16px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.secondary}"
    typography: "{typography.body}"
    rounded: "{rounded.pill-button}"
    padding: 10px
  button-primary-hover:
    backgroundColor: "rgba(0, 0, 0, 0.85)"
  button-secondary:
    backgroundColor: "rgba(255, 255, 255, 0.08)"
    textColor: "{colors.secondary}"
    rounded: "{rounded.pill-button}"
    padding: 10px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 24px
  carousel-slide:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.carousel}"
  accordion-item:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 16px
  footer:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.secondary}"
    typography: "{typography.body}"
    padding: 40px
```

---

## Do's and Don'ts

**Do**

- Do keep one visual language across home, about and careers.
- Do open every page with the black hero band and the ASCII word.
- Do alternate paper → warm → inverted bands.
- Do use `.section` (96px) for vertical rhythm and `.container` for width.
- Do use the ink/paper tokens; never a raw hex in a component.
- Do keep `muted` body copy at 55% ink for hierarchy.
- Do keep the carousel square with a 48px radius and an inset hairline.
- Do keep the accordion closed until the user presses `+`.
- Do give every interactive element a visible focus ring.
- Do honour `prefers-reduced-motion` in every animation.
- Do check both themes before shipping.

**Don't**

- Don't name a library, registry, author or source file in on-page copy.
- Don't add a colour outside this palette.
- Don't put a gradient on text, colour a button, or add neon.
- Don't change the carousel card's shape, radius or edge line.
- Don't let the nav exceed 900px or stop being optically centred.
- Don't hard-code light-only or dark-only colours outside the hero and footer.
- Don't restyle one page's section differently from the others.
- Don't stack two inverted bands without a paper band between them.
- Don't remove an attribution comment from a vendored component.
- Don't ship a visual change without `npm run build` passing.

**Review checklist**

- [ ] Same visual language as the other two routes
- [ ] No new colour, radius, spacing or font size
- [ ] Light **and** dark both checked
- [ ] Reduced motion still works
- [ ] Keyboard focus visible
- [ ] No source/library names visible anywhere on the page
- [ ] `npm run build` passes

---

## Iconography

Icons are functional marks, never decoration.

- **Set:** `lucide-react` (outline), single family across the site.
- **Size:** 13–16px inline with text (links, footer arrows, theme switch);
  20–24px for standalone controls (carousel arrows, mobile menu).
- **Stroke:** 1.5–2px. Never mix stroke weights in one view.
- **Colour:** always `currentColor` so the icon inherits the text token — white
  on the hero and footer, ink on paper. Icons are never filled or tinted.
- **Decorative icons** carry `aria-hidden="true"`; icon-only buttons carry an
  `aria-label`.
- **Brand marks** (customer logos in the integration diagram) are vendored SVG
  into `public/icons` — never hot-linked from a CDN.

> There are no app-style status icons, no coloured icon badges, and no icon-only
> chips on this site.

---

## Responsive Design

Layout is fluid; nothing has a fixed pixel width.

| Breakpoint | What changes |
| --- | --- |
| ≥1024px | Full layout. `.grid-2` two columns. Carousel 1.55 slides. Hero ASCII sits right of the copy. |
| ≤1024px | Carousel 1.35 slides. Hero ASCII drops to the bottom of the hero at 50% opacity, full width. |
| ≤900px | `.grid-2` stacks to one column. |
| ≤768px | Nav collapses to the stacked mobile menu. Hero headline clamps to `clamp(23px, 6vw, 32px)`. |
| ≤640px | Carousel 1.1 slides. |

Gutters: **40px** desktop → **24px** tablet → **16px** phone.
Section rhythm: **96px** → **64px** → **40px**.

Rules:

- Use `max-width` plus `%`, `rem` or `clamp()` — never a hard-coded width that
  can exceed the viewport.
- Test at 360, 768, 1024 and 1536 CSS pixels.
- The nav is capped at 900px and `calc(100vw - 32px)` on small screens.
- Text never drops below 16px for body copy.

---

## Using this document with AI tools

When an agent or a new developer touches this site:

1. **Read the tokens first.** `colors`, `typography`, `spacing`, `rounded` and
   `components` in this file are normative; prose is context.
2. **Do not invent values.** If a value is not in the token blocks, it does not
   exist on this site.
3. **Match the nearest page.** `/careers` is the most complete reference for a
   new page: hero → content bands → CTA → footers.
4. **Never surface a source name.** No library, registry, author or file name may
   appear in copy, alt text or metadata.
5. **Change only what was asked.** No opportunistic restyling while fixing
   something else.
6. **Run the checklist** in §Do's and Don'ts before shipping.

> Keep this file in sync. If a decision changes, update the Change log — the
> document is the contract.

---

## Page blueprints

Section-by-section, band by band.

### `/` — Home

| # | Section | Band | Component |
| --- | --- | --- | --- |
| 1 | Hero — ASCII "Shuroq", handwritten rotating headline, CTAs | Black | ASCII word, headline |
| 2 | "Intelligent Automation for the Modern Core" + integration diagram | Paper | Beam diagram |
| 3 | "Accelerate Your Digital Velocity" | Inverted | copy + CTA |
| 4 | "Our Services" — orbital image wheel | Paper | Orbit wheel |
| 5 | "Where we make an impact" — expanding industry rows | Warm | Expanding rows |
| 6 | Engagement — sticky card deck (pin + scale) | Paper | Sticky deck |
| 7 | CTA "From vision to execution…" | Inverted | — |
| 8 | Animated ASCII footer + site footer | Black | — |

### `/about`

| # | Section | Band |
| --- | --- | --- |
| 1 | Hero — ASCII "About", "Technology that simplifies work" | Black |
| 2 | Company Overview | Paper |
| 3 | Two-column statement block | Inverted |
| 4 | Why Businesses Choose Shuroq | Paper |
| 5 | Operational Challenges We Solve | Warm |
| 6 | Results / outcomes | Paper |
| 7 | CTA | Inverted |
| 8 | Animated ASCII footer + site footer | Black |

### `/careers`

| # | Section | Band | Notes |
| --- | --- | --- | --- |
| 1 | Hero — ASCII "Careers", headline, *Apply now* / *About Shuroq* | Black | — |
| 2 | "Why Work With Shuroq" + poster carousel | Paper | `grid-2`, carousel right |
| 3 | Application Process — 4-step accordion | Warm | all closed |
| 4 | How to Apply — organic card with team photo | Paper | — |
| 5 | CTA "Ready to Start Your Journey" | Inverted | — |
| 6 | Animated ASCII footer + site footer | Black | — |

---

## Motion

Motion is slow and physical: one purpose per animation, springs over tweens,
nothing loops except the ASCII footer and the beam pulses.

| Token | Value |
| --- | --- |
| `--motion-fast` | 150ms |
| `--motion-base` | 200ms |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--ease-ui-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `--duration-spring-snappy` | 400ms |
| `--duration-spring-bouncy` | 600ms |
| `--stagger-step` | 45ms |
| `--press-scale` | 0.98 |

Scroll is **Lenis**, mounted once in the root layout: `duration: 3`,
`smoothWheel`, `touchMultiplier: 2`, skipped entirely under reduced motion.

---

## Accessibility

- Landmarks: one `<nav>`, one `<main>`, one `<footer>`; decorative art is
  `aria-hidden`.
- Focus: `.btn:focus { outline: 2px dashed var(--fg); outline-offset: 2px; }`
  plus `--focus-ring` for custom controls. Never remove an outline without a
  replacement.
- Contrast: `muted` text passes AA at the sizes used; headings are full contrast.
- Motion: every animated component checks `useReducedMotion()` or `matchMedia`.
- Images: poster slides carry `alt`; decorative art is `aria-hidden`.

---

## Performance

- Off-screen animation loops pause (ASCII footer, beam pulses).
- GSAP `ScrollTrigger` is registered once at module scope.
- The carousel mounts Swiper on the client only, so `/careers` still prerenders
  statically — removing that guard breaks the build.
- Hero art is canvas-rendered ASCII, not a bitmap.

---

## Component sources

Everything below was **vendored into this repo** and then adapted. Keep the
in-file credit comments intact — several licences require attribution.

| Local path | Upstream source | Link | Licence |
| --- | --- | --- | --- |
| `components/ui/liquid-glass.tsx` | glasscn by kostyniuk | https://github.com/kostyniuk/glasscn-components | MIT (header comment required) |
| `components/unlumen-ui/motion-navigation-menu.tsx` | unlumen UI — Motion Navigation Menu | https://ui.unlumen.com/components/motion-navigation-menu | Free tier |
| `components/unlumen-ui/primitives/highlight.tsx` | Ships with the unlumen menu | — | Same as above |
| `components/unlumen-ui/orbital-image-wheel.tsx` | unlumen UI — Orbital Image Wheel | https://ui.unlumen.com/components/orbital-image-wheel | Free tier |
| `components/unlumen-ui/hover-expand.tsx` | unlumen UI — Hover Expand | https://ui.unlumen.com/components/hover-expand | Free tier |
| `components/unlumen-ui/motion-subtitle.tsx` | unlumen UI family | — | No in-file credit recorded |
| `components/unlumen-ui/sticky-card-stack.tsx` | Skiper UI — StickyCard002 (adapted) | https://skiper-ui.com | Attribution required |
| `components/unlumen-ui/animated-footer.tsx` | VengeanceUI — Animated Footer (adapted) | https://www.vengeanceui.com | Credit in file JSDoc |
| `components/skiper/skiper47.tsx` | Skiper UI — skiper47 by @gurvinder-singh02 (gxuri.me) | https://skiper-ui.com | Attribution required |
| `components/hero/floating-ascii-word.tsx` | stackedlol/ascii-sharks | https://github.com/stackedlol/ascii-sharks | MIT |
| `components/ui/accordion.tsx` | shadcn/ui (new-york) + Spectrum UI filled variant | https://ui.shadcn.com | MIT |
| `components/ui/organic-card-small.tsx` | cult-ui — Organic Card | https://cult-ui.com | Extended with `cta` |
| `components/arc/**` | Arc UI registry — SiteFooter, Button, ThemeSwitch, SegmentedControl, motion tokens | https://uiarc.dev | Registry source |
| `components/animated/animated-beam/**`, `components/showcase/connected-tools.tsx` | In-house beam engine + vendored brand icons (`npx @thesvg/cli add`) | — | No upstream file |
| `components/smooth-scroll.tsx` | Lenis | https://github.com/darkroomengineering/lenis | MIT |

Registry configuration (`components.json`):

```json
"registries": {
  "@uiarc":     "https://uiarc.dev/r/{name}.json",
  "@cult-ui":   "https://cult-ui.com/r/{name}.json",
  "@skiper-ui": "https://skiper-ui.com/registry/{name}.json"
}
```

> **Attribution obligations:** Skiper UI (carousel + sticky deck), glasscn (MIT
> header), ascii-sharks (MIT header), VengeanceUI (JSDoc credit). Never delete
> those comments during a refactor.

---

## File map

```
app/
  layout.tsx            theme provider, Lenis, Agentation (dev only)
  page.tsx              home
  about/page.tsx        about
  careers/page.tsx      careers
  globals.css           every token + layout primitive
components/
  nav/site-nav.tsx      floating glass nav
  hero/                 ascii word, headline
  ui/                   liquid glass, accordion, organic card
  arc/                  footer block, button, theme switch, segmented control
  unlumen-ui/           menu, orbit wheel, hover expand, sticky deck, ascii footer
  skiper/skiper47.tsx   poster carousel
  animated/             beam engine
  showcase/             integration diagram
  smooth-scroll.tsx     Lenis
public/
  logo.png              company logo (footer mark)
  images/careers/       9 posters + how-to-apply.png
  icons/                vendored brand marks
```

---

## Change log

| Date | Decision |
| --- | --- |
| 2026-11 | Careers rebuilt for parity with home: nav, ASCII hero, accordion, organic card, dividers, footers. |
| 2026-11 | Footer brand mark switched to `logo.png` on home, about and careers. |
| 2026-11 | Site-wide Lenis smooth scroll mounted once in the root layout. |
| 2026-11 | Carousel mounts Swiper on the client so `/careers` prerenders. |
| 2026-11 | Carousel edge clipping replaced with a soft horizontal mask — no hard vertical line. |
| 2026-11 | Application Process accordion closed by default. |
| 2026-11 | Nav widened from a 520px pill to a 900px centred bar, menu optically centred. |
| 2026-11 | Document restructured to the DESIGN.md open format (YAML tokens + required sections). |
| 2026-11 | Added Iconography, Responsive Design and AI-usage sections to match the team's DESIGN_GUIDELINES coverage. |
