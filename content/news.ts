import type { NewsItem } from "./types";

// 3 sample stories — one institutional, one clinical, one community.
// Adapted from prototype/i18n.js with PRODUCT.md-aligned facts.
// HI strings tagged NEEDS REVIEW for fluent reviewer sweep before launch.

export const news = [
  {
    id: "stroke-trial-2026",
    category: { en: "Research", hi: "अनुसंधान" },
    headline: {
      en: "DNH-led trial finds two-drug regimen lowers stroke recurrence by 31%",
      hi: "DNH के नेतृत्व वाले अध्ययन में दो-दवा आहार से पक्षाघात की पुनरावृत्ति ३१% कम",
    },
    date: "2026-04-04",
    readMin: 6,
  },
  {
    id: "haemodialysis-block-c",
    category: { en: "Patient Care", hi: "रोगी सेवा" },
    headline: {
      en: "New 24-station haemodialysis unit opens in Block C",
      hi: "ब्लॉक सी में नई २४-स्टेशन हीमोडायलिसिस इकाई का शुभारंभ",
    },
    date: "2026-03-19",
    readMin: 4,
  },
  {
    id: "cataract-camp-bulandshahr",
    category: { en: "Community", hi: "समुदाय" },
    headline: {
      en: "Free cataract camp screens 2,140 in Bulandshahr district",
      hi: "बुलंदशहर ज़िले में निःशुल्क मोतियाबिंद शिविर में २,१४० की जाँच",
    },
    date: "2026-03-11",
    readMin: 3,
  },
] as const satisfies readonly NewsItem[];
