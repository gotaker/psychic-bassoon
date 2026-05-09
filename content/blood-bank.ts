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
    {
      id: "fresh-frozen-plasma",
      label: { en: "Fresh frozen plasma", hi: "ताज़ा जमा हुआ प्लाज़्मा" },
    },
    { id: "platelets", label: { en: "Platelets", hi: "प्लेटलेट्स" } },
    { id: "cross-match", label: { en: "Cross-match & screening", hi: "क्रॉस-मैच एवं जाँच" } },
    { id: "component-separation", label: { en: "Component separation", hi: "घटक पृथक्करण" } },
  ],
  donate: {
    eligibility: [
      { id: "age", rule: { en: "Age 18 to 65", hi: "आयु १८ से ६५ वर्ष" } },
      { id: "weight", rule: { en: "Weight 50 kg or more", hi: "वजन ५० किग्रा या अधिक" } },
      {
        id: "hb",
        rule: { en: "Haemoglobin 12.5 g/dL or more", hi: "हीमोग्लोबिन १२.५ ग्रा/डेसी या अधिक" },
      },
      {
        id: "gap",
        rule: {
          en: "At least 90 days since your last donation",
          hi: "पिछले रक्तदान से कम से कम ९० दिन",
        },
      },
      {
        id: "wellness",
        rule: {
          en: "Feeling well today, no recent illness or infection",
          hi: "आज स्वस्थ महसूस कर रहे हों, हाल में कोई बीमारी या संक्रमण न हुआ हो",
        },
      },
    ],
    process: [
      {
        id: "register",
        step: { en: "Register", hi: "पंजीकरण" },
        detail: {
          en: "Bring a photo ID. Form takes about 5 minutes.",
          hi: "फोटो पहचान-पत्र साथ लाएँ। फॉर्म में लगभग ५ मिनट लगते हैं।",
        },
      },
      {
        id: "screen",
        step: { en: "Screen", hi: "जाँच" },
        detail: {
          en: "Quick haemoglobin and blood-pressure check.",
          hi: "हीमोग्लोबिन और रक्तचाप की त्वरित जाँच।",
        },
      },
      {
        id: "donate",
        step: { en: "Donate", hi: "रक्तदान" },
        detail: {
          en: "About 10 minutes. You'll be lying down in a clean, ventilated chair.",
          hi: "लगभग १० मिनट। आप एक साफ़, हवादार कुर्सी पर लेटे रहेंगे।",
        },
      },
      {
        id: "rest",
        step: { en: "Snack & rest", hi: "नाश्ता एवं विश्राम" },
        detail: {
          en: "Tea, biscuits, and 15 minutes of quiet before you leave.",
          hi: "जाने से पहले चाय, बिस्किट, और १५ मिनट का विश्राम।",
        },
      },
    ],
    walkInHours: {
      en: "Monday to Saturday, 9:00 AM – 5:00 PM",
      hi: "सोमवार से शनिवार, सुबह ९:०० – शाम ५:००",
    },
    phone: BLOOD_BANK_PHONE,
  },
  request: {
    replacementPolicy: {
      en: "Per state regulation, blood units are issued against an equal number of replacement donations from the patient's family or friends. We accept any blood group as a replacement — group matching happens at the bank, not at the donor.",
      hi: "राज्य के नियमानुसार, रक्त इकाइयाँ रोगी के परिवार या मित्रों से बराबर संख्या में प्रतिस्थापन-दान के बदले दी जाती हैं। हम प्रतिस्थापन के लिए किसी भी रक्त समूह को स्वीकार करते हैं — समूह मिलान बैंक में होता है, दाता पर नहीं।",
    },
    whatToBring: [
      {
        id: "admission-slip",
        item: {
          en: "Patient admission slip or OPD card",
          hi: "रोगी का भर्ती-पर्चा या ओपीडी कार्ड",
        },
      },
      {
        id: "donor-ids",
        item: {
          en: "Photo ID for every donor (Aadhaar, voter ID, etc.)",
          hi: "हर दाता का फोटो पहचान-पत्र (आधार, वोटर आईडी, आदि)",
        },
      },
      {
        id: "prescription",
        item: { en: "Doctor's blood-group requisition", hi: "चिकित्सक की रक्त-समूह माँग पर्ची" },
      },
    ],
    hours: {
      en: "24 hours a day, every day for urgent requirements",
      hi: "तत्काल आवश्यकताओं के लिए हर दिन, चौबीसों घंटे",
    },
    phone: BLOOD_BANK_PHONE,
  },
  faq: [
    {
      id: "who-can-donate",
      q: {
        en: "Who can donate blood at Dev Nandini Hospital?",
        hi: "देव नंदिनी अस्पताल में रक्तदान कौन कर सकता है?",
      },
      a: {
        en: "Anyone aged 18–65, weighing at least 50 kg, with haemoglobin of 12.5 g/dL or more, who is feeling well today and hasn't donated in the past 90 days.",
        hi: "१८ से ६५ वर्ष की आयु, वजन कम से कम ५० किग्रा, हीमोग्लोबिन १२.५ ग्रा/डेसी या अधिक, आज स्वस्थ महसूस कर रहे हों और पिछले ९० दिनों में रक्तदान न किया हो — कोई भी कर सकता है।",
      },
    },
    {
      id: "is-it-safe",
      q: { en: "Is donating blood safe?", hi: "क्या रक्तदान सुरक्षित है?" },
      a: {
        en: "Yes. Every needle and bag is sterile and single-use. The whole process takes about 30 minutes including registration, screening, donation, and rest.",
        hi: "हाँ। हर सुई और थैली बंध्य और एक बार उपयोग की होती हैं। पंजीकरण, जाँच, रक्तदान और विश्राम सहित पूरी प्रक्रिया में लगभग ३० मिनट लगते हैं।",
      },
    },
    {
      id: "without-replacement",
      q: {
        en: "Can I get blood without arranging a replacement donor?",
        hi: "क्या मैं प्रतिस्थापन दाता की व्यवस्था किए बिना रक्त प्राप्त कर सकता हूँ?",
      },
      a: {
        en: "In emergencies the blood bank issues blood first and arranges replacement later. For planned procedures, please bring donors with the patient.",
        hi: "आपातकाल में रक्त बैंक पहले रक्त देता है और प्रतिस्थापन बाद में करता है। नियोजित प्रक्रियाओं के लिए कृपया रोगी के साथ दाता लाएँ।",
      },
    },
    {
      id: "components",
      q: {
        en: "Do you separate components like plasma and platelets?",
        hi: "क्या आप प्लाज़्मा और प्लेटलेट्स जैसे घटक अलग करते हैं?",
      },
      a: {
        en: "Yes. Whole blood is separated into packed red cells, fresh frozen plasma, and platelet concentrate as needed by the prescribing clinician.",
        hi: "हाँ। पूरे रक्त को पैक्ड लाल कोशिकाओं, ताज़ा जमा प्लाज़्मा और प्लेटलेट सांद्रता में अलग किया जाता है, जैसा कि चिकित्सक को आवश्यकता हो।",
      },
    },
    {
      id: "duration",
      q: { en: "How long does the visit take?", hi: "मुलाक़ात में कितना समय लगता है?" },
      a: {
        en: "Plan for about 30 minutes from arrival to leaving. The donation itself is around 10 minutes.",
        hi: "पहुँचने से जाने तक लगभग ३० मिनट का अनुमान रखें। वास्तविक रक्तदान लगभग १० मिनट का होता है।",
      },
    },
  ],
  contact: {
    addressLine: {
      en: "Dev Nandini Hospital, NH-9 Hapur Bypass, Hapur 245101",
      hi: "देव नंदिनी अस्पताल, एनएच-९ हापुड़ बायपास, हापुड़ २४५१०१",
    },
    inHospitalLocation: {
      en: "Block A · Ground floor, behind the pathology lab",
      hi: "ब्लॉक ए · भूतल, पैथोलॉजी लैब के पीछे",
    },
    phone: BLOOD_BANK_PHONE,
  },
} as const satisfies BloodBankContent;
