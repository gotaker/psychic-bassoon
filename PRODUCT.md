# PRODUCT.md — Dev Nandini Hospital Website

The product brief. Read this before designing or building anything. If a feature isn't justified by something in this document, it doesn't belong in v1.

---

## 1. The hospital, in one paragraph

Dev Nandini Hospital (DNH) was founded in 1958 in Hapur, Uttar Pradesh, by a single physician seeing patients out of a converted bungalow. It is now a 540-bed multi-specialty hospital with 28 specialties, a 184-strong medical staff, an attached MBBS college, and an active clinical-research programme. It is NABH, NABL, NMC, and ISO 15189 accredited. It serves the western UP belt — primarily Hapur, Ghaziabad, Meerut, and Bulandshahr — plus a smaller stream of national and international patients drawn by its cardiology and oncology wings.

It is not a chain. It is not flashy. It is unusually well-regarded for a hospital of its size and location, and the website needs to communicate that without being modest about it.

---

## 2. What we're building

A new public website that:

- Helps a patient find the right doctor and book an appointment in three clicks, without making an account.
- Tells the institution's story — the 1958 founding, the building, the people, the philosophy — in a way that earns trust before a transaction is asked for.
- Shows the work: live published outcomes, real procedures performed per year, named consultants with real credentials.
- Works in English and Hindi with full parity. Hindi is not a translation afterthought.
- Loads fast on a five-year-old Android on a patchy 3G connection.
- Replaces the existing site, which is dense, hard to navigate, and Hindi-second.

This is a v1, scoped tightly. It's not a patient portal, not a tele-medicine product, not a CMS rollout. Those are explicitly out of scope.

---

## 3. Audiences and what they need

The site has four audiences. Each gets a primary path through the homepage and at least one tailored landing surface.

### A. Patients & families (≈ 75% of traffic)

The default audience. Two sub-modes:
- **Acute** — something is wrong now; they need the emergency number, directions, or a same-day appointment.
- **Considered** — choosing a hospital for a planned procedure; they need credibility, named consultants, outcomes, insurance info, visiting policy.

What they need: a doctor, a time, directions, the emergency number, the cashless-insurance list, visiting hours.

### B. Referring physicians & health workers (≈ 10%)

PHC doctors, district referrers, partner clinics. They need the right specialty contact, tele-OPD info, the referral pathway. They are repeat users; they value speed over storytelling.

### C. Prospective MBBS / PG students (≈ 8%)

Want curriculum, seats available, hostels, fee structure, faculty. Seasonal traffic spike around admissions cycle.

### D. Donors, alumni, partners, press (≈ 7%)

Want the institution's narrative — history, leadership, annual report, giving programmes. They are read-only; they convert via email or phone, not on-site.

---

## 4. The job-to-be-done — five core jobs

Every screen in v1 must serve one of these. Anything that doesn't is cut.

| # | Job | Primary surface | Success looks like |
|---|---|---|---|
| 1 | "I need to see a doctor — soon" | Homepage hero → Find a doctor → Book | Booking confirmed in ≤ 3 minutes from cold start |
| 2 | "Is this hospital actually any good for X?" | Department detail (Cardiology is the model) | User reads procedures + outcomes, then taps Book or Call |
| 3 | "Where is it, what does it cost, when can I visit?" | Plan-your-visit + Visit panel on home | All three answered without scrolling past the fold on the visit page |
| 4 | "What did this place do last year?" | Featured story + News + Annual report download | Hits annual-report PDF or shares a story |
| 5 | "I'm in trouble, right now" | Emergency number visible from every screen | Tap-to-call from sticky bar; never more than one tap away |

---

## 5. Information architecture

```
/                                  Home
/find-a-doctor                     Search & list (filters: specialty, availability)
/departments                       Grid of all 28 specialties
/departments/[slug]                Department detail (Cardiology is the lead template)
/book                              3-step appointment flow + confirmation
/visit                             Plan your visit (hours, insurance, directions, international)
/about                             Story, leadership, accreditations
/news                              Stories & press
/locations                         Hapur main, Annexe, Cancer wing
/careers                           Stub for v1
/giving                            Donor pathway, stub for v1
```

Bilingual: every URL is mirrored under `/en` and `/hi`. The default for a first-time Indian visitor is Hindi; for everyone else, English. The toggle is always visible and persistent.

---

## 6. v1 page-by-page scope

### Home

The single most important surface. Carries every audience's primary path above the fold. Sections in order:

1. Editorial hero (positioning + first photograph)
2. Action strip — Book, Find a doctor, Lab reports, Pay bill
3. Inline doctor search
4. Accreditations marquee
5. Featured story (long-read teaser)
6. Photo strip (three editorial photographs with captions)
7. Departments grid (28 specialties)
8. Stats band on dark
9. Visit panel (photo + four-line key facts)
10. College & research split
11. News grid (3 cards)
12. Pull-quote
13. Locations
14. Footer
15. **Sticky CTA bar** — Emergency 102, Book — visible on every page

### Find a doctor

Search input, two filter pill-groups (specialty, availability), grid of doctor cards with named consultants, real credentials, "next available slot" indicator, and a Book CTA per card. URL-synced filters. Result count visible. Empty state with a graceful path to "browse all 28 specialties."

### Departments and detail

Departments index is the same grid that appears on the homepage, full-page. Department detail (Cardiology is the lead) follows a single template — no per-department bespoke design. The template carries: editorial hero, six procedure tiles with annual volumes, four published outcome metrics on a dark band, two featured consultants, a "when to come" red-flag list. Same template is applied to all 28 specialties; only Cardiology has full content in v1, others are stubs that surface the consultants from `content/doctors.ts`.

### Book

Three steps + a confirmation. No login, no account. SMS confirmation only.

1. Choose department (six tiles in v1, expanded later)
2. Choose doctor + day + time
3. Patient name, mobile, optional symptoms

Constraints:
- Free cancellation up to two hours before slot, surfaced before submit.
- Validation: name ≥ 2 chars, phone matches `+91 9XXXXXXXXX`.
- Submit returns a generated reference (`DNH-XXXXX`) and a confirmation screen with what to bring and how to reach the hospital.
- The flow is recoverable — back/forward preserves selections via URL query state.

### Visit

Single page. Visiting hours, cashless insurance list (38 networks), international-patient services, how to reach (NH-9, free shuttle from Hapur Junction). Photo-led, not text-dense.

### About / News / Locations / Careers / Giving

In v1: hero + intro + placeholder content sections. Filled out post-launch. Routes exist, IA is correct, content depth is shallow but honest about it.

---

## 7. Out of scope for v1

Listed here so they don't creep in:

- Patient portal / login
- Lab reports retrieval (link to existing third-party tool)
- Bill payment (link to existing third-party tool)
- Tele-OPD video flow
- Real-time slot availability (mocked in v1; comes from a real system later)
- A CMS — content is typed seed data
- Server-side i18n with translator workflow — Hindi copy is hand-authored alongside English in `messages/hi.json`
- Live chat
- Newsletter signup
- A blog beyond the news page
- User accounts of any kind

If a stakeholder lobbies for any of these, the answer in v1 is "noted, post-launch."

---

## 8. Content principles

These are not soft guidelines. The site's whole credibility rests on them.

### a. Show the work

Every claim is backed by a number, a name, or a year. "Door-to-balloon time of 38 minutes" beats "fast emergency response." If we don't have the number, we don't make the claim.

### b. Name the people

Doctors are named, with real credentials, training, and years of experience. No anonymous "our expert team" framing. The hospital's reputation is the sum of its consultants' reputations.

### c. Hindi is first-class

Hindi is not transliterated English. It is hand-written by someone fluent. Numerals follow the locale (१,८०० in Hindi). Headings get the right line-height. The Hindi site does not feel secondary in any way.

### d. Photography over illustration

The hospital is a real place — old courtyards, new glass-and-steel wings, the mango trees in the cloister. Pictures of those carry more weight than any vector illustration could. Until real photography is shot, use captioned placeholder gradients (see `DESIGN.md`). Never stock.

### e. Quiet, not corporate

The institution is 65 years old. The voice is confident, plain, slightly serif-leaning. Not gleaming, not minimalist-tech. Closer to a university press than a startup landing page.

### f. No filler

Every section earns its place. If a slot would carry filler copy, the slot is removed. Better to have eight strong sections than fifteen mediocre ones.

---

## 9. Accreditations and trust signals

These appear in the footer of every page and once in the marquee:

- NABH — National Accreditation Board for Hospitals & Healthcare Providers
- NABL — National Accreditation Board for Testing and Calibration Laboratories
- NMC — National Medical Commission
- ISO 15189 — for the medical laboratory

Plus the founding year (1958), bed count (540), specialty count (28), and consultant count (184). These are facts, not marketing.

---

## 10. Constraints from operations

- The hospital's IT team is small. The site must be deployable and editable by a non-engineer for content updates within ~6 months — that drives toward a CMS migration plan in v2, not v1.
- Real appointment availability comes from an existing HIS (hospital information system) that is not API-friendly. v1 mocks availability; v2 wires it. The booking server-action contract in `CLAUDE.md` is shaped to make that swap a one-file change.
- Photography commissioning is in-flight; expect real images to land 4–6 weeks after launch. Placeholder system must hold up that long without looking unfinished.
- The hospital's existing phone number (+91 80 4422 0099) and emergency line (102) are real and on-call. They must work as `tel:` links from every page.

---

## 11. Success metrics

Six weeks after launch:

| Metric | Target | How measured |
|---|---|---|
| Booking flow completion rate, cold start | ≥ 35% | Server-action analytics |
| Time-to-confirmation, median | ≤ 90 seconds | Stepper instrumentation |
| Hindi sessions as % of total | ≥ 40% | Locale on first page-view |
| Mobile bounce rate, home | ≤ 45% | Standard analytics |
| Lighthouse Performance (mobile, slow 4G) on `/` | ≥ 90 | Synthetic, weekly |
| Tap-to-call from sticky bar, daily | ≥ 50/day | Click event |
| Annual-report PDF downloads, weekly | ≥ 20 | Click event |
| Search-rank for "[specialty] hospital Hapur" | top 3 for ≥ 5 specialties | Manual check |

These are not aspirational; they are the bar for declaring v1 a success. If we miss two or more, we re-scope before adding new features.

---

## 12. Risks worth naming

- **Hindi quality.** Bad Hindi is worse than no Hindi. Every Hindi string ships through a fluent reviewer, not just an engineer paste.
- **Photography lag.** If real photography slips past 8 weeks, the placeholder system starts to feel like a placeholder. Plan for a temporary art direction sweep at week 6 if needed.
- **Real availability data.** Mocked slots that look real risk a patient turning up to a slot that doesn't exist. Confirmation copy is explicit: "We will SMS you within 30 minutes to confirm." A human is in the loop until the HIS integration is live.
- **SEO churn.** Migrating from the existing site means redirects matter. A redirect map from old URLs to new is a launch-blocker, not a v1.1 task.

---

## 13. The one-line product statement

> A bilingual website that lets the right patient find the right doctor at Dev Nandini Hospital in under three minutes, and gives everyone else a reason to trust the place that's been here since 1958.
