import { z } from "zod";
import type { NewsItem } from "@/content/types";

// Items ingested from the Google News RSS feed at request time. Unlike
// `content/news.ts` (typed seed data), these are not reviewed before render —
// the failure mode is that rare scrape-quality bugs ship live. The schema is
// the last gate: anything that doesn't parse is dropped.
export const LiveNewsItem = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  sourceName: z.string().min(1),
  url: z.string().url(),
  pubDate: z.string().datetime(),
  image: z.string().url().optional(),
  // Set to "en" on items from the English query, "hi" on items from the Hindi
  // query. The Hindi locale falls back to the EN feed when the HI feed is
  // sparse — those items render with `lang="en"` so screen readers switch.
  lang: z.enum(["en", "hi"]),
});
export type LiveNewsItem = z.infer<typeof LiveNewsItem>;

// Discriminated union the NewsCard branches on. Curated items carry the full
// LocalisedString record; live items carry locale-resolved strings already.
export type DisplayNewsItem =
  | { kind: "curated"; item: NewsItem }
  | { kind: "live"; item: LiveNewsItem };
