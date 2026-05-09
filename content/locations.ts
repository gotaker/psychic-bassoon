import { Location } from "./types";

// Three locations per PRODUCT.md §6 visit panel + §10 ops constraints.

export const locations = [
  {
    id: "main",
    name: { en: "Hapur main campus", hi: "हापुड़ मुख्य परिसर" },
    address: {
      en: "NH-9 Hapur Bypass, Hapur, Uttar Pradesh 245101",
      hi: "एनएच-९ हापुड़ बाईपास, हापुड़, उत्तर प्रदेश २४५१०१",
    },
    phone: "+91 80 4422 0099",
    hours: { en: "OPD · Mon–Sat 08:00–20:00", hi: "ओपीडी · सोम–शनि ०८:००–२०:००" },
  },
  {
    id: "annexe",
    name: { en: "Annexe — Garh Road", hi: "अनुलग्नक — गढ़ रोड" },
    address: {
      en: "Sector 6, Garh Road, Hapur, Uttar Pradesh 245101",
      hi: "सेक्टर ६, गढ़ रोड, हापुड़, उत्तर प्रदेश २४५१०१",
    },
    phone: "+91 80 4422 0150",
    hours: { en: "OPD · Mon–Sat 08:00–18:00", hi: "ओपीडी · सोम–शनि ०८:००–१८:००" },
  },
  {
    id: "cancer-wing",
    name: { en: "Cancer Wing", hi: "कैंसर विंग" },
    address: {
      en: "Block C, Hapur Main Campus, Hapur, Uttar Pradesh 245101",
      hi: "ब्लॉक सी, हापुड़ मुख्य परिसर, हापुड़, उत्तर प्रदेश २४५१०१",
    },
    phone: "+91 80 4422 0210",
    hours: { en: "OPD · Mon–Fri 09:00–17:00", hi: "ओपीडी · सोम–शुक्र ०९:००–१७:००" },
  },
] as const satisfies readonly Location[];
