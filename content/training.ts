// FOGSI-recognised infertility training programme — typed seed data.
// Source: FOGSI Infertility Training Course syllabus PDF (Feb 2024 revision)
// hosted at /training/fogsi-infertility-syllabus.pdf.
//
// Day-by-day medical content is in English in both locales because FOGSI
// training is conducted in English; translating clinical terms risks
// introducing inaccuracies. Page chrome (titles, kickers, body intros)
// remains fully bilingual via messages/{locale}.json.

import type { LocalisedString } from "./types";

export type SyllabusDay = {
  day: number;
  lectures: readonly string[];
  liveTraining: string;
};

export type CourseId = "basic" | "advanced" | "iui";

export type TrainingCourse = {
  id: CourseId;
  title: LocalisedString;
  duration: LocalisedString;
  feeINR: number;
  summary: LocalisedString;
  days: readonly SyllabusDay[];
};

export const TRAINING_APPLICATION_PDF = "/training/fogsi-application-form.pdf";
export const TRAINING_SYLLABUS_PDF = "/training/fogsi-infertility-syllabus.pdf";
export const TRAINING_ENQUIRY_EMAIL = "devnandiniivf@gmail.com";

const BASIC_DAYS: readonly SyllabusDay[] = [
  {
    day: 1,
    lectures: [
      "Evaluation of the infertile couple",
      "Basic investigations of the infertile couple",
      "Semen analysis — how to interpret",
    ],
    liveTraining: "Semen analysis, sperm morphological evaluation",
  },
  {
    day: 2,
    lectures: [
      "Ultrasound at first visit — what to evaluate",
      "Anovulation — etiology and diagnosis",
      "Male infertility",
    ],
    liveTraining: "Follicular monitoring — attending and observing folliculometry scans",
  },
  {
    day: 3,
    lectures: [
      "Fertility aspects of tubal infertility",
      "Pelvic inflammatory disease — diagnosis and management",
      "Genital TB — implications and management",
    ],
    liveTraining: "Semen preparation by swim-up technique",
  },
  {
    day: 4,
    lectures: [
      "Ovulation induction protocols in COH and IUI",
      "Adjuvants in OI management",
      "Ovulation trigger in IUI",
    ],
    liveTraining: "Semen preparation by density-gradient technique",
  },
  {
    day: 5,
    lectures: [
      "Ovarian reserve testing",
      "PCOS — etiology, pathogenesis, diagnosis, management",
      "Thyroid disorders and infertility",
    ],
    liveTraining: "IUI — how to perform",
  },
  {
    day: 6,
    lectures: [
      "Ultrasonographic endometrial evaluation during OI",
      "Luteal phase support",
      "OHSS — prediction, prevention, monitoring, management",
    ],
    liveTraining: "Semen freezing",
  },
  {
    day: 7,
    lectures: [
      "Optimising IUI results",
      "When to convert IUI to IVF",
      "How to manage difficult IUI",
      "All about donor insemination",
    ],
    liveTraining: "Practice sessions — semen analysis and preparation",
  },
];

const ADVANCED_EXTRA_DAYS: readonly SyllabusDay[] = [
  {
    day: 8,
    lectures: [
      "Medical therapy in oligospermia / azoospermia",
      "Managing erectile dysfunction, anejaculation, retrograde ejaculation",
      "Pretreatment in ART",
      "How to set up a lab",
    ],
    liveTraining: "Oocyte retrieval",
  },
  {
    day: 9,
    lectures: [
      "Poor responder — diagnostic criteria and management",
      "Protocols for downregulation of pituitary",
      "Individualised ovulation induction protocols",
    ],
    liveTraining: "Hunting and denudation of oocytes",
  },
  {
    day: 10,
    lectures: [
      "Endometriosis — management and OI protocols",
      "Fibroid and infertility",
      "Conventional IVF vs ICSI",
    ],
    liveTraining: "ICSI, conventional IVF",
  },
  {
    day: 11,
    lectures: [
      "Endometrial preparation protocols in FET",
      "Luteal phase support in ART",
      "Hormonal monitoring in IVF",
    ],
    liveTraining: "Embryo culture, laser-assisted hatching",
  },
  {
    day: 12,
    lectures: [
      "Optimising IVF results",
      "Fresh ET vs FET — advantages and disadvantages by responder type",
      "Cleavage-stage vs blastocyst transfer",
    ],
    liveTraining: "Embryo vitrification and thawing",
  },
  {
    day: 13,
    lectures: [
      "Embryo transfer techniques",
      "Handling difficult ET",
      "Organising donor oocyte cycles",
    ],
    liveTraining: "Embryo transfer, loading of embryos",
  },
  {
    day: 14,
    lectures: [
      "Recurrent IVF / implantation failure",
      "Endometrial receptivity",
      "Fertility-enhancing endoscopic surgeries",
    ],
    liveTraining: "Sperm DNA fragmentation",
  },
];

const IUI_DAYS: readonly SyllabusDay[] = [
  {
    day: 1,
    lectures: [
      "Evaluation of the infertile couple (30 min)",
      "Investigations before ovulation induction (30 min)",
      "Ovulation induction in IUI treatment (30 min)",
      "Interpretation of basic semen analysis (30 min)",
    ],
    liveTraining: "Theory module",
  },
  {
    day: 2,
    lectures: ["Demonstration of semen preparation — swim-up and density gradient (60 min)"],
    liveTraining: "Hands-on training for delegates",
  },
];

export const TRAINING_COURSES = [
  {
    id: "basic",
    title: {
      en: "Basic Infertility Training",
      hi: "मूल बाँझपन प्रशिक्षण",
    },
    duration: {
      en: "7 days",
      hi: "७ दिन",
    },
    feeINR: 17700,
    summary: {
      en: "Foundations of infertility evaluation, ovulation induction, and IUI — built around the FOGSI standard syllabus.",
      hi: "बाँझपन मूल्यांकन, ओव्यूलेशन इंडक्शन और IUI के मूल सिद्धांत — FOGSI के मानक पाठ्यक्रम पर आधारित।",
    },
    days: BASIC_DAYS,
  },
  {
    id: "advanced",
    title: {
      en: "Advanced Infertility Training",
      hi: "उन्नत बाँझपन प्रशिक्षण",
    },
    duration: {
      en: "14 days",
      hi: "१४ दिन",
    },
    feeINR: 29500,
    summary: {
      en: "All seven Basic days plus a full second week on ART — IVF, ICSI, embryo transfer, vitrification, and recurrent implantation failure.",
      hi: "सभी सात मूल दिन और ART का पूरा दूसरा सप्ताह — IVF, ICSI, भ्रूण स्थानांतरण, विट्रिफ़िकेशन और बार-बार इम्प्लांटेशन विफलता।",
    },
    days: [...BASIC_DAYS, ...ADVANCED_EXTRA_DAYS],
  },
  {
    id: "iui",
    title: {
      en: "IUI & Stimulation Protocol",
      hi: "IUI एवं उत्तेजना प्रोटोकॉल",
    },
    duration: {
      en: "2 days",
      hi: "२ दिन",
    },
    feeINR: 3540,
    summary: {
      en: "Focused workshop on ovulation induction, semen analysis, and semen preparation for IUI — including a hands-on demonstration day.",
      hi: "IUI के लिए ओव्यूलेशन इंडक्शन, वीर्य विश्लेषण और वीर्य तैयारी पर केंद्रित कार्यशाला — हैंड्स-ऑन प्रदर्शन दिवस सहित।",
    },
    days: IUI_DAYS,
  },
] as const satisfies readonly TrainingCourse[];

export type TrainingCourseRecord = (typeof TRAINING_COURSES)[number];
