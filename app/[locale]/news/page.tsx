import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { Mono } from "@/components/ui/Mono";
import { NewsCard } from "@/components/news/NewsCard";
import { news } from "@/content/news";
import { getLiveNews } from "@/lib/news/google-news";
import type { Locale } from "@/lib/locales";

// Refresh the rendered page once per 24h. The Google News fetch inside
// getLiveNews carries the same revalidate hint, so the framework keeps both
// the data layer and the page in sync.
export const revalidate = 86400;

export default async function NewsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "news" });
  const liveItems = await getLiveNews(locale);

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="bg-[color:var(--color-paper)]">
        <section className="page-gutter mx-auto w-full max-w-[var(--content-max)] py-16 md:py-24">
          <Mono>{t("eyebrow")}</Mono>
          <h1 className="display-lg mt-4 max-w-[20ch]">{t("headline")}</h1>

          <div className="mt-12">
            <div className="flex items-baseline justify-between">
              <h2 className="text-[18px] font-medium tracking-[-0.01em]">{t("featured")}</h2>
            </div>
            <ul className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {news.map((n) => (
                <li key={n.id}>
                  <NewsCard item={{ kind: "curated", item: n }} locale={locale} />
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16">
            <div className="flex items-baseline justify-between gap-6">
              <h2 className="text-[18px] font-medium tracking-[-0.01em]">{t("latest")}</h2>
              <p className="meta text-[color:var(--color-ink-soft)]">{t("latestHelp")}</p>
            </div>
            {liveItems.length === 0 ? (
              <p className="mt-6 text-[color:var(--color-ink-soft)]">{t("emptyLatest")}</p>
            ) : (
              <ul className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {liveItems.map((n) => (
                  <li key={n.id}>
                    <NewsCard
                      item={{ kind: "live", item: n }}
                      locale={locale}
                      readOnLabel={t("readOn", { source: n.sourceName })}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
      <StickyCtaBar locale={locale} />
    </>
  );
}
