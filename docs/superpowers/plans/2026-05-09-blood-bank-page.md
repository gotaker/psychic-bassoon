# Blood Bank Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a top-level `/[locale]/blood-bank` page (rich, two-lane donor + family-arranging-blood layout) plus a thin `/[locale]/departments/blood-bank` stub that links back, in both English and Hindi, satisfying the verification contract in [`docs/superpowers/specs/2026-05-09-blood-bank-page-uxdd.md`](../specs/2026-05-09-blood-bank-page-uxdd.md).

**Architecture:** RSC-first page composed of seven section components under `components/blood-bank/`, with a single client island for the FAQ accordion. Bilingual content is typed and Zod-parsed from `content/blood-bank.ts`; chrome strings flow through `messages/{en,hi}.json`. The department stub reuses the existing `DepartmentTemplate` augmented with a generic `richPageHref` link so we don't fork per-department logic. Behaviour is verified with new Playwright e2e + axe-playwright suites; content shape and i18n parity reuse the existing vitest harness.

**Tech Stack:** Next.js 16 App Router, React 19 RSC, TypeScript strict, Tailwind 4 with `@theme` tokens, next-intl (locale-segment routing), Zod for content schemas, Playwright + `@axe-core/playwright` (new dev deps) for e2e + a11y.

---

## Spec ↔ AC index

| AC | Tag | Where it's verified in this plan |
|---|---|---|
| AC-1 hero CTA scrolls to `#request` | `[v:e2e]` | Task 26 |
| AC-2 donor lane tap-to-call `tel:` href | `[v:e2e]` | Task 26 |
| AC-3 request lane tap-to-call `tel:` href | `[v:e2e]` | Task 26 |
| AC-4 FAQ keyboard expansion | `[v:e2e]` | Task 26 |
| AC-5 header nav "Blood Bank" / "रक्त बैंक" | `[v:e2e]` | Task 26 |
| AC-6 `/departments/blood-bank` stub renders + single CTA | `[v:e2e]` | Task 26 |
| AC-7 reduced-motion disables smooth-scroll | `[v:e2e]` | Task 26 |
| AC-8 zero axe violations both locales | `[v:axe]` | Task 27 |
| AC-9 strict heading order | `[v:axe]` | Task 27 |
| AC-10 hero placeholder caption | `[v:manual]` | Task 28 (PR screenshots) |
| state-inventory error:content-parse | unit | Task 9 |
| state-inventory error:i18n-key-missing | unit | Task 12 (existing parity test) |
| state-inventory error:phone-malformed | unit | Task 9 |
| state-inventory edge:no-js (FAQ panel via `hidden` attr) | unit/component | Task 18 |

---

## Phase 1 — Test infrastructure (Playwright + axe-playwright)

The project currently has only vitest. Playwright is required to honor the `[v:e2e]` and `[v:axe]` parts of the verification contract. This phase adds it.

### Task 1: Install Playwright + axe-core dev deps

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install**

```bash
pnpm add -D @playwright/test @axe-core/playwright
pnpm exec playwright install --with-deps chromium
```

- [ ] **Step 2: Verify the lockfile and `package.json` updated**

```bash
git diff --stat package.json pnpm-lock.yaml
```

Expected: `package.json` shows new entries under `devDependencies` for `@playwright/test` and `@axe-core/playwright`; lockfile updated.

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore(deps): add @playwright/test and @axe-core/playwright"
```

---

### Task 2: Create Playwright config (mobile viewport, dev server)

**Files:**
- Create: `playwright.config.ts`

- [ ] **Step 1: Write the config**

```ts
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3000);
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: /.*\.spec\.ts$/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "mobile-chromium",
      use: { ...devices["iPhone 13"] },
    },
  ],
  webServer: {
    command: process.env.CI ? "pnpm build && pnpm start" : "pnpm dev",
    // Probe a locale-prefixed route directly. The site redirects `/` to
    // `/en` via middleware, and on Next 16 dev the middleware redirect
    // can cause Playwright's readiness probe to fail to detect the server.
    url: `${BASE_URL}/en`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
```

- [ ] **Step 2: Add `tests/e2e` directory and a sentinel test**

```bash
mkdir -p tests/e2e
```

Create `tests/e2e/sentinel.spec.ts`:

```ts
import { test, expect } from "@playwright/test";

test("home page loads in EN", async ({ page }) => {
  await page.goto("/en");
  await expect(page).toHaveURL(/\/en\/?$/);
});
```

- [ ] **Step 3: Add scripts to `package.json`**

Edit `package.json` `"scripts"` to add:

```json
"e2e": "playwright test",
"e2e:ui": "playwright test --ui"
```

- [ ] **Step 4: Run sentinel**

```bash
pnpm e2e
```

Expected: 1 passed.

- [ ] **Step 5: Commit**

```bash
git add playwright.config.ts package.json tests/e2e/sentinel.spec.ts
git commit -m "test(e2e): bootstrap Playwright with mobile-chromium project"
```

---

### Task 3: Add `.gitignore` entries for Playwright artifacts

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Append**

Add these lines to `.gitignore`:

```
# Playwright
/test-results/
/playwright-report/
/blob-report/
/playwright/.cache/
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: gitignore Playwright artifacts"
```

---

## Phase 2 — Content + types (TDD)

### Task 4: Write failing schema test for `BloodBankContent`

**Files:**
- Create: `tests/unit/blood-bank.test.ts`

References: state-inventory `error:content-parse`, `error:phone-malformed`.

- [ ] **Step 1: Write the failing test file**

```ts
// tests/unit/blood-bank.test.ts
import { describe, it, expect } from "vitest";
import { BloodBankContent } from "@/content/types";
import { bloodBank } from "@/content/blood-bank";

describe("blood-bank content", () => {
  it("parses through BloodBankContent schema", () => {
    const result = BloodBankContent.safeParse(bloodBank);
    if (!result.success) {
      throw new Error(
        `bloodBank failed schema validation:\n${JSON.stringify(result.error.format(), null, 2)}`,
      );
    }
    expect(result.success).toBe(true);
  });

  it("donate.phone matches the project E.164-relaxed pattern", () => {
    expect(bloodBank.donate.phone).toMatch(/^\+\d[\d\s-]+$/);
  });

  it("request.phone matches the project E.164-relaxed pattern", () => {
    expect(bloodBank.request.phone).toMatch(/^\+\d[\d\s-]+$/);
  });

  it("has at least 1 FAQ item, 1 service, 3 eligibility rules", () => {
    expect(bloodBank.faq.length).toBeGreaterThanOrEqual(1);
    expect(bloodBank.services.length).toBeGreaterThanOrEqual(1);
    expect(bloodBank.donate.eligibility.length).toBeGreaterThanOrEqual(3);
  });
});
```

- [ ] **Step 2: Run — must fail (no module yet)**

```bash
pnpm test tests/unit/blood-bank.test.ts
```

Expected: failure resolving `@/content/types` `BloodBankContent` export OR `@/content/blood-bank`.

---

### Task 5: Add `BloodBankContent` Zod schema to `content/types.ts`

**Files:**
- Modify: `content/types.ts`

References: state-inventory `error:content-parse`. Sets up AC-2/AC-3 phone constraint.

- [ ] **Step 1: Append the schema (do NOT touch existing exports)**

Add to the bottom of `content/types.ts`:

```ts
// ----- Blood Bank -----
// The phone regex matches the rest of the project (Location.phone): "+" then
// digits/spaces/dashes. Strict E.164 is intentionally relaxed across the
// codebase to permit human-readable rendering.
const PhoneE164Relaxed = z.string().regex(/^\+\d[\d\s-]+$/);

export const BloodBankFaqItem = z.object({
  id: z.string().regex(/^[a-z][a-z0-9-]*$/),
  q: LocalisedString,
  a: LocalisedString,
});
export type BloodBankFaqItem = z.infer<typeof BloodBankFaqItem>;

export const BloodBankContent = z.object({
  hero: z.object({
    eyebrow: LocalisedString,
    headline: LocalisedString,
    sub: LocalisedString,
    photoCaption: LocalisedString,
    photoOverlay: LocalisedString,
    photoTone: z.enum(["mocha", "slate", "sand", "sage", "clay"]),
  }),
  accreditations: z.array(z.enum(["nabh", "nabl", "iso15189"])).min(1),
  services: z.array(
    z.object({
      id: z.string().regex(/^[a-z][a-z0-9-]*$/),
      label: LocalisedString,
      note: LocalisedString.optional(),
    }),
  ).min(1),
  donate: z.object({
    eligibility: z.array(
      z.object({
        id: z.string().regex(/^[a-z][a-z0-9-]*$/),
        rule: LocalisedString,
      }),
    ).min(3),
    process: z.array(
      z.object({
        id: z.string().regex(/^[a-z][a-z0-9-]*$/),
        step: LocalisedString,
        detail: LocalisedString,
      }),
    ).min(2),
    walkInHours: LocalisedString,
    phone: PhoneE164Relaxed,
  }),
  request: z.object({
    replacementPolicy: LocalisedString,
    whatToBring: z.array(
      z.object({
        id: z.string().regex(/^[a-z][a-z0-9-]*$/),
        item: LocalisedString,
      }),
    ).min(2),
    hours: LocalisedString,
    phone: PhoneE164Relaxed,
  }),
  faq: z.array(BloodBankFaqItem).min(1),
  contact: z.object({
    addressLine: LocalisedString,
    inHospitalLocation: LocalisedString,
    phone: PhoneE164Relaxed,
    email: z.string().email().optional(),
  }),
});
export type BloodBankContent = z.infer<typeof BloodBankContent>;
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

Expected: passes.

- [ ] **Step 3: Run blood-bank test — must still fail (no `content/blood-bank.ts`)**

```bash
pnpm test tests/unit/blood-bank.test.ts
```

Expected: cannot resolve `@/content/blood-bank`.

---

### Task 6: Add `richPageHref` optional to `Department` schema

**Files:**
- Modify: `content/types.ts`

References: AC-6.

- [ ] **Step 1: Edit the existing `Department` schema**

Find:

```ts
export const Department = z.object({
  slug: z.string().regex(/^[a-z][a-z0-9-]*$/),
  name: LocalisedString,
  tagline: LocalisedString,
  hasFullDetail: z.boolean(),
});
```

Replace with:

```ts
export const Department = z.object({
  slug: z.string().regex(/^[a-z][a-z0-9-]*$/),
  name: LocalisedString,
  tagline: LocalisedString,
  hasFullDetail: z.boolean(),
  // When set, the department detail page renders a single "Visit our X" CTA
  // pointing here. Used for departments that have a richer top-level public
  // surface (e.g. /blood-bank).
  richPageHref: z.string().regex(/^\/(?:en|hi)\/[a-z0-9-/]+$/).optional(),
});
```

The regex enforces locale-prefixed paths so we never accidentally drop the locale.

- [ ] **Step 2: Typecheck — should pass; existing 28 entries don't use the new field**

```bash
pnpm typecheck
```

Expected: passes (the field is optional).

- [ ] **Step 3: Commit progress so far**

```bash
git add content/types.ts tests/unit/blood-bank.test.ts
git commit -m "feat(content): add BloodBankContent schema and Department.richPageHref"
```

---

### Task 7: Author `content/blood-bank.ts` with full bilingual content

**Files:**
- Create: `content/blood-bank.ts`

References: state-inventory `success`, `error:phone-malformed` (passes), `edge:long-hindi-content`.

- [ ] **Step 1: Create the file**

```ts
// content/blood-bank.ts
import type { BloodBankContent } from "./types";

// Phone numbers placeholder (relaxed E.164 — matches Location.phone shape).
// Replace before launch with the real blood-bank desk number.
const BLOOD_BANK_PHONE = "+91-12-2660-1234";

export const bloodBank = {
  hero: {
    eyebrow: { en: "BLOOD BANK", hi: "रक्त बैंक" },
    headline: {
      en: "Donate. Or arrange blood for someone you love.",
      hi: "रक्तदान करें। या किसी प्रियजन के लिए रक्त की व्यवस्था करें।",
    },
    sub: {
      en: "An NABH-accredited blood bank on the Dev Nandini Hospital ground floor — open weekdays for donors, around the clock for patients.",
      hi: "देव नंदिनी अस्पताल के भूतल पर एनएबीएच-मान्यता प्राप्त रक्त बैंक — दाताओं के लिए कार्यदिवसों पर, रोगियों के लिए चौबीसों घंटे खुला।",
    },
    photoCaption: {
      en: "BLOOD BANK · GROUND FLOOR",
      hi: "रक्त बैंक · भूतल",
    },
    photoOverlay: {
      en: "Safe, screened, on-site",
      hi: "सुरक्षित, जाँच किया हुआ, परिसर में",
    },
    photoTone: "clay" as const,
  },
  accreditations: ["nabh", "nabl", "iso15189"] as const,
  services: [
    { id: "whole-blood", label: { en: "Whole blood", hi: "संपूर्ण रक्त" } },
    { id: "packed-cells", label: { en: "Packed red cells", hi: "पैक्ड लाल कोशिकाएँ" } },
    { id: "fresh-frozen-plasma", label: { en: "Fresh frozen plasma", hi: "ताज़ा जमा हुआ प्लाज़्मा" } },
    { id: "platelets", label: { en: "Platelets", hi: "प्लेटलेट्स" } },
    { id: "cross-match", label: { en: "Cross-match & screening", hi: "क्रॉस-मैच एवं जाँच" } },
    { id: "component-separation", label: { en: "Component separation", hi: "घटक पृथक्करण" } },
  ],
  donate: {
    eligibility: [
      { id: "age", rule: { en: "Age 18 to 65", hi: "आयु १८ से ६५ वर्ष" } },
      { id: "weight", rule: { en: "Weight 50 kg or more", hi: "वजन ५० किग्रा या अधिक" } },
      { id: "hb", rule: { en: "Haemoglobin 12.5 g/dL or more", hi: "हीमोग्लोबिन १२.५ ग्रा/डेसी या अधिक" } },
      { id: "gap", rule: { en: "At least 90 days since your last donation", hi: "पिछले रक्तदान से कम से कम ९० दिन" } },
      { id: "wellness", rule: { en: "Feeling well today, no recent illness or infection", hi: "आज स्वस्थ महसूस कर रहे हों, हाल में कोई बीमारी या संक्रमण न हुआ हो" } },
    ],
    process: [
      { id: "register", step: { en: "Register", hi: "पंजीकरण" }, detail: { en: "Bring a photo ID. Form takes about 5 minutes.", hi: "फोटो पहचान-पत्र साथ लाएँ। फॉर्म में लगभग ५ मिनट लगते हैं।" } },
      { id: "screen", step: { en: "Screen", hi: "जाँच" }, detail: { en: "Quick haemoglobin and blood-pressure check.", hi: "हीमोग्लोबिन और रक्तचाप की त्वरित जाँच।" } },
      { id: "donate", step: { en: "Donate", hi: "रक्तदान" }, detail: { en: "About 10 minutes. You'll be lying down in a clean, ventilated chair.", hi: "लगभग १० मिनट। आप एक साफ़, हवादार कुर्सी पर लेटे रहेंगे।" } },
      { id: "rest", step: { en: "Snack & rest", hi: "नाश्ता एवं विश्राम" }, detail: { en: "Tea, biscuits, and 15 minutes of quiet before you leave.", hi: "जाने से पहले चाय, बिस्किट, और १५ मिनट का विश्राम।" } },
    ],
    walkInHours: { en: "Monday to Saturday, 9:00 AM – 5:00 PM", hi: "सोमवार से शनिवार, सुबह ९:०० – शाम ५:००" },
    phone: BLOOD_BANK_PHONE,
  },
  request: {
    replacementPolicy: {
      en: "Per state regulation, blood units are issued against an equal number of replacement donations from the patient's family or friends. We accept any blood group as a replacement — group matching happens at the bank, not at the donor.",
      hi: "राज्य के नियमानुसार, रक्त इकाइयाँ रोगी के परिवार या मित्रों से बराबर संख्या में प्रतिस्थापन-दान के बदले दी जाती हैं। हम प्रतिस्थापन के लिए किसी भी रक्त समूह को स्वीकार करते हैं — समूह मिलान बैंक में होता है, दाता पर नहीं।",
    },
    whatToBring: [
      { id: "admission-slip", item: { en: "Patient admission slip or OPD card", hi: "रोगी का भर्ती-पर्चा या ओपीडी कार्ड" } },
      { id: "donor-ids", item: { en: "Photo ID for every donor (Aadhaar, voter ID, etc.)", hi: "हर दाता का फोटो पहचान-पत्र (आधार, वोटर आईडी, आदि)" } },
      { id: "prescription", item: { en: "Doctor's blood-group requisition", hi: "चिकित्सक की रक्त-समूह माँग पर्ची" } },
    ],
    hours: { en: "24 hours a day, every day for urgent requirements", hi: "तत्काल आवश्यकताओं के लिए हर दिन, चौबीसों घंटे" },
    phone: BLOOD_BANK_PHONE,
  },
  faq: [
    {
      id: "who-can-donate",
      q: { en: "Who can donate blood at Dev Nandini Hospital?", hi: "देव नंदिनी अस्पताल में रक्तदान कौन कर सकता है?" },
      a: { en: "Anyone aged 18–65, weighing at least 50 kg, with haemoglobin of 12.5 g/dL or more, who is feeling well today and hasn't donated in the past 90 days.", hi: "१८ से ६५ वर्ष की आयु, वजन कम से कम ५० किग्रा, हीमोग्लोबिन १२.५ ग्रा/डेसी या अधिक, आज स्वस्थ महसूस कर रहे हों और पिछले ९० दिनों में रक्तदान न किया हो — कोई भी कर सकता है।" },
    },
    {
      id: "is-it-safe",
      q: { en: "Is donating blood safe?", hi: "क्या रक्तदान सुरक्षित है?" },
      a: { en: "Yes. Every needle and bag is sterile and single-use. The whole process takes about 30 minutes including registration, screening, donation, and rest.", hi: "हाँ। हर सुई और थैली बंध्य और एक बार उपयोग की होती हैं। पंजीकरण, जाँच, रक्तदान और विश्राम सहित पूरी प्रक्रिया में लगभग ३० मिनट लगते हैं।" },
    },
    {
      id: "without-replacement",
      q: { en: "Can I get blood without arranging a replacement donor?", hi: "क्या मैं प्रतिस्थापन दाता की व्यवस्था किए बिना रक्त प्राप्त कर सकता हूँ?" },
      a: { en: "In emergencies the blood bank issues blood first and arranges replacement later. For planned procedures, please bring donors with the patient.", hi: "आपातकाल में रक्त बैंक पहले रक्त देता है और प्रतिस्थापन बाद में करता है। नियोजित प्रक्रियाओं के लिए कृपया रोगी के साथ दाता लाएँ।" },
    },
    {
      id: "components",
      q: { en: "Do you separate components like plasma and platelets?", hi: "क्या आप प्लाज़्मा और प्लेटलेट्स जैसे घटक अलग करते हैं?" },
      a: { en: "Yes. Whole blood is separated into packed red cells, fresh frozen plasma, and platelet concentrate as needed by the prescribing clinician.", hi: "हाँ। पूरे रक्त को पैक्ड लाल कोशिकाओं, ताज़ा जमा प्लाज़्मा और प्लेटलेट सांद्रता में अलग किया जाता है, जैसा कि चिकित्सक को आवश्यकता हो।" },
    },
    {
      id: "duration",
      q: { en: "How long does the visit take?", hi: "मुलाक़ात में कितना समय लगता है?" },
      a: { en: "Plan for about 30 minutes from arrival to leaving. The donation itself is around 10 minutes.", hi: "पहुँचने से जाने तक लगभग ३० मिनट का अनुमान रखें। वास्तविक रक्तदान लगभग १० मिनट का होता है।" },
    },
  ],
  contact: {
    addressLine: { en: "Dev Nandini Hospital, NH-9 Hapur Bypass, Hapur 245101", hi: "देव नंदिनी अस्पताल, एनएच-९ हापुड़ बायपास, हापुड़ २४५१०१" },
    inHospitalLocation: { en: "Block A · Ground floor, behind the pathology lab", hi: "ब्लॉक ए · भूतल, पैथोलॉजी लैब के पीछे" },
    phone: BLOOD_BANK_PHONE,
  },
} as const satisfies BloodBankContent;
```

- [ ] **Step 2: Run the blood-bank test — must pass**

```bash
pnpm test tests/unit/blood-bank.test.ts
```

Expected: 4 passed.

- [ ] **Step 3: Commit**

```bash
git add content/blood-bank.ts
git commit -m "feat(content): add typed bilingual blood-bank content"
```

---

### Task 8: Register `blood-bank` department stub with `richPageHref`

**Files:**
- Modify: `content/departments.ts`

References: AC-6, state-inventory Surface 5 `success`.

- [ ] **Step 1: Append entry to the array**

Find the closing `];` of the `departments` array (around line 254). Insert before the closing bracket:

```ts
  {
    slug: "blood-bank",
    name: { en: "Blood Bank", hi: "रक्त बैंक" },
    tagline: {
      en: "Donate. Or arrange blood for a patient.",
      hi: "रक्तदान करें। या रोगी के लिए रक्त की व्यवस्था करें।",
    },
    hasFullDetail: false,
    // Routes the dept stub's CTA to the rich /blood-bank surface.
    richPageHref: "/en/blood-bank", // canonical entry; template swaps locale at render time
  },
```

- [ ] **Step 2: Run content-shape test — must still pass**

```bash
pnpm test tests/unit/content-shape.test.ts
```

Expected: all green; the new entry validates and there are now 29 departments.

- [ ] **Step 3: Commit**

```bash
git add content/departments.ts
git commit -m "feat(content): register blood-bank department stub with richPageHref"
```

---

### Task 9: Extend content-shape test to cover blood-bank stub and richPageHref invariant

**Files:**
- Modify: `tests/unit/content-shape.test.ts`

References: state-inventory `error:content-parse` (rich), Surface 4/5 `error:locale-mismatch` guard.

- [ ] **Step 1: Add new tests at the bottom of the existing `describe("content shape", ...)` block**

```ts
  it("blood-bank dept entry exists and uses richPageHref", () => {
    const entry = departments.find((d) => d.slug === "blood-bank");
    expect(entry).toBeDefined();
    expect(entry?.richPageHref).toBe("/en/blood-bank");
  });

  it("every richPageHref is locale-prefixed (en|hi)", () => {
    for (const d of departments) {
      if (d.richPageHref) {
        expect(d.richPageHref).toMatch(/^\/(?:en|hi)\//);
      }
    }
  });
```

- [ ] **Step 2: Run**

```bash
pnpm test tests/unit/content-shape.test.ts
```

Expected: all green.

- [ ] **Step 3: Commit**

```bash
git add tests/unit/content-shape.test.ts
git commit -m "test(content): assert blood-bank dept stub and richPageHref invariant"
```

---

## Phase 3 — Messages (i18n parity-locked)

### Task 10: Add `bloodBank.*` namespace + `nav.bloodBank` to `messages/en.json`

**Files:**
- Modify: `messages/en.json`

References: AC-5, state-inventory Surface 1 `success`, Surface 2/3 chrome.

- [ ] **Step 1: Open `messages/en.json`. Add the `bloodBank` block adjacent to other top-level namespaces (alphabetical-ish; after `book` and before `brand` is fine). Inside `nav`, add `bloodBank: "Blood Bank"`. Inside `footer`, add `bloodBankLink: "Blood Bank"`.**

The `bloodBank` block:

```json
"bloodBank": {
  "sectionAccreditations": "Accreditations",
  "sectionServices": "What we do",
  "sectionDonate": "Donate blood",
  "sectionRequest": "Need blood for a patient",
  "sectionFaq": "Frequently asked questions",
  "sectionContact": "Visit & contact",
  "ctaDonate": "Donate blood",
  "ctaRequest": "Need blood for a patient",
  "ctaCallDonor": "Call the blood bank",
  "ctaCallRequest": "Call the blood bank",
  "eligibilityHeading": "Eligibility",
  "processHeading": "What to expect",
  "walkInHeading": "Walk-in hours",
  "policyHeading": "How to arrange blood at DNH",
  "whatToBringHeading": "What to bring",
  "hoursHeading": "Hours",
  "departmentStubCta": "Visit our Blood Bank",
  "metaTitle": "Blood Bank — Dev Nandini Hospital",
  "metaDescription": "Donate blood, or arrange blood for an admitted patient at Dev Nandini Hospital — NABH-accredited, on the ground floor in Hapur."
}
```

Then ensure `nav.bloodBank: "Blood Bank"` and `footer.bloodBankLink: "Blood Bank"` exist.

- [ ] **Step 2: Run parity test — must FAIL (HI not yet updated)**

```bash
pnpm test tests/unit/i18n-parity.test.ts
```

Expected: failure listing keys present in en but missing from hi.

---

### Task 11: Mirror to `messages/hi.json`

**Files:**
- Modify: `messages/hi.json`

References: AC-5, state-inventory `error:i18n-key-missing`.

- [ ] **Step 1: Add the same structure with Hindi values**

Same shape as en.json:

```json
"bloodBank": {
  "sectionAccreditations": "मान्यताएँ",
  "sectionServices": "हम क्या करते हैं",
  "sectionDonate": "रक्तदान करें",
  "sectionRequest": "रोगी के लिए रक्त चाहिए",
  "sectionFaq": "अक्सर पूछे जाने वाले प्रश्न",
  "sectionContact": "मुलाक़ात एवं संपर्क",
  "ctaDonate": "रक्तदान करें",
  "ctaRequest": "रोगी के लिए रक्त चाहिए",
  "ctaCallDonor": "रक्त बैंक को कॉल करें",
  "ctaCallRequest": "रक्त बैंक को कॉल करें",
  "eligibilityHeading": "पात्रता",
  "processHeading": "क्या अपेक्षा रखें",
  "walkInHeading": "वॉक-इन घंटे",
  "policyHeading": "डीएनएच में रक्त की व्यवस्था कैसे करें",
  "whatToBringHeading": "क्या साथ लाएँ",
  "hoursHeading": "घंटे",
  "departmentStubCta": "हमारा रक्त बैंक देखें",
  "metaTitle": "रक्त बैंक — देव नंदिनी अस्पताल",
  "metaDescription": "देव नंदिनी अस्पताल में रक्तदान करें, या भर्ती रोगी के लिए रक्त की व्यवस्था करें — एनएबीएच-मान्यता प्राप्त, हापुड़ में भूतल पर।"
}
```

`nav.bloodBank: "रक्त बैंक"` and `footer.bloodBankLink: "रक्त बैंक"`.

- [ ] **Step 2: Run parity test — must PASS**

```bash
pnpm test tests/unit/i18n-parity.test.ts
```

Expected: green.

- [ ] **Step 3: Commit both message files**

```bash
git add messages/en.json messages/hi.json
git commit -m "feat(i18n): add bloodBank.* namespace and Blood Bank nav/footer keys"
```

---

### Task 12: Run the full unit suite to confirm no regression

- [ ] **Step 1**

```bash
pnpm test
```

Expected: all green.

---

## Phase 4 — Components in isolation

Each component lands as an RSC unless explicitly marked `'use client'`. Components are pure renders of their props; no module-level state. Tokens come from `app/globals.css`; raw Tailwind colour classes are forbidden.

### Task 13: `BloodBankHero` (RSC)

**Files:**
- Create: `components/blood-bank/BloodBankHero.tsx`

References: AC-1 (lane CTAs), AC-10 (caption), state-inventory Surface 3 `success`/`edge:no-js`.

- [ ] **Step 1: Write the component**

```tsx
// components/blood-bank/BloodBankHero.tsx
import { useTranslations } from "next-intl";
import { Mono } from "@/components/ui/Mono";
import { Button } from "@/components/ui/Button";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { EditorialSplit } from "@/components/layout/EditorialSplit";
import type { BloodBankContent } from "@/content/types";
import type { Locale } from "@/lib/locales";

type Props = {
  locale: Locale;
  hero: BloodBankContent["hero"];
};

export function BloodBankHero({ locale, hero }: Props) {
  const t = useTranslations("bloodBank");

  return (
    <section className="bg-white">
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)] py-10 md:py-16">
        <EditorialSplit
          ratio="1-1"
          left={
            <>
              <Mono>{hero.eyebrow[locale]}</Mono>
              <h1 className="display-xl mt-4 max-w-[18ch]">{hero.headline[locale]}</h1>
              <p className="lede mt-6 max-w-[52ch]">{hero.sub[locale]}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="primary" size="lg" href="#donate">
                  {t("ctaDonate")}
                </Button>
                <Button variant="secondary" size="lg" href="#request">
                  {t("ctaRequest")}
                </Button>
              </div>
            </>
          }
          right={
            <PhotoPlaceholder
              tone={hero.photoTone}
              caption={hero.photoCaption[locale]}
              overlay={hero.photoOverlay[locale]}
              ratio="hero"
              radius="sm"
            />
          }
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify Button supports href anchors**

```bash
grep -n "href" components/ui/Button.tsx | head -10
```

Expected: shows that Button renders an `<a>` (or Link) when `href` is provided. If it does not support raw fragment hrefs (`#donate`), proceed to Task 13a; otherwise skip it.

---

### Task 13a (conditional): Allow fragment hrefs in `Button`

Only execute if Task 13 step 2 reveals Button can't render fragment anchors.

**Files:**
- Modify: `components/ui/Button.tsx`

- [ ] **Step 1: Read the file fully and ensure that when `href` starts with `#`, it renders a plain `<a href={href}>` (no `<Link>`).**

If the existing Button uses `next/link`, branch on the prefix:

```tsx
if (href?.startsWith("#")) {
  return <a href={href} className={...}>{children}</a>;
}
```

- [ ] **Step 2: Typecheck and commit**

```bash
pnpm typecheck
git add components/ui/Button.tsx
git commit -m "fix(ui): Button renders fragment hrefs as plain anchor"
```

---

### Task 14: `AccreditationStrip` (RSC)

**Files:**
- Create: `components/blood-bank/AccreditationStrip.tsx`

References: state-inventory Surface 1 `success`.

- [ ] **Step 1**

```tsx
// components/blood-bank/AccreditationStrip.tsx
import { useTranslations } from "next-intl";
import { Mono } from "@/components/ui/Mono";
import type { BloodBankContent } from "@/content/types";

type Props = {
  accreditations: BloodBankContent["accreditations"];
};

export function AccreditationStrip({ accreditations }: Props) {
  const tBb = useTranslations("bloodBank");
  const tAcc = useTranslations("accreditations");

  return (
    <section
      className="border-y border-[color:var(--color-line-soft)] bg-[color:var(--color-paper-2)] py-6"
      aria-labelledby="bb-accred-heading"
    >
      <div className="page-gutter mx-auto flex w-full max-w-[var(--content-max)] flex-wrap items-baseline gap-x-3 gap-y-1.5">
        <h2 id="bb-accred-heading" className="sr-only">
          {tBb("sectionAccreditations")}
        </h2>
        {accreditations.map((key, i) => (
          <span key={key} className="flex items-baseline gap-3">
            <Mono className="text-[color:var(--color-ink-soft)]">{tAcc(key)}</Mono>
            {i < accreditations.length - 1 ? <span aria-hidden="true">·</span> : null}
          </span>
        ))}
      </div>
    </section>
  );
}
```

(Confirm `accreditations.iso15189` etc. keys already exist in messages — they do, per `SiteFooter`.)

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

---

### Task 15: `ServicesGrid` (RSC)

**Files:**
- Create: `components/blood-bank/ServicesGrid.tsx`

References: state-inventory Surface 1 `success`.

- [ ] **Step 1**

```tsx
// components/blood-bank/ServicesGrid.tsx
import { useTranslations } from "next-intl";
import type { BloodBankContent } from "@/content/types";
import type { Locale } from "@/lib/locales";

type Props = {
  locale: Locale;
  services: BloodBankContent["services"];
};

export function ServicesGrid({ locale, services }: Props) {
  const t = useTranslations("bloodBank");
  return (
    <section
      className="bg-white py-12 md:py-20"
      aria-labelledby="bb-services-heading"
    >
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)]">
        <h2
          id="bb-services-heading"
          className="display-md max-w-[24ch] text-[color:var(--color-deep)]"
        >
          {t("sectionServices")}
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {services.map((s) => (
            <li
              key={s.id}
              className="rounded-md border border-[color:var(--color-line-soft)] bg-[color:var(--color-paper-2)] p-4 text-[14px] text-[color:var(--color-ink)]"
            >
              {s.label[locale]}
              {s.note ? (
                <span className="mt-1 block text-[12px] text-[color:var(--color-ink-soft)]">
                  {s.note[locale]}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

---

### Task 16: `DonateLane` (RSC)

**Files:**
- Create: `components/blood-bank/DonateLane.tsx`

References: AC-2 (tap-to-call), state-inventory Surface 3.

- [ ] **Step 1**

```tsx
// components/blood-bank/DonateLane.tsx
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Mono } from "@/components/ui/Mono";
import { CheckIcon } from "@/components/icons";
import type { BloodBankContent } from "@/content/types";
import type { Locale } from "@/lib/locales";

type Props = {
  locale: Locale;
  donate: BloodBankContent["donate"];
};

export function DonateLane({ locale, donate }: Props) {
  const t = useTranslations("bloodBank");
  return (
    <section
      id="donate"
      className="bg-white py-12 md:py-20 scroll-mt-[88px]"
      aria-labelledby="bb-donate-heading"
    >
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)]">
        <Mono>{t("sectionDonate")}</Mono>
        <h2
          id="bb-donate-heading"
          className="display-md mt-3 max-w-[20ch] text-[color:var(--color-deep)]"
        >
          {t("ctaDonate")}
        </h2>

        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h3 className="display-xs">{t("eligibilityHeading")}</h3>
            <ul className="mt-4 space-y-2">
              {donate.eligibility.map((e) => (
                <li
                  key={e.id}
                  className="flex items-start gap-2 text-[15px] text-[color:var(--color-ink)]"
                >
                  <CheckIcon size={16} aria-hidden="true" />
                  {e.rule[locale]}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="display-xs">{t("processHeading")}</h3>
            <ol className="mt-4 list-decimal space-y-2 ps-5 text-[15px] text-[color:var(--color-ink)]">
              {donate.process.map((p) => (
                <li key={p.id}>
                  <strong className="font-semibold">{p.step[locale]}.</strong>{" "}
                  <span className="text-[color:var(--color-ink-soft)]">
                    {p.detail[locale]}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-10 rounded-md border border-[color:var(--color-line-soft)] p-5">
          <Mono>{t("walkInHeading")}</Mono>
          <p className="mt-2 text-[15px] text-[color:var(--color-ink)]">
            {donate.walkInHours[locale]}
          </p>
          <Button
            variant="primary"
            size="lg"
            href={`tel:${donate.phone}`}
            className="mt-5"
          >
            {t("ctaCallDonor")}
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

---

### Task 17: `RequestLane` (RSC)

**Files:**
- Create: `components/blood-bank/RequestLane.tsx`

References: AC-3 (tap-to-call), state-inventory Surface 3.

- [ ] **Step 1**

```tsx
// components/blood-bank/RequestLane.tsx
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Mono } from "@/components/ui/Mono";
import { CheckIcon } from "@/components/icons";
import type { BloodBankContent } from "@/content/types";
import type { Locale } from "@/lib/locales";

type Props = {
  locale: Locale;
  request: BloodBankContent["request"];
};

export function RequestLane({ locale, request }: Props) {
  const t = useTranslations("bloodBank");
  return (
    <section
      id="request"
      className="bg-[color:var(--color-paper-2)] py-12 md:py-20 scroll-mt-[88px]"
      aria-labelledby="bb-request-heading"
    >
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)]">
        <Mono>{t("sectionRequest")}</Mono>
        <h2
          id="bb-request-heading"
          className="display-md mt-3 max-w-[24ch] text-[color:var(--color-deep)]"
        >
          {t("policyHeading")}
        </h2>
        <p className="lede mt-4 max-w-[60ch] text-[color:var(--color-ink)]">
          {request.replacementPolicy[locale]}
        </p>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h3 className="display-xs">{t("whatToBringHeading")}</h3>
            <ul className="mt-4 space-y-2">
              {request.whatToBring.map((b) => (
                <li
                  key={b.id}
                  className="flex items-start gap-2 text-[15px] text-[color:var(--color-ink)]"
                >
                  <CheckIcon size={16} aria-hidden="true" />
                  {b.item[locale]}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="display-xs">{t("hoursHeading")}</h3>
            <p className="mt-4 text-[15px] text-[color:var(--color-ink)]">
              {request.hours[locale]}
            </p>
            <Button
              variant="primary"
              size="lg"
              href={`tel:${request.phone}`}
              className="mt-5"
            >
              {t("ctaCallRequest")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

---

### Task 18: `FAQ` client island

**Files:**
- Create: `components/blood-bank/FAQ.tsx`

References: AC-4 (keyboard expand), state-inventory Surface 2 `success`/`edge:keyboard`/`edge:reduced-motion`/`empty` (renders null).

- [ ] **Step 1: Write the component**

```tsx
// components/blood-bank/FAQ.tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import type { BloodBankContent } from "@/content/types";
import type { Locale } from "@/lib/locales";

type Props = {
  locale: Locale;
  items: BloodBankContent["faq"];
};

export function FAQ({ locale, items }: Props) {
  const t = useTranslations("bloodBank");
  const [openId, setOpenId] = useState<string | null>(null);

  if (items.length === 0) return null;

  return (
    <section
      className="bg-white py-12 md:py-20"
      aria-labelledby="bb-faq-heading"
    >
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)]">
        <h2
          id="bb-faq-heading"
          className="display-md max-w-[24ch] text-[color:var(--color-deep)]"
        >
          {t("sectionFaq")}
        </h2>
        <ul className="mt-8 divide-y divide-[color:var(--color-line-soft)] border-y border-[color:var(--color-line-soft)]">
          {items.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `bb-faq-panel-${item.id}`;
            const buttonId = `bb-faq-button-${item.id}`;
            return (
              <li key={item.id}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-start text-[16px] font-medium text-[color:var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary)]"
                  >
                    <span>{item.q[locale]}</span>
                    <span aria-hidden="true" className={cn("transition-transform motion-reduce:transition-none", isOpen ? "rotate-45" : "rotate-0")}>
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="pb-5 pe-8 text-[15px] text-[color:var(--color-ink-soft)]"
                >
                  {item.a[locale]}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm typecheck
```

---

### Task 19: `BloodBankContact` (RSC)

**Files:**
- Create: `components/blood-bank/BloodBankContact.tsx`

References: state-inventory Surface 1 `success`.

- [ ] **Step 1**

```tsx
// components/blood-bank/BloodBankContact.tsx
import { useTranslations } from "next-intl";
import { Mono } from "@/components/ui/Mono";
import { Button } from "@/components/ui/Button";
import type { BloodBankContent } from "@/content/types";
import type { Locale } from "@/lib/locales";

type Props = {
  locale: Locale;
  contact: BloodBankContent["contact"];
};

export function BloodBankContact({ locale, contact }: Props) {
  const t = useTranslations("bloodBank");
  return (
    <section
      className="bg-white py-12 md:py-20"
      aria-labelledby="bb-contact-heading"
    >
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)]">
        <h2
          id="bb-contact-heading"
          className="display-md max-w-[24ch] text-[color:var(--color-deep)]"
        >
          {t("sectionContact")}
        </h2>
        <div className="mt-6 grid gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <Mono>{t("hoursHeading")}</Mono>
            <p className="mt-2 text-[15px] text-[color:var(--color-ink)]">
              {contact.inHospitalLocation[locale]}
            </p>
            <p className="mt-1 text-[14px] text-[color:var(--color-ink-soft)]">
              {contact.addressLine[locale]}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="lg" href={`tel:${contact.phone}`}>
              {t("ctaCallDonor")}
            </Button>
            {contact.email ? (
              <Button variant="secondary" size="lg" href={`mailto:${contact.email}`}>
                {contact.email}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Typecheck and commit Phase 4**

```bash
pnpm typecheck
git add components/blood-bank
git commit -m "feat(blood-bank): add hero, accred, services, lanes, FAQ, contact components"
```

---

## Phase 5 — Page composition

### Task 20: Add JSON-LD helper for blood-bank service

**Files:**
- Modify: `lib/structured-data.ts`

References: SEO constraint (MedicalService).

- [ ] **Step 1: Append a new helper at the bottom of the file**

```ts
// MedicalBusiness representation of the on-site blood bank.
export function bloodBankServiceLD(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${SITE_URL}/${locale}/blood-bank#service`,
    name: locale === "hi" ? "रक्त बैंक" : "Blood Bank",
    parentOrganization: { "@id": `${SITE_URL}/${locale}/#hospital` },
    medicalSpecialty: "Hematologic",
    availableService: [
      "Whole blood collection",
      "Packed red cell preparation",
      "Fresh frozen plasma",
      "Platelet concentrate",
      "Cross-match and screening",
      "Component separation",
    ],
    accreditation: ["NABH", "NABL", "ISO 15189"],
    url: `${SITE_URL}/${locale}/blood-bank`,
  } as const;
}
```

- [ ] **Step 2: Typecheck and commit**

```bash
pnpm typecheck
git add lib/structured-data.ts
git commit -m "feat(seo): add bloodBankServiceLD JSON-LD helper"
```

---

### Task 21: Build `/[locale]/blood-bank/page.tsx`

**Files:**
- Create: `app/[locale]/blood-bank/page.tsx`

References: AC-1, AC-2, AC-3, AC-4, AC-9 (single h1, h2 per section), AC-10 (placeholder caption); state-inventory Surface 1 `success`/`loading`.

JSON-LD pattern: this project renders `<Script type="application/ld+json">` with a stringified JSON child (see `app/[locale]/departments/[slug]/page.tsx`). Do NOT use `dangerouslySetInnerHTML` — CLAUDE.md forbids it and the existing pattern is safer.

- [ ] **Step 1: Write the page**

```tsx
// app/[locale]/blood-bank/page.tsx
import type { Metadata } from "next";
import Script from "next/script";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/locales";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { BloodBankHero } from "@/components/blood-bank/BloodBankHero";
import { AccreditationStrip } from "@/components/blood-bank/AccreditationStrip";
import { ServicesGrid } from "@/components/blood-bank/ServicesGrid";
import { DonateLane } from "@/components/blood-bank/DonateLane";
import { RequestLane } from "@/components/blood-bank/RequestLane";
import { FAQ } from "@/components/blood-bank/FAQ";
import { BloodBankContact } from "@/components/blood-bank/BloodBankContact";
import { bloodBank } from "@/content/blood-bank";
import { bloodBankServiceLD } from "@/lib/structured-data";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "bloodBank" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/blood-bank`,
      languages: {
        en: "/en/blood-bank",
        hi: "/hi/blood-bank",
        "x-default": "/en/blood-bank",
      },
    },
  };
}

export default async function BloodBankPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);

  return (
    <>
      <Script
        id="ld-blood-bank"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(bloodBankServiceLD(typedLocale))}
      </Script>
      <SiteHeader locale={typedLocale} />
      <main>
        <BloodBankHero locale={typedLocale} hero={bloodBank.hero} />
        <AccreditationStrip accreditations={bloodBank.accreditations} />
        <ServicesGrid locale={typedLocale} services={bloodBank.services} />
        <DonateLane locale={typedLocale} donate={bloodBank.donate} />
        <RequestLane locale={typedLocale} request={bloodBank.request} />
        <FAQ locale={typedLocale} items={bloodBank.faq} />
        <BloodBankContact locale={typedLocale} contact={bloodBank.contact} />
      </main>
      <SiteFooter />
      <StickyCtaBar locale={typedLocale} />
    </>
  );
}
```

Heading order: `BloodBankHero` emits the only `<h1>`. Each section component emits a single `<h2>`. The FAQ uses `<h3>` inside `<h2 id="bb-faq-heading">`. No level is skipped.

- [ ] **Step 2: Run dev and visit `/en/blood-bank` and `/hi/blood-bank`**

```bash
pnpm dev
```

Open both URLs in the browser. Verify the seven sections render.

- [ ] **Step 3: Build to confirm zero hydration warnings and successful compilation**

```bash
pnpm build
```

Expected: build succeeds, no hydration warnings.

- [ ] **Step 4: Commit**

```bash
git add app/[locale]/blood-bank/page.tsx
git commit -m "feat(blood-bank): scaffold rich /blood-bank page in both locales"
```

---

## Phase 6 — Department stub + cross-links + sitemap

### Task 22: Render `richPageHref` CTA in `DepartmentTemplate`

**Files:**
- Modify: `components/department/DepartmentTemplate.tsx`

References: AC-6.

- [ ] **Step 1: Read the file fully** (`Read` tool, no line limit).

- [ ] **Step 2: Just below the existing hero "See all consultants" link, add a conditional CTA**

Inside the JSX, after the existing `<Link href={`/${locale}/find-a-doctor?spec=${department.slug}`} ...>` block, add:

```tsx
{department.richPageHref ? (
  <Link
    href={department.richPageHref.replace(/^\/(?:en|hi)\//, `/${locale}/`)}
    className="meta inline-flex items-center gap-2 text-[14px] underline-offset-4 hover:underline"
  >
    {tBb("departmentStubCta")} →
  </Link>
) : null}
```

Top of file, ensure `useTranslations` is imported and a `tBb = useTranslations("bloodBank")` constant is added next to the existing hooks. Re-using a feature-specific namespace inside a generic template is acceptable here because the only consumer of `richPageHref` in v1 is the blood bank stub; if a second department later uses it, generalize the key into `nav.richPageStubCta` at that point.

- [ ] **Step 3: Verify by visiting `/en/departments/blood-bank` and `/hi/departments/blood-bank`**

Both should render the stub template with one extra link "Visit our Blood Bank →" / "हमारा रक्त बैंक देखें →" pointing to the locale-correct rich page.

- [ ] **Step 4: Commit**

```bash
git add components/department/DepartmentTemplate.tsx
git commit -m "feat(department): surface richPageHref CTA in stub template"
```

---

### Task 23: Add "Blood Bank" to `SiteHeader` nav and `SiteFooter`

**Files:**
- Modify: `components/layout/SiteHeader.tsx`
- Modify: `components/layout/SiteFooter.tsx`
- Modify: every caller of `<SiteFooter />` (if footer signature changes)

References: AC-5, state-inventory Surface 4 `success`.

- [ ] **Step 1: SiteHeader**

In the `navLinks` array (around line 22), insert a new entry between Departments and Visit:

```ts
{ href: `/${locale}/find-a-doctor`, label: tNav("findDoctor") },
{ href: `/${locale}/departments`, label: tNav("departments") },
{ href: `/${locale}/blood-bank`, label: tNav("bloodBank") },
{ href: `/${locale}/visit`, label: tNav("visit") },
{ href: `/${locale}/about`, label: tNav("about") },
{ href: `/${locale}/news`, label: tNav("news") },
```

- [ ] **Step 2: SiteFooter**

`SiteFooter` currently has no `locale` prop. Add one and pass it from every caller.

1. Update the signature:

```tsx
import type { Locale } from "@/lib/locales";

export function SiteFooter({ locale }: { locale: Locale }) {
```

2. After the accreditations row (before the existing copyright/credits row), add:

```tsx
<div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[12px]">
  <a
    href={`/${locale}/blood-bank`}
    className="underline-offset-4 hover:underline"
  >
    {tFooter("bloodBankLink")}
  </a>
</div>
```

3. Find every caller and pass `locale`:

```bash
grep -rn "<SiteFooter" app components | grep -v ".test."
```

For each match, ensure the call is `<SiteFooter locale={locale} />` (locale is already in scope on every page that uses it). Update accordingly.

- [ ] **Step 3: Verify nav** — visit `/en/`; "Blood Bank" appears in primary nav. Switch to `/hi/`; it reads "रक्त बैंक" and links to `/hi/blood-bank`.

- [ ] **Step 4: Commit**

```bash
git add components/layout/SiteHeader.tsx components/layout/SiteFooter.tsx app components
git commit -m "feat(layout): add Blood Bank entry to header nav and footer"
```

---

### Task 24: Add `/blood-bank` to sitemap

**Files:**
- Modify: `app/sitemap.ts`

References: SEO constraint.

- [ ] **Step 1**

In the `STATIC_PATHS` array, add `"/blood-bank"`:

```ts
const STATIC_PATHS = [
  "",
  "/find-a-doctor",
  "/departments",
  "/book",
  "/visit",
  "/about",
  "/news",
  "/locations",
  "/careers",
  "/giving",
  "/lab-reports",
  "/pay-bill",
  "/annual-report",
  "/blood-bank",
];
```

- [ ] **Step 2: Smoke-test the route**

```bash
pnpm build
```

Then `pnpm start` and `curl http://localhost:3000/sitemap.xml | grep blood-bank` — should show two entries (one per locale alternate).

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat(seo): include /blood-bank in sitemap with hreflang alternates"
```

---

### Task 25: Update PRODUCT.md IA note (one line)

**Files:**
- Modify: `PRODUCT.md`

References: project constraint.

- [ ] **Step 1**

In §5 "Information architecture", inside the routing block, add a single new line for `/blood-bank` between `/locations` and `/careers`:

```
/locations                         Hapur main, Annexe, Cancer wing
/blood-bank                        Public donor + family arranging-blood lanes (NABH/NABL on-site)
/careers                           Stub for v1
```

- [ ] **Step 2: Commit**

```bash
git add PRODUCT.md
git commit -m "docs(product): note /blood-bank top-level route in IA"
```

---

## Phase 7 — Tests (e2e + a11y)

### Task 26: e2e suite — AC-1 through AC-7

**Files:**
- Create: `tests/e2e/blood-bank.spec.ts`

- [ ] **Step 1: Write the spec**

```ts
// tests/e2e/blood-bank.spec.ts
import { test, expect } from "@playwright/test";
import { bloodBank } from "@/content/blood-bank";

test.describe("/[locale]/blood-bank", () => {
  test("AC-1: hero CTA scrolls to #request lane (en)", async ({ page }) => {
    await page.goto("/en/blood-bank");
    const cta = page.getByRole("link", { name: /need blood for a patient/i }).first();
    await cta.click();
    await expect(page).toHaveURL(/#request$/);
    await expect(page.locator("#request")).toBeInViewport();
  });

  test("AC-2: donor lane tap-to-call uses tel: with donate.phone (hi)", async ({ page }) => {
    await page.goto("/hi/blood-bank");
    const callDonor = page.locator("#donate").getByRole("link", { name: /रक्त बैंक/ }).first();
    const href = await callDonor.getAttribute("href");
    expect(href).toBe(`tel:${bloodBank.donate.phone}`);
  });

  test("AC-3: request lane tap-to-call uses tel: with request.phone (en)", async ({ page }) => {
    await page.goto("/en/blood-bank");
    const callReq = page.locator("#request").getByRole("link", { name: /call the blood bank/i }).first();
    const href = await callReq.getAttribute("href");
    expect(href).toBe(`tel:${bloodBank.request.phone}`);
  });

  test("AC-4: FAQ expands by keyboard (en)", async ({ page }) => {
    await page.goto("/en/blood-bank");
    const firstQ = page.getByRole("button", { name: /who can donate/i });
    await firstQ.focus();
    await page.keyboard.press("Enter");
    await expect(firstQ).toHaveAttribute("aria-expanded", "true");
  });

  test("AC-5: header nav 'Blood Bank' / 'रक्त बैंक' both locales", async ({ page }) => {
    await page.goto("/en");
    const enLink = page.getByRole("link", { name: "Blood Bank" }).first();
    await expect(enLink).toHaveAttribute("href", "/en/blood-bank");

    await page.goto("/hi");
    const hiLink = page.getByRole("link", { name: "रक्त बैंक" }).first();
    await expect(hiLink).toHaveAttribute("href", "/hi/blood-bank");
  });

  test("AC-6: /departments/blood-bank stub renders with single rich-page CTA", async ({ page }) => {
    await page.goto("/en/departments/blood-bank");
    const cta = page.getByRole("link", { name: /visit our blood bank/i });
    await expect(cta).toHaveAttribute("href", "/en/blood-bank");
    await expect(cta).toHaveCount(1);
  });

  test("AC-7: prefers-reduced-motion → instant scroll lands target in viewport", async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto("/en/blood-bank");
    const target = page.locator("#request");
    await expect(target).not.toBeInViewport();
    await page
      .getByRole("link", { name: /need blood for a patient/i })
      .first()
      .click();
    // Reduced-motion instant scroll: target reaches viewport with no transition.
    await expect(target).toBeInViewport({ timeout: 100 });
    await ctx.close();
  });
});
```

- [ ] **Step 2: Run**

```bash
pnpm e2e -g blood-bank
```

Expected: 7 passed.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/blood-bank.spec.ts
git commit -m "test(e2e): cover blood-bank ACs 1-7 (lanes, tel, FAQ kbd, nav, stub, motion)"
```

---

### Task 27: Accessibility suite — AC-8, AC-9

**Files:**
- Create: `tests/e2e/blood-bank.a11y.spec.ts`

- [ ] **Step 1: Write the spec**

```ts
// tests/e2e/blood-bank.a11y.spec.ts
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = ["/en/blood-bank", "/hi/blood-bank"] as const;

test.describe("/[locale]/blood-bank a11y", () => {
  for (const route of ROUTES) {
    test(`AC-8: zero axe violations at ${route}`, async ({ page }) => {
      await page.goto(route);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
        .analyze();
      expect(result.violations, JSON.stringify(result.violations, null, 2)).toEqual([]);
    });

    test(`AC-9: heading order is strict at ${route}`, async ({ page }) => {
      await page.goto(route);
      const headings = page.locator("h1, h2, h3, h4, h5, h6");
      const count = await headings.count();
      const levels: number[] = [];
      for (let i = 0; i < count; i += 1) {
        const tag = await headings.nth(i).evaluate((el: Element) => el.tagName);
        levels.push(Number(tag.substring(1)));
      }
      expect(levels.filter((n) => n === 1).length).toBe(1);
      for (let i = 1; i < levels.length; i += 1) {
        const maxSoFar = Math.max(...levels.slice(0, i));
        expect(levels[i]).toBeLessThanOrEqual(maxSoFar + 1);
      }
    });
  }
});
```

Note: `headings.nth(i).evaluate(...)` is `Locator.evaluate` — Playwright's documented API for reading element properties in the page context. It is not arbitrary-string evaluation; the function is bundled at build time.

- [ ] **Step 2: Run**

```bash
pnpm e2e -g a11y
```

Expected: 4 passed (2 routes × 2 tests).

- [ ] **Step 3: If violations exist** — fix them in the offending component (do NOT silence in this file). Common offenders: contrast on `--color-paper-2`, missing `aria-label` on the LangToggle when it shows only an icon, or the FAQ chevron lacking `aria-hidden`. Re-run.

- [ ] **Step 4: Commit**

```bash
git add tests/e2e/blood-bank.a11y.spec.ts
git commit -m "test(a11y): zero-violations + heading-order on blood-bank in both locales"
```

---

## Phase 8 — Verification & PR

### Task 28: Run the full verification suite

References: completion criteria.

- [ ] **Step 1: Sequential gates**

```bash
pnpm typecheck && pnpm lint && pnpm test && pnpm build && pnpm e2e
```

Expected: every gate green.

- [ ] **Step 2: Capture manual evidence for AC-10**

Open a fresh dev server, take screenshots of:
- `/en/blood-bank` hero (visible PhotoPlaceholder caption "BLOOD BANK · GROUND FLOOR")
- `/hi/blood-bank` hero (caption "रक्त बैंक · भूतल")
- `/en/blood-bank#donate` (donor lane with eligibility, process, hours, call CTA)
- `/en/blood-bank#request` (request lane with policy, what-to-bring, hours, call CTA)
- FAQ open state on first item
- `/en/departments/blood-bank` stub showing the "Visit our Blood Bank →" CTA

Save these to attach to the PR.

---

### Task 29: Open the PR

References: global rule — no attribution trailers.

- [ ] **Step 1: Branch + push**

```bash
git checkout -b feat/blood-bank-page
git push -u origin feat/blood-bank-page
```

- [ ] **Step 2: Open PR with body (no AI attribution)**

```bash
gh pr create --title "feat: blood bank page (donor + family lanes)" --body "$(cat <<'EOF'
## Summary

- New top-level route `/[locale]/blood-bank` (rich, two-lane).
- New department stub via `/departments/blood-bank` (reuses existing template via a new `richPageHref` field).
- Bilingual EN/HI with parity-locked messages.
- Walk-in + tap-to-call only — no online scheduling, no drives calendar, no homepage section.
- Adds Playwright + axe-playwright as new dev dependencies (we previously had no e2e runner).

## Verification contract (per spec)

Spec: `docs/superpowers/specs/2026-05-09-blood-bank-page-uxdd.md`.

| AC | Tag | Test |
|---|---|---|
| AC-1 hero scrolls to #request | [v:e2e] | tests/e2e/blood-bank.spec.ts |
| AC-2 donor `tel:` href | [v:e2e] | tests/e2e/blood-bank.spec.ts |
| AC-3 request `tel:` href | [v:e2e] | tests/e2e/blood-bank.spec.ts |
| AC-4 FAQ keyboard expand | [v:e2e] | tests/e2e/blood-bank.spec.ts |
| AC-5 header nav both locales | [v:e2e] | tests/e2e/blood-bank.spec.ts |
| AC-6 dept stub single CTA | [v:e2e] | tests/e2e/blood-bank.spec.ts |
| AC-7 reduced-motion instant scroll | [v:e2e] | tests/e2e/blood-bank.spec.ts |
| AC-8 zero axe violations | [v:axe] | tests/e2e/blood-bank.a11y.spec.ts |
| AC-9 heading order | [v:axe] | tests/e2e/blood-bank.a11y.spec.ts |
| AC-10 hero placeholder caption | [v:manual] | screenshots below |

## State-inventory coverage

- error:content-parse → tests/unit/blood-bank.test.ts
- error:phone-malformed → tests/unit/blood-bank.test.ts
- error:i18n-key-missing → tests/unit/i18n-parity.test.ts (existing harness)

## Dependency note

Added `@playwright/test` and `@axe-core/playwright`. CLAUDE.md asks for justification: there was no e2e runner in the repo, and the verification contract requires Playwright behaviors (scroll, viewport, reduced-motion) that vitest cannot exercise.

## Test plan

- [ ] `pnpm typecheck`
- [ ] `pnpm lint`
- [ ] `pnpm test`
- [ ] `pnpm build`
- [ ] `pnpm e2e`
- [ ] Manual: open both locales, verify the seven sections render, both lane CTAs scroll, both `tel:` CTAs open the dialer on a real phone, FAQ keyboard navigation, header nav present in both locales.
EOF
)"
```

The PR body intentionally ends at the test plan — **no Claude/Anthropic attribution trailer** per `~/.claude/CLAUDE.md`.

---

## Completion criteria

The plan is complete when ALL of the following are true:

**Spec verification contract — must pass on CI:**

- [ ] AC-1 through AC-7 — `pnpm e2e -g blood-bank` shows 7 passed
- [ ] AC-8, AC-9 — `pnpm e2e -g a11y` shows 4 passed (2 routes × 2 tests), zero axe violations
- [ ] AC-10 — PR description has six labeled screenshots (hero EN, hero HI, donor lane, request lane, FAQ open, dept stub)

**State-inventory coverage:**

- [ ] error:content-parse, error:phone-malformed — `pnpm test tests/unit/blood-bank.test.ts` green
- [ ] error:i18n-key-missing — `pnpm test tests/unit/i18n-parity.test.ts` green
- [ ] error:slug-missing (Surface 5) — `dev` route `/en/departments/nonexistent-slug` returns 404 (already covered by existing dynamic route)
- [ ] edge:no-js (Surface 1) — manually disable JS in DevTools, confirm seven sections still render and lane anchors still jump
- [ ] edge:reduced-motion — covered by AC-7 e2e
- [ ] edge:keyboard — covered by AC-4 e2e
- [ ] edge:active (Surface 4) — visiting `/en/blood-bank` shows nav item with current-page styling (manual screenshot if styling exists; if header doesn't currently differentiate, file a follow-up; not blocking this PR)

**Project gates:**

- [ ] `pnpm typecheck` — zero errors
- [ ] `pnpm lint` — zero errors
- [ ] `pnpm test` — all unit suites green
- [ ] `pnpm build` — clean build, zero hydration warnings
- [ ] `pnpm e2e` — all Playwright + axe tests green

**Performance budget (CLAUDE.md §"Performance budget"):**

- [ ] First-load JS for `/blood-bank` ≤ 90 KB gzipped (target; FAQ is the only client island, expected ~1–2 KB)
- [ ] Lighthouse desktop run on `/en/blood-bank` and `/hi/blood-bank`: Performance ≥ 95, A11y ≥ 95, Best-practices ≥ 95, SEO ≥ 95 — attach the four scores to the PR

**Hygiene:**

- [ ] No raw Tailwind colors in any new component file — `grep -rE "(slate|zinc|gray|neutral|stone)-[0-9]" components/blood-bank` returns nothing
- [ ] No inline hex/rgb/px font-size values in the seven new components
- [ ] No commit or PR body authored by this plan contains author/co-author/AI attribution trailers
- [ ] `prototype/` is unchanged
