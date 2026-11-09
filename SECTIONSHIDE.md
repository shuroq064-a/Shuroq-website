# Hidden & replaced sections

This file records homepage sections that were hidden or replaced so they can be restored later.

Last updated: 2026-11-06

---

## 1. Hidden — "Industries We Support"

**Status:** hidden (removed from `app/page.tsx`)

**Where it was**

- File: `app/page.tsx`
- Position: direct child of `<main>`, between **"Our Vision & Mission"** and **"Engagement Models"**
- It was the 7th `<section>` in `<main>` (index 6, zero-based)
- Measured on 2026-11-05 at 1536 × 872, immediately before removal:
  - top: **~5458 px**
  - height: **~687 px**
- Appearance: full-width dark band (`background: var(--fg)`, `color: var(--bg)` → black/white inverted in dark theme) with the mono label **"Industries"**, heading **"Industries We Support"**, a 3-column grid of five industry cards (Telecom, Automotive, BFSI, Healthcare, Finance) and a centred **"More About Industries"** button linking to `/industries/`.

**Why it was hidden**

Client feedback on the homepage annotation requested this section be hidden and documented.

**Original source (paste back between the Vision & Mission and Engagement Models sections)**

```tsx
{/* Industries */}
<section className="section" style={{ background: "var(--fg)", color: "var(--bg)" }}>
  <div className="container">
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <div className="mono-label" style={{ color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>Industries</div>
      <h2 className="section-title" style={{ color: "var(--bg)" }}>Industries We Support</h2>
    </div>
    <div className="grid-3">
      {["Telecom", "Automotive", "BFSI", "Healthcare", "Finance"].map((ind) => (
        <div className="card" key={ind} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "var(--bg)" }}>
          <h3 className="feature-title" style={{ color: "var(--bg)", marginBottom: 8 }}>{ind}</h3>
          <p className="body" style={{ color: "rgba(255,255,255,0.7)" }}>Scalable digital solutions tailored to the industry.</p>
        </div>
      ))}
    </div>
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <a href="/industries/" className="btn btn-pill btn-white">More About Industries</a>
    </div>
  </div>
</section>
```

---

## 2. Hidden — "Our Vision & Mission"

**Status:** hidden (removed from `app/page.tsx`)

**Where it was**

- File: `app/page.tsx`
- Position: direct child of `<main>`, after **"Where we make an impact"** and before the Engagement section (it sat between the impact section and the — now also hidden — Industries section)
- Measured on 2026-11-05 at 1536 × 872, immediately before removal:
  - top: **~4929 px**
  - height: **~529 px**
- Appearance: centred mono label **"Vision & Mission"**, heading **"Our Vision & Mission"**, and two bordered cards side by side:
  - **Our Vision** — "To become a trusted global technology partner helping organizations scale through intelligent automation, cloud modernization, and business-focused digital transformation."
  - **Our Mission** — "To deliver scalable, reliable, and performance-driven technology solutions that improve operational efficiency, accelerate business growth, and enable long-term digital success."

**Why it was hidden**

Client feedback on the homepage: the two old Vision/Mission cards should be removed.

**Original source (paste back after the "Where we make an impact" section)**

```tsx
{/* Vision & Mission */}
<section className="section">
  <div className="container">
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <div className="mono-label" style={{ marginBottom: 16 }}>Vision &amp; Mission</div>
      <h2 className="section-title">Our Vision &amp; Mission</h2>
    </div>
    <div className="grid-2">
      <div className="card">
        <i className="fas fa-eye" style={{ fontSize: 24, marginBottom: 16 }} />
        <h3 className="feature-title" style={{ marginBottom: 8 }}>Our Vision</h3>
        <p className="body" style={{ color: "var(--muted)" }}>
          To become a trusted global technology partner helping organizations scale through intelligent automation, cloud modernization, and business-focused digital transformation.
        </p>
      </div>
      <div className="card">
        <i className="fas fa-bullseye" style={{ fontSize: 24, marginBottom: 16 }} />
        <h3 className="feature-title" style={{ marginBottom: 8 }}>Our Mission</h3>
        <p className="body" style={{ color: "var(--muted)" }}>
          To deliver scalable, reliable, and performance-driven technology solutions that improve operational efficiency, accelerate business growth, and enable long-term digital success.
        </p>
      </div>
    </div>
  </div>
</section>
```

---

## 3. Replaced — "Engagement Models" grid → sticky card stack

**Status:** replaced (not hidden); original grid content kept here for reference.

**Where it was**

- File: `app/page.tsx`
- Position: after the Industries section and before the "From vision to execution" contact CTA
- Measured before replacement at 1536 × 872: top **~6145 px**, height **~629 px**
- Appearance: centred mono label **"Engagement"**, heading **"Engagement Models"**, and a 2 × 2 grid of cards.

**What replaced it**

`<StickyCardStack cards={engagementCards} />` from
`components/unlumen-ui/sticky-card-stack.tsx` — a sticky, scroll-driven slide deck of the four Engagement Model posters in `public/images/engagement/`:
Project Based Delivery, Dedicated Teams, Managed Services, Consulting & Advisory.
Every poster renders at the same size; each new one slides up over the previous card.

**Original source (the grid that was replaced)**

```tsx
{/* Engagement Models */}
<section className="section">
  <div className="container">
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <div className="mono-label" style={{ marginBottom: 16 }}>Engagement</div>
      <h2 className="section-title">Engagement Models</h2>
    </div>
    <div className="grid-2">
      {[
        { title: "Project Based Delivery", desc: "Ideal for well-defined requirements with fixed scope and timelines. We take end-to-end ownership to deliver predictable, high-quality outcomes." },
        { title: "Dedicated Teams", desc: "A skilled, scalable team works exclusively on your project as an extension of your organization." },
        { title: "Managed Services", desc: "We proactively manage, monitor, and optimize your systems to ensure stability and performance." },
        { title: "Consulting & Advisory", desc: "Expert guidance to help you make informed technology and business decisions." },
      ].map((m) => (
        <div className="card" key={m.title}>
          <h3 className="feature-title" style={{ marginBottom: 8 }}>{m.title}</h3>
          <p className="body" style={{ color: "var(--muted)" }}>{m.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## 4. Added — animated ASCII closing footer

**Status:** added.

**Where it is**

- File: `app/page.tsx`
- Position: the last block inside `<main>`, directly after `<SiteFooter />` (see entry 5)
- Component: `components/unlumen-ui/animated-footer.tsx` (VengeanceUI's Animated Footer, from `https://www.vengenceui.com/r/animated-footer.json`)
- Height: `68vh` (`min-height: 520px`); measured 2026-11-05 at 1536 × 872: top **9264 px**, height **593 px**
- Art: `public/animated-footer/hand-left.jpg` and `hand-right.jpg` — the original VengeanceUI hand photos (ASCII-sampled at runtime, not pre-baked)
- Look: full-width stage in the theme's inverted surface (`background: var(--fg)`, text `var(--bg)`), two ASCII hands reaching in from the left and right edges at mid-height, cursor-lit clusters, pointer parallax, and an oversized **Shuroq** wordmark that unmasks character-by-character when the stage scrolls into view.

**Deviations from the VengeanceUI source (all layout fitting, no behaviour lost)**

- The render loop is paused with an `IntersectionObserver` whenever the stage is off-screen, so the rest of the page keeps its scroll budget.
- `prefers-reduced-motion` gets a static frame instead of the reveal/parallax.
- Hands are sized `w-[32%] max-w-[560px]` with `pb-[12%]` on their row. The upstream `w-2/5` / `items-center` split assumes a near-square preview; on a full-bleed wide footer that made the hands taller than the stage and they covered the wordmark.
- Wordmark size stays at the upstream `clamp(2rem, 13cqw, 11rem)`.

**Checked on 2026-11-05** (headless Chrome, 1536 × 872 and 1920 × 1080)

- Light theme: black stage, white wordmark, warm `#e6b093` glyphs. Dark theme: white stage, black wordmark, `#803500` glyphs (both are the upstream defaults for this inverted surface).
- Hover: moving the cursor over a hand lights a cluster of cells in `#ff6a00` with dark/white glyphs, then fades out.
- Scroll reveal: hands slide in from the edges and the wordmark unmasks once the stage enters view.
- `prefers-reduced-motion: reduce`: no reveal, no parallax — hands and wordmark render in their final position immediately.
- No horizontal overflow at either width; footer-to-stage gap stays `0 px`.

**Note:** per the homepage annotation, this stage now comes **after** the Arc-style site footer, so the closing block reads: CTA → site footer → animated stage.

---

## 5. Replaced — original simple footer → Arc `SiteFooter` block

**Status:** replaced (not hidden); original markup kept here for reference.

**Where it was**

- File: `app/page.tsx`
- Position: directly before the animated ASCII stage, as the last `<footer>` inside `<main>`
- Measured before replacement at 1536 × 872: it sat at roughly the same place the new footer now occupies (page bottom block)
- Appearance: an inverted full-width band (`className="footer"`, styled in `app/globals.css`) holding the **Shuroq** wordmark, one paragraph of company description, and a right-aligned copyright line.
- Also removed with it: the `<Script src="/js/footer.js">` and `<link rel="stylesheet" href="/css/footer.css">` includes. Both files still exist in `public/` but are no longer loaded.

**What replaced it**

The real Arc block, installed with the shadcn CLI:

```bash
npx shadcn@latest add https://uiarc.dev/r/site-footer.json
```

Files created (verbatim registry source):

- `components/arc/blocks/site-footer/site-footer.tsx` + `site-footer.module.css`
- `components/arc/button/button.tsx` + `button.module.css` (block dependency)
- `components/arc/segmented-control/segmented-control.tsx` + `segmented-control.module.css` (block dependency)
- `components/arc/motion-tokens.ts`, `components/arc/lib/motion-tokens.ts`
- `components.json` was added at the repo root (style, aliases, and the `@uiarc` registry) so the CLI could install and can update later.

Supporting changes needed to run the exact source in this app:

- `next.config.ts` — the existing `turbopack.rules["*.css"]` entry (`as: "*.css"`) flattened CSS-module class names to empty strings. That rule now skips `*.module.css` files, which Turbopack then handles as CSS modules natively.
- `app/globals.css` — a `.site-footer-inverted` token scope remaps the Arc design tokens the block reads (`--background`, `--foreground`, `--text-secondary`, `--border*`, `--surface*`, `--radius-control`, `--duration-*`, …) onto the site's inverted closing surface. Arc's `foundation.css` is **not** imported globally: it would overwrite this site's palette, fonts and `color-scheme`. The installed `components/arc/foundation.css` was removed for that reason.
- `app/page.tsx` — brand is `{ name: "Shuroq", href: "/", mark: <sunrise svg> }`; columns/legal/socials come from `footerColumns`, `footerLegal`, `footerSocials`; `newsletter={null}` and `status={null}` because there is no backend; `year={2026}` is passed explicitly because the component's `new Date()` default breaks prerendering under `cacheComponents`.
- The footer keeps `className="site-footer-inverted"`, so it stays the same inverted band as the CTA above and the ASCII stage below.
- Measured 2026-11-05 at 1536 × 872: top **8862 px**, height **401 px**, gap to the stage **0 px**.

**Original source (the simple footer that was replaced)**

```tsx
{/* Footer */}
<footer className="footer">
  <div className="container" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
    <div>
      <div className="nav-logo" style={{ color: "var(--bg)", marginBottom: 8 }}>Shuroq</div>
      <p className="body" style={{ color: "var(--bg)", opacity: 0.7, maxWidth: 360 }}>
        Technology Services &amp; Digital Engineering Company. Empowering businesses with cutting-edge technology solutions.
      </p>
    </div>
    <div className="mono-small" style={{ color: "var(--bg)", opacity: 0.55, alignSelf: "flex-end" }}>
      © 2026 Shuroq Technology Services. All rights reserved.
    </div>
  </div>
</footer>
```

Its styles still live in `app/globals.css` under `.footer` and can be reused if the block is restored.

---

## 6. Replaced — homepage hero background video + peach blend → black + floating ASCII "Shuroq"

**Status:** replaced (not hidden); the original hero background is kept here for reference.

**Where it was**

- Files: `app/page.tsx` (hero markup), `app/globals.css` (`.hero-gradient-bg`, `.hero-video`, `.hero-veil`, `.hero-headline*`)
- Position: the first `<section>` inside `<main>`, directly under `<SiteNav />`
- Appearance until 2026-11-06: a looping `/hero-blend.mp4` video over an animated peach → dusty-rose → periwinkle mesh gradient, with a soft white veil, a dark 86px handwritten Caveat headline, and a frosted white LIVE DASHBOARD card.

**What changed (2026-11-06)**

- **Nav → glasscn liquid glass.** `components/nav/site-nav.tsx` now wraps the bar in `LiquidGlass` (`components/ui/liquid-glass.tsx`), a direct port of **kostyniuk/glasscn-components** (MIT): a rounded-rect SDF displacement map is rasterised per geometry and fed to `backdrop-filter: url(#…) blur() saturate()`, so the edge really bends the content behind it, with a masked 1px rim. Like upstream it is a *clear* pane — `bg-white/[0.08]` (8 % white) over the refracted backdrop, no sheen, no drop shadow — so the page reads straight through it. The earlier `liquid` sheen and 18 s `liquid-drift` animation were deleted: the warm radial glow read as an orange cast on dark sections. Chromium renders the SVG refraction; Safari and Firefox fall back to a plain blur. Tone follows whatever scrolls behind the bar via `hooks/use-backdrop-tone.ts`, which probes `elementsFromPoint` at 18 / 50 / 82 % of the bar width: dark backdrops get white text and a white-top rim, light backdrops get dark text and a neutral 1px hairline so the capsule is still visible on white. Blur is 6 px (upstream's 2 px is too sharp here, where 120 px display type scrolls under the bar). The tone is deliberately omitted during SSR and applied after the first client measurement, otherwise React leaves the hydrated `data-tone` attribute at its server value. The bar is a **content-hugging pill** (`w-fit`, `rounded-full`, 44 px tall — about 747 × 44 at 1396) with no logo; the first item is a plain **About Us** link, since the old Company dropdown was removed. The pill sits **flush with the top of the viewport** (`top: 0`, no top margin; the hero's negative top margin is `-80px` to compensate) and stays pinned there while the page scrolls.
- **Services wheel clears the nav.** `OrbitalImageWheel` has a new `safeTop` prop (`app/page.tsx` passes `72`). The ring is anchored to the bottom of a `sticky top-0 h-screen` panel, so on short viewports the topmost card used to rotate up behind the floating pill. The component measures the wheel's offset and the depth projection, then nudges every card down by whatever deficit exists — so the highest card never rises above `safeTop` (72 px), while tall viewports (where the ring already clears the bar) are left untouched.
- **Headline halved.** `.hero-headline-text` went from `clamp(48px, 6.2vw, 88px)` / `line-height: 0.94` to `clamp(24px, 3.1vw, 44px)` / `1.02`; the ≤768px rule went from `clamp(46px, 12vw, 64px)` to `clamp(23px, 6vw, 32px)`. Measured 43.276px at 1396 × 762, DPR 1.375.
- **Hero background → black.** `.hero-gradient-bg` is now solid `#000000` with `color: #f5f5f5`; the `<video>`, `.hero-video`, `.hero-veil` and the `hero-blend` keyframes were removed. The grain overlay (`.hero-gradient-bg::after`) is kept at `opacity: 0.05`. The hero is black in both light and dark themes.
- **Hero copy restyled for dark.** Paragraph is `rgba(255,255,255,0.72)` (max-width 560); `Get Started` is white-on-black; `Learn More` is white text on `rgba(255,255,255,0.08)` glass; the LIVE DASHBOARD card is dark glass with white text.
- **Floating ASCII "Shuroq".** New client component `components/hero/floating-ascii-word.tsx`, mounted in an absolutely-positioned `.hero-ascii-word` stage in the right half of the hero (`top: 17%; right: 3%; width: 46%; height: 60%`, warm radial halo, `pointer-events: none`, `aria-hidden`). At ≤1024px the stage moves to the bottom of the hero at 50% opacity.
  - The word is rasterised from Manrope 800 into a **monospace ASCII grid** (cells ≈ 0.58 as wide as tall), sampled at 3× and averaged down to per-cell coverage, then drawn with `#`, `@`, `+` and `.` so the letterforms stay solid while the contour stays soft.
  - It drifts, bobs, breathes, tilts and ripples; a decaying wake of orange dots trails it and a small plankton field drifts behind it. Pointer proximity brightens/warms the glyphs.
  - Motion pauses when off-screen or when the tab is hidden; `prefers-reduced-motion: reduce` renders a single static frame.
  - **Credit:** the technique (character-grid sampling, wake field, off-screen pause, reduced-motion frame) is adapted from **stackedlol/ascii-sharks** (MIT) — https://github.com/stackedlol/ascii-sharks. No files from the repo are vendored; the word entity is original to this site.

**Restoring the old hero**

Put the video and veil back inside `<section className="hero-gradient-bg">` (before `.container`):

```tsx
<video className="hero-video" autoPlay muted loop playsInline preload="auto">
  <source src="/hero-blend.mp4" type="video/mp4" />
</video>
<div className="hero-veil" aria-hidden />
```

Then restore these rules in `app/globals.css` (and delete `.hero-ascii-word`, `.nav-glass`, `components/ui/liquid-glass.tsx`, `hooks/use-backdrop-tone.ts`, the `LiquidGlass` / `useBackdropTone` usages in `components/nav/site-nav.tsx`, the `FloatingAsciiWord` import/markup and the dark-hero overrides):

```css
.hero-gradient-bg {
  position: relative;
  overflow: hidden;
  color: #1a1a1a;
  background-color: #e9c3a8;
  background-image:
    radial-gradient(ellipse at 14% 18%, rgba(246, 224, 200, 0.95) 0%, rgba(246, 224, 200, 0) 55%),
    radial-gradient(ellipse at 84% 8%, rgba(122, 149, 214, 0.55) 0%, rgba(122, 149, 214, 0) 50%),
    radial-gradient(ellipse at 92% 62%, rgba(198, 143, 146, 0.8) 0%, rgba(198, 143, 146, 0) 55%),
    radial-gradient(ellipse at 16% 90%, rgba(74, 36, 38, 0.55) 0%, rgba(74, 36, 38, 0) 55%),
    linear-gradient(120deg, #f6e0c8 0%, #e9c3a8 30%, #c68f92 62%, #8f9fd0 100%);
  background-size: 150% 150%, 150% 150%, 150% 150%, 150% 150%, 150% 150%;
  animation: hero-blend 18s ease-in-out infinite alternate;
}
@keyframes hero-blend {
  0% { background-position: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%; }
  50% { background-position: 35% 20%, 22% 40%, 42% 12%, 12% 32%, 22% 12%; }
  100% { background-position: 65% 42%, 52% 6%, 24% 32%, 32% 4%, 42% 22%; }
}
.hero-video { position: absolute; inset: 0; z-index: 0; width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
.hero-veil {
  position: absolute; inset: 0; z-index: 2; pointer-events: none;
  background: linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.18) 45%, rgba(255,255,255,0.32) 100%);
}
```

Also restore `.hero-headline-text` to `clamp(48px, 6.2vw, 88px)` / `line-height: 0.94` (and the ≤768px `clamp(46px, 12vw, 64px)`), `.hero-headline { color: #1a1a1a }`, the old paragraph/card colors, and the original dark-on-light button overrides.

The nav's pre-glasscn surface (if you want the simple frosted bar back instead of `LiquidGlass`) was:

```css
.liquid-glass {
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.92) 0%,
    rgba(255, 255, 255, 0.8) 46%,
    rgba(255, 255, 255, 0.72) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.8);
  -webkit-backdrop-filter: blur(26px) saturate(180%);
  backdrop-filter: blur(26px) saturate(180%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.95),
    inset 0 -10px 20px -14px rgba(255, 255, 255, 0.9),
    0 0 0 1px rgba(255, 255, 255, 0.12),
    0 14px 40px rgba(0, 0, 0, 0.34);
}
.liquid-glass::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(
    140deg,
    rgba(255, 255, 255, 0.55) 0%,
    rgba(255, 255, 255, 0.12) 34%,
    rgba(255, 255, 255, 0) 56%
  );
  opacity: 0.45;
}
```
