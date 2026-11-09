# Design System — Shuroq Website

_Last updated: 2026-11-09_

This is the complete design reference for the Shuroq marketing site: the visual
language, every token, every layout rule, every component, and — importantly —
**where each pre-existing component came from** and what its licence requires.

Read this before changing any page. Most regressions on this site come from
"improving" a token, a radius, or a section rhythm that another page already
depends on.

---

## 0. Rules that override everything else

1. **One visual language across every route.** Home, `/about` and `/careers`
   must look like the same site. Never introduce a new section style on one page.
2. **Never name a component library, registry, author, or source file in any
   user-facing copy.** The credits live in code comments and in this document —
   not on the site.
3. **Change only what was asked.** No opportunistic restyling.
4. **Keep the carousel card size and radius** (square card, 48px radius, inset
   hairline). It was explicitly approved in that shape.
5. **Reduced motion is a first-class path.** Every animation must degrade to a
   static state when `prefers-reduced-motion: reduce` is set.
6. **Light and dark are both real.** Nothing may be hard-coded to one theme
   except the black hero band and the inverted footer, which are black in both.

---

## 1. How the site should look — the approved spec

This section is **prescriptive**: it states what the design must be. If the code
does not match this, the code is wrong.

### 1.1 Direction

| Attribute | It should be |
| --- | --- |
| Feel | Editorial, technical, calm. Confident, never playful or "startup-y". |
| Typography | Huge, tight, low-contrast display headlines. Small, quiet body copy. |
| Colour | Monochrome UI. Ink on paper, paper on ink. Colour only in photography, brand marks and the ember hero glow. |
| Shapes | Pills for all controls. 8px for inputs and panels. 48px for the poster carousel. Organic SVG cutouts for feature cards. |
| Motion | Slow, spring-driven, one purpose per animation. Nothing loops except the ASCII footer and the beam pulses. |
| Texture | Refracted glass, warm paper, and ASCII/canvas art. No gradients on text. No neon. |

### 1.2 Must — every page

1. Open with the **black hero band** and the floating ASCII word.
2. Alternate exactly three bands: paper → warm surface → inverted ink.
3. Use `.section` for vertical rhythm (96px). Never invent a new padding value.
4. Put every section inside `.container` (1920px max, 40px gutters).
5. Use `.grid-2` (heading left, artefact right) for two-column sections.
6. End with the inverted CTA band, then the animated footer, then the site footer.
7. Use the real company logo (`logo.png`, 34×34) in the footer on **all** pages.
8. Keep one `<h1>` per page, inside the hero.
9. Keep every interactive element reachable by keyboard with a visible focus ring.

### 1.3 Never

1. Never name a library, registry, author or file in on-page copy.
2. Never add a colour outside the palette in §2.0.
3. Never use a gradient on text, a coloured button, or a neon glow.
4. Never change the carousel card's square shape, 48px radius or inset hairline.
5. Never open the Application Process accordion by default — all closed, click `+`.
6. Never let the nav exceed **900px** or stop being optically centred.
7. Never hard-code light-only or dark-only colours outside the hero and footer.
8. Never restyle a section on one page only.
9. Never remove an attribution comment from a vendored component.
10. Never enable an animation that ignores `prefers-reduced-motion`.

### 1.4 Element-by-element, as it should be

| Element | Spec |
| --- | --- |
| Nav | Floating glass pill, 48px tall, max 900px wide, centred, sticky at 16px from the top. Menu optically centred. |
| Hero | Black in both themes. ASCII word right of centre, ember radial glow behind it. Handwritten headline, two pill buttons. |
| Section heading | `.section-title` — 64px, weight ~460, tracking −1.4px, line-height 1.10. |
| Lead paragraph | `.body-lg` — 20px, weight 330, 55% ink, max ~72 characters. |
| Body copy | 16px, 55% ink. Never pure black. |
| Primary button | `.btn-pill.btn-black` — 50px radius, ink fill, paper text. Inverts to white on the black hero. |
| Secondary button | `.btn-pill.btn-glass-dark` — translucent, 1px light border, blur. |
| Card | 8px radius, 1px `--border`, flat, no drop shadow. |
| Poster carousel | Square slides, 48px radius, 1.5px inset hairline, neighbours at 55% opacity, soft faded edges, dots below. |
| Accordion | Filled rows, 8px radius, `+` indicator that rotates to ×, closed by default. |
| Divider | 220px centred hairline, 14% ink, 24px above and below. |
| Footer | Black surface, white text, logo + wordmark, three link columns, legal + socials. |

### 1.5 Review checklist before shipping a visual change

- [ ] Same visual language as the other two routes
- [ ] No new colour, radius, spacing or font size
- [ ] Light **and** dark both checked
- [ ] Reduced motion still works
- [ ] Keyboard focus visible
- [ ] No source/library names visible anywhere on the page
- [ ] `npm run build` passes

---

## 2. Tokens

All tokens live in `app/globals.css` under `:root` (light) and `.dark`.
Never hard-code a hex value in a component when a token exists.

### 2.0 Current palette at a glance

The whole site runs on **five colours**. Everything else is derived from them.

| Swatch | Colour | Hex / value | Role |
| --- | --- | --- | --- |
| ⬛ | Ink | `#000000` | Text, inverted bands, buttons, hero background |
| ⬜ | Paper | `#ffffff` | Page background, cards, text on ink |
| ▫️ | Warm surface | `#f0eee9` | Organic card surface, poster paper tone |
| 🌑 | Charcoal | `#0a0a0a` / `#111111` | Dark-mode page and surface |
| 🟠 | Ember (glow only) | `#ff7e2b` @ 5–12% alpha | The single warm accent — the soft radial glow behind the ASCII hero word. **Not a token**; it lives in `.hero-ascii-word::before` as an `rgba()` radial gradient, blurred 18px. |

Supporting greys (all alpha-on-ink or alpha-on-paper, never flat grey):

`--muted` 55% · `--meta` 40% · `--border` 12% · `--border-soft` 6% ·
`--accent-active` 8%.

That is the entire palette. There is **no brand blue, no gradient text, no
coloured buttons**. Colour enters the site only through:

1. the ember hero glow above,
2. the poster artwork in `public/images/careers/` (peach, sage, pink, cream),
3. customer brand marks in the integration diagram.

> If a new colour is ever needed, it must be added as a token in `:root` **and**
> `.dark`, documented here, and approved — never inlined into a component.

### 2.1 Colour — semantic (theme-aware)

| Token | Light | Dark | Used for |
| --- | --- | --- | --- |
| `--bg` | `#ffffff` | `#0a0a0a` | Page background |
| `--surface` | `#ffffff` | `#111111` | Cards, nested panels |
| `--surface-warm` | `#ffffff` | `#111111` | Alternate section band |
| `--fg` | `#000000` | `#ffffff` | Text, and inverted section background |
| `--fg-2` | `#000000` | `#ffffff` | Secondary strong text |
| `--muted` | `rgba(0,0,0,.55)` | `rgba(255,255,255,.6)` | Body copy under headings |
| `--meta` | `rgba(0,0,0,.40)` | `rgba(255,255,255,.45)` | Captions, meta rows |
| `--border` | `rgba(0,0,0,.12)` | `rgba(255,255,255,.12)` | Hairlines, card edges |
| `--border-soft` | `rgba(0,0,0,.06)` | `rgba(255,255,255,.08)` | Dividers inside cards |
| `--accent` | `#000000` | `#ffffff` | Primary action |
| `--accent-on` | `#ffffff` | `#000000` | Text on accent |
| `--accent-hover` | `rgba(0,0,0,.85)` | `rgba(255,255,255,.85)` | Hover state |
| `--accent-active` | `rgba(0,0,0,.08)` | `rgba(255,255,255,.10)` | Pressed / selected wash |
| `--success` | `oklch(73.29% 0.1935 150.81)` | same | Status dot |
| `--warn` | `#eab308` | `#facc15` | Warning |
| `--danger` | `#dc2626` | `#f87171` | Error |

### 2.2 Colour — shadcn bridge

Motion components (menu, footer, accordion, buttons) read the shadcn-style
aliases, which is why they automatically theme correctly:

`--background`, `--foreground`, `--card`, `--card-foreground`, `--popover`,
`--primary`, `--primary-foreground`, `--secondary`, `--muted-foreground`,
`--accent-foreground`, `--destructive`, `--border`, `--input`, `--ring`,
`--radius` (8px), `--segment`.

Do not edit these independently — they mirror the semantic tokens above.

### 2.3 Colour — glass and gradients

| Token | Light | Dark |
| --- | --- | --- |
| `--glass-bg` | `oklch(100% 0 0 / .55)` | `oklch(17% 0.002 265 / .55)` |
| `--glass-border` | `oklch(15% 0 0 / .08)` | `rgb(255 255 255 / .08)` |
| `--gradient-bg` | white → `oklch(96% 0.008 210)` | `oklch(17%…)` → `oklch(21%…)` |
| `--gradient-accent` | cyan → violet | cyan → violet |

The nav's glass surface is **not** built from `--glass-bg`; it uses the
`LiquidGlass` component's own 8% white pane plus a real SVG refraction filter.

### 2.4 Typography

| Token | Value |
| --- | --- |
| `--font-display` | `"Manrope Variable"`, `figmaSans`, SF Pro Display, system-ui… |
| `--font-body` | `figmaSans` (Figma export), SF Pro Display, system-ui… |
| `--font-mono` | `figmaMono`, SF Mono, Menlo, ui-monospace… |
| Handwritten | `"Caveat Variable"` (hero headline only) |

Loaded in `app/globals.css`:

```css
@import "@fontsource-variable/manrope/index.css";
@import "@fontsource-variable/caveat/index.css";
```

Type scale:

| Token | Size | Notes |
| --- | --- | --- |
| `--text-xs` | 12px | Overlines, legal |
| `--text-sm` | 16px | UI text |
| `--text-base` | 16px | Body |
| `--text-lg` | 20px | Lead paragraphs (`.body-lg`) |
| `--text-xl` / `--text-2xl` | 26px | Subheads |
| `--text-3xl` | 64px | `.section-title` |
| `--text-4xl` | 86px | Display / hero |

Rules:

- Display sizes use **tight tracking** (`-2.6px` at 86px, `-1.4px` at 64px)
  and `line-height: 1.02 / 1.10`.
- Weights are deliberately **low**: 330–540. The site never uses 700+ except
  inside poster artwork (`career-*.png`) and `.feature-title` (700).
- Body copy is never pure black: use `--muted`.

### 2.5 Spacing

`--space-1…12` = 4, 8, 12, 16, 20, 24, 32, 48 px.

Section rhythm:

| Token | Value |
| --- | --- |
| `--section-y-desktop` | 96px |
| `--section-y-tablet` | 64px |
| `--section-y-phone` | 40px |

`.section { padding: var(--section-y-desktop) 0; }` — sections that sit directly
above another section opt out with `paddingBottom: 0`.

### 2.6 Radius

| Token | Value | Where |
| --- | --- | --- |
| `--radius-sm` | **50px** | `.btn-pill` (any pill button) |
| `--radius-pill` | 9999px | Nav bar, tags, status pills |
| `--radius-md` / `--radius-lg` / `--radius` | 8px | Cards, inputs, panels |
| — | 48px | Poster carousel slides (literal, in `skiper47.tsx`) |
| — | organic | `OrganicCardSmall` — SVG cutout shape, no border-radius |

> `--radius-sm: 50px` looks wrong in the name but is intentional: it is the pill
> button radius. Do not "fix" it to 4px.

### 2.7 Elevation

| Token | Value |
| --- | --- |
| `--elev-flat` | `none` |
| `--elev-ring` | `0 0 0 1px var(--border)` |
| `--elev-raised` | `0 4px 16px rgba(0,0,0,.08)` |
| `--surface-shadow` | 3-layer soft shadow (light) / `none` (dark) |
| `--overlay-shadow` | floating panels (light) / inset rim + drop (dark) |
| `--focus-ring` | `0 0 0 2px rgba(0,0,0,.8)` |

Shadows are used sparingly: the sticky card deck, the glass rim, and the
organic card's silhouette. Sections themselves are flat.

### 2.8 Motion

| Token | Value |
| --- | --- |
| `--motion-fast` | 150ms |
| `--motion-base` | 200ms |
| `--ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` |
| `--ease-ui-out` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `--ease-spring-snappy` | `linear(...)` spring approximation |
| `--duration-spring-snappy` | 400ms |
| `--duration-spring-bouncy` | 600ms |
| `--stagger-step` | 45ms |
| `--press-scale` | 0.98 |

Arc-family components read the mirrored JS tokens in
`components/arc/lib/motion-tokens.ts` (springs, durations, easings) so CSS and
JS animation share one curve set.

Global scroll: **Lenis**, mounted once in `app/layout.tsx` via
`components/smooth-scroll.tsx` — `duration: 3`, `smoothWheel`, `touchMultiplier: 2`,
skipped entirely under reduced motion.

---

## 3. Layout system

### 3.1 Container

```css
.container { max-width: 1920px; margin: 0 auto; padding: 0 40px; }
```

| Breakpoint | Gutter |
| --- | --- |
| Desktop (≥1024px) | 40px |
| Tablet | 24px |
| Phone | 16px |

### 3.2 Grid

`.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }`

The two-column block is the default section layout: heading + lead on the left,
the artefact (accordion, card, carousel) on the right. Sticky columns use
`position: sticky; top: 96px`.

### 3.3 Section backgrounds

The site alternates exactly three bands:

1. **Paper** — default (`--bg`), no styling.
2. **Warm** — `background: var(--surface-warm)`, for secondary sections.
3. **Inverted** — `background: var(--fg); color: var(--bg)`, for emphasis bands
   and the closing CTA. Inverted sections must set the text colour on the
   section (not on each child).

The **hero is always black** (`hero-gradient-bg`, `#000`), in both themes.

### 3.4 Section order (every page ends the same way)

```
… content …
Inverted CTA band
AnimatedFooter       (full-bleed ASCII art footer)
SiteFooter           (columns, brand, legal, socials)
```

---

## 4. Global chrome

### 4.1 Nav — `components/nav/site-nav.tsx`

| Property | Value |
| --- | --- |
| Position | `sticky; top: 16px; z-index: 50` |
| Shape | floating pill, `border-radius: 9999px` |
| Height | 48px (`h-12`) |
| Width | `calc(100vw - 32px)`, capped at **900px**, centred |
| Padding | `0 16px` |
| Surface | `LiquidGlass` @ `blur={6}`, `bg-white/[0.08]` |
| Layout | empty left spacer · **menu centred** · theme switch right |
| Items | About Us · Services · Solutions · Resources (dropdowns) |
| Tone | auto-detected from the backdrop (`useBackdropTone`), flips to white text over the black hero |

Rules:

- The menu group must stay **optically centred**: left spacer and right cluster
  both take `flex: 1`.
- Never let the bar go full-bleed. 900px is the agreed maximum.
- The mobile menu (`< md`) is a plain stacked list of `<details>` sections; it
  is not the glass pill.

### 4.2 Footer — `components/arc/blocks/site-footer/site-footer.tsx`

Used on all three pages with `variant="columns"` and
`className="site-footer-inverted"` (black surface, white text).

| Slot | Value |
| --- | --- |
| Brand mark | `public/logo.png` — 34×34, transparent PNG (the real company logo) |
| Brand name | `Shuroq`, links to `/` |
| Tagline | "Technology Services & Digital Engineering Company. Empowering businesses with cutting-edge technology solutions." |
| Columns | Services · Solutions · Company |
| Legal | Privacy · Terms |
| Socials | Instagram · LinkedIn (external, arrow icon) |
| Status | none on this site |

> The brand mark is **always the PNG logo** on home, about and careers. The
> built-in arch placeholder SVG must never render.

### 4.3 Animated footer — `components/unlumen-ui/animated-footer.tsx`

Full-bleed black band above the SiteFooter: two source images redrawn as ASCII
on `<canvas>`, cursor-cluster lighting, parallax, and character-by-character
unmasking of the display headings. The render loop pauses when off-screen.

---

## 5. Page blueprints

### 5.1 `/` — Home (`app/page.tsx`)

| # | Section | Band | Key component |
| --- | --- | --- | --- |
| 1 | Hero — floating ASCII "Shuroq", handwritten rotating headline, CTAs | Black | `FloatingAsciiWord`, `HeroHeadline` |
| 2 | "Intelligent Automation for the Modern Core" + integration diagram | Paper | `ConnectedTools` |
| 3 | "Accelerate Your Digital Velocity" | Inverted | copy + CTA |
| 4 | "Our Services" — orbital image wheel | Paper | `OrbitalImageWheel` |
| 5 | "Where we make an impact" — expanding industry rows | Warm | `HoverExpand` |
| 6 | Engagement — sticky card deck (GSAP pin + scale) | Paper | `StickyCardStack` |
| 7 | CTA "From vision to execution…" | Inverted | — |
| 8 | Animated + Site footer | Black | `AnimatedFooter`, `SiteFooter` |

### 5.2 `/about` (`app/about/page.tsx`)

| # | Section | Band |
| --- | --- | --- |
| 1 | Hero — ASCII "About", "Technology that simplifies work" | Black |
| 2 | Company Overview | Paper |
| 3 | Two-column statement block | Inverted |
| 4 | Why Businesses Choose Shuroq | Paper |
| 5 | Operational Challenges We Solve | Warm |
| 6 | Results / outcomes | Paper |
| 7 | CTA | Inverted |
| 8 | Animated + Site footer | Black |

### 5.3 `/careers` (`app/careers/page.tsx`)

| # | Section | Band | Notes |
| --- | --- | --- | --- |
| 1 | Hero — ASCII "Careers", headline, *Apply now* + *About Shuroq* | Black | `hero-gradient-bg` |
| 2 | "Why Work With Shuroq" + poster carousel | Paper | `grid-2`, carousel on the right |
| 3 | Application Process — 4-step accordion | Warm | **all items closed by default** |
| 4 | How to Apply — organic card with team photo | Paper | `OrganicCardSmall` |
| 5 | CTA "Ready to Start Your Journey" | Inverted | — |
| 6 | Animated + Site footer | Black | — |

Hairline dividers: a 220px centred `<hr>` sits between major sections
(`SectionDivider`), `padding: 24px 0`, colour
`color-mix(in srgb, var(--fg) 14%, transparent)`. Not after the hero.

---

## 6. Component specs

### 6.1 Poster carousel — `components/skiper/skiper47.tsx`

| Property | Value |
| --- | --- |
| Engine | Swiper, `effect="coverflow"` |
| Effect | `rotate: 0`, `depth: 100`, `modifier: 2.5`, `stretch: 0`, `slideShadows: false` |
| Slides per view | 1.1 → 1.35 (≥640) → 1.55 (≥1024) |
| Gap | `spaceBetween={12}` on careers |
| Card | square (`aspect-ratio: 1/1`), **48px radius**, `overflow: hidden` |
| Edge line | `inset 0 0 0 1.5px color-mix(in srgb, var(--fg) 30%, transparent)` |
| Neighbour opacity | 0.55, `0.35s ease` |
| Pagination | dots, centred, 50px above the bottom of the block |
| Autoplay | 1500ms, disabled on interaction |

Two hard-won details:

1. **Client-mount guard.** Swiper reads the clock while rendering, which Next 16
   rejects during prerender (`blocking-prerender-current-time-client`). The
   component therefore mounts Swiper only after `useEffect` has run. Removing
   that guard breaks `npm run build`.
2. **Edge fade.** The viewport clips neighbouring slides with a hard vertical
   edge. A horizontal `mask-image` (`transparent 0 → opaque 6% … 94% →
   transparent`) dissolves that cut so no sharp line appears beside the card.
   Keep the mask if the carousel is touched.

### 6.2 Accordion — `components/ui/accordion.tsx`

| Property | Careers page |
| --- | --- |
| Type | `multiple` |
| Variant | `filled` |
| Indicator | `plus` (rotates to × when open) |
| Default | **none — every item closed** |
| Trigger content | step number (`.subheading`) + title |

### 6.3 Organic card — `components/ui/organic-card-small.tsx`

Image card whose bottom-left corner is cut by an animated SVG path; the two
paths (`PATH_IDLE` / `PATH_HOVER`) morph on hover. Shadow is a `drop-shadow`
chain so it follows the painted silhouette. Local extension: a `cta` prop that
renders the action label under the meta row.

### 6.4 Buttons

| Class | Shape | Use |
| --- | --- | --- |
| `.btn .btn-pill .btn-black` | 50px radius, black fill | Primary |
| `.btn-pill .btn-glass-dark` | translucent, 1px light border | Secondary on dark |
| `.btn-pill .btn-white` | white fill | Secondary on black |

On the black hero these invert automatically (white fill / glass).

### 6.5 Icons

`lucide-react` for UI glyphs (stroke 1.5–2). Brand marks for the integration
diagram are vendored locally into `public/icons` so the page never waits on a
CDN. Font Awesome is loaded in `<head>` for the legacy static pages only.

---

## 7. Pre-existing component sources

Everything below was **vendored into this repo** and then adapted. Keep the
in-file credit comments intact — several licences require attribution.

| Component (local path) | Upstream source | Link | Licence / attribution |
| --- | --- | --- | --- |
| `components/ui/liquid-glass.tsx` — glass pill surface | **glasscn** by kostyniuk | https://github.com/kostyniuk/glasscn-components | MIT. Header comment must stay. |
| `components/unlumen-ui/motion-navigation-menu.tsx` — dropdown menu | **unlumen UI** — "Motion Navigation Menu" | https://ui.unlumen.com/components/motion-navigation-menu | Free component tier; no licence stated upstream. |
| `components/unlumen-ui/primitives/highlight.tsx` | Ships with the unlumen menu | — | Same as above. |
| `components/unlumen-ui/orbital-image-wheel.tsx` — services wheel | **unlumen UI** — "Orbital Image Wheel" | https://ui.unlumen.com/components/orbital-image-wheel | Free component tier. |
| `components/unlumen-ui/hover-expand.tsx` — industry rows | **unlumen UI** — "Hover Expand" | https://ui.unlumen.com/components/hover-expand | Free component tier. |
| `components/unlumen-ui/motion-subtitle.tsx` — per-character reveal | unlumen UI family (folder) | — | No in-file credit recorded. |
| `components/unlumen-ui/sticky-card-stack.tsx` — engagement deck | **Skiper UI** — `StickyCard002`, adapted | https://skiper-ui.com | Skiper free licence requires attribution; comment at line ~32. |
| `components/unlumen-ui/animated-footer.tsx` — ASCII footer | **VengeanceUI** — "Animated Footer", adapted | https://www.vengeanceui.com | Credit is in the file JSDoc; keep it. |
| `components/skiper/skiper47.tsx` — poster carousel | **Skiper UI** — `skiper47` by @gurvinder-singh02 (gxuri.me) | https://skiper-ui.com | Free for commercial use **with attribution** to Skiper UI. Full credit block at the top of the file. |
| `components/hero/floating-ascii-word.tsx` — hero ASCII word | **stackedlol/ascii-sharks** | https://github.com/stackedlol/ascii-sharks | MIT. Credited at line ~12. |
| `components/ui/accordion.tsx` | **shadcn/ui** (new-york) + **Spectrum UI** filled variant | https://ui.shadcn.com | MIT + additive props (`variant`, `indicator`). |
| `components/ui/organic-card-small.tsx` | **cult-ui** Organic Card (registry `@cult-ui`) | https://cult-ui.com | Extended locally with the `cta` prop. |
| `components/arc/**` — SiteFooter, Button, ThemeSwitch, SegmentedControl, motion tokens | **Arc UI** registry | https://uiarc.dev | Sourced through the registry declared in `components.json`. |
| `components/animated/animated-beam/**` + `components/showcase/connected-tools.tsx` | In-house beam/geometry implementation with vendored brand icons (`npx @thesvg/cli add`) | — | No upstream file vendored. |
| `components/smooth-scroll.tsx` | **Lenis** (`lenis`) | https://github.com/darkroomengineering/lenis | MIT / package dependency. |

Registry configuration (`components.json`):

```json
"registries": {
  "@uiarc":     "https://uiarc.dev/r/{name}.json",
  "@cult-ui":   "https://cult-ui.com/r/{name}.json",
  "@skiper-ui": "https://skiper-ui.com/registry/{name}.json"
}
```

**Attribution obligations to remember:** Skiper UI (carousel + sticky deck),
glasscn (MIT header), ascii-sharks (MIT header), VengeanceUI (JSDoc credit).
Never delete those comments during refactors.

---

## 8. Accessibility

- Landmarks: one `<nav>`, one `<main>`, footer `<footer>`; the ASCII hero and
  decorative art are `aria-hidden`.
- Focus: `.btn:focus { outline: 2px dashed var(--fg); outline-offset: 2px; }`
  and `--focus-ring` for custom controls. Never remove an outline without a
  replacement.
- Contrast: body copy at `--muted` (55% / 60%) on paper or black passes AA at
  the sizes used; headings are full-contrast.
- Motion: `useReducedMotion()` / `matchMedia` guards in the carousel, footer,
  nav transitions, theme switch, beam and Lenis.
- Images: poster slides and decorative art use descriptive `alt` or
  `aria-hidden` when purely decorative.

---

## 9. Performance rules

- Sections that animate on scroll **pause when off-screen** (ASCII footer,
  beam pulses).
- GSAP `ScrollTrigger` is used for the deck and the wheel; register plugins once
  at module scope.
- The carousel is client-mounted, so `/careers` still prerenders statically.
- Images ship from `public/images/**`; hero art is canvas-rendered ASCII, not a
  bitmap.

---

## 10. File map

```
app/
  layout.tsx            theme provider, Lenis, Agentation (dev only)
  page.tsx              home
  about/page.tsx        about
  careers/page.tsx      careers
  globals.css           every token + layout primitive
components/
  nav/site-nav.tsx      floating glass nav
  hero/                 floating-ascii-word, headline
  ui/                   liquid-glass, accordion, organic-card-small
  arc/                  footer block, button, theme switch, segmented control
  unlumen-ui/           menu, wheel, hover expand, sticky deck, ascii footer
  skiper/skiper47.tsx   poster carousel
  animated/             beam engine
  showcase/             integration diagram + media query hook
  smooth-scroll.tsx     Lenis
public/
  logo.png              company logo (footer mark)
  images/careers/       9 poster images + how-to-apply.png
  icons/                vendored brand marks
```

---

## 11. Change log (design decisions that are now law)

| Date | Decision |
| --- | --- |
| 2026-11 | Careers rebuilt to match home about/ careers parity: nav, ASCII hero, accordion, organic card, dividers, footers. |
| 2026-11 | Footer brand mark switched from the arch placeholder SVG to `logo.png` on **home, about and careers**. |
| 2026-11 | Site-wide Lenis smooth scroll mounted once in the root layout. |
| 2026-11 | Carousel mounts Swiper on the client so `/careers` prerenders. |
| 2026-11 | Carousel edge clipping replaced with a soft horizontal mask — no hard vertical line beside the card. |
| 2026-11 | Application Process accordion opens **closed**; users click `+`. |
| 2026-11 | Nav bar widened from a 520px pill to a **900px centred** bar, menu optically centred. |
