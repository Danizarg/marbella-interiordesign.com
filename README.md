# Marbella Interior Design — 3D Renders (Redesign Concept)

A premium, cinematic redesign concept for
[marbella-interiordesign.com/3d-renders](https://www.marbella-interiordesign.com/3d-renders/),
built as a live sales demo for the studio's owner.

## Tech Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS 3** with custom design tokens (CSS variables)
- **Framer Motion** — component and UI motion
- **GSAP + ScrollTrigger** — one pinned, scroll-progress-driven sequence
- **Fraunces** (display serif) + **Inter** (sans) via `next/font/google`

## Getting Started

```bash
npm install
npm run dev
```

Then open:

- Public site: [http://localhost:3000](http://localhost:3000)
- **Proposal / sales mode:** [http://localhost:3000/?proposal=true](http://localhost:3000/?proposal=true)

## Scripts

| Command             | What it does                                 |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Local dev server                             |
| `npm run build`     | Production build                             |
| `npm run start`     | Serve the production build                   |
| `npm run typecheck` | `tsc --noEmit`                               |
| `npm run lint`      | ESLint (Next.js core-web-vitals config)      |

## Proposal Mode

Append `?proposal=true` to the URL:

- Shows a subtle "Redesign Concept" pill in the header
- Reveals a tasteful presentation section near the end with:
  - Typical bespoke redesign: **€1,500+** (visually de-emphasised)
  - Your redesign: **€300** one-time fee

Without the query parameter, the site behaves like the studio's real
presence — the offer is never visible.

## Project Structure

```
app/
├── layout.tsx        # Fonts, metadata, root shell
├── page.tsx          # Composes every section
└── globals.css       # Tokens, typography, resets

components/
├── layout/           # Header, Footer
├── sections/         # Every page section (Hero, ScrollStory, ...)
├── gallery/          # Portfolio lightbox
├── motion/           # RevealText, FadeIn, PillSelector
└── ui/               # Button, eyebrow

lib/
├── constants.ts      # Business info, nav links
├── motion.ts         # Easing curves, motion variants
├── utils.ts          # cn(), etc.
└── data/             # portfolio, features, process content

public/
├── brand/logo.png    # Client's real logo (from source site)
└── renders/          # 28 real client renders
```

## Continuity Files

Three files at the repo root exist so a future Claude Code session (or a new
developer) can be brought fully up to speed from the repo alone:

- **`MASTER_PROMPT.md`** — the stable project brief.
- **`CLAUDE_CONTEXT.md`** — living project memory: status, architecture,
  design decisions, next tasks.
- **`README.md`** — you are here.

If you are opening this project fresh on a new machine or in a new session:

```bash
git clone https://github.com/Danizarg/marbella-interiordesign.com.git
cd marbella-interiordesign.com
npm install
npm run dev
```

Then read `MASTER_PROMPT.md` and `CLAUDE_CONTEXT.md` before making changes.

## Deployment

Not deployed by default. Recommended: deploy to
[Vercel](https://vercel.com/new) — this is a stock Next.js 15 app with no
special runtime requirements. After deployment, share the preview URL with
`?proposal=true` for the client presentation.

## Assets & Content

- All render imagery is downloaded from the client's own Jimdo CMS and stored
  locally in `public/renders/`.
- Business contact info is factual (from the client's live site).
- **No fabricated testimonials, awards, statistics, or project attributions.**
