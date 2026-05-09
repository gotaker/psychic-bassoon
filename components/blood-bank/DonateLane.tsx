import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Mono } from "@/components/ui/Mono";
import { CheckIcon } from "@/components/icons";
import type { BloodBankContent } from "@/content/types";
import type { Locale } from "@/lib/locales";

type Props = {
  locale: Locale;
  donate: BloodBankContent["donate"];
};

export function DonateLane({ locale, donate }: Props) {
  const t = useTranslations("bloodBank");
  return (
    <section
      id="donate"
      className="scroll-mt-[88px] bg-white py-12 md:py-20"
      aria-labelledby="bb-donate-heading"
    >
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)]">
        <Mono>{t("sectionDonate")}</Mono>
        <h2
          id="bb-donate-heading"
          className="display-md mt-3 max-w-[20ch] text-[color:var(--color-deep)]"
        >
          {t("ctaDonate")}
        </h2>

        <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h3 className="display-xs">{t("eligibilityHeading")}</h3>
            <ul className="mt-4 space-y-2">
              {donate.eligibility.map((e) => (
                <li
                  key={e.id}
                  className="flex items-start gap-2 text-[15px] text-[color:var(--color-ink)]"
                >
                  <CheckIcon size={16} aria-hidden="true" />
                  {e.rule[locale]}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="display-xs">{t("processHeading")}</h3>
            <ol className="mt-4 list-decimal space-y-2 ps-5 text-[15px] text-[color:var(--color-ink)]">
              {donate.process.map((p) => (
                <li key={p.id}>
                  <strong className="font-semibold">{p.step[locale]}.</strong>{" "}
                  <span className="text-[color:var(--color-ink-soft)]">{p.detail[locale]}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-10 rounded-md border border-[color:var(--color-line-soft)] p-5">
          <Mono>{t("walkInHeading")}</Mono>
          <p className="mt-2 text-[15px] text-[color:var(--color-ink)]">
            {donate.walkInHours[locale]}
          </p>
          <Button variant="primary" size="lg" href={`tel:${donate.phone}`} className="mt-5">
            {t("ctaCallDonor")}
          </Button>
        </div>
      </div>
    </section>
  );
}
