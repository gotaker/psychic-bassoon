# Blood Bank page — UXDD spec

Feature slug: `blood-bank-page`
Date: 2026-05-09
Reference inspiration: https://www.massgeneral.org/blood-donor (donor-recruitment shell), adapted to a 540-bed Indian hospital context with replacement-donation culture.

Project context: Dev Nandini Hospital website (`psychic-bassoon`). See `PRODUCT.md` §3 (audiences) and §5 (IA). Blood Bank is **not** in v1 IA; this spec adds it as a top-level surface plus a department stub.

Routing decisions (locked from brainstorming):

- `/[locale]/blood-bank` — rich public page, top-level
- `/[locale]/departments/blood-bank` — stub via existing `[slug]` dept template, links to the rich page
- Header primary nav adds "Blood Bank" between Departments and Visit; footer services column gets a parallel link
- No homepage section in v1; sticky CTA bar unchanged
- Donor conversion is **walk-in + tap-to-call only**; no online scheduling, no drives calendar in v1

---

## #persona

### Primary — Anjali (family member arranging blood)

- 38, Hindi-first (some English), lives in Hapur
- Daughter-in-law of a 67-year-old patient admitted for elective cardiac surgery on Wednesday
- Surgeon told the family yesterday: "Arrange 2 units B-positive."
- She has never coordinated blood donation before; her husband is at work
- Phone: 5-year-old Android, on a patchy 4G connection at home
- Decision style: anxious, time-pressured, scans for a phone number first

### Secondary — Rakesh (voluntary donor)

- 24, MBBS student at the attached college, Hindi/English bilingual
- Donated once before at a campus drive; eligible to donate again
- Wants to know walk-in hours and whether he can come Saturday morning

### Secondary — Dr. Suresh (referring physician)

- 51, district MO at a PHC 30 km from Hapur
- Considering referring a thalassemia patient to DNH for routine transfusion
- Wants 60 seconds of confidence: NABH/NABL accreditation, component-therapy capability, contact number

---

## #jtbd

When my family member is admitted and the doctor has asked us to arrange blood, I want to quickly understand DNH's replacement-donation policy, walk-in hours, and a phone number, so I can get blood arranged before the surgery without delaying care.

---

## #user-goal

A visitor reaches a tap-to-call phone for the right lane (donate or arrange blood) within one screen scroll.

---

## #journey

| # | Step | Surface | User does | System does | Failure mode |
|---|---|---|---|---|---|
| 1 | Trigger | Off-site (hospital ward) | Surgeon tells Anjali "arrange 2 units B+ before Wednesday" | — | She doesn't know where to start; calls random numbers |
| 2 | Discover | Search / DNH header nav | Searches "Dev Nandini blood bank" or taps "Blood Bank" in header | Serves `/[locale]/blood-bank` (RSC, locale-correct) | Nav label not localized; page slow on 4G |
| 3 | Orient | `/blood-bank` hero | Reads two-lane sub-headline, picks "Need blood for a patient" | Anchor scrolls to `#request` lane | Lane CTAs not visible above fold on 375px |
| 4 | Read policy | `#request` lane | Reads replacement-donation policy + what-to-bring checklist | Renders typed content from `content/blood-bank.ts` | Policy too long / too jargon-heavy; she abandons |
| 5 | Call | Tap-to-call CTA | Taps "Call Blood Bank" → device dialer opens with `tel:` URI | Browser invokes `tel:` | Phone number stale or wrong; tap-target too small |
| 6 | Confirm | Phone call (off-site) | Confirms hours, what to bring, group requirement | — | Out-of-hours; voicemail |
| 7 | Walk-in | DNH ground-floor blood bank | Brings donors + admission slip + IDs | — | Wrong block; missing donor IDs |

---

## #state-inventory

### Surface 1 — `/blood-bank` page (rich)

- **empty** — N/A; content is typed seed (`content/blood-bank.ts`) and always present. Guard: a section whose array is empty (e.g. zero FAQ items) renders nothing rather than an empty heading.
- **loading** — Server-rendered; first paint is full content. Client-side route nav uses streamed RSC; no skeleton.
- **success** — All seven sections render top to bottom: hero, accreditations, services, donate lane, request lane, FAQ, visit/contact.
- **error:content-parse** — Zod parse of `content/blood-bank.ts` fails at build → CI blocks merge.
- **error:i18n-key-missing** — `bloodBank.*` key absent in `messages/hi.json` (or `en.json`) → CI parity test fails.
- **error:phone-malformed** — `donate.phone` or `request.phone` not E.164 → unit test fails; build blocked.
- **edge:reduced-motion** — `prefers-reduced-motion: reduce` → smooth-scroll becomes instant; FAQ expand/collapse becomes instant (no transition).
- **edge:no-js** — FAQ falls back to native `<details>` semantics; lane CTAs work as native anchor links.
- **edge:long-hindi-content** — Devanagari wraps gracefully; `:lang(hi)` line-height bump applied to headings.
- **edge:slow-3g** — LCP ≤ 2.0 s; placeholders are CSS gradients (no image bytes); single client island (FAQ).

### Surface 2 — FAQ accordion (client island)

- **empty** — Zero FAQ items in content → component returns `null` (no empty `<section>`).
- **loading** — N/A (synchronous client component).
- **success** — Tapped item expands; arrow rotates; `aria-expanded="true"`.
- **error** — N/A (no async data path).
- **edge:keyboard** — Tab focus visible; Enter/Space toggles; Escape collapses focused item.
- **edge:reduced-motion** — Expand/collapse is instant.

### Surface 3 — Two-lane hero CTAs

- **empty** — N/A.
- **loading** — N/A.
- **success** — Anchor link scrolls to `#donate` or `#request`; URL updates.
- **error:anchor-missing** — If a lane section is removed, anchor silently no-ops (still navigable; section absent is a content bug caught by content tests).
- **edge:no-js** — Native anchor jump to `id` works without smooth-scroll JS.
- **edge:reduced-motion** — Instant jump (no smooth-scroll).

### Surface 4 — Header nav "Blood Bank" item

- **empty** — N/A.
- **loading** — N/A.
- **success** — Navigates to `/[locale]/blood-bank` keeping current locale.
- **error:locale-mismatch** — Clicking from a Hindi session must not route to `/en/...`.
- **edge:active** — When already on `/blood-bank`, nav item shows current-page styling.

### Surface 5 — `/departments/blood-bank` stub

- **empty** — N/A.
- **loading** — RSC, instant.
- **success** — Renders dept template (hero, NABH/NABL chips, single CTA "Visit our Blood Bank →" linking to `/[locale]/blood-bank`).
- **error:slug-missing** — If `content/departments.ts` lacks `blood-bank` entry, dynamic route returns `notFound()`.
- **edge:locale** — Stub strings come from the same `bloodBank.*` namespace; parity enforced.

---

## #acceptance-criteria

Verification tags: `[v:e2e]` Playwright • `[v:axe]` axe-core + keyboard • `[v:manual]` PR screenshot.

### AC-1 [v:e2e] — Two-lane hero CTA scrolls to request lane

```gherkin
Given I am on /en/blood-bank in a 375x812 viewport
When I tap the "Need blood for a patient" CTA in the hero
Then the page scrolls so the #request lane heading is visible in the viewport
And the URL hash becomes "#request"
```

### AC-2 [v:e2e] — Donor lane tap-to-call uses tel: scheme

```gherkin
Given I am on /hi/blood-bank
When I scroll to the donor lane CTA
Then the "Call Blood Bank" link's href starts with "tel:+91"
And it equals the value of donate.phone in content/blood-bank.ts
```

### AC-3 [v:e2e] — Request lane tap-to-call uses tel: scheme

```gherkin
Given I am on /en/blood-bank
When I scroll to the request lane CTA
Then the "Call Blood Bank" link's href starts with "tel:+91"
And it equals the value of request.phone in content/blood-bank.ts
```

### AC-4 [v:e2e] — FAQ expands by keyboard

```gherkin
Given I am on /en/blood-bank with the FAQ section in view
When I tab focus to the first FAQ question and press Enter
Then the question's aria-expanded becomes "true"
And the corresponding answer is visible in the accessibility tree
```

### AC-5 [v:e2e] — Header nav adds Blood Bank in both locales

```gherkin
Given I am on /en/
When I open the primary nav
Then I see a link with text "Blood Bank" pointing to /en/blood-bank
And after I switch to Hindi the same link reads "रक्त बैंक" pointing to /hi/blood-bank
```

### AC-6 [v:e2e] — Department stub links to the rich page

```gherkin
Given I navigate to /en/departments/blood-bank
Then the page renders the department template hero
And I see exactly one CTA labelled "Visit our Blood Bank" pointing to /en/blood-bank
```

### AC-7 [v:e2e] — Reduced-motion disables smooth-scroll

```gherkin
Given prefers-reduced-motion: reduce is set on the browser
When I tap a hero lane CTA
Then the scroll position changes within the same animation frame (no transition)
```

### AC-8 [v:axe] — Zero axe-core violations on the rich page in both locales

```gherkin
Given /en/blood-bank and /hi/blood-bank are loaded
When axe-core runs against each document
Then there are zero violations of any severity
```

### AC-9 [v:axe] — Heading order is strict, single h1, no skipped levels

```gherkin
Given /en/blood-bank
When the heading outline is enumerated
Then there is exactly one h1
And every h3 is a descendant of an h2
And no heading level is skipped
```

### AC-10 [v:manual] — Editorial hero placeholder carries a meaningful caption

```gherkin
Given /en/blood-bank renders
When the PR reviewer inspects the screenshot of the hero
Then the PhotoPlaceholder caption references the blood bank or its donors
And the caption is in the active locale's language
```

Verification contract summary: 7 × `[v:e2e]`, 2 × `[v:axe]`, 1 × `[v:manual]`, 0 × `[v:e2e+manual]`.

---

## #wireframe

Mobile-first, 375 px viewport. ASCII structure, no styling.

```
┌─────────────────────────────────┐
│ [SiteHeader: logo · nav · 🌐]   │   ← nav now includes "Blood Bank"
├─────────────────────────────────┤
│ EYEBROW · Blood Bank             │
│ H1: Donate. Or arrange blood     │
│     for someone you love.        │
│ Sub: NABH-accredited blood bank  │
│      on the DNH ground floor.    │
│ [PhotoPlaceholder · caption]     │
│ ┌───────────────┐┌─────────────┐ │
│ │ Donate blood →││ Need blood  │ │
│ │ (anchor       ││ for a       │ │
│ │  #donate)     ││ patient →   │ │
│ │               ││ (#request)  │ │
│ └───────────────┘└─────────────┘ │
├─────────────────────────────────┤
│ [Accred chips] NABH · NABL ·    │
│                ISO 15189         │
├─────────────────────────────────┤
│ H2: What we do                   │
│ ┌─────┐ ┌─────┐ ┌─────┐         │
│ │ WB  │ │ PRBC│ │ FFP │         │
│ └─────┘ └─────┘ └─────┘         │
│ ┌─────┐ ┌─────┐ ┌─────┐         │
│ │ PLT │ │X-Mat│ │COMP │         │
│ └─────┘ └─────┘ └─────┘         │
├──── id="donate" ────────────────┤
│ EYEBROW · Donate blood           │
│ H2: Walk in any weekday          │
│ Eligibility:                     │
│  • Age 18–65                     │
│  • Weight ≥ 50 kg                │
│  • Hb ≥ 12.5 g/dL                │
│  • 90 days since last donation   │
│ What to expect:                  │
│  1. Register                     │
│  2. Screen                       │
│  3. Donate (~10 min)             │
│  4. Snack & rest (~15 min)       │
│ Hours: Mon–Sat, 9:00 AM–5:00 PM  │
│ [📞 Call Blood Bank]  ← tel:     │
├──── id="request" ───────────────┤
│ EYEBROW · Need blood for         │
│           a patient              │
│ H2: How to arrange blood at DNH  │
│ Replacement-donation policy …    │
│ What to bring:                   │
│  ✓ Patient admission slip        │
│  ✓ Donor IDs (Aadhaar etc.)      │
│  ✓ Blood-group prescription      │
│ Hours: 24/7 for urgent           │
│ [📞 Call Blood Bank]  ← tel:     │
├─────────────────────────────────┤
│ H2: FAQ                          │
│ ▸ Who can donate?                │
│ ▸ Is donation safe?              │
│ ▸ Can I get blood without        │
│   replacement donation?          │
│ ▸ Do you do component therapy?   │
│ ▸ How long does donation take?   │
├─────────────────────────────────┤
│ H2: Visit & contact              │
│ Block X · Ground floor           │
│ [Mini map placeholder]           │
│ [📞 Phone]   [✉ Email]           │
├─────────────────────────────────┤
│ [SiteFooter] (Blood Bank link in │
│              services column)    │
└─────────────────────────────────┘
[StickyCtaBar: Emergency 102 · Book]
```

Information architecture:

- Single `<h1>` lives in the hero. Each major section gets one `<h2>`: What we do, Donate blood, Need blood for a patient, FAQ, Visit & contact. FAQ items are `<h3>` inside `<h2 id="faq">`.
- Two-lane hero CTAs are anchor links to `#donate` and `#request`. They work without JS via native fragment navigation; smooth-scroll is a progressive enhancement gated on `prefers-reduced-motion`.
- Lanes are sibling sections, equally weighted. Donor lane is first by source order (matches the public-recruitment framing of the inspiration site); request lane is below to keep both within one screen-scroll on mobile.
- Tap-to-call uses `tel:` URIs sourced from `content/blood-bank.ts`; phone numbers are not inlined in JSX. Tap target ≥ 44 × 44 px.
- Header primary nav adds "Blood Bank" between "Departments" and "Visit". Footer adds a parallel link in the services column.
- `/departments/blood-bank` reuses the existing `[slug]` dept template via a single seed entry in `content/departments.ts`; its primary CTA links to `/blood-bank` (rich page).
- Devanagari numerals via `lib/formatters.ts` for any displayed numbers (age, weight, Hb, hours) when locale is `hi`.
- Sticky CTA bar is unchanged (Emergency 102 + Book). The page's own tap-to-call CTAs handle blood-bank conversion.
