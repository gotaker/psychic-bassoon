import { useTranslations } from "next-intl";
import { Mono } from "@/components/ui/Mono";
import { PinIcon, PhoneIcon, ArrowIcon } from "@/components/icons";
import { locations } from "@/content/locations";
import type { Location } from "@/content/types";
import type { Locale } from "@/lib/locales";

function mapsEmbedUrl(loc: Location, locale: Locale): string {
  const query = encodeURIComponent(loc.mapsQuery ?? loc.address.en);
  return `https://maps.google.com/maps?q=${query}&hl=${locale}&z=15&output=embed`;
}

function mapsLinkUrl(loc: Location): string {
  const query = encodeURIComponent(loc.mapsQuery ?? loc.address.en);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function LocationsBand({ locale }: { locale: Locale }) {
  const t = useTranslations("home.locations");
  // The map shows the main campus — one geographic anchor for the institution.
  // Each location card still has its own "Get directions" link to its address.
  const mainLocation = locations.find((l) => l.id === "main") ?? locations[0];
  if (!mainLocation) return null;

  return (
    <section className="bg-[color:var(--color-paper)]">
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)] section-y">
        <Mono>{t("kicker")}</Mono>
        <h2 className="display-md mt-3 max-w-[20ch]">{t("title")}</h2>

        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-line-soft)] bg-[color:var(--color-paper-2)]">
          <iframe
            src={mapsEmbedUrl(mainLocation, locale)}
            title={`${mainLocation.name[locale]} — ${
              locale === "hi" ? "मानचित्र" : "map"
            }`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
          {locations.map((loc) => (
            <li key={loc.id} className="flex flex-col">
              <h3
                className="text-[22px] font-medium leading-tight tracking-[-0.015em]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {loc.name[locale]}
              </h3>
              <p className="body-sm mt-3 flex items-start gap-2 text-[color:var(--color-ink-soft)]">
                <span className="mt-0.5 flex-shrink-0 text-[color:var(--color-ink-soft)]">
                  <PinIcon size={14} />
                </span>
                <span>{loc.address[locale]}</span>
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
              <a
                href={mapsLinkUrl(loc)}
                target="_blank"
                rel="noopener noreferrer"
                className="meta mt-4 inline-flex items-center gap-1.5 self-start text-[color:var(--color-primary)] underline-offset-4 hover:underline"
                aria-label={
                  locale === "hi"
                    ? `${loc.name.hi} के लिए दिशा-निर्देश — Google Maps में खुलेगा`
                    : `Get directions to ${loc.name.en} — opens in Google Maps`
                }
              >
                {locale === "hi" ? "दिशा-निर्देश" : "Get directions"}
                <ArrowIcon size={12} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
