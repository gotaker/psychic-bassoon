import { useTranslations } from "next-intl";
import { Mono } from "@/components/ui/Mono";
import { Button } from "@/components/ui/Button";
import type { BloodBankContent } from "@/content/types";
import type { Locale } from "@/lib/locales";

type Props = {
  locale: Locale;
  contact: BloodBankContent["contact"];
};

export function BloodBankContact({ locale, contact }: Props) {
  const t = useTranslations("bloodBank");
  return (
    <section className="bg-white py-12 md:py-20" aria-labelledby="bb-contact-heading">
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)]">
        <h2
          id="bb-contact-heading"
          className="display-md max-w-[24ch] text-[color:var(--color-deep)]"
        >
          {t("sectionContact")}
        </h2>
        <div className="mt-6 grid gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <Mono>{t("hoursHeading")}</Mono>
            <p className="mt-2 text-[15px] text-[color:var(--color-ink)]">
              {contact.inHospitalLocation[locale]}
            </p>
            <p className="mt-1 text-[14px] text-[color:var(--color-ink-soft)]">
              {contact.addressLine[locale]}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" size="lg" href={`tel:${contact.phone}`}>
              {t("ctaCallDonor")}
            </Button>
            {contact.email ? (
              <Button variant="ghost" size="lg" href={`mailto:${contact.email}`}>
                {contact.email}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
