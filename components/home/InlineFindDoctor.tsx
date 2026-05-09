import { useTranslations } from "next-intl";
import { Mono } from "@/components/ui/Mono";
import { Button } from "@/components/ui/Button";
import { SearchIcon } from "@/components/icons";
import type { Locale } from "@/lib/locales";

export function InlineFindDoctor({ locale }: { locale: Locale }) {
  const t = useTranslations("home.findInline");
  return (
    <section className="bg-white">
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)] py-12 md:py-16">
        <Mono>{t("kicker")}</Mono>
        <h2 className="display-md mt-3 max-w-[20ch]">{t("title")}</h2>
        <form
          method="get"
          action={`/${locale}/find-a-doctor`}
          className="mt-6 flex max-w-2xl flex-wrap items-center gap-3 rounded-[var(--radius-pill)] border border-[color:var(--color-line-soft)] bg-[color:var(--color-paper)] px-2 py-2 focus-within:border-[color:var(--color-deep)]"
          role="search"
        >
          <span className="flex h-10 w-10 items-center justify-center text-[color:var(--color-ink-soft)]">
            <SearchIcon size={18} />
          </span>
          <input
            type="search"
            name="q"
            placeholder={t("placeholder")}
            aria-label={t("title")}
            className="flex-1 bg-transparent py-2 text-[15px] outline-none placeholder:text-[color:var(--color-ink-soft)]/60"
          />
          <Button type="submit" variant="primary" size="md">
            {t("submit")}
          </Button>
        </form>
      </div>
    </section>
  );
}
