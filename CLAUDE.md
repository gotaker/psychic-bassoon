# CLAUDE.md — Dev Nandini Hospital Website

This file is read by Claude Code (and by Claude in any session opened on this repo). It tells you how to work in this codebase. **Read it in full before writing or editing any file.**

If anything in this file conflicts with what a user asks in chat, follow this file unless the user explicitly overrides it.

---

## What this project is

A production marketing + patient-services website for **Dev Nandini Hospital** (DNH) — a 65-year-old multi-specialty hospital in Hapur, Uttar Pradesh, India. The site is bilingual (English + Hindi), serves four primary audiences (patients & families, referring physicians, medical students, donors), and replaces an older static site.

Two companion documents:

- **`PRODUCT.md`** — what we're building, why, who it's for, success criteria.
- **`DESIGN.md`** — design system, tokens, component vocabulary, content rules.

Read those next. This file is about *how to work*; those are about *what to make*.

---

## Stack — non-negotiable

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router), Node 26.1.x |
| Language | TypeScript, `strict: true`. **No `any`.** |
| UI runtime | React 19, RSC by default; opt into client components only when needed |
| Styling | Tailwind CSS 4 (CSS-first, `@theme` block in `app/globals.css`). No CSS-in-JS. |
| Primitives | Bespoke `components/ui/` (Button, Field, Mono, Marquee, etc.) styled with `DESIGN.md` tokens. **Not shadcn.** |
| i18n | `next-intl` with locale-segment routing (`/en/...`, `/hi/...`) |
| Fonts | `next/font/local` — self-hosted (see `lib/fonts.ts`). No Google Fonts CDN at runtime. |
| Forms | `react-hook-form` + `zod` resolvers |
| Server mutations | Server Actions only. No client-side `fetch` to internal routes. |
| Images | `next/image` exclusively. Remote-host allowlist in `next.config.ts` (mirrored in `lib/news/google-news.ts` — keep both in sync). |
| Lint / format | ESLint flat config + Prettier with the Tailwind plugin |
| Package manager | `pnpm` 11 |
| Deploy | Railway, from the repo `Dockerfile` (Next standalone output) |

Do not introduce new top-level dependencies without justifying the trade-off in your PR description.

### Build & deploy quirks

- `next.config.ts` sets `output: "standalone"`. The Dockerfile copies only `.next/standalone`, `.next/static`, and `public/`. Don't remove standalone output without updating the Dockerfile.
- `typedRoutes: false` is intentional — it conflicts with locale-prefixed hrefs until we migrate to `next-intl/navigation`. Don't "fix" it.
- The Dockerfile's pnpm-store cache mount hard-codes a Railway service UUID (`s/<uuid>-pnpm`). If the Railway service is recreated, update that UUID; local Docker ignores it.
- Image `remotePatterns` in `next.config.ts` and the `IMAGE_HOST_ALLOWLIST` in `lib/news/google-news.ts` must move together.

---

## Commands

```bash
pnpm install
pnpm dev          # localhost:3000
pnpm build        # must pass with zero errors before any PR
pnpm lint         # eslint + prettier
pnpm typecheck    # tsc --noEmit
pnpm test         # vitest unit tests
pnpm e2e          # playwright e2e tests (also: pnpm e2e:ui for the runner)
```

Before opening any PR: `pnpm typecheck && pnpm lint && pnpm build` must all pass locally.

---

## Repo layout

```
app/
  (dev)/                       # dev-only routes, not shipped to prod
  [locale]/                    # 'en' | 'hi' — pages live directly here, no (marketing) group
    about/                     # story, leadership, accreditations
    annual-report/
    blood-bank/                # public donor + family lanes
    book/                      # 3-step appointment flow
      actions.ts               # server actions (submitBooking)
      primitives/              # step-local UI building blocks
      tokens/                  # booking-specific design tokens
      layout.tsx
      page.tsx
    careers/                   # stub for v1
    departments/               # index + [slug] detail
    find-a-doctor/
    giving/                    # stub for v1
    lab-reports/               # link out to existing tool
    locations/
    news/
    pay-bill/                  # link out to existing tool
    training/
    visit/                     # plan-your-visit
    layout.tsx                 # locale-scoped layout
    page.tsx                   # home
  layout.tsx                   # root, applies <html lang>
  globals.css                  # @theme tokens, base layer
  sitemap.ts
  robots.ts
components/
  about/                       # VisionMission, etc.
  blood-bank/                  # Hero, DonateLane, RequestLane, ServicesGrid, FAQ, Contact, AccreditationStrip
  booking/                     # StepDepartment, StepDoctorTime, StepDetails, Confirmation, SummaryCard
  department/                  # Hero, ProceduresGrid, OutcomesBand, WhenToCome
  doctor/                      # DoctorAvatar, DoctorCard, DoctorList
  home/                        # one component per homepage section (see DESIGN.md §6)
  layout/                      # SiteHeader, SiteFooter, StickyCtaBar, LangToggle
  news/
  training/
  ui/                          # Button, Field, Mono, SectionHeading, FilterPillGroup, PhotoPlaceholder, Marquee, Stepper
  icons.tsx                    # shared icon set
content/
  types.ts                     # LocalisedString, Doctor, Department, etc.
  doctors.ts
  departments.ts
  departments/                 # per-slug detail (cardiology fullest; others stub)
  blood-bank.ts
  leadership.ts
  locations.ts
  news.ts
  stats.ts
  training.ts
messages/
  en.json
  hi.json                      # structurally identical to en.json — CI fails if keys diverge
lib/
  i18n.ts                      # next-intl request config (referenced from next.config.ts)
  i18n-routing.ts              # locale prefixes, default, alternates
  i18n-navigation.ts           # locale-aware Link/redirect/useRouter wrappers
  locales.ts                   # supported locales constant
  fonts.ts                     # next/font/local declarations (Source Serif, Inter Tight, Noto Devanagari, JetBrains Mono)
  formatters.ts                # number/date — Devanagari numerals in HI
  departmentImagery.ts         # per-department photo mappings
  structured-data.ts           # MedicalOrganization / Physician / MedicalProcedure JSON-LD builders
  cn.ts                        # tailwind-merge + clsx
  news/                        # Google News RSS fetch + parse (see google-news.ts allowlist)
public/
  fonts/                       # self-hosted variable fonts (.ttf — woff2 conversion is an L10 task)
  images/
prototype/                     # READ-ONLY reference — see "Reference prototype" below
```

**Filenames:** kebab-case for routes, PascalCase for components, camelCase for utilities. One component per file; co-locate types in the same file when small.

---

## Reference prototype

The `prototype/` folder contains a working single-file React+Babel prototype that defines the visual and interaction target. Source files of interest:

- `prototype/Dev Nandini Hospital - Site D.html`
- `prototype/variants/Hybrid.jsx` — homepage
- `prototype/variants/DSite.jsx` — interior pages (find-a-doctor, cardiology, booking)
- `prototype/shared.css` — design tokens
- `prototype/i18n.js` — bilingual content

**Treat the prototype as visual ground truth.** When implementing a section, open the prototype side-by-side. If a Tailwind port produces a visibly different result, fix the port — don't drift from the prototype unless `DESIGN.md` explicitly authorises a change.

Do not import from `prototype/`. Do not ship its files. Do not modify them.

---

## Coding conventions

### React

- **Server Components by default.** Add `'use client'` only when you need state, effects, refs, or browser-only APIs. Most pages should be RSC; client islands handle filters, the booking stepper, and form fields.
- Pass server-fetched data down as props; do not call data layers from client components.
- Co-locate fetch logic next to the page that uses it. No global "service" objects.
- Components must be pure renders of their props — no module-level mutable state.

### TypeScript

- `strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`.
- Prefer `type` aliases for unions/props; `interface` only when extension is needed.
- Discriminated unions over boolean flags (`{ kind: 'loading' } | { kind: 'ok'; data: T }`).
- Zod schemas live next to the form/action that consumes them; export the inferred type.
- Never use `as` to silence the compiler. If you reach for it, refactor or `unknown` + a runtime guard.

### Tailwind

- All design values come from tokens in `app/globals.css` (`@theme`). Do not hard-code hex values, font families, or shadow specs in component files.
- Use semantic token names — `bg-paper`, `text-ink-soft`, `border-line-soft`. Don't use raw Tailwind colors (`bg-slate-50`, etc.).
- Compose conditional classes with `cn()` from `lib/cn.ts`.
- No arbitrary values for spacing, radius, or font-size unless the prototype demands a one-off — in which case promote it to a token.

### Styling rules

- **Layout: flex / grid with `gap`.** No inline-flow rows separated by margins or whitespace.
- Section vertical padding scales with `[data-density]` — read the variable, don't hard-code.
- All sticky elements must respect `prefers-reduced-motion` for any animation; reduce to instant.
- All interactive elements have a visible `:focus-visible` ring (2px `--color-primary`, 2px offset).

### Accessibility

- WCAG 2.2 AA, verified with axe in CI on the four primary routes.
- Every form field has a visible label; placeholders are not labels.
- Heading order is strict: one `<h1>` per page; never skip levels.
- Doctor cards: `<article>` with `<h3>` name; "Book with Dr. X" as the accessible name on its action.
- Marquee/ticker pauses on hover, focus, and `prefers-reduced-motion: reduce`.
- Color contrast — verify all text on `--color-deep` (the dark band) and on photo overlays at 4.5:1 minimum.

### Internationalisation

- All user-visible strings come from `messages/{locale}.json`. No string literals in components except for `aria-` values that don't render.
- Number and date formatting goes through `lib/formatters.ts`, which switches numerals (Latin in EN, Devanagari in HI).
- Devanagari has slightly heavier line metrics — bump `line-height` ~5% on Hindi headings via `:lang(hi)`.
- Keep EN and HI message files structurally identical. CI fails if keys diverge.

---

## Data and content

- Hospital data (doctors, departments, stats, news, locations) is **typed seed data** in `content/`, not a CMS. Each entity uses a single typed record with bilingual fields:

  ```ts
  type LocalisedString = { en: string; hi: string };
  type Doctor = {
    id: string;
    name: LocalisedString;
    specialty: LocalisedString;
    bio: LocalisedString;
    yearsExperience: number;
    languages: LocalisedString;
    location: LocalisedString;
    nextSlot: LocalisedString;       // human label for now
    avatarTone: `#${string}`;        // gradient seed
  };
  ```

- Treat `content/` like code: typed, reviewed, version-controlled.
- A real CMS may come later; design content modules so swapping the source is a one-file change.

---

## Booking — server action contract

```ts
// app/[locale]/book/actions.ts
'use server';
export async function submitBooking(input: BookingInput): Promise<BookingResult>
type BookingInput = {
  departmentId: string; doctorId: string;
  day: 'today' | 'tomorrow' | 'd2' | 'd3'; time: string;
  patientName: string; phoneE164: string; notes?: string;
};
type BookingResult =
  | { ok: true; ref: string; smsETA: number }
  | { ok: false; field?: keyof BookingInput; message: string };
```

For now: validate, log, return a generated `ref` like `DNH-` + 5 digits. Real backend wiring is out of scope.

---

## Performance budget

| Metric | Target |
|---|---|
| Lighthouse Performance (desktop) | ≥ 95 on `/`, `/find-a-doctor`, `/departments/cardiology`, `/book` |
| Lighthouse a11y / best-practices / SEO | ≥ 95 on the same four routes |
| First-load JS, home | ≤ 90 KB gzipped |
| LCP | ≤ 2.0 s on slow 4G simulation |
| CLS | ≤ 0.05 |
| Hydration warnings | Zero |

If a feature would blow the budget, propose alternatives in the PR before merging.

---

## SEO

- Per-page `generateMetadata` with bilingual titles and OG images.
- `MedicalOrganization` JSON-LD on every page; `Physician` on doctor cards rendered server-side; `MedicalProcedure` on department pages.
- `sitemap.ts` emits both locales with `hreflang` alternates and a self-referencing `x-default`.
- Canonical URLs always include the locale segment.

---

## Testing

- **Unit (vitest):** content shape (Zod parse over every doctor/department), formatters, message-key parity between `en.json` and `hi.json`.
- **E2E (playwright):** the booking flow end-to-end in both locales; the find-a-doctor filter; language toggle persists across navigation.
- **Visual regression:** at least homepage and cardiology page snapshots, both locales.
- CI must run all three on every PR.

---

## Git workflow

- Branch names: `feat/...`, `fix/...`, `chore/...`. One concern per branch.
- Conventional commits.
- PRs: small, reviewed, with a short "what & why", a link to the prototype section being implemented, and screenshots for any visual change.
- Do not merge with failing CI, even "obviously unrelated" failures.

---

## Things to never do

- Inline hex / rgb / px font-size in JSX. Tokens only.
- Drop into `dangerouslySetInnerHTML`. If you think you need it, ask.
- Add a runtime polyfill for something modern browsers already do.
- Pull doctor or patient data from a third-party API without an explicit ticket. PHI never leaves this repo at this stage.
- Add stock photography. Use the gradient + caption `<PhotoPlaceholder>` until real photography is provided.
- Generate decorative SVG illustrations. If imagery is missing, use placeholders and flag it.
- Use emoji unless `DESIGN.md` says to.
- Refactor unrelated code in a feature PR.

---

## When you're stuck

- Check the prototype first.
- Re-read `PRODUCT.md` for intent and `DESIGN.md` for visual rules.
- If both still leave the answer ambiguous, open a draft PR with the question in the description and tag a reviewer rather than guessing.
