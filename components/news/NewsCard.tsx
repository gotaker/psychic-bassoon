import Image from "next/image";
import { Mono } from "@/components/ui/Mono";
import { formatDate, formatReadMinutes } from "@/lib/formatters";
import type { Locale } from "@/lib/locales";
import type { DisplayNewsItem } from "@/lib/news/types";

type NewsCardProps = {
  item: DisplayNewsItem;
  locale: Locale;
  // Only consumed when item.kind === "live". Pre-resolved by the page so the
  // ICU `{source}` placeholder is filled with the per-item source name.
  readOnLabel?: string;
};

export function NewsCard({ item, locale, readOnLabel }: NewsCardProps) {
  if (item.kind === "curated") {
    const n = item.item;
    return (
      <article
        id={n.id}
        className="rounded-[var(--radius-lg)] border border-[color:var(--color-line-soft)] bg-white p-6"
      >
        <Mono className="mb-3 block">{n.category[locale]}</Mono>
        <h3
          className="text-[22px] leading-tight font-medium tracking-[-0.015em]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {n.headline[locale]}
        </h3>
        <p className="meta mt-4 text-[color:var(--color-ink-soft)]">
          {formatDate(n.date, locale)} · {formatReadMinutes(n.readMin, locale)}
        </p>
      </article>
    );
  }

  const n = item.item;
  const renderLang = n.lang;
  const datePart = formatDate(n.pubDate.slice(0, 10), locale);

  return (
    <article
      id={n.id}
      lang={renderLang === "en" && locale === "hi" ? "en" : undefined}
      className="overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-line-soft)] bg-white"
    >
      {n.image ? (
        <div className="relative aspect-[16/9] w-full bg-[color:var(--color-line-soft)]">
          <Image
            src={n.image}
            alt={n.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="p-6">
        <Mono className="mb-3 block">{n.sourceName}</Mono>
        <h3
          className="text-[22px] leading-tight font-medium tracking-[-0.015em]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          <a
            href={n.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-4 hover:underline focus-visible:underline"
          >
            {n.title}
          </a>
        </h3>
        <p className="meta mt-4 text-[color:var(--color-ink-soft)]">
          {datePart}
          {readOnLabel ? ` · ${readOnLabel}` : null}
        </p>
      </div>
    </article>
  );
}
