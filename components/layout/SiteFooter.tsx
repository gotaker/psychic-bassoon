import { useTranslations } from "next-intl";
import { Mono } from "@/components/ui/Mono";
import type { Locale } from "@/lib/locales";

type SiteFooterProps = {
  locale: Locale;
};

export function SiteFooter({ locale }: SiteFooterProps) {
  const tFooter = useTranslations("footer");
  const tAcc = useTranslations("accreditations");
  return (
    <footer
      className="border-t border-[color:var(--color-line-soft)] bg-[color:var(--color-paper-2)] pt-12 pb-[calc(48px+96px)] text-[color:var(--color-ink-soft)]"
      aria-labelledby="footer-heading"
    >
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)]">
        <h2 id="footer-heading" className="sr-only">
          Site footer
        </h2>
        <div className="flex flex-wrap items-baseline justify-between gap-x-12 gap-y-6">
          <div className="flex flex-wrap gap-x-3 gap-y-1.5">
            <Mono className="text-[color:var(--color-ink-soft)]">{tAcc("nabh")}</Mono>
            <span aria-hidden="true">·</span>
            <Mono className="text-[color:var(--color-ink-soft)]">{tAcc("nabl")}</Mono>
            <span aria-hidden="true">·</span>
            <Mono className="text-[color:var(--color-ink-soft)]">{tAcc("nmc")}</Mono>
            <span aria-hidden="true">·</span>
            <Mono className="text-[color:var(--color-ink-soft)]">{tAcc("iso15189")}</Mono>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[12px]">
          <a href={`/${locale}/blood-bank`} className="underline-offset-4 hover:underline">
            {tFooter("bloodBankLink")}
          </a>
        </div>
        <div className="mt-6 flex flex-wrap justify-between gap-x-12 gap-y-2 text-[12px]">
          <span>{tFooter("copyright", { year: new Date().getFullYear() })}</span>
          <span className="flex flex-wrap items-baseline gap-x-3">
            <a
              href="/images/hospital/ATTRIBUTIONS.md"
              className="underline-offset-4 hover:underline"
            >
              {tFooter("imageCredits")}
            </a>
            <span aria-hidden="true">·</span>
            <span>{tFooter("address")}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
