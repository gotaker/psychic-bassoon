import Link from "next/link";
import { useTranslations } from "next-intl";
import { Mono } from "@/components/ui/Mono";
import { news } from "@/content/news";
import type { Locale } from "@/lib/locales";

function formatDate(iso: string, locale: Locale): string {
  const date = new Date(iso);
  return new Intl.DateTimeFormat(locale === "hi" ? "hi-IN-u-nu-deva" : "en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatReadMin(min: number, locale: Locale): string {
  const formatted = new Intl.NumberFormat(locale === "hi" ? "hi-IN-u-nu-deva" : "en-IN").format(
    min,
  );
  return locale === "hi" ? `${formatted} मिनट` : `${formatted} min`;
}

export function NewsGrid({ locale }: { locale: Locale }) {
  const t = useTranslations("home.news");

  return (
    <section className="bg-white">
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)] section-y">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div>
            <Mono>{t("kicker")}</Mono>
            <h2 className="display-md mt-3 max-w-[20ch]">{t("title")}</h2>
          </div>
          <Link
            href={`/${locale}/news`}
            className="meta inline-flex items-center gap-1.5 text-[color:var(--color-primary)] underline-offset-4 hover:underline"
          >
            {t("viewAll")}
          </Link>
        </header>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {news.map((n) => (
            <li
              key={n.id}
              className="rounded-[var(--radius-lg)] border border-[color:var(--color-line-soft)] p-6"
            >
              <Mono className="mb-3 block">{n.category[locale]}</Mono>
              <h3
                className="text-[20px] font-medium leading-tight tracking-[-0.015em]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                <Link
                  href={`/${locale}/news#${n.id}`}
                  className="hover:underline underline-offset-4"
                >
                  {n.headline[locale]}
                </Link>
              </h3>
              <p className="meta mt-4 text-[color:var(--color-ink-soft)]">
                {formatDate(n.date, locale)} · {formatReadMin(n.readMin, locale)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
