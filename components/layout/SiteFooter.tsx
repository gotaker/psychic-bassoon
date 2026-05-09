import { useTranslations } from "next-intl";
import { Mono } from "@/components/ui/Mono";

export function SiteFooter() {
  const tFooter = useTranslations("footer");
  const tAcc = useTranslations("accreditations");
  return (
    <footer
      className="border-t border-[color:var(--color-line-soft)] bg-[color:var(--color-paper-2)] pb-[calc(48px+96px)] pt-12 text-[color:var(--color-ink-soft)]"
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
        <div className="mt-6 flex flex-wrap justify-between gap-x-12 gap-y-2 text-[12px]">
          <span>{tFooter("copyright", { year: new Date().getFullYear() })}</span>
          <span>{tFooter("address")}</span>
        </div>
      </div>
    </footer>
  );
}
