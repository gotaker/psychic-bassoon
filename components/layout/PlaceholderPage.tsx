import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Mono } from "@/components/ui/Mono";
import { PhoneIcon } from "@/components/icons";
import type { Locale } from "@/lib/locales";

type PlaceholderPageProps = {
  locale: Locale;
  kicker: { en: string; hi: string };
  headline: { en: string; hi: string };
  body: { en: ReactNode; hi: ReactNode };
  showCallCta?: boolean;
};

const FRONT_DESK_TEL = "+918044220099";
const FRONT_DESK_DISPLAY = "+91 80 4422 0099";

export function PlaceholderPage({
  locale,
  kicker,
  headline,
  body,
  showCallCta = true,
}: PlaceholderPageProps) {
  return (
    <main className="bg-[color:var(--color-paper)]">
      <section className="page-gutter mx-auto w-full max-w-[var(--content-max)] py-16 md:py-24">
        <Mono>{kicker[locale]}</Mono>
        <h1 className="display-lg mt-4 max-w-[18ch]">{headline[locale]}</h1>
        <div className="lede mt-6 max-w-[60ch] [&>p]:mt-4 [&>p:first-child]:mt-0">
          {body[locale]}
        </div>
        {showCallCta ? (
          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              variant="primary"
              size="md"
              href={`tel:${FRONT_DESK_TEL}`}
              aria-label={
                locale === "hi"
                  ? "स्वागत डेस्क पर कॉल करें"
                  : "Call the front desk"
              }
            >
              <PhoneIcon size={13} />
              {locale === "hi"
                ? `स्वागत डेस्क — ${FRONT_DESK_DISPLAY}`
                : `Front desk — ${FRONT_DESK_DISPLAY}`}
            </Button>
            <Button variant="ghost" size="md" href={`/${locale}`}>
              {locale === "hi" ? "होम पर वापस" : "Back to home"}
            </Button>
          </div>
        ) : null}
      </section>
    </main>
  );
}
