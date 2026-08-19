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
- Deployment (repo is only local + GitHub; not deployed to Vercel yet)

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

- `public/brand/logo.png` — original client logo, downloaded from jimcdn CMS
  (source of truth on the client's own site).
- `public/renders/render-01.jpg` … `render-28.jpg` — 28 real architectural
  renders downloaded from the client's Jimdo CMS at ~1200–1900px width. Used
  throughout hero, scroll story, feature explorer, portfolio, comparison,
  process explorer.

Asset selection map (which render appears where) lives in
`lib/data/portfolio.ts`, `lib/data/features.ts`, and `lib/data/process.ts` so
that swapping assets is a data-only change.

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

## Next Recommended Tasks

1. Deploy to Vercel and put the preview URL (with and without `?proposal=true`)
   in the README for easy client sharing.
2. Ask the client for a public email + verified project titles, then hydrate
   `lib/constants.ts` and `lib/data/portfolio.ts`.
3. Wire the contact form to a real endpoint (Resend / Formspree / Vercel
   function) once an email exists.
4. Add OpenGraph / social preview image (`app/opengraph-image.tsx`).
5. Add reduced-motion QA pass across every section.
6. Consider adding a "Studio" and "Projects" landing routes if the redesign
   scope expands beyond the 3D Renders page.

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
