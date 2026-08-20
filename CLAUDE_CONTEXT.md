# Marbella Interior Design — Claude Development Context

## Instructions for Future Claude Sessions

Before changing anything:

1. Read `/MASTER_PROMPT.md`.
2. Read this entire `/CLAUDE_CONTEXT.md`.
3. Read `/README.md`.
4. Inspect the repository and verify that this context still matches the code.
5. Run the project (`npm install && npm run dev`).
6. Check the existing implementation before making changes.
7. Continue from **Next Recommended Tasks** below.

Do not rebuild completed functionality unless there is a clear technical
reason. Do not discard working code merely because you would have implemented
it differently. Preserve the established design system unless the
`MASTER_PROMPT.md` requires a change. **Update this file before ending your
session** (see End-of-Session Protocol at the bottom).

---

## Project Goal

Premium, Apple-quality redesign of the 3D Renders page for Marbella Interior
Design Studio. Built as a live sales demo shown directly to the business
owner. Proposal mode (`?proposal=true`) reveals a €300 redesign offer.

## Client

- Website: https://www.marbella-interiordesign.com/
- Primary page being redesigned: https://www.marbella-interiordesign.com/3d-renders/
- Address: Calle Sevilla 3, San Pedro Alcántara, 29670 Marbella, Málaga, Spain
- Alt address: Urb. La Alcazaba, casa 2, N-340 km. 175, 29660 Puerto Banús, Marbella, Málaga
- Phone: +34 952 90 84 79
- Tagline (real, from source site): "Feeling good in your own surroundings is like feeling good with yourself"

## Repository

https://github.com/Danizarg/marbella-interiordesign.com — remote `origin` set,
`main` branch.

## Design Reference

Primary: https://www.apple.com/es/macbook-pro/

Borrowing conceptually: cinematic pacing, sticky scroll sections, feature
pill selectors, oversized display typography, responsive transitions,
progress-driven pinned sequences, weighted premium motion. Apple branding,
fonts, and source code are **not** used.

## Current Stack

- Next.js **15** (App Router) + React **19**
- TypeScript strict
- Tailwind CSS 3 (with custom tokens defined as CSS variables)
- Framer Motion (component / UI motion)
- GSAP + ScrollTrigger (pinned, scroll-progress sequences)
- lucide-react (icons)
- `clsx` for class composition

Google Fonts loaded via `next/font/google`: **Fraunces** (display serif) and
**Inter** (UI sans). No Apple fonts.

## Current Repository Structure

```
/
├── app/
│   ├── layout.tsx            # Fonts, metadata, root layout
│   ├── page.tsx              # Composes all sections + proposal mode
│   ├── globals.css           # Tokens + typography + resets
│   └── loading.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx        # Transparent → blurred nav, proposal badge
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── ScrollStory.tsx
│   │   ├── FeatureExplorer.tsx
│   │   ├── ImmersiveReveal.tsx   # GSAP sticky expand
│   │   ├── Comparison.tsx        # Draggable before/after
│   │   ├── Portfolio.tsx
│   │   ├── ProcessExplorer.tsx
│   │   ├── Statement.tsx
│   │   ├── FeatureCards.tsx
│   │   ├── MarbellaSection.tsx
│   │   ├── ContactCTA.tsx
│   │   └── ProposalSection.tsx
│   ├── gallery/
│   │   └── Lightbox.tsx
│   ├── motion/
│   │   ├── RevealText.tsx        # Line-mask reveal
│   │   ├── FadeIn.tsx
│   │   └── PillSelector.tsx      # Animated active indicator
│   └── ui/
│       ├── Button.tsx
│       └── SectionEyebrow.tsx
├── lib/
│   ├── constants.ts          # Business info, nav links
│   ├── motion.ts             # Easing tokens, variants
│   ├── utils.ts              # cn(), etc.
│   └── data/
│       ├── portfolio.ts
│       ├── features.ts
│       └── process.ts
├── public/
│   ├── renders/              # 28 real client renders (render-01..28.jpg)
│   └── brand/
│       └── logo.png          # Client's real logo
├── MASTER_PROMPT.md
├── CLAUDE_CONTEXT.md
├── README.md
├── package.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── .eslintrc.json
```

## Current Implementation Status

### Complete
- Project bootstrap (Next.js 15 + TS + Tailwind + Framer + GSAP)
- Design tokens & global styles (light gallery theme with dark-section support)
- Real client assets downloaded (28 renders + logo)
- Header with scroll-driven blur transition + mobile menu + proposal badge
- Cinematic Hero (image reveal, line-by-line headline)
- ScrollStory (Light / Material / Proportion / Atmosphere with image transitions)
- FeatureExplorer (Lighting / Materials / Space / Detail pill selector)
- ImmersiveReveal (GSAP ScrollTrigger sticky expand to full-bleed)
- Comparison (draggable slider, mouse + touch)
- Portfolio (editorial varied layout) + fullscreen Lightbox
- ProcessExplorer (6 stages with animated indicator)
- Statement typographic moment
- FeatureCards (3 substantial cards)
- MarbellaSection
- ContactCTA with contact form
- ProposalSection (activated by `?proposal=true`)
- Footer with real business info
- Reduced-motion fallbacks
- Responsive breakpoints (mobile ↔ desktop)

### In Progress
- (nothing at handoff)

### Not Started
- Real email address collection (business does not publish one publicly — form is UI-only)
- Real project titles/locations for portfolio items (using neutral labels)

## Deployment

Live on Vercel: **https://marbella-interiordesign-com.vercel.app**
Proposal mode: **https://marbella-interiordesign-com.vercel.app/?proposal=true**

Deployed via the Vercel dashboard's GitHub import (user-driven, not CLI) —
auto-deploys on every push to `main`. Verified 2026-08-20: page content,
`?proposal=true` pricing section (€1,500+ vs €300, with the "not a prior
quotation" disclaimer), and no console errors, all confirmed against the
live production URL.

## Sections

### Header — `components/layout/Header.tsx`
- Transparent over hero; on scroll past ~64px picks up backdrop-blur, border,
  and shrinks height.
- Mobile: full-screen animated menu.
- When `?proposal=true` is present, shows a subtle "Redesign Concept" pill.

### Hero — `components/sections/Hero.tsx`
- Full viewport, one strong render as background.
- Image scales 1.06 → 1 on mount.
- Headline reveals line-by-line via `RevealText`.
- CTA scroll indicator.

### ScrollStory — `components/sections/ScrollStory.tsx`
- Full-viewport image with dark gradient overlay; scroll advances between 4
  beat images (Light, Material, Proportion, Atmosphere) with crossfaded
  renders as background. Statement headline sits at top, active beat word
  animates in at bottom-left, closing line at bottom-right. Fills the
  viewport at every scroll position — no empty canvas by construction.

### FeatureExplorer — `components/sections/FeatureExplorer.tsx`
- `PillSelector` with 4 tabs. Active tab drives image + copy crossfade.
- Uses Framer Motion `AnimatePresence` for smooth transitions.

### ImmersiveReveal — `components/sections/ImmersiveReveal.tsx`
- Dark section, GSAP ScrollTrigger pinned for ~200vh.
- Central image progressively expands from padded box to near full-bleed
  driven directly by scroll progress.
- Uses `gsap.registerPlugin(ScrollTrigger)` on mount; cleaned up on unmount.

### Comparison — `components/sections/Comparison.tsx`
- Concept ↔ 3D Render draggable comparison.
- Both images from real renders; label wording is factual (concept vs render).

### Portfolio — `components/sections/Portfolio.tsx` + `components/gallery/Lightbox.tsx`
- Varied rhythm: 90vw hero, right-aligned smaller, full-bleed, split pair,
  cinematic finale.
- Hover: subtle scale + metadata fade in.
- Click: opens fullscreen `Lightbox` with keyboard arrows + swipe.

### ProcessExplorer — `components/sections/ProcessExplorer.tsx`
- 6 stages: Brief → Design → Model → Material → Light → Render.
- Desktop: horizontal control with animated active indicator.
- Mobile: horizontal-scroll pill row.
- Central visual updates per stage.

### Statement — `components/sections/Statement.tsx`
- Dark background, huge type reveal: "See it. / Refine it. / Then build it."

### FeatureCards — `components/sections/FeatureCards.tsx`
- 3 editorial cards: Photorealism, Material Accuracy, Spatial Confidence.
- Subtle pointer-reactive lift.

### MarbellaSection — `components/sections/MarbellaSection.tsx`
- Geographic positioning. Real address / area references only.

### ContactCTA — `components/sections/ContactCTA.tsx`
- Large statement + phone CTA + minimal inquiry form (client-side only).

### ProposalSection — `components/sections/ProposalSection.tsx`
- Rendered only when `?proposal=true`. Shows €1,500+ typical vs €300 offer.

### Footer — `components/layout/Footer.tsx`
- Minimal luxury footer with real address + phone.

## Assets

All in `/public`:

- `public/brand/logo.png` — original client logo, from the client's Jimdo CMS.
- `public/concept/*.jpg` — **13 licensed concept images (Pexels), 2400–2560px
  wide.** These drive the entire current visual layer. See **Imagery** below.
- `public/renders/render-01.jpg` … `render-28.jpg` — the client's own renders.
  **Retained in the repo but no longer referenced by any component.** See the
  session-4 audit below for why.

The image manifest is `lib/data/imagery.ts`. Every image is declared once with
its dimensions, provenance and focal point, and the section data files
(`portfolio.ts`, `features.ts`, `process.ts`) reference it — so swapping in the
client's real renders later is a single-file change plus a focal-point pass.

## Animation Architecture

- **Framer Motion** — component transitions, hover, mobile menu, pill
  indicator, tab crossfades, form focus, reveal-on-enter.
- **GSAP + ScrollTrigger** — the one long pinned sticky sequence in
  `ImmersiveReveal.tsx`. Only used where a scroll-progress-driven timeline
  materially beats Framer Motion.
- `RevealText` splits a heading into lines, each masked and animated with a
  staggered spring-free curve (uses `easePremium`).
- Global easing tokens are in `lib/motion.ts` (`easePremium`,
  `easeEditorial`).
- `prefers-reduced-motion` is respected — heavy scroll transforms fall back
  to opacity-only fades.

## Design System

Defined as CSS variables in `app/globals.css`; consumed via Tailwind tokens
in `tailwind.config.ts`.

Colors:
```
--color-canvas   #f6f4ef   (warm gallery white)
--color-surface  #ffffff
--color-ink      #0d0e10   (near-black text/architectural anchor)
--color-muted    #6b6864
--color-stone    #d9d3c8
--color-sand     #efe7d8
--color-bronze   #8f6a3a   (used sparingly for detail)
--color-night    #0a0a0c   (dark section background)
--color-haze     rgba(246,244,239,0.72)
```

Typography:
- Display serif: **Fraunces** — hero, section titles.
- UI sans: **Inter** — body, eyebrow, UI, controls.
- Eyebrow tracking: 0.22em, uppercase, small.

Spacing / layout:
- `max-w-page`: 1440px page container.
- `max-w-reading`: 68ch reading measure.
- Vertical rhythm via section padding utilities in `globals.css`.

Motion:
- `--ease-premium: cubic-bezier(0.22, 1, 0.36, 1)`
- `--ease-editorial: cubic-bezier(0.65, 0, 0.35, 1)`

## Important Design Decisions

- **App Router** (Next.js 15) over Pages. Enables server-first shell + client
  boundaries only where motion needs `use client`.
- **Two motion libraries** intentionally. Framer for component UI, GSAP for
  scroll-timeline pinned sections. Duplication is avoided because each has a
  clearly assigned surface.
- **Copy is short, architectural, specific.** No generic marketing filler.
- **Proposal mode toggled via URL query** so the base site can be shown to
  anyone as if it were the client's real presence — the €300 offer only
  appears deliberately.
- **Assets stored locally in `/public/renders/`** rather than hotlinked so
  the demo works offline and jimcdn changes don't break it.
- **Fraunces + Inter** chosen because they are both open, high-quality, and
  produce Apple-adjacent typographic discipline without any proprietary risk.
- **No fake testimonials / stats / awards.** If a fact isn't verifiable, it's
  omitted.

## Known Issues

- Contact form is UI only — no backend handler is wired. Real email address
  is not published by the business, so the form intentionally submits to a
  no-op and instructs the visitor to phone instead.
- GSAP ScrollTrigger is only used in `ImmersiveReveal`. Other scroll effects
  use Framer's `useScroll` — mixing is intentional but future work could
  consolidate.
- No CMS / no i18n. Site is single-language (English) for the demo.

## Post-launch fix notes (session 2)

- **`overflow-x: hidden` on `body` broke every `position: sticky` on the
  page.** It made the viewport itself scrollable in that axis and voided all
  descendant sticky containing blocks. Switched `body` to `overflow-x: clip`
  in `app/globals.css` — sticky now works. Never re-introduce
  `overflow-x: hidden` on `html` or `body`.
- **ScrollStory was rewritten from a two-column layout to a full-viewport
  image-with-overlay layout.** The two-column version's flex-centered content
  left large empty canvas bands visible during the sticky release phase.
  Full-bleed background prevents empty space by construction.
- **`whileInView` viewport thresholds lowered** from `amount: 0.5–0.6` to
  `amount: 0.15–0.2` with a `-80px` bottom margin across `RevealText`,
  `FadeIn`, and `SectionEyebrow`. Prior thresholds were too strict —
  jump-scroll navigation left content stuck at initial `translateY(110%)`
  because the observer never fired.
- **Page total height reduced from ~21k → ~18.7k px** by shrinking
  `section-y` padding, `ScrollStory` per-beat height, `ImmersiveReveal` pin
  duration, and `Statement` vertical padding.
- **`.claude/launch.json` only defines `dev`** (previously `start` triggered
  `next start` and failed without a prior build). The `start` npm script now
  runs `next build && next start` as a fallback if invoked directly.

## Technical Debt

- `portfolio.ts` uses neutral labels — could later carry real project titles
  once verified with the client.
- No Playwright / Vitest tests. Demo scope; add before productionising.
- No CI (GitHub Actions) configured yet.

## Session 4 — visual audit and redesign pass (2026-08-20)

### What was actually wrong

An independent audit of the deployed site found five problems, ranked by how
much perceived quality each destroyed:

**P0 — The imagery was unusable, and on this site the imagery _is_ the
product.** Concretely, in the deployed build:
- `render-01.jpg`, used as the **hero**, is an untextured *clay* render — a
  work-in-progress lighting pass with no materials applied.
- `render-15`, `render-18`, `render-22` are **3ds Max wireframe viewport
  screenshots** (neon green/purple/red on black). They were displayed as
  finished work in the Feature Explorer ("Materials"), the Portfolio
  ("Residence VII"), and the Process Explorer ("Material").
- `render-03`, `render-06`, `render-16`, `render-21` are untextured grey/beige
  massing models; `render-03` additionally has letterbox bars baked in.
- Much of the remainder is off-segment: dated restaurant/bar CGI (`04`, `08`,
  `10`), ornate classical interiors with gold and chandeliers (`02`, `05`,
  `17`, `20`, `24`), a purple-LED hotel bedroom (`23`), and a Marilyn Monroe
  mural (`12`).
- Only ~4 files were even plausibly usable, all ≤1000px, three of them
  carrying a visible "marbella INTERIOR DESIGN" watermark.

**Resolution ceiling was verified, not assumed.** The client's Jimdo CDN serves
images through a `dimension=WxH` transform, so it was tested directly by
requesting `dimension=4000x4000` for many image IDs. The originals cap out at
**1820×1023**, and most return 1000×693 or smaller. There are no
higher-resolution originals to recover. A 1000px file cannot carry a 1920px
full-bleed section, which is why the old build looked soft everywhere.

**P0 — The hero failed the "would this appear in a design portfolio"
test.** A flat `rgba(10,10,12)` wash at 35→60% opacity crushed the whole frame
instead of shaping contrast where the type sat; copy was dropped bottom-left
over busy image content with no regard for where the image was calm; and it
carried both a bouncing scroll indicator *and* an arrow CTA.

**P1 — The Portfolio asserted provenance that could not be true.** The copy
read "Every render below was produced for a real residential project" while
displaying wireframe screenshots. That is both a design problem and an honesty
problem, and it violates the content-honesty rule in `MASTER_PROMPT.md` §5.

**P1 — Generic template/AI tells.** `rounded-full` pills throughout, uniform
`section-y` padding on every single section (producing metronomic pacing with
no compositional emphasis), and an identical "eyebrow → headline → paragraph"
opener repeated in eight consecutive sections. `FeatureCards` was three
identical rounded cards with a pointer-tilt effect — the single most
template-looking element on the page.

**P1 — Interactions without consequence.** `features.ts` declared a `focus`
field that **no component ever read**; switching tabs only crossfaded a boxed
image, so the interaction had no real payoff. `ScrollStory` layered
`from-night/70 via-night/30 to-night/80` over already-dark images, flattening
every frame to mud.

### What changed

- **Whole image layer replaced.** 13 curated Pexels images at 2400–2560px,
  art-directed to one coherent world (travertine, limestone, timber, plaster,
  warm Mediterranean light, restrained contemporary furniture). Deliberately
  curated *down* — 13 strong images rather than 28 weak ones.
- **`lib/data/imagery.ts` added** as a single manifest carrying dimensions,
  provenance and per-image focal points, with responsive focal variants where
  desktop and mobile need different crops.
- **Hero rebuilt**: new image, two directional scrims (bottom + left) instead
  of a flat wash, copy anchored in the calm region, a text-shadow for
  guaranteed legibility, responsive `object-position` (desktop `50% 55%` /
  mobile `62% 60%`), scroll-linked copy fade, and the redundant bouncing
  indicator removed.
- **ImmersiveReveal turned into the signature moment**: pin extended 100%→260%,
  a genuine camera push (scale 1.25→1 across the full timeline) while the frame
  opens 72%→100%, `Light / Material / Proportion / Detail` registering one at a
  time via stagger, resolving on "Every decision, visible before construction
  begins." Reduced-motion path sets the end state directly.
- **FeatureExplorer given real consequence**: tabs became a typographic index
  with an animated fill rule; each tab now applies its own `zoom` crop
  (1.0–1.18) so the visual genuinely changes, not just the caption.
- **Portfolio rebuilt as editorial rhythm**: seven plates at seven different
  sizes/offsets (10-col opener → small right-offset portrait → full-bleed
  escape → asymmetric pair → narrow centred pause → cinematic close), captions
  moved below the image as editorial credits rather than hover overlays. False
  provenance copy removed.
- **Comparison made honest**: previously implied two separate deliverables
  existed. Now shows the *same* frame under a genuine desaturation treatment,
  labelled "Study / Render".
- **FeatureCards de-templated**: three rounded tilt-cards → a numbered
  typographic index against one sticky companion image.
- **Design system**: pill buttons → squared; `rounded-md`/`rounded-lg` removed
  from content surfaces (circular icon controls kept, which are legitimate);
  three distinct vertical rhythms (`section-y`, `-tight`, `-air`) replacing one
  uniform value; `rule-top` opener replacing the repeated eyebrow pattern.
- **Proposal mode**: squared geometry, plus an honest disclosure that the
  imagery is licensed placeholder work to be replaced by the studio's own
  renders — framed as professional practice rather than a caveat.
- `components/motion/PillSelector.tsx` **deleted** (orphaned after the
  FeatureExplorer rework).

### Imagery provenance

Every image below is **CONCEPT IMAGERY — replace with client-owned assets
before production.** All are Pexels-licensed (free for commercial use, no
attribution required). None is another interior-design studio's project work
presented as this client's.

| File | Source | Intrinsic | Used in |
| --- | --- | --- | --- |
| `villa-terrace.jpg` | pexels 12715492 | 2560×1708 | Hero, Process 01 |
| `travertine-corridor.jpg` | pexels 30205474 | 2560×4251 | ImmersiveReveal, Process 06 |
| `stone-living.jpg` | pexels 6908501 | 2560×1707 | ScrollStory, Feature "Space", Portfolio, Process 03 |
| `travertine-stair.jpg` | pexels 35361419 | 2560×3200 | Feature "Detail", Portfolio |
| `marble-detail.jpg` | pexels 33599113 | 2400×2800 | Feature "Materials" |
| `andalusian-vault.jpg` | pexels 8118021 | 2560×3840 | MarbellaSection |
| `villa-evening.jpg` | pexels 12715585 | 2560×1707 | ScrollStory, Portfolio |
| `light-study.jpg` | pexels 8533603 | 2560×3840 | ScrollStory, Feature "Lighting", Process 05 |
| `material-study.jpg` | pexels 6825570 | 2560×3840 | ScrollStory, Portfolio, Process 04 |
| `warm-lounge.jpg` | pexels 20337842 | 2560×1707 | FeatureCards, Process 02 |
| `villa-threshold.jpg` | pexels 35438897 | 2560×3838 | Portfolio |
| `pool-terrace.jpg` | pexels 12715498 | 2560×1708 | Portfolio, Comparison |
| `arch-niche.jpg` | pexels 6615806 | 2560×3835 | Portfolio |

### Remaining weaknesses (honest)

- **Visual QA was structural, not pixel-level.** This environment could not
  produce screenshots, and — more limiting — the browser tab never composited,
  so layout did not run: every `getBoundingClientRect()` returned 0 and the
  accessibility tree came back empty. What *was* verified: production build,
  TypeScript, zero console errors on fresh loads, correct `srcSet` ladders,
  computed styles, server-rendered HTML, and proposal-mode gating. What was
  **not** verified: actual appearance, real crops, spacing at each breakpoint,
  scroll smoothness, and the pinned GSAP sequence in motion. **A session with
  working screenshots should re-check all of that before the client sees it.**
- The site is still built on placeholder imagery. Its credibility with the
  actual client depends on swapping in their real renders — and their current
  render library is not strong enough, which is itself worth raising with them.
- `ImmersiveReveal`'s 260% pin has not been felt on a real trackpad; the
  stagger timings are reasoned, not tuned.
- The contact form is still UI-only (no endpoint, no email address published).
- `public/renders/` is now dead weight in the repo (~5MB). Kept deliberately —
  they are the client's assets and the brief forbids deleting them.
- Portfolio labels are descriptive rather than real project names, because no
  verified project names exist.

## Next Recommended Tasks

1. ~~Deploy to Vercel and put the preview URL in the README~~ — done, see
   **Deployment** above.
2. Ask the client for a public email + verified project titles, then hydrate
   `lib/constants.ts` and `lib/data/portfolio.ts`.
3. Wire the contact form to a real endpoint (Resend / Formspree / Vercel
   function) once an email exists.
4. Add OpenGraph / social preview image (`app/opengraph-image.tsx`).
5. Add reduced-motion QA pass across every section.
6. Consider adding a "Studio" and "Projects" landing routes if the redesign
   scope expands beyond the 3D Renders page.
7. **Highest priority: a real visual QA pass at 375/430/768/1024/1440/1920px in
   an environment with working screenshots.** Sessions 3 and 4 could only
   verify structurally (see "Remaining weaknesses"). Pay particular attention
   to the hero crop, the Portfolio full-bleed escape row, the 260% pinned
   ImmersiveReveal sequence, and the FeatureExplorer zoom crops.
8. Ask the client whether they have higher-resolution originals *off* the Jimdo
   CMS (their source render files, not the CDN copies). The CDN caps at
   1820px, which is the single biggest constraint on how good this can look
   with real work in it.
9. Swap `lib/data/imagery.ts` to client-owned renders once supplied, and
   re-tune focal points.

## Commands

```bash
# install (once)
npm install

# local development
npm run dev            # → http://localhost:3000
                       # proposal mode: http://localhost:3000/?proposal=true

# type-check
npm run typecheck

# production build
npm run build
npm run start

# lint
npm run lint
```

## Last Session Summary

**Date:** 2026-08-20

**What was completed:**
- Green-field bootstrap of the project (was an empty repo with only `.git`).
- Created `MASTER_PROMPT.md`, `CLAUDE_CONTEXT.md`, `README.md`.
- Configured Next.js 15 App Router, TypeScript strict, Tailwind, Framer Motion,
  GSAP.
- Downloaded 28 real render images from the client's Jimdo CMS + the client's
  logo. Stored under `/public/renders/` and `/public/brand/`.
- Built the entire design system (tokens, fonts, easing, typography scale).
- Implemented every section listed in `MASTER_PROMPT.md`:
  Hero, ScrollStory, FeatureExplorer, ImmersiveReveal, Comparison, Portfolio +
  Lightbox, ProcessExplorer, Statement, FeatureCards, MarbellaSection,
  ContactCTA, ProposalSection, Footer, plus Header with scroll-driven
  transition and mobile menu.
- Implemented `?proposal=true` URL toggle for the sales offer section.
- Verified `npm run lint` + `npm run build` pass cleanly.
- Committed and (attempted to) pushed to `origin/main`.

**Where work stopped:**
- Site is fully assembled and buildable. No section is half-done.

**Recommended next action:**
- See **Next Recommended Tasks** above. Highest priority: deploy to Vercel and
  share preview URL with the client.

## Session 3 — cross-PC handoff (2026-08-20)

**Context recovery:** repo did not exist on this machine; cloned fresh from
`https://github.com/Danizarg/marbella-interiordesign.com`. History, working
tree, and both continuity docs were intact and matched — no drift between
`CLAUDE_CONTEXT.md` and the actual code.

**What was done:**
- `npm install`, then bumped `next` from the committed `^15.1.11` to the
  `15.5.23` security-backport release (still Next 15 / App Router / React 19,
  no breaking changes) — this clears the critical/high advisories that were
  open against 15.1.x. Remaining `npm audit` findings (`postcss`, `sharp`) are
  transitive deps bundled *inside* `next`'s own `node_modules` and only have a
  fix via the Next **16** major, which is a breaking jump outside this
  session's scope — left as-is per explicit instruction not to force-upgrade.
- `npm run build` verified clean (compiles, type-checks, lints, prerenders all
  4 routes).
- Added a `marbella-dev` entry to the sibling `glucgp` repo's
  `.claude/launch.json` (this machine drives browser previews from a fixed
  working directory) running on port 3300 via `npm --prefix ... run dev -- -p
  3300`, and used it to load the site in-browser: verified full page text for
  every section, `?proposal=true` mode (shows the €1,500+ vs €300 framing with
  the "not a prior quotation" disclaimer intact), and a 375px mobile viewport
  — no console errors, all images/fonts/chunks 200 OK. Note: this session's
  screenshot capability was unavailable (Browser pane failed to composite),
  so QA here was structural (DOM text, network, console) rather than pixel-
  level visual — a follow-up session with working screenshots should still do
  a pixel pass across the breakpoints called out in `MASTER_PROMPT.md`.
- Did not deploy directly (no CLI login available in-session); user deployed
  via the Vercel dashboard's GitHub import instead. Confirmed the resulting
  live URL (`https://marbella-interiordesign-com.vercel.app`) serves the site
  correctly, including `?proposal=true` mode, and updated `README.md` +
  this file's **Deployment** section with the URLs. **Next Recommended Tasks**
  item 1 is now complete.
- Committed the `package.json`/`package-lock.json` Next.js bump.

**Where work stopped:**
- Site is live and publicly reachable. Fully assembled, buildable, deployed.

**Recommended next action:**
- Items 2–6 in **Next Recommended Tasks** remain: client email + verified
  project titles, wiring the contact form to a real endpoint, OG image,
  reduced-motion QA pass, possible additional routes.

---

## End-of-Session Protocol (mandatory)

Before ending any session:

1. Run `git status`.
2. Update **Current Implementation Status**, **Known Issues**, and
   **Last Session Summary** in this file.
3. If dependencies / stack / commands changed, update **Current Stack** and
   **Commands**.
4. Commit with a descriptive message.
5. Push if credentials allow.
