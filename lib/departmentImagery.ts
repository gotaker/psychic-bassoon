// Maps a department slug to a hero image.
// Source files live in public/images/hospital/ — photographed at Dev Nandini
// Hospital, Hapur (DNH-owned, sourced from dnhhapur.com). See
// public/images/hospital/ATTRIBUTIONS.md.
// Most specialties share a pool image keyed by procedural family; specialties
// with bespoke imagery override.

export type DeptImage = { src: string; alt: string };

const POOL = {
  cardiology: {
    src: "/images/hospital/laparoscopy.jpg",
    alt: "Interventional procedure in the operating theatre",
  },
  surgery: {
    src: "/images/hospital/surgery-team.jpg",
    alt: "Surgical team in the operating theatre",
  },
  pediatrics: {
    src: "/images/hospital/nicu-warmers.jpg",
    alt: "Neonatal intensive care unit baby warmers",
  },
  women: {
    src: "/images/hospital/nicu-team.jpg",
    alt: "Neonatal nursing team in the NICU",
  },
  imaging: {
    src: "/images/hospital/ct-scanner.jpg",
    alt: "CT scanner in the radiology department",
  },
  eye: {
    src: "/images/hospital/eye-exam.jpg",
    alt: "Slit-lamp eye examination by an ophthalmologist",
  },
  clinical: {
    src: "/images/hospital/pathology-lab.jpg",
    alt: "Pathology laboratory bench",
  },
} as const satisfies Record<string, DeptImage>;

const overrides: Record<string, DeptImage> = {
  cardiology: POOL.cardiology,

  // Surgical / procedural specialties
  "general-surgery": POOL.surgery,
  "cardiac-surgery": POOL.surgery,
  neurology: POOL.surgery,
  neurosurgery: POOL.surgery,
  orthopedics: POOL.surgery,
  "plastic-surgery": POOL.surgery,
  urology: POOL.surgery,
  anesthesiology: POOL.surgery,
  ent: POOL.surgery,
  otolaryngology: POOL.surgery,
  gastroenterology: POOL.surgery,
  "thoracic-surgery": POOL.surgery,

  // Pediatrics
  pediatrics: POOL.pediatrics,
  neonatology: POOL.pediatrics,

  // Women's health
  "obstetrics-gynecology": POOL.women,
  gynecology: POOL.women,
  obstetrics: POOL.women,

  // Imaging / diagnostic
  radiology: POOL.imaging,
  "nuclear-medicine": POOL.imaging,
  pathology: POOL.imaging,
  laboratory: POOL.imaging,

  // Eye
  ophthalmology: POOL.eye,
};

const DEFAULT: DeptImage = POOL.clinical;

export function getDepartmentImage(slug: string): DeptImage {
  return overrides[slug] ?? DEFAULT;
}
