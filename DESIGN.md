# DESIGN.md — Dev Nandini Hospital Website

The design system. Read this whenever you're about to add or change anything visual. If a value isn't in this document, it doesn't belong in the codebase yet — propose it as an addition, don't smuggle it in.

The visual ground truth is the prototype in `prototype/` (see `CLAUDE.md`). This document codifies what the prototype expresses.

---

## 1. Voice and posture

The hospital is 65 years old, well-regarded, and not flashy. The site reflects that:

- **Editorial, not corporate.** Closer to a university press or a long-form magazine than a SaaS landing page.
- **Quiet confidence.** Big serif headlines say what's true. Mono micro-labels do the talking-points work. Sans body text gets out of the way.
- **Spacious.** Sections breathe. White space is part of the composition, not a leftover.
- **Photographic.** Real places, real people. Never illustrative, never iconographic-decorative.
- **Hindi is first-class.** The Devanagari side has its own type, its own numerals, its own line-height — not a translation appendage.

If a design move would feel out of place in *The New Yorker* or a Pentagram annual report, reconsider.

---

## 2. Tokens

All design values live as CSS custom properties in `app/globals.css`, exposed as Tailwind tokens via `@theme`. Never hard-code values in components.

### 2.1 Color — default palette (teal)

| Token | Hex | Use |
|---|---|---|
| `--color-ink` | `#0E1F22` | Primary body text |
| `--color-ink-soft` | `#2A4A50` | Secondary text, descriptions |
| `--color-deep` | `#0E3B45` | Dark surfaces (stats band, outcomes band, sticky bar) |
| `--color-primary` | `#107A8B` | Primary action, mono kickers, link hover |
| `--color-primary-2` | `#1A95A8` | Hover/active state for primary |
| `--color-accent` | `#6EBDC9` | Accent highlights on dark surfaces |
| `--color-accent-2` | `#BFE3E8` | Tag/chip backgrounds on light |
| `--color-paper` | `#F4F1EA` | Default page background |
| `--color-paper-2` | `#ECE7DC` | Alternate section background |
| `--color-white` | `#FFFFFF` | Card surfaces |
| `--color-line` | `#1A3A41` | Strong dividers |
| `--color-line-soft` | `rgb(14 31 34 / 0.10)` | Hairlines, card borders |
| `--color-emergency` | `#C03A2C` | Emergency CTA only — never decorative |

### 2.2 Palette swaps

Switched via `[data-palette]` on `<html>`. Only `--color-deep` / `--color-primary` / `--color-primary-2` / `--color-accent` / `--color-accent-2` change.

| Palette | deep | primary | primary-2 | accent | accent-2 |
|---|---|---|---|---|---|
| `teal` (default) | `#0E3B45` | `#107A8B` | `#1A95A8` | `#6EBDC9` | `#BFE3E8` |
| `forest` | `#1F3A2C` | `#2E6B4F` | `#3F8862` | `#9DBFA8` | `#D5E2D9` |
| `burgundy` | `#3E1820` | `#7A2A33` | `#963540` | `#D6A4A9` | `#EAD4D7` |
| `navy` | `#0F1E3D` | `#1F3D7A` | `#2C53A0` | `#9DB1D5` | `#D8DEEC` |

The hospital ships with `teal` in production. The other three exist for accessibility/seasonal needs and are not user-toggleable.

### 2.3 Typography

Three families, all self-hosted via `next/font/local`.

| Token | Family | Use |
|---|---|---|
| `--font-serif` | Source Serif 4 | All H1–H3, large display, pull quotes, stat figures |
| `--font-sans` | Inter Tight (or Söhne if licensed) | Body text, UI labels, buttons |
| `--font-sans-en` | Inter Tight | Latin numerals, breadcrumbs in EN |
| `--font-sans-hi` | Noto Sans Devanagari | Hindi text, switched via `:lang(hi)` |
| `--font-mono` | JetBrains Mono | Eyebrows, micro-labels, kickers (uppercase, tracked) |

Type scale, used as named utilities:

| Step | Size / line | Where |
|---|---|---|
| `display-xl` | 84 / 0.98, serif | Department detail H1, big editorial moments |
| `display-lg` | 64 / 1.02, serif | Find-a-doctor H1, confirmation screen |
| `display-md` | 46 / 1.05, serif | Section H2 |
| `display-sm` | 30–34 / 1.05, serif | Section H2 in tighter contexts |
| `lede` | 19 / 1.5, sans, weight 400 | Hero subhead, department lede |
| `body` | 15–16 / 1.5, sans, weight 400 | Default body |
| `body-sm` | 13 / 1.55, sans, weight 400 | Card body, captions |
| `meta` | 11.5–12 / 1.4, sans, weight 500 | UI meta |
| `mono-kicker` | 11 / 1, mono, 0.18em tracking, uppercase | Section eyebrows |
| `mono-tag` | 10 / 1, mono, 0.14em tracking, uppercase | Card numbers |

Letter-spacing on serif display: `-0.015em` to `-0.025em` (tighter at larger sizes). Never positive on serif.

`:lang(hi)` rules:
- Bumps line-height by 5% on `serif` headings.
- Switches sans family to `--font-sans-hi`.
- Numerals come from formatters, not hard-coded.

### 2.4 Spacing and density

Section vertical padding is variable, controlled by `[data-density]` on `<html>`:

| Density | Section py | Card padding | Hero py |
|---|---|---|---|
| `compact` | 72 / 88 | 20 / 22 | 56 / 72 |
| `regular` (default) | 88 / 104 | 24 / 26 | 72 / 96 |
| `spacious` | 120 / 144 | 28 / 30 | 96 / 120 |

Horizontal page gutters: `40px` at desktop, `24px` at mobile. Max content width: `1280px` for full-bleed sections; `980px` for booking; `880px` for find-a-doctor hero.

Component spacing inside cards uses an 8-step scale: `4 / 8 / 12 / 14 / 18 / 22 / 28 / 36`.

### 2.5 Radius and elevation

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | `4px` | Photo placeholders, hero photo |
| `--radius-md` | `6px` | Inputs, small buttons |
| `--radius-lg` | `8px` | Cards |
| `--radius-pill` | `999px` | Pills, sticky CTA bar, language toggle |

Shadows are minimal:
- Cards: a `1px` `--color-line-soft` border, no shadow.
- Sticky CTA bar: `0 16px 40px rgb(14 31 34 / 0.28), 0 2px 8px rgb(0 0 0 / 0.16)`.
- Focus ring: `0 0 0 2px var(--color-primary)`, with a 2px offset.

### 2.6 Motion

Restrained. Reserved for state changes, not decoration.

- Default transition: `150ms` ease-out for color, `200ms` ease-out for transform/opacity.
- Marquee: continuous, paused on hover/focus and under `prefers-reduced-motion: reduce`.
- Stepper progression: instant, no slide animation.
- No parallax. No scroll-triggered animation in v1.
- Hover states on department grid: background fade to `--color-paper` over 200ms.

---

## 3. Iconography

Icons are line-only, 1.6px stroke, 24×24 view-box, current-color. The set in `prototype/variants/DSite.jsx` is the canonical inventory: `arrow`, `search`, `pin`, `phone`, `cal`, `check`, `chev`, `back`, `star`. Add new icons only when a real product need calls for one.

Never decorative icons. Never emoji. Never a "feature row with three coloured icons in circles."

---

## 4. Imagery

### 4.1 Real photography

The institution provides photographs as they're commissioned. They are art-directed:

- Real places (the cloister, west wing, cath-lab two, the NICU corridor at dawn).
- Real people (consultants, nurses, students, patients with consent).
- Available light. No studio. No stock.
- Captioned in the editorial style: a number, a place, a time. ("No. 04 / Pediatrics — A morning round in the pediatric ward.")

### 4.2 Placeholder system

Until real photography lands, every photographic surface uses `<PhotoPlaceholder>`:

- A radial-gradient surface with a warm, earth-toned palette (mocha, sage, dust, slate).
- A mono caption pinned top-left ("EXTERIOR · WEST WING · 06:42").
- A serif headline pinned bottom-left for hero photos ("The first case of the day, before the lights come up.").
- A bottom gradient overlay for legibility on captions.

Approved tones (use any one per surface; rotate across sections for variety):

| Tone | Gradient |
|---|---|
| `mocha` | `linear-gradient(155deg, #b3a283 0%, #6e5d44 45%, #2c2418 100%)` |
| `slate` | `radial-gradient(120% 90% at 70% 40%, #b8c8c8, #5a7a82 55%, #1d3438 100%)` |
| `sand` | `radial-gradient(110% 80% at 30% 30%, #d9c9a8, #8a7355 60%, #4a3a28 100%)` |
| `sage` | `radial-gradient(120% 90% at 50% 70%, #c8b89a, #7a8868 50%, #2e3a28 100%)` |
| `clay` | `linear-gradient(155deg, #e6c8a8 0%, #b88a5e 35%, #4a3520 100%)` |

Never invent a new tone. If a section calls for one not in the table, raise it.

### 4.3 Doctor avatars

Until real headshots are commissioned, the `<DoctorAvatar>` component renders the doctor's initials in serif on a per-doctor `tone` gradient (135deg). Tones are seeded into `content/doctors.ts` and stay stable per doctor across the site so they read as identity.

---

## 5. Components — vocabulary

What follows is the canonical inventory. Don't invent components outside this list without a written design rationale.

### 5.1 Building blocks

- **`<Mono>`** — uppercase mono kicker. One-line. Tracks at `0.18em`. `--color-primary` on light, `--color-accent` on dark.
- **`<Eyebrow>`** — alias of `<Mono>`; kept as a separate component because semantically distinct.
- **`<SectionHeading>`** — composes `<Mono>` (kicker) + serif H2 + optional right-aligned link. The standard section opener.
- **`<Button>`** — variants: `primary` (deep bg, white text), `ghost` (transparent, line-soft border), `accent` (accent bg, deep text), `emergency` (emergency bg, white text). Sizes: `sm` (8/14), `md` (10/18), `lg` (14/22).
- **`<FilterPillGroup>`** — labelled pill group used in find-a-doctor and the home doctor search. Active pill: filled `--color-deep`.
- **`<PhotoPlaceholder>`** — see §4.2.
- **`<Marquee>`** — continuous strip, pauses on hover/focus, respects reduced motion.
- **`<Stepper>`** — booking flow, 3+1 steps, dotted connectors, completed step shows a check.
- **`<Field>`** — labelled input/textarea. Label is uppercase 12px tracked, sits above. Border: `--color-line-soft`, focus: `--color-deep`.

### 5.2 Layout

- **`<SiteHeader>`** — sticky on interior pages, transparent-on-scroll on home. Logo (round monogram + serif name + mono est. line), primary nav, language toggle, "Book" button.
- **`<SiteFooter>`** — sitemap columns, accreditation row, copyright.
- **`<StickyCtaBar>`** — fixed bottom pill across all pages. Status dot + status text + Emergency 102 + Book.
- **`<LangToggle>`** — pill group, EN / हिंदी. Persists in cookie + URL.

### 5.3 Doctor

- **`<DoctorAvatar>`** — gradient + serif initials, sizes 56 / 64 / 72 / 84.
- **`<DoctorCard>`** — search-result card. Avatar | (name, specialty, bio, exp tag, location, languages, divider, "Next slot" + Book).
- **`<DoctorList>`** — server-rendered grid wrapper.

### 5.4 Department

- **`<DepartmentHero>`** — split: left mono kicker + 84px serif H1 + lede + dual CTA; right tall photo placeholder.
- **`<ProceduresGrid>`** — 3×2, each tile: number, title, big serif volume, description.
- **`<OutcomesBand>`** — dark, 4 columns, each: kicker, 64px serif metric, description, italic benchmark.
- **`<WhenToCome>`** — 1.4fr/1fr split: heading on left, check-listed red flags on right.

### 5.5 Booking

- **`<StepDepartment>`** — 3×2 tile grid; each tile is a circle of the department's accent tone + name + count.
- **`<StepDoctorTime>`** — selected-state cards (border thickens to 2px deep), then a day picker (4 days, today/tomorrow/d2/d3) and an 8-up time grid; some times marked taken with strikethrough.
- **`<StepDetails>`** — 1.4fr/1fr: form left, sticky `<SummaryCard>` right.
- **`<SummaryCard>`** — dark, 5 rows of label/value, fine-print footer.
- **`<Confirmation>`** — full-width card: deep check circle, mono ref, serif "You're booked, {firstName}.", instructions, dual CTAs.

---

## 6. Homepage section anatomy

Render exactly these in this order. Cross-reference with `prototype/variants/Hybrid.jsx`.

1. **Header** — see §5.2.
2. **Hero** — split. Left: mono kicker, 84–96px serif headline (1958 → today framing), 19px lede, dual CTA. Right: tall photo placeholder, mono caption top, optional serif overlay bottom.
3. **ActionStrip** — four utility tiles on a contrasting band: Book · Find a doctor · Lab reports · Pay bill. Each tile: small icon + label + 1-line subtext + arrow.
4. **InlineFindDoctor** — search input + day chips. Submits to `/find-a-doctor?q=...`.
5. **Marquee** — accreditations + facts.
6. **FeaturedStory** — magazine teaser: serif eyebrow ("From the December bulletin"), 46px serif title, 16px dek, byline, photo placeholder, "Continue reading →".
7. **PhotoStrip** — 1.6fr/1fr/1fr grid of three photo placeholders, each with a figcaption below.
8. **DepartmentsGrid** — 4-column hover grid, 28 specialties, each cell: number, title, 1-line subtext, hover background fades to `--color-paper`.
9. **StatsBand** — dark, 6 columns, serif 42px figures with thin left dividers.
10. **VisitPanel** — split: tall photo placeholder left, four-line bordered list right (visiting hours, insurance, international, how to reach), CTA link.
11. **CollegeSplit** — editorial split: serif text on the left, 4-up stat grid on the right.
12. **NewsGrid** — 3 cards.
13. **Quote** — 42px serif pull quote, attribution, photo placeholder.
14. **Locations** — 3 columns, each with name, address, phone, hours.
15. **Footer** — see §5.2.
16. **StickyCtaBar** — sits over everything.

No section is optional. No section is reordered.

---

## 7. Content rules

### 7.1 Numbers

- Always with units. "1,800 angioplasties / year" — never bare "1,800."
- Hindi uses Devanagari numerals via the formatter. Never mixed locale numerals on a single page.
- Round to 2 sig-figs in display unless precision matters (door-to-balloon time *is* precise to the minute: "38 min").

### 7.2 Names

- Doctors are "Dr. Anjali Kapoor" — full name, title, in serif on cards.
- Specialties are sentence-case ("Interventional cardiology"), not headline-case.
- The hospital is "Dev Nandini Hospital," abbreviated "DNH" only after first reference on a page.

### 7.3 Microcopy

- Buttons are verbs: *Book*, *Find a doctor*, *Continue*, *Confirm appointment*. Not nouns.
- "Free cancellation up to two hours" appears in step 3 of booking and on the confirmation. Verbatim.
- Emergency is `tel:102` linked, labelled "Emergency · 102."
- Hindi microcopy is hand-written, not transliterated. "अपॉइंटमेंट लें" not "बुक नाउ."

### 7.4 What never to write

- "Welcome to Dev Nandini Hospital." Anywhere.
- "World-class," "state-of-the-art," "patient-centric," "holistic." Any of them.
- "Discover," "Explore," "Embark." Any of them.
- "Our team of dedicated professionals." Name them.
- "We pride ourselves." We don't, in copy.

---

## 8. Accessibility

- WCAG 2.2 AA, audited per page with axe in CI.
- Color contrast verified for every text-on-surface pair, especially `--color-ink-soft` on `--color-paper-2` and white-on-photo-placeholder.
- Focus ring: 2px `--color-primary`, 2px offset, on every interactive element.
- Keyboard: all flows fully operable; tab order matches visual order; modal dialogs trap focus.
- The marquee, the doctor card avatars, and the photo placeholders are decorative for screen readers (`aria-hidden`) — the meaningful copy lives in adjacent text.
- Form errors announce via `aria-live="polite"` and link to the field via `aria-describedby`.
- Sticky CTA bar adds `padding-bottom: 96px` to `<main>` so it never covers content.

---

## 9. Layout primitives

Two full-bleed structures repeat across the site. Implement once, use everywhere.

### 9.1 `Section`

```tsx
<section className="dnh-section" data-tone="paper|paper-2|deep|white">
  <div className="dnh-section__inner">
    {children}
  </div>
</section>
```

`dnh-section` reads `--section-py` from `[data-density]`; `dnh-section__inner` is `max-w-[1280px] mx-auto px-10`. Tone sets background and inverts text where needed.

### 9.2 `EditorialSplit`

A 1fr/1fr or 1.15fr/1fr split with 64px gap, used by Hero, FeaturedStory, VisitPanel, CollegeSplit, DepartmentHero. Implementation is one component with a `ratio` prop.

---

## 10. Don'ts

A short list, fully load-bearing:

- No gradients on UI elements (buttons, cards, headers). Gradients only inside photo placeholders.
- No glassmorphism, blur, or translucent panels except the sticky CTA bar's backdrop blur.
- No skeuomorphic shadows, no layered "depth."
- No iconographic cards (icon-on-top, label-below). Cards are always text-led.
- No left-border accent stripes on cards.
- No hero with a centered headline + button. Heroes are always editorial splits.
- No CTA stack of three buttons. Two maximum.
- No "as featured in" logo wall. We have accreditations; that's the trust row.
- No emoji.
- No AI-generated illustration.
- No font from Google Fonts CDN at runtime.

---

## 11. Versioning the system

Tokens, components, and the section anatomy in this file are versioned. Any addition or change requires:

1. A note in the changelog at the bottom of this file.
2. Updates to the tokens in `app/globals.css`.
3. A migration note in the PR description.

Do not branch the system silently. The whole point of having one is consistency over time.

---

## Changelog

- **v1.0** — Initial system, ported from prototype Direction D (Hybrid).
