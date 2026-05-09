import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { PhoneIcon, ArrowIcon } from "@/components/icons";
import type { Locale } from "@/lib/locales";

type StickyCtaBarProps = {
  locale: Locale;
  doctorsAvailableToday?: number;
};

const EMERGENCY_NUMBER = 102;
const FRONT_DESK_TEL = "+918044220099";

// Sticky bottom pill across all pages. DESIGN.md §5.2.
// Status dot + Emergency 102 + Book. Backdrop blur on its background only
// (anti-pattern audit: the only place glassmorphism is allowed).
export function StickyCtaBar({ locale, doctorsAvailableToday = 27 }: StickyCtaBarProps) {
  const tEmergency = useTranslations("emergency");
  const tCta = useTranslations("cta");
  const tSticky = useTranslations("sticky");

  return (
    <div
      role="complementary"
      aria-label={tEmergency("label")}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-6 pb-3.5 pt-3.5"
    >
      <div className="pointer-events-auto mx-auto flex max-w-[1100px] items-center gap-3.5 rounded-[var(--radius-pill)] bg-[color:var(--color-deep)]/96 py-2 pl-5 pr-2 text-white shadow-[0_16px_40px_rgba(14,31,34,0.28),0_2px_8px_rgba(0,0,0,0.16)] backdrop-blur">
        <span
          className="inline-flex items-center gap-2.5 text-[13.5px] font-medium leading-tight"
          aria-live="polite"
        >
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-[#7be29a] shadow-[0_0_0_3px_rgba(123,226,154,0.25)]"
          />
          {tSticky("openStatus", { n: doctorsAvailableToday })}
        </span>
        <span aria-hidden="true" className="flex-1" />
        <Button
          variant="emergency"
          size="md"
          href={`tel:${EMERGENCY_NUMBER}`}
          aria-label={`${tEmergency("label")} ${EMERGENCY_NUMBER}`}
        >
          <PhoneIcon size={13} />
          {tEmergency("fullLabel", { number: EMERGENCY_NUMBER })}
        </Button>
        <Button variant="accent" size="md" href={`/${locale}/book`}>
          {tCta("book")}
          <ArrowIcon size={13} />
        </Button>
        <a className="sr-only" href={`tel:${FRONT_DESK_TEL}`}>
          {tCta("callFrontDesk")}
        </a>
      </div>
    </div>
  );
}
