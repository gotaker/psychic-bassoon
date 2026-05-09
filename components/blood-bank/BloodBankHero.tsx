import { useTranslations } from "next-intl";
import { Mono } from "@/components/ui/Mono";
import { Button } from "@/components/ui/Button";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { EditorialSplit } from "@/components/layout/EditorialSplit";
import type { BloodBankContent } from "@/content/types";
import type { Locale } from "@/lib/locales";

type Props = {
  locale: Locale;
  hero: BloodBankContent["hero"];
};

export function BloodBankHero({ locale, hero }: Props) {
  const t = useTranslations("bloodBank");

  return (
    <section className="bg-white">
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)] py-10 md:py-16">
        <EditorialSplit
          ratio="1-1"
          left={
            <>
              <Mono>{hero.eyebrow[locale]}</Mono>
              <h1 className="display-xl mt-4 max-w-[18ch]">{hero.headline[locale]}</h1>
              <p className="lede mt-6 max-w-[52ch]">{hero.sub[locale]}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="primary" size="lg" href="#donate">
                  {t("ctaDonate")}
                </Button>
                <Button variant="ghost" size="lg" href="#request">
                  {t("ctaRequest")}
                </Button>
              </div>
            </>
          }
          right={
            <PhotoPlaceholder
              tone={hero.photoTone}
              caption={hero.photoCaption[locale]}
              overlay={hero.photoOverlay[locale]}
              ratio="hero"
              radius="sm"
              image={{
                src: "/images/hospital/pathology-lab.jpg",
                alt:
                  locale === "hi"
                    ? "देव नंदिनी अस्पताल का पैथोलॉजी प्रयोगशाला कार्यबेंच"
                    : "Pathology laboratory bench at Dev Nandini Hospital",
                priority: true,
              }}
            />
          }
        />
      </div>
    </section>
  );
}
