import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { Mono } from "@/components/ui/Mono";
import { news } from "@/content/news";
import type { Locale } from "@/lib/locales";

export default async function NewsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="bg-[color:var(--color-paper)]">
        <section className="page-gutter mx-auto w-full max-w-[var(--content-max)] py-16 md:py-24">
          <Mono>{locale === "hi" ? "समाचार" : "NEWS & STORIES"}</Mono>
          <h1 className="display-lg mt-4 max-w-[20ch]">
            {locale === "hi" ? "भवन के भीतर क्या हो रहा है।" : "What's happening in the building."}
          </h1>
          <ul className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {news.map((n) => (
              <li
                key={n.id}
                id={n.id}
                className="rounded-[var(--radius-lg)] bg-white p-6 border border-[color:var(--color-line-soft)]"
              >
                <Mono className="mb-3 block">{n.category[locale]}</Mono>
                <h2
                  className="text-[22px] font-medium leading-tight tracking-[-0.015em]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {n.headline[locale]}
                </h2>
                <p className="meta mt-4 text-[color:var(--color-ink-soft)]">
                  {n.date} ·{" "}
                  {locale === "hi"
                    ? `${new Intl.NumberFormat("hi-IN-u-nu-deva").format(n.readMin)} मिनट`
                    : `${n.readMin} min`}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter />
      <StickyCtaBar locale={locale} />
    </>
  );
}
