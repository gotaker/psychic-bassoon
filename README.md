# Dev Nandini Hospital — Website

Bilingual (English / Hindi) marketing and patient-services website for **Dev Nandini Hospital**, a 540-bed multi-specialty hospital in Hapur, Uttar Pradesh. Built with Next.js 15 App Router, React 19, and Tailwind CSS 4.

> Status: v1 in development. Replaces the existing static site.

---

## Documentation

Read these in order before contributing.

| File | What it covers |
|---|---|
| [PRODUCT.md](./PRODUCT.md) | What we're building, who it's for, scope, success criteria |
| [DESIGN.md](./DESIGN.md) | Design system, tokens, component vocabulary, content rules |
| [CLAUDE.md](./CLAUDE.md) | Working conventions, stack rules, performance budget, things never to do |
| [prototype/](./prototype/) | Read-only visual ground truth (single-file React + Babel reference) |

---

## Tech stack

- **Framework:** Next.js 15 (App Router) on Node 26.1.x
- **Language:** TypeScript, `strict: true`
- **UI:** React 19 — Server Components by default
- **Styling:** Tailwind CSS 4 (CSS-first via `@theme` in `app/globals.css`)
- **i18n:** `next-intl` with locale-segmented routes (`/en`, `/hi`)
- **Forms:** `react-hook-form` + `zod`
- **Mutations:** Server Actions only
- **Images:** `next/image` + `sharp`
- **Tests:** Vitest (unit) + Playwright (e2e, with `@axe-core/playwright`)
- **Package manager:** pnpm 11
- **Deploy:** Railway (Dockerfile-based)

---

## Getting started

Requirements: Node 26.1.x, pnpm 11.

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Before opening a PR, all three of these must pass locally:

```bash
pnpm typecheck && pnpm lint && pnpm build
```

---

## Scripts

| Script | Purpose |
|---|---|
| `pnpm dev` | Next dev server |
| `pnpm build` | Production build (must pass with zero errors before any PR) |
| `pnpm start` | Serve the production build |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | ESLint + Prettier check |
| `pnpm format` | Prettier write |
| `pnpm test` | Vitest unit tests |
| `pnpm test:watch` | Vitest in watch mode |
| `pnpm e2e` | Playwright e2e tests |
| `pnpm e2e:ui` | Playwright with the UI runner |

---

## Project layout

```
app/
  [locale]/                 # 'en' | 'hi' — every route is locale-scoped
  layout.tsx                # root layout
  globals.css               # @theme tokens, base layer
components/                 # layout/, ui/, doctor/, home/, department/, booking/
content/                    # typed seed data: doctors, departments, news, stats, locations
lib/                        # i18n helpers, formatters (Devanagari numerals in HI), cn()
messages/                   # en.json, hi.json — structurally identical
public/                     # self-hosted fonts, images
prototype/                  # READ-ONLY visual reference — do not import or ship
tests/                      # unit + e2e
```

---

## Internationalisation

- Every URL is mirrored under `/en` and `/hi`. The language toggle is always visible and persistent.
- All user-visible strings live in `messages/{locale}.json`. CI fails if keys diverge between locales.
- Numbers and dates go through `lib/formatters.ts`, which switches between Latin and Devanagari numerals.
- Hindi headings get a slight line-height bump via `:lang(hi)` to compensate for heavier metrics.

---

## Quality gates

| Area | Bar |
|---|---|
| Type safety | `strict: true`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`. No `any`, no `as` to silence the compiler. |
| Accessibility | WCAG 2.2 AA, verified by axe in CI on the four primary routes |
| Performance | Lighthouse ≥ 95 on `/`, `/find-a-doctor`, `/departments/cardiology`, `/book`; LCP ≤ 2.0s on slow 4G; first-load JS ≤ 90 KB gz on home |
| i18n | Message-key parity between `en.json` and `hi.json` enforced by unit test |

See [CLAUDE.md](./CLAUDE.md) for the full performance budget and conventions.

---

## Deployment

Deployed to Railway from the repo's `Dockerfile`.
