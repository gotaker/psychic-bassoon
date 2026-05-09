import type { DepartmentDetail } from "../types";

// Direct port from prototype/variants/DSite.jsx:272-435.
// Cardiology is the lead template; other 27 departments share the same shape
// but mark hasFullDetail=false and skip procedures/outcomes/whenToCome.

export const cardiology: DepartmentDetail = {
  slug: "cardiology",
  hero: {
    headline: { en: "Cardiology.", hi: "हृदय विज्ञान।" },
    lede: {
      en: "Six consultants, three cath-labs, a hybrid OR, and a 24-hour STEMI line. Door-to-balloon time of 38 minutes — among the fastest in north India.",
      hi: "छह चिकित्सक, तीन कैथ-लैब, हाइब्रिड OR, २४ घंटे की STEMI लाइन। डोर-टू-बलून समय ३८ मिनट — उत्तर भारत में अग्रणी।",
    },
    photoCaption: { en: "CATH-LAB TWO · 06:42", hi: "कैथ-लैब दो · ०६:४२" },
    photoOverlay: {
      en: "The first case of the day, before the lights come up.",
      hi: "दिन का पहला मामला, रोशनी से पहले।",
    },
    photoTone: "clay",
  },
  procedures: [
    {
      id: "angioplasty",
      title: { en: "Coronary angioplasty", hi: "कोरोनरी एंजियोप्लास्टी" },
      annualVolume: { en: "1,800 / year", hi: "१,८०० / वर्ष" },
      description: {
        en: "Stents — drug-eluting and bioresorbable. Radial-first protocol since 2019.",
        hi: "स्टेंट — ड्रग-एल्यूटिंग व बायोरिज़ॉर्बेबल। २०१९ से रेडियल-प्रथम।",
      },
    },
    {
      id: "pacemaker",
      title: { en: "Pacemaker & ICD", hi: "पेसमेकर व आईसीडी" },
      annualVolume: { en: "420 / year", hi: "४२० / वर्ष" },
      description: {
        en: "Single, dual, and CRT-D devices. Same-day discharge in 60% of cases.",
        hi: "एकल, द्वि-कक्षीय, सीआरटी-डी। ६०% मामलों में सेम-डे डिस्चार्ज।",
      },
    },
    {
      id: "ep-ablation",
      title: {
        en: "Electrophysiology & ablation",
        hi: "इलेक्ट्रोफिज़ियोलॉजी व एब्लेशन",
      },
      annualVolume: { en: "180 / year", hi: "१८० / वर्ष" },
      description: {
        en: "AF, AVNRT, VT mapping with 3D EnSite. Cryo and RF ablation.",
        hi: "AF, AVNRT, VT — 3D EnSite मैपिंग। क्रायो व RF।",
      },
    },
    {
      id: "cabg",
      title: { en: "CABG (open heart)", hi: "CABG (ओपन हार्ट)" },
      annualVolume: { en: "240 / year", hi: "२४० / वर्ष" },
      description: {
        en: "Beating-heart and minimally-invasive approaches. ICU 2.4 days median.",
        hi: "बीटिंग-हार्ट व मिनिमली-इनवेसिव। मध्यम ICU २.४ दिन।",
      },
    },
    {
      id: "structural",
      title: { en: "Structural heart", hi: "स्ट्रक्चरल हार्ट" },
      annualVolume: { en: "95 / year", hi: "९५ / वर्ष" },
      description: {
        en: "TAVR, MitraClip, ASD/VSD device closure. Hybrid OR.",
        hi: "TAVR, MitraClip, ASD/VSD क्लोज़र। हाइब्रिड OR।",
      },
    },
    {
      id: "heart-failure",
      title: { en: "Heart-failure clinic", hi: "हृदय-विफलता क्लिनिक" },
      annualVolume: { en: "2,400 visits", hi: "२,४०० विज़िट" },
      description: {
        en: "Multidisciplinary, with rehab, dietetics, and home-monitoring.",
        hi: "बहु-विषयक — पुनर्वास, आहार, होम-मॉनिटरिंग।",
      },
    },
  ],
  outcomes: [
    {
      id: "door-to-balloon",
      kicker: { en: "Door-to-balloon", hi: "डोर-टू-बलून" },
      value: { en: "38 min", hi: "३८ मिनट" },
      description: {
        en: "Median time from arrival to angioplasty for STEMI patients.",
        hi: "STEMI रोगियों हेतु आगमन से एंजियोप्लास्टी तक मध्यम समय।",
      },
      benchmark: { en: "< 90 min target", hi: "< ९० मिनट लक्ष्य" },
    },
    {
      id: "30-day-mortality",
      kicker: { en: "30-day mortality", hi: "३० दिन मृत्यु दर" },
      value: { en: "1.7%", hi: "१.७%" },
      description: {
        en: "For elective coronary intervention. Risk-adjusted.",
        hi: "इलेक्टिव कोरोनरी प्रक्रिया। जोखिम-समायोजित।",
      },
      benchmark: {
        en: "Indian benchmark · 2.4%",
        hi: "भारतीय बेंचमार्क · २.४%",
      },
    },
    {
      id: "same-day-discharge",
      kicker: { en: "Same-day discharge", hi: "सेम-डे डिस्चार्ज" },
      value: { en: "60%", hi: "६०%" },
      description: {
        en: "Of pacemaker implants. National-leading rate.",
        hi: "पेसमेकर इम्प्लांट का। राष्ट्रीय अग्रणी।",
      },
      benchmark: { en: "Average · 28%", hi: "औसत · २८%" },
    },
    {
      id: "patient-outcomes",
      kicker: {
        en: "Patient-reported outcomes",
        hi: "रोगी संतुष्टि",
      },
      value: { en: "94%", hi: "९४%" },
      description: {
        en: "Would recommend the cath-lab team to family.",
        hi: "कैथ-लैब टीम की अनुशंसा करेंगे।",
      },
      benchmark: { en: "Survey n = 1,240", hi: "सर्वे n = १,२४०" },
    },
  ],
  whenToCome: {
    headline: {
      en: "If any of these are true, come the same day.",
      hi: "इनमें से कोई भी हो — उसी दिन आएँ।",
    },
    redFlags: [
      {
        en: "Chest pain or pressure lasting more than a few minutes",
        hi: "कुछ मिनटों से अधिक चलने वाला सीने में दर्द या दबाव",
      },
      {
        en: "Sudden shortness of breath, especially at rest or while lying flat",
        hi: "अचानक साँस फूलना — विशेषकर आराम में या लेटने पर",
      },
      {
        en: "Fainting, near-fainting, or palpitations that won't settle",
        hi: "बेहोशी, चक्कर, या न रुकने वाली धड़कन",
      },
      {
        en: "Swelling of legs that has worsened over days",
        hi: "पैरों में लगातार बढ़ती सूजन",
      },
      {
        en: "A heart-attack survivor needing follow-up or second opinion",
        hi: "हृदयाघात के बाद फॉलो-अप या दूसरी राय हेतु",
      },
    ],
  },
};
