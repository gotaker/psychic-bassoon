import { useTranslations } from "next-intl";
import Link from "next/link";
import { EditorialSplit } from "@/components/layout/EditorialSplit";
import { Mono } from "@/components/ui/Mono";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import type { Locale } from "@/lib/locales";

export function FeaturedStory({ locale }: { locale: Locale }) {
  const t = useTranslations("home.featuredStory");
  return (
    <section className="bg-[color:var(--color-paper)]">
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)] section-y">
        <EditorialSplit
          ratio="1.15-1"
          left={
            <>
              <Mono>{t("kicker")}</Mono>
              <h2 className="display-md mt-4 max-w-[18ch]">{t("title")}</h2>
              <p className="lede mt-5 max-w-[52ch]">{t("dek")}</p>
              <p className="meta mt-6 text-[color:var(--color-ink-soft)]">{t("byline")}</p>
              <Link
                href={`/${locale}/news`}
                className="meta mt-6 inline-flex items-center gap-2 text-[color:var(--color-primary)] underline-offset-4 hover:underline"
              >
                {t("cta")} →
              </Link>
            </>
          }
          right={
            <PhotoPlaceholder
              tone="slate"
              caption={t("photoCaption")}
              ratio="hero"
              radius="sm"
            />
          }
        />
      </div>
    </section>
  );
}
