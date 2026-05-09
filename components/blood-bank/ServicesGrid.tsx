import { useTranslations } from "next-intl";
import type { BloodBankContent } from "@/content/types";
import type { Locale } from "@/lib/locales";

type Props = {
  locale: Locale;
  services: BloodBankContent["services"];
};

export function ServicesGrid({ locale, services }: Props) {
  const t = useTranslations("bloodBank");
  return (
    <section className="bg-white py-12 md:py-20" aria-labelledby="bb-services-heading">
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)]">
        <h2
          id="bb-services-heading"
          className="display-md max-w-[24ch] text-[color:var(--color-deep)]"
        >
          {t("sectionServices")}
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {services.map((s) => (
            <li
              key={s.id}
              className="rounded-md border border-[color:var(--color-line-soft)] bg-[color:var(--color-paper-2)] p-4 text-[14px] text-[color:var(--color-ink)]"
            >
              {s.label[locale]}
              {s.note ? (
                <span className="mt-1 block text-[12px] text-[color:var(--color-ink-soft)]">
                  {s.note[locale]}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
