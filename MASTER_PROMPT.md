# MASTER_PROMPT — Marbella Interior Design Studio Redesign

> This file preserves the original master brief for this project. It should
> remain stable. Update `CLAUDE_CONTEXT.md` for evolving state; only edit this
> file when the brief itself materially changes.

---

## 1. Purpose

Build a premium, cinematic, Apple-quality redesign of the 3D Renders page for
**Marbella Interior Design Studio** as a **client-presentation sales demo**.

Live client site (the site being redesigned):
- https://www.marbella-interiordesign.com/
- Primary redesigned page: https://www.marbella-interiordesign.com/3d-renders/

Repository:
- https://github.com/Danizarg/marbella-interiordesign.com

## 2. Target impression

Within the first ~5 seconds of the client (business owner) viewing the demo,
they should feel:

> "Our existing work looks significantly more premium here. We want this
> redesign."

Aesthetic vocabulary: architectural · minimal · editorial · premium · cinematic
· restrained · spatial · warm · Mediterranean · precise.

## 3. Design reference

Primary interaction/design reference:
- https://www.apple.com/es/macbook-pro/

Borrow the **quality**, not the branding:
- cinematic sticky sections
- scroll-driven storytelling
- feature/pill selectors that transform the visual area
- oversized, disciplined typography
- progressive disclosure
- restrained, weighted motion
- responsive transitions
- pinned, progress-driven sequences

Do **not** copy Apple assets, source code, fonts or wording.

## 4. Business context / pricing strategy

- Offer to the client: **€300 one-time redesign fee**
- Framed against: "Typical bespoke redesign: €1,500+"
- Do NOT imply the client received a €1,500 quote elsewhere. Phrase it
  explicitly as *typical bespoke redesign pricing*.
- No SALE stickers, red discounts, fake countdowns, fake scarcity.
- Pricing appears only in **proposal mode** (`?proposal=true`).

## 5. Content honesty

Never fabricate: testimonials, projects, clients, awards, statistics, years
operating, partnerships. Use the client's real business info (address, phone,
services) and their real render imagery. If a fact is unavailable, omit it or
use neutral copy.

## 6. Required experience / sections

1. Cinematic hero (image reveal, line-by-line headline)
2. Scroll story (Light · Material · Proportion · Atmosphere)
3. Apple-style feature explorer (Lighting / Materials / Space / Detail)
4. Immersive image expansion (sticky, scroll-progress driven)
5. Before / after comparison (draggable)
6. Editorial portfolio + fullscreen lightbox
7. Process explorer (Brief · Design · Model · Material · Light · Render)
8. Typographic moment ("See it. Refine it. Then build it.")
9. Feature cards (~3 substantial cards)
10. Marbella positioning
11. Contact CTA
12. Proposal section (behind `?proposal=true`)

## 7. Technical expectations

- Next.js (App Router) + React + TypeScript
- Tailwind CSS design tokens
- Framer Motion (component motion) + GSAP ScrollTrigger (pinned sequences)
- Next Image, responsive sizes, `prefers-reduced-motion` respected
- Accessible, semantic HTML, keyboard support, focus states
- Split into small components, no giant `page.tsx`

## 8. Repository / continuity workflow

The repository is the single source of truth. This project must survive
cross-PC handoff:

1. Work → 2. Push → 3. Clone on another PC → 4. Fresh Claude Code session →
5. Read `MASTER_PROMPT.md` + `CLAUDE_CONTEXT.md` + `README.md` → 6. Continue.

Never let critical design decisions live only in conversation. Encode them in
`CLAUDE_CONTEXT.md` as they happen.

## 9. Client presentation psychology

The demo must feel expensive relative to the €300 asking price. The visitor
should conclude: *"Their work already looks premium — their website should
present it at the same level."*

## 10. Standard

When shown to the Marbella Interior Design owner, the finished page should
feel like the website of a studio working on multi-million-euro properties.
The contrast between perceived quality and €300 price is the entire pitch.
