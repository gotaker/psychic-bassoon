// Maps a department slug to a contextual hero image.
// Source files live in public/images/contextual/ — see ATTRIBUTIONS.md for
// licensing (all CC0 / CC-BY / CC-BY-SA / Public Domain Wikimedia Commons).
// Most specialties share a pool image keyed by procedural family; specialties
// with bespoke imagery override.

export type DeptImage = { src: string; alt: string };

const POOL = {
  cardiology: {
    src: "/images/contextual/dept-cardiology.jpg",
    alt: "Echocardiography ultrasound of the heart",
  },
  surgery: {
    src: "/images/contextual/pool-surgery.jpg",
    alt: "Surgical team in an operating theatre",
  },
  pediatrics: {
    src: "/images/contextual/pool-pediatrics.jpg",
    alt: "Clinician with a young pediatric patient",
  },
  women: { src: "/images/contextual/pool-women.jpg", alt: "Hospital maternity ward" },
  imaging: {
    src: "/images/contextual/pool-imaging.jpg",
    alt: "MRI scanner in a hospital radiology department",
  },
  eye: {
    src: "/images/contextual/pool-eye.jpg",
    alt: "Slit-lamp eye examination by an ophthalmologist",
  },
  corridor: { src: "/images/contextual/pool-corridor.jpg", alt: "Hospital corridor interior" },
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

const DEFAULT: DeptImage = POOL.corridor;

export function getDepartmentImage(slug: string): DeptImage {
  return overrides[slug] ?? DEFAULT;
}
