import { XMLParser } from "fast-xml-parser";
import type { Locale } from "@/lib/locales";
import { LiveNewsItem } from "./types";

const SIX_MONTHS_MS = 180 * 24 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 5_000;
const REVALIDATE_SECONDS = 86_400;
const MAX_ITEMS = 20;
const MIN_HI_ITEMS_BEFORE_FALLBACK = 3;

// Hosts the page's <Image> allowlist accepts. Any image whose URL doesn't
// match one of these is dropped at parse time — broken images would be a
// worse failure mode than a text-only card.
const IMAGE_HOST_ALLOWLIST = ["googleusercontent.com", "news.google.com", "gstatic.com"];

// Locale-specific queries. The Hindi mode relaxes phrase matching against
// English-quoted strings, so a query of `"Dev Nandini Hospital"` alone in
// hi-IN returned wholly unrelated regional stories. Anchoring with the
// Devanagari hospital name keeps the feed on-topic.
const QUERY_TERMS: Record<Locale, string> = {
  en: '"Dev Nandini Hospital" OR "DNH Hapur"',
  hi: '"देव नंदिनी अस्पताल" OR "Dev Nandini Hospital"',
};

function rssUrl(locale: Locale): string {
  const params = new URLSearchParams({
    q: QUERY_TERMS[locale],
    hl: locale === "hi" ? "hi" : "en-IN",
    gl: "IN",
    ceid: locale === "hi" ? "IN:hi" : "IN:en",
  });
  return `https://news.google.com/rss/search?${params.toString()}`;
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  parseTagValue: false,
});

type RawItem = {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
  source?: string | { "#text"?: string; "@_url"?: string };
  guid?: string | { "#text"?: string };
};

function asString(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "#text" in value) {
    const text = (value as { "#text"?: unknown })["#text"];
    return typeof text === "string" ? text : undefined;
  }
  return undefined;
}

function imageHostAllowed(urlString: string): boolean {
  try {
    const host = new URL(urlString).hostname;
    return IMAGE_HOST_ALLOWLIST.some((h) => host === h || host.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

// Distinctive hospital identifiers, case-insensitive. Items whose title or
// description contains none of these are dropped post-parse. This is the last
// signal/noise filter — Google News' Hindi-mode phrase matching is loose
// enough that the RSS query alone returns unrelated regional stories.
const RELEVANCE_TOKENS = ["dev nandini", "देव नंदिनी"];

function isRelevant(title: string, description: string | undefined): boolean {
  const haystack = `${title} ${description ?? ""}`.toLowerCase();
  return RELEVANCE_TOKENS.some((tok) => haystack.includes(tok.toLowerCase()));
}

function extractImage(description: string | undefined): string | undefined {
  if (!description) return undefined;
  const match = description.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (!match) return undefined;
  const url = match[1];
  if (!url || !imageHostAllowed(url)) return undefined;
  return url;
}

function stableId(url: string): string {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/[?#].*$/, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function parseFeed(xml: string, lang: "en" | "hi"): LiveNewsItem[] {
  let root: unknown;
  try {
    root = parser.parse(xml);
  } catch {
    return [];
  }
  const channel = (root as { rss?: { channel?: { item?: RawItem | RawItem[] } } } | undefined)?.rss
    ?.channel;
  if (!channel) return [];
  const rawItems: RawItem[] = Array.isArray(channel.item)
    ? channel.item
    : channel.item
      ? [channel.item]
      : [];

  const cutoff = Date.now() - SIX_MONTHS_MS;
  const seen = new Set<string>();
  const out: LiveNewsItem[] = [];

  for (const item of rawItems) {
    const url = item.link?.trim();
    const title = item.title?.trim();
    const pub = item.pubDate?.trim();
    if (!url || !title || !pub) continue;

    const pubMs = Date.parse(pub);
    if (Number.isNaN(pubMs) || pubMs < cutoff) continue;

    if (!isRelevant(title, item.description)) continue;

    const id = stableId(url);
    if (!id || seen.has(id)) continue;
    seen.add(id);

    const sourceName = asString(item.source) ?? new URL(url).hostname;
    const image = extractImage(item.description);

    const candidate = {
      id,
      title,
      sourceName,
      url,
      pubDate: new Date(pubMs).toISOString(),
      image,
      lang,
    };

    const result = LiveNewsItem.safeParse(candidate);
    if (result.success) out.push(result.data);
  }

  out.sort((a, b) => (a.pubDate < b.pubDate ? 1 : -1));
  return out.slice(0, MAX_ITEMS);
}

async function fetchFeed(locale: Locale): Promise<LiveNewsItem[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(rssUrl(locale), {
      signal: controller.signal,
      headers: {
        "User-Agent": "dnh-news-bot/1.0 (+https://dnhhapur.com)",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseFeed(xml, locale);
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}

// Fetches the live news feed for the requested locale. Cached at the framework
// level for 24h via Next.js ISR `revalidate`. Returns an empty array on any
// failure (network, parse, schema) so the page renders without errors. The
// Hindi feed is sparse in practice — when fewer than three items come back we
// pad with English items tagged `lang: "en"` so the page is never empty.
export async function getLiveNews(locale: Locale): Promise<LiveNewsItem[]> {
  const primary = await fetchFeed(locale);
  if (locale === "en" || primary.length >= MIN_HI_ITEMS_BEFORE_FALLBACK) {
    return primary;
  }

  const fallback = await fetchFeed("en");
  const seen = new Set(primary.map((i) => i.id));
  const padded = [...primary];
  for (const item of fallback) {
    if (padded.length >= MAX_ITEMS) break;
    if (seen.has(item.id)) continue;
    padded.push(item);
    seen.add(item.id);
  }
  return padded;
}

// Exported only for unit tests — never call from app code.
export const __test = { parseFeed, extractImage, imageHostAllowed, stableId };
