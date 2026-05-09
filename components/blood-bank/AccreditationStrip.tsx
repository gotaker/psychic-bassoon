import { useTranslations } from "next-intl";
import { Mono } from "@/components/ui/Mono";
import type { BloodBankContent } from "@/content/types";

type Props = {
  accreditations: BloodBankContent["accreditations"];
};

export function AccreditationStrip({ accreditations }: Props) {
  const tBb = useTranslations("bloodBank");
  const tAcc = useTranslations("accreditations");

  return (
    <section
      className="border-y border-[color:var(--color-line-soft)] bg-[color:var(--color-paper-2)] py-6"
      aria-labelledby="bb-accred-heading"
    >
      <div className="page-gutter mx-auto flex w-full max-w-[var(--content-max)] flex-wrap items-baseline gap-x-3 gap-y-1.5">
        <h2 id="bb-accred-heading" className="sr-only">
          {tBb("sectionAccreditations")}
        </h2>
        {accreditations.map((key, i) => (
          <span key={key} className="flex items-baseline gap-3">
            <Mono className="text-[color:var(--color-ink-soft)]">{tAcc(key)}</Mono>
            {i < accreditations.length - 1 ? <span aria-hidden="true">·</span> : null}
          </span>
        ))}
      </div>
    </section>
  );
}
