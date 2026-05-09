import { Stat } from "./types";

// Stats for the home stats band. Anchored to PRODUCT.md §9 (founding 1958,
// 540 beds, 28 specialties, 184 consultants) plus 2 derived facts called out
// in the brief. All numerals format at render via lib/formatters.ts (L7b).

export const stats = [
  {
    id: "founded",
    value: 1958,
    label: { en: "Founded", hi: "स्थापित" },
  },
  {
    id: "beds",
    value: 540,
    label: { en: "Beds", hi: "बिस्तर" },
  },
  {
    id: "specialties",
    value: 28,
    label: { en: "Specialties", hi: "विशेषज्ञताएँ" },
  },
  {
    id: "consultants",
    value: 184,
    label: { en: "Consultants on staff", hi: "परामर्शदाता" },
  },
  {
    id: "angioplasties",
    value: 1800,
    unit: { en: "/ year", hi: "/ वर्ष" },
    label: { en: "Angioplasties", hi: "एंजियोप्लास्टी" },
  },
  {
    id: "door-to-balloon",
    value: "38 min",
    label: { en: "Avg. door-to-balloon", hi: "औसत डोर-टू-बलून" },
  },
] as const satisfies readonly Stat[];
