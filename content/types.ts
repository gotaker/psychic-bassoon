import { z } from "zod";

// Bilingual strings — every user-visible content field uses this shape.
export const LocalisedString = z.object({
  en: z.string().min(1),
  hi: z.string().min(1),
});
export type LocalisedString = z.infer<typeof LocalisedString>;

// ----- Doctor -----
// Schema mirrors the DNH-hapur institutional roster (real consultants).
// `photo` is optional — when present, DoctorAvatar renders <Image>; when
// absent, falls back to the gradient + initials pattern.
export const Doctor = z.object({
  id: z.string().regex(/^[a-z][a-z0-9-]*$/),
  name: LocalisedString,
  qualifications: z.string().min(1),
  specialty: LocalisedString,
  bio: LocalisedString,
  languages: LocalisedString,
  location: LocalisedString,
  nextSlot: LocalisedString,
  avatarTone: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  photo: z.string().regex(/^\/images\/doctors\/[a-z0-9-]+\.(jpg|jpeg|png|webp)$/).optional(),
  departmentSlugs: z.array(z.string()).min(1),
});
export type Doctor = z.infer<typeof Doctor>;

// ----- Leadership -----
export const LeadershipMember = z.object({
  id: z.string().regex(/^[a-z][a-z0-9-]*$/),
  name: LocalisedString,
  role: LocalisedString.optional(),
  photo: z.string().regex(/^\/images\/leadership\/[a-z0-9-]+\.(jpg|jpeg|png|webp)$/),
});
export type LeadershipMember = z.infer<typeof LeadershipMember>;

// ----- Department -----
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
export type Department = z.infer<typeof Department>;

// ----- Cardiology (and any department with full detail) -----
export const Procedure = z.object({
  id: z.string(),
  title: LocalisedString,
  annualVolume: LocalisedString,
  description: LocalisedString,
});
export type Procedure = z.infer<typeof Procedure>;

export const Outcome = z.object({
  id: z.string(),
  kicker: LocalisedString,
  value: LocalisedString,
  description: LocalisedString,
  benchmark: LocalisedString,
});
export type Outcome = z.infer<typeof Outcome>;

export const DepartmentDetail = z.object({
  slug: z.string(),
  hero: z.object({
    headline: LocalisedString,
    lede: LocalisedString,
    photoCaption: LocalisedString,
    photoOverlay: LocalisedString,
    photoTone: z.enum(["mocha", "slate", "sand", "sage", "clay"]),
  }),
  procedures: z.array(Procedure).min(1),
  outcomes: z.array(Outcome).min(1),
  whenToCome: z.object({
    headline: LocalisedString,
    redFlags: z.array(LocalisedString).min(1),
  }),
});
export type DepartmentDetail = z.infer<typeof DepartmentDetail>;

// ----- News / Stats / Locations -----
export const NewsItem = z.object({
  id: z.string(),
  category: LocalisedString,
  headline: LocalisedString,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  readMin: z.number().int().min(1).max(60),
});
export type NewsItem = z.infer<typeof NewsItem>;

export const Stat = z.object({
  id: z.string(),
  value: z.union([z.number(), z.string()]),
  unit: LocalisedString.optional(),
  label: LocalisedString,
});
export type Stat = z.infer<typeof Stat>;

export const Location = z.object({
  id: z.string(),
  name: LocalisedString,
  address: LocalisedString,
  phone: z.string().regex(/^\+\d[\d\s-]+$/),
  hours: LocalisedString,
  // Optional explicit Google Maps query — falls back to address.en when absent.
  // Use this when the address alone resolves ambiguously on Google.
  mapsQuery: z.string().min(1).optional(),
});
export type Location = z.infer<typeof Location>;

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
