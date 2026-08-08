# Soralabs Landing

Marketing site for [Soralabs](https://soralabs.io.vn) — polished digital products and reusable UI systems for developers.

Built as an App Router Next.js site with motion-heavy sections inspired by the Ochi layout pattern.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript
- Tailwind CSS
- Framer Motion + GSAP
- Locomotive Scroll
- Bun (`bun@1.3.5`)

## Scripts

```bash
bun install
bun dev      # http://localhost:3000
bun run build
bun start
bun run lint
```

## Project notes

- Home-only route (`/`); other nav items are intentionally disabled for now
- SEO: `app/sitemap.ts`, `app/robots.ts`, dynamic `app/opengraph-image.tsx`
- Prefer deploying on **Vercel** and attaching `soralabs.io.vn` (apex ALIAS already points at Vercel DNS)

## Repo

https://github.com/SoraLabsOSS/landing
