import { useTranslations } from "next-intl";
import { Mono } from "@/components/ui/Mono";
import { PinIcon, PhoneIcon } from "@/components/icons";
import { locations } from "@/content/locations";
import type { Locale } from "@/lib/locales";

export function LocationsBand({ locale }: { locale: Locale }) {
  const t = useTranslations("home.locations");
  return (
    <section className="bg-[color:var(--color-paper)]">
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)] section-y">
        <Mono>{t("kicker")}</Mono>
        <h2 className="display-md mt-3 max-w-[20ch]">{t("title")}</h2>
        <ul className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {locations.map((loc) => (
            <li key={loc.id}>
              <h3
                className="text-[22px] font-medium leading-tight tracking-[-0.015em]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {loc.name[locale]}
              </h3>
              <p className="body-sm mt-3 flex items-start gap-2 text-[color:var(--color-ink-soft)]">
                <span className="mt-0.5 text-[color:var(--color-ink-soft)]">
                  <PinIcon size={14} />
                </span>
                {loc.address[locale]}
              </p>
              <p className="body-sm mt-2 flex items-center gap-2 text-[color:var(--color-ink-soft)]">
                <span className="text-[color:var(--color-ink-soft)]">
                  <PhoneIcon size={14} />
                </span>
                <a
                  href={`tel:${loc.phone.replace(/\s/g, "")}`}
                  className="hover:underline underline-offset-4"
                >
                  {loc.phone}
                </a>
              </p>
              <p className="body-sm mt-2 text-[color:var(--color-ink-soft)]">{loc.hours[locale]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
