import { useTranslations } from "next-intl";
import { EditorialSplit } from "@/components/layout/EditorialSplit";
import { Mono } from "@/components/ui/Mono";

const COURSES = ["basic", "advanced", "iui"] as const;

export function TrainingCentreSplit() {
  const t = useTranslations("home.training");
  return (
    <section className="bg-[color:var(--color-paper)]">
      <div className="page-gutter section-y mx-auto w-full max-w-[var(--content-max)]">
        <EditorialSplit
          ratio="1.15-1"
          left={
            <>
              <Mono>{t("kicker")}</Mono>
              <h2 className="display-md mt-3 max-w-[16ch]">{t("title")}</h2>
              <p className="lede mt-5 max-w-[52ch]">{t("body")}</p>
              <a
                href={t("ctaHref")}
                className="meta mt-6 inline-flex items-center gap-2 text-[color:var(--color-primary)] underline-offset-4 hover:underline"
              >
                {t("cta")} →
              </a>
            </>
          }
          right={
            <ul className="grid grid-cols-1 border-t border-l border-[color:var(--color-line-soft)] sm:grid-cols-3">
              {COURSES.map((c) => (
                <li
                  key={c}
                  className="border-r border-b border-[color:var(--color-line-soft)] px-5 py-7"
                >
                  <span
                    className="block leading-none"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 38,
                      fontWeight: 500,
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {t(`courses.${c}.value`)}
                  </span>
                  <span className="meta mt-2 block text-[color:var(--color-ink-soft)] uppercase tracking-[0.12em]">
                    {t(`courses.${c}.unit`)}
                  </span>
                  <span className="body-sm mt-3 block text-[color:var(--color-ink)]">
                    {t(`courses.${c}.label`)}
                  </span>
                </li>
              ))}
            </ul>
          }
        />
      </div>
    </section>
  );
}
