import { useTranslations } from "next-intl";
import { Mono } from "@/components/ui/Mono";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

export function PhotoStrip() {
  const t = useTranslations("home.photoStrip");
  return (
    <section className="bg-[color:var(--color-paper)]">
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)] pb-16 md:pb-24">
        <Mono className="mb-4 block">{t("kicker")}</Mono>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1.6fr_1fr_1fr]">
          <figure>
            <PhotoPlaceholder
              tone="sand"
              caption={t("captions.opd")}
              ratio="wide"
              radius="sm"
              image={{
                src: "/images/hospital/opd-station.jpg",
                alt: "OPD nursing station with the care team on duty",
              }}
            />
            <figcaption className="body-sm mt-2 text-[color:var(--color-ink-soft)]">
              {t("captions.opd")}
            </figcaption>
          </figure>
          <figure>
            <PhotoPlaceholder
              tone="sage"
              caption={t("captions.ot")}
              ratio="square"
              radius="sm"
              image={{
                src: "/images/hospital/laparoscopy.jpg",
                alt: "Laparoscopic surgery in the operating theatre",
              }}
            />
            <figcaption className="body-sm mt-2 text-[color:var(--color-ink-soft)]">
              {t("captions.ot")}
            </figcaption>
          </figure>
          <figure>
            <PhotoPlaceholder
              tone="clay"
              caption={t("captions.nicu")}
              ratio="square"
              radius="sm"
              image={{
                src: "/images/hospital/nicu.jpg",
                alt: "NICU incubator and monitoring equipment",
              }}
            />
            <figcaption className="body-sm mt-2 text-[color:var(--color-ink-soft)]">
              {t("captions.nicu")}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
