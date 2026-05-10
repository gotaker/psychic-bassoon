import { describe, it, expect } from "vitest";
import { __test } from "@/lib/news/google-news";

const { parseFeed, extractImage, imageHostAllowed, stableId } = __test;

function rss(items: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Test feed</title>
    <link>https://news.google.com</link>
    <description>Test</description>
    ${items}
  </channel>
</rss>`;
}

function item(opts: {
  title?: string;
  link?: string;
  pubDate?: string;
  description?: string;
  source?: string;
  sourceUrl?: string;
}): string {
  const parts: string[] = [];
  if (opts.title) parts.push(`<title><![CDATA[${opts.title}]]></title>`);
  if (opts.link) parts.push(`<link>${opts.link}</link>`);
  if (opts.pubDate) parts.push(`<pubDate>${opts.pubDate}</pubDate>`);
  if (opts.description) parts.push(`<description><![CDATA[${opts.description}]]></description>`);
  if (opts.source) {
    const url = opts.sourceUrl ? ` url="${opts.sourceUrl}"` : "";
    parts.push(`<source${url}>${opts.source}</source>`);
  }
  return `<item>${parts.join("")}</item>`;
}

const inWindow = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toUTCString();
const outOfWindow = new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toUTCString();
const olderInWindow = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toUTCString();

describe("imageHostAllowed", () => {
  it("accepts googleusercontent subdomains", () => {
    expect(imageHostAllowed("https://lh3.googleusercontent.com/abc")).toBe(true);
    expect(imageHostAllowed("https://lh4.googleusercontent.com/x")).toBe(true);
  });
  it("accepts news.google.com and gstatic", () => {
    expect(imageHostAllowed("https://news.google.com/img/foo.jpg")).toBe(true);
    expect(imageHostAllowed("https://encrypted-tbn0.gstatic.com/x")).toBe(true);
  });
  it("rejects everything else", () => {
    expect(imageHostAllowed("https://timesofindia.indiatimes.com/img.jpg")).toBe(false);
    expect(imageHostAllowed("not-a-url")).toBe(false);
  });
});

describe("extractImage", () => {
  it("extracts and allowlists a valid img src", () => {
    const html = '<p>Hi</p><img src="https://lh3.googleusercontent.com/abc.jpg" /><p>x</p>';
    expect(extractImage(html)).toBe("https://lh3.googleusercontent.com/abc.jpg");
  });
  it("drops disallowed hosts", () => {
    const html = '<img src="https://example.com/abc.jpg" />';
    expect(extractImage(html)).toBeUndefined();
  });
  it("returns undefined when no img tag is present", () => {
    expect(extractImage("<p>plain</p>")).toBeUndefined();
    expect(extractImage(undefined)).toBeUndefined();
  });
});

describe("stableId", () => {
  it("derives a slug-style id from a URL, stripping protocol and query", () => {
    expect(stableId("https://example.com/path/to/article?utm=x#frag")).toBe(
      "example-com-path-to-article",
    );
  });
  it("dedupes URLs that differ only by querystring", () => {
    const a = stableId("https://example.com/a?ref=1");
    const b = stableId("https://example.com/a?ref=2");
    expect(a).toBe(b);
  });
});

describe("parseFeed", () => {
  it("filters items older than 6 months", () => {
    const xml = rss(
      [
        item({
          title: "Dev Nandini Fresh",
          link: "https://example.com/fresh",
          pubDate: inWindow,
          source: "Source A",
        }),
        item({
          title: "Dev Nandini Stale",
          link: "https://example.com/stale",
          pubDate: outOfWindow,
          source: "Source B",
        }),
      ].join(""),
    );
    const result = parseFeed(xml, "en");
    expect(result.map((r) => r.title)).toEqual(["Dev Nandini Fresh"]);
  });

  it("dedupes items by canonical URL", () => {
    const xml = rss(
      [
        item({
          title: "Dev Nandini Article",
          link: "https://example.com/x?ref=1",
          pubDate: inWindow,
          source: "Source",
        }),
        item({
          title: "Dev Nandini Article (dup)",
          link: "https://example.com/x?ref=2",
          pubDate: inWindow,
          source: "Source",
        }),
      ].join(""),
    );
    const result = parseFeed(xml, "en");
    expect(result).toHaveLength(1);
  });

  it("sorts results by pubDate descending", () => {
    const xml = rss(
      [
        item({
          title: "Dev Nandini Older",
          link: "https://example.com/older",
          pubDate: olderInWindow,
          source: "S",
        }),
        item({
          title: "Dev Nandini Newer",
          link: "https://example.com/newer",
          pubDate: inWindow,
          source: "S",
        }),
      ].join(""),
    );
    const result = parseFeed(xml, "en");
    expect(result.map((r) => r.title)).toEqual(["Dev Nandini Newer", "Dev Nandini Older"]);
  });

  it("caps at 20 items", () => {
    const items: string[] = [];
    for (let i = 0; i < 30; i++) {
      items.push(
        item({
          title: `Dev Nandini Article ${i}`,
          link: `https://example.com/article-${i}`,
          pubDate: inWindow,
          source: "S",
        }),
      );
    }
    const result = parseFeed(rss(items.join("")), "en");
    expect(result).toHaveLength(20);
  });

  it("attaches an allowlisted image and skips a disallowed one", () => {
    const xml = rss(
      [
        item({
          title: "Dev Nandini with image",
          link: "https://example.com/with",
          pubDate: inWindow,
          source: "S",
          description: 'thumb: <img src="https://lh3.googleusercontent.com/ok.jpg" /> end',
        }),
        item({
          title: "Dev Nandini without image",
          link: "https://example.com/without",
          pubDate: inWindow,
          source: "S",
          description: 'about Dev Nandini: <img src="https://example.com/blocked.jpg" />',
        }),
      ].join(""),
    );
    const result = parseFeed(xml, "en");
    const byTitle = Object.fromEntries(result.map((r) => [r.title, r]));
    expect(byTitle["Dev Nandini with image"]?.image).toBe(
      "https://lh3.googleusercontent.com/ok.jpg",
    );
    expect(byTitle["Dev Nandini without image"]?.image).toBeUndefined();
  });

  it("skips items with missing required fields", () => {
    const xml = rss(
      [
        item({ title: "Dev Nandini no link", pubDate: inWindow, source: "S" }),
        item({ link: "https://example.com/no-title", pubDate: inWindow, source: "S" }),
        item({ title: "Dev Nandini no date", link: "https://example.com/no-date", source: "S" }),
        item({
          title: "Dev Nandini good",
          link: "https://example.com/good",
          pubDate: inWindow,
          source: "S",
        }),
      ].join(""),
    );
    const result = parseFeed(xml, "en");
    expect(result.map((r) => r.title)).toEqual(["Dev Nandini good"]);
  });

  it("returns [] on malformed XML rather than throwing", () => {
    const result = parseFeed("not xml at all <<<", "en");
    expect(result).toEqual([]);
  });

  it("tags items with the requested lang", () => {
    const xml = rss(
      item({
        title: "देव नंदिनी अस्पताल समाचार",
        link: "https://example.com/hi",
        pubDate: inWindow,
        source: "Source",
      }),
    );
    const result = parseFeed(xml, "hi");
    expect(result[0]?.lang).toBe("hi");
  });

  it("drops items whose title and description have no hospital identifier", () => {
    const xml = rss(
      [
        item({
          title: "Buddha Purnima procession in town",
          link: "https://example.com/unrelated",
          pubDate: inWindow,
          source: "Hindustan Hindi News",
        }),
        item({
          title: "Dev Nandini Hospital opens new ward",
          link: "https://example.com/related",
          pubDate: inWindow,
          source: "Times",
        }),
        item({
          title: "Local update",
          link: "https://example.com/described",
          pubDate: inWindow,
          source: "S",
          description: "...visit देव नंदिनी अस्पताल for details...",
        }),
      ].join(""),
    );
    const titles = parseFeed(xml, "hi").map((r) => r.title);
    expect(titles).toContain("Dev Nandini Hospital opens new ward");
    expect(titles).toContain("Local update");
    expect(titles).not.toContain("Buddha Purnima procession in town");
  });

  it("falls back to URL hostname when source is missing", () => {
    const xml = rss(
      item({
        title: "Dev Nandini no source",
        link: "https://news.example.org/article",
        pubDate: inWindow,
      }),
    );
    const result = parseFeed(xml, "en");
    expect(result[0]?.sourceName).toBe("news.example.org");
  });
});
