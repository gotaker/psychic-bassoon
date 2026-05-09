import { Department } from "./types";

// 28 specialties per PRODUCT.md §1. The first 16 are ported from prototype/i18n.js.
// The remaining 12 fill out the full bench (anesthesiology, urology, etc.) for v1.
// Cardiology has full detail (content/departments/cardiology.ts);
// the other 27 render the same template structure with consultants only.

export const departments = [
  // Ported from prototype/i18n.js
  {
    slug: "cardiology",
    name: { en: "Cardiology", hi: "हृदय रोग" },
    tagline: { en: "Heart, vessels, rhythm", hi: "हृदय, रक्त नलिकाएँ, ताल" },
    hasFullDetail: true,
  },
  {
    slug: "neurology",
    name: { en: "Neurology & Neurosurgery", hi: "न्यूरोलॉजी एवं न्यूरोसर्जरी" },
    tagline: { en: "Brain, spine, stroke", hi: "मस्तिष्क, रीढ़, पक्षाघात" },
    hasFullDetail: false,
  },
  {
    slug: "oncology",
    name: { en: "Oncology", hi: "कैंसर रोग" },
    tagline: {
      en: "Medical · Surgical · Radiation",
      hi: "चिकित्सकीय · शल्य · विकिरण",
    },
    hasFullDetail: false,
  },
  {
    slug: "orthopedics",
    name: { en: "Orthopedics", hi: "हड्डी रोग" },
    tagline: {
      en: "Joint replacement, sports, trauma",
      hi: "जोड़ प्रत्यारोपण, खेल, ट्रॉमा",
    },
    hasFullDetail: false,
  },
  {
    slug: "obstetrics-gynecology",
    name: { en: "Obstetrics & Gynecology", hi: "स्त्री एवं प्रसूति रोग" },
    tagline: {
      en: "Pregnancy, fertility, women's health",
      hi: "गर्भावस्था, प्रजनन, महिला स्वास्थ्य",
    },
    hasFullDetail: false,
  },
  {
    slug: "pediatrics",
    name: {
      en: "Pediatrics & Neonatal ICU",
      hi: "बाल एवं नवजात गहन चिकित्सा",
    },
    tagline: {
      en: "Newborn to 18, Level III NICU",
      hi: "नवजात से १८, लेवल III एनआईसीयू",
    },
    hasFullDetail: false,
  },
  {
    slug: "internal-medicine",
    name: { en: "Internal Medicine", hi: "आंतरिक चिकित्सा" },
    tagline: {
      en: "Diabetes, hypertension, infections",
      hi: "मधुमेह, उच्च रक्तचाप, संक्रमण",
    },
    hasFullDetail: false,
  },
  {
    slug: "gastroenterology",
    name: {
      en: "Gastroenterology & Hepatology",
      hi: "पाचन एवं यकृत रोग",
    },
    tagline: { en: "Liver, gut, endoscopy", hi: "यकृत, आँत, एंडोस्कोपी" },
    hasFullDetail: false,
  },
  {
    slug: "nephrology",
    name: { en: "Nephrology & Dialysis", hi: "किडनी एवं डायलिसिस" },
    tagline: {
      en: "Kidney care, 24-station unit",
      hi: "गुर्दा देखभाल, २४-स्टेशन इकाई",
    },
    hasFullDetail: false,
  },
  {
    slug: "pulmonology",
    name: { en: "Pulmonology", hi: "श्वास रोग" },
    tagline: { en: "Lung, sleep, ventilation", hi: "फेफड़ा, नींद, वेंटिलेशन" },
    hasFullDetail: false,
  },
  {
    slug: "ophthalmology",
    name: { en: "Ophthalmology", hi: "नेत्र चिकित्सा" },
    tagline: {
      en: "Cataract, retina, refractive",
      hi: "मोतियाबिंद, रेटिना, लेज़र",
    },
    hasFullDetail: false,
  },
  {
    slug: "ent",
    name: { en: "ENT", hi: "नाक, कान, गला" },
    tagline: { en: "Ear, nose, throat, head & neck", hi: "ENT, सिर एवं गर्दन" },
    hasFullDetail: false,
  },
  {
    slug: "dermatology",
    name: { en: "Dermatology", hi: "त्वचा रोग" },
    tagline: { en: "Skin, hair, cosmetology", hi: "त्वचा, बाल, सौंदर्य" },
    hasFullDetail: false,
  },
  {
    slug: "psychiatry",
    name: { en: "Psychiatry", hi: "मनोरोग चिकित्सा" },
    tagline: {
      en: "Mood, anxiety, addiction, sleep",
      hi: "मनोदशा, चिंता, व्यसन, नींद",
    },
    hasFullDetail: false,
  },
  {
    slug: "radiology",
    name: { en: "Radiology & Imaging", hi: "रेडियोलॉजी एवं इमेजिंग" },
    tagline: {
      en: "MRI 3T · CT 128 · PET-CT",
      hi: "MRI 3T · CT 128 · PET-CT",
    },
    hasFullDetail: false,
  },
  {
    slug: "emergency-trauma",
    name: { en: "Emergency & Trauma", hi: "आपातकाल एवं ट्रॉमा" },
    tagline: { en: "Level II trauma centre", hi: "लेवल II ट्रॉमा केंद्र" },
    hasFullDetail: false,
  },
  // 12 added to reach 28 per PRODUCT.md §1
  {
    slug: "urology",
    name: { en: "Urology", hi: "मूत्र रोग" },
    tagline: {
      en: "Stones, prostate, robotic surgery",
      hi: "पथरी, प्रोस्टेट, रोबोटिक शल्य",
    },
    hasFullDetail: false,
  },
  {
    slug: "endocrinology",
    name: {
      en: "Endocrinology & Diabetes",
      hi: "अंतःस्रावी एवं मधुमेह",
    },
    tagline: { en: "Diabetes, thyroid, bone", hi: "मधुमेह, थायरॉइड, अस्थि" },
    hasFullDetail: false,
  },
  {
    slug: "rheumatology",
    name: { en: "Rheumatology", hi: "गठिया रोग" },
    tagline: {
      en: "Arthritis, lupus, autoimmune",
      hi: "गठिया, ल्यूपस, स्व-प्रतिरक्षी",
    },
    hasFullDetail: false,
  },
  {
    slug: "hematology",
    name: { en: "Hematology", hi: "रक्त रोग" },
    tagline: {
      en: "Blood disorders, bone-marrow transplant",
      hi: "रक्त विकार, अस्थि-मज्जा प्रत्यारोपण",
    },
    hasFullDetail: false,
  },
  {
    slug: "cardiothoracic-surgery",
    name: { en: "Cardiothoracic Surgery", hi: "हृदय-वक्षीय शल्य" },
    tagline: {
      en: "CABG, valve, hybrid OR",
      hi: "सीएबीजी, वाल्व, हाइब्रिड ओआर",
    },
    hasFullDetail: false,
  },
  {
    slug: "plastic-surgery",
    name: {
      en: "Plastic & Reconstructive Surgery",
      hi: "प्लास्टिक एवं पुनर्निर्माण शल्य",
    },
    tagline: {
      en: "Burns, microvascular, cosmetic",
      hi: "जलन, माइक्रोवैस्कुलर, सौंदर्य",
    },
    hasFullDetail: false,
  },
  {
    slug: "anesthesiology",
    name: { en: "Anesthesiology & Pain", hi: "बेहोशी एवं पीड़ा प्रबंधन" },
    tagline: {
      en: "Surgical, obstetric, chronic pain",
      hi: "शल्य, प्रसूति, दीर्घकालिक पीड़ा",
    },
    hasFullDetail: false,
  },
  {
    slug: "pathology",
    name: { en: "Pathology", hi: "विकृति विज्ञान" },
    tagline: {
      en: "Histopathology, cytology, immunohistochemistry",
      hi: "ऊतक, कोशिका, इम्यूनोहिस्टोकेमिस्ट्री",
    },
    hasFullDetail: false,
  },
  {
    slug: "microbiology",
    name: { en: "Microbiology", hi: "सूक्ष्म जीव विज्ञान" },
    tagline: {
      en: "Culture, antibiotic stewardship",
      hi: "संवर्धन, प्रतिजैविक प्रबंधन",
    },
    hasFullDetail: false,
  },
  {
    slug: "dental",
    name: { en: "Dental & Oral Surgery", hi: "दंत एवं मुख शल्य" },
    tagline: {
      en: "Endodontics, prosthodontics, OMFS",
      hi: "एंडोडॉन्टिक्स, प्रोस्थोडॉन्टिक्स",
    },
    hasFullDetail: false,
  },
  {
    slug: "physiotherapy",
    name: {
      en: "Physiotherapy & Rehabilitation",
      hi: "फिज़ियोथेरेपी एवं पुनर्वास",
    },
    tagline: {
      en: "Cardiac rehab, neuro, ortho",
      hi: "हृदय पुनर्वास, न्यूरो, अस्थि",
    },
    hasFullDetail: false,
  },
  {
    slug: "general-surgery",
    name: { en: "General & Laparoscopic Surgery", hi: "सामान्य एवं लेप्रोस्कोपिक शल्य" },
    tagline: {
      en: "Cholecystectomy, hernia, ICU, sepsis pathway",
      hi: "पित्ताशय, हर्निया, आईसीयू, सेप्सिस मार्ग",
    },
    hasFullDetail: false,
  },
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
] as const satisfies readonly Department[];

export const departmentsBySlug: Record<string, Department> = Object.fromEntries(
  departments.map((d) => [d.slug, d]),
);

export type DepartmentSlug = (typeof departments)[number]["slug"];
