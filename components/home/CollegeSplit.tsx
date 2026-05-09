import { useTranslations } from "next-intl";
import { EditorialSplit } from "@/components/layout/EditorialSplit";
import { Mono } from "@/components/ui/Mono";

const COLLEGE_STATS = [
  { key: "mbbs", value: "150" },
  { key: "pg", value: "84" },
  { key: "ratio", value: "1:8" },
  { key: "since", value: "1972" },
] as const;

export function CollegeSplit() {
  const t = useTranslations("home.college");
  return (
    <section className="bg-[color:var(--color-paper)]">
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)] section-y">
        <EditorialSplit
          ratio="1.15-1"
          left={
            <>
              <Mono>{t("kicker")}</Mono>
              <h2 className="display-md mt-3 max-w-[16ch]">{t("title")}</h2>
              <p className="lede mt-5 max-w-[52ch]">{t("body")}</p>
              <a
                href="#mbbs-2026"
                className="meta mt-6 inline-flex items-center gap-2 text-[color:var(--color-primary)] underline-offset-4 hover:underline"
              >
                {t("cta")}
              </a>
            </>
          }
          right={
            <ul className="grid grid-cols-2 border-t border-l border-[color:var(--color-line-soft)]">
              {COLLEGE_STATS.map((s) => (
                <li
                  key={s.key}
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
                    {s.value}
                  </span>
                  <span className="body-sm mt-3 block text-[color:var(--color-ink-soft)]">
                    {t(`stats.${s.key}`)}
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
