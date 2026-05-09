import Link from "next/link";
import { useTranslations } from "next-intl";
import { Mono } from "@/components/ui/Mono";
import { departments } from "@/content/departments";
import type { Locale } from "@/lib/locales";

export function DepartmentsGrid({ locale }: { locale: Locale }) {
  const t = useTranslations("home.departments");

  return (
    <section className="bg-white">
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)] section-y">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
          <div>
            <Mono>{t("kicker")}</Mono>
            <h2 className="display-md mt-3 max-w-[20ch]">{t("title")}</h2>
          </div>
          <Link
            href={`/${locale}/departments`}
            className="meta inline-flex items-center gap-1.5 text-[color:var(--color-primary)] underline-offset-4 hover:underline"
          >
            {t("viewAll")}
          </Link>
        </header>
        <ul className="grid grid-cols-1 border-t border-l border-[color:var(--color-line-soft)] sm:grid-cols-2 lg:grid-cols-4">
          {departments.map((dept, i) => (
            <li key={dept.slug}>
              <Link
                href={`/${locale}/departments/${dept.slug}`}
                className="group flex h-full flex-col gap-2 border-r border-b border-[color:var(--color-line-soft)] px-5 py-6 transition-colors hover:bg-[color:var(--color-paper)]"
              >
                <span className="mono-tag text-[color:var(--color-ink-soft)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="block text-[16px] font-semibold leading-tight tracking-[-0.005em] text-[color:var(--color-ink)]">
                  {dept.name[locale]}
                </span>
                <span className="body-sm mt-1 text-[color:var(--color-ink-soft)]">
                  {dept.tagline[locale]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
