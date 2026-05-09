import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Mono } from "@/components/ui/Mono";
import { CheckIcon } from "@/components/icons";
import type { BloodBankContent } from "@/content/types";
import type { Locale } from "@/lib/locales";

type Props = {
  locale: Locale;
  request: BloodBankContent["request"];
};

export function RequestLane({ locale, request }: Props) {
  const t = useTranslations("bloodBank");
  return (
    <section
      id="request"
      className="bg-[color:var(--color-paper-2)] py-12 md:py-20 scroll-mt-[88px]"
      aria-labelledby="bb-request-heading"
    >
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)]">
        <Mono className="text-[color:var(--color-ink)]">{t("sectionRequest")}</Mono>
        <h2
          id="bb-request-heading"
          className="display-md mt-3 max-w-[24ch] text-[color:var(--color-deep)]"
        >
          {t("policyHeading")}
        </h2>
        <p className="lede mt-4 max-w-[60ch] text-[color:var(--color-ink)]">
          {request.replacementPolicy[locale]}
        </p>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h3 className="display-xs">{t("whatToBringHeading")}</h3>
            <ul className="mt-4 space-y-2">
              {request.whatToBring.map((b) => (
                <li
                  key={b.id}
                  className="flex items-start gap-2 text-[15px] text-[color:var(--color-ink)]"
                >
                  <CheckIcon size={16} aria-hidden="true" />
                  {b.item[locale]}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="display-xs">{t("hoursHeading")}</h3>
            <p className="mt-4 text-[15px] text-[color:var(--color-ink)]">
              {request.hours[locale]}
            </p>
            <Button
              variant="primary"
              size="lg"
              href={`tel:${request.phone}`}
              className="mt-5"
            >
              {t("ctaCallRequest")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
