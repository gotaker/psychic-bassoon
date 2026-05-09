import { useTranslations } from "next-intl";
import { Mono } from "@/components/ui/Mono";
import { stats } from "@/content/stats";
import type { Locale } from "@/lib/locales";

// Latin → Devanagari numeral conversion for HI render-time formatting.
// Full formatter lib lands in L7b; this is the inline minimum until then.
function formatValue(value: number | string, locale: Locale): string {
  if (typeof value === "string") return value;
  if (locale === "hi") {
    return new Intl.NumberFormat("hi-IN-u-nu-deva").format(value);
  }
  return new Intl.NumberFormat("en-IN").format(value);
}

export function StatsBand({ locale }: { locale: Locale }) {
  const t = useTranslations("home.stats");

  return (
    <section
      data-tone="deep"
      className="bg-[color:var(--color-deep)] text-white"
    >
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)] section-y">
        <Mono className="text-[color:var(--color-accent)]">{t("kicker")}</Mono>
        <h2 className="display-md mt-3 max-w-[24ch]">{t("title")}</h2>
        <ul className="mt-10 grid grid-cols-2 gap-x-0 gap-y-10 border-t border-white/15 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((s, i) => (
            <li
              key={s.id}
              className={`pl-5 pr-3 pt-6 ${i > 0 ? "border-l border-white/15" : ""}`}
            >
              <span
                className="block font-medium leading-[0.95] tracking-[-0.025em]"
                style={{ fontFamily: "var(--font-serif)", fontSize: 42 }}
              >
                {formatValue(s.value, locale)}
                {"unit" in s && s.unit ? (
                  <span className="ml-1 text-[18px] opacity-80">{s.unit[locale]}</span>
                ) : null}
              </span>
              <span className="body-sm mt-3 block opacity-85">{s.label[locale]}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
