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
              caption={t("captions.courtyard")}
              ratio="wide"
              radius="sm"
              image={{
                src: "/images/contextual/home-courtyard.jpg",
                alt: "Hospital outpatient building exterior",
              }}
            />
            <figcaption className="body-sm mt-2 text-[color:var(--color-ink-soft)]">
              {t("captions.courtyard")}
            </figcaption>
          </figure>
          <figure>
            <PhotoPlaceholder
              tone="sage"
              caption={t("captions.cathLab")}
              ratio="square"
              radius="sm"
              image={{
                src: "/images/contextual/home-cath-lab.jpg",
                alt: "Cardiac catheterization procedure",
              }}
            />
            <figcaption className="body-sm mt-2 text-[color:var(--color-ink-soft)]">
              {t("captions.cathLab")}
            </figcaption>
          </figure>
          <figure>
            <PhotoPlaceholder
              tone="clay"
              caption={t("captions.nicu")}
              ratio="square"
              radius="sm"
              image={{
                src: "/images/contextual/home-nicu.jpg",
                alt: "Neonatal intensive care unit incubator",
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
