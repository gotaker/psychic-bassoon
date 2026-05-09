import { useTranslations } from "next-intl";
import Link from "next/link";
import { EditorialSplit } from "@/components/layout/EditorialSplit";
import { Mono } from "@/components/ui/Mono";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import type { Locale } from "@/lib/locales";

const KEYS = ["hours", "insurance", "international", "directions"] as const;

export function VisitPanel({ locale }: { locale: Locale }) {
  const t = useTranslations("home.visit");
  return (
    <section className="bg-[color:var(--color-paper-2)]">
      <div className="page-gutter section-y mx-auto w-full max-w-[var(--content-max)]">
        <EditorialSplit
          ratio="1-1"
          left={
            <PhotoPlaceholder
              tone="sand"
              caption={t("photoCaption")}
              ratio="hero"
              radius="sm"
              image={{
                src: "/images/contextual/home-visit.jpg",
                alt: "Hospital reception and information desk",
              }}
            />
          }
          right={
            <div>
              <Mono>{t("kicker")}</Mono>
              <h2 className="display-md mt-3 max-w-[18ch]">{t("title")}</h2>
              <ul className="mt-8 divide-y divide-[color:var(--color-line-soft)] border-y border-[color:var(--color-line-soft)]">
                {KEYS.map((k) => (
                  <li key={k} className="py-4">
                    <span className="block text-[15px] font-semibold tracking-[-0.005em]">
                      {t(`items.${k}.title`)}
                    </span>
                    <span className="body-sm mt-1 block text-[color:var(--color-ink-soft)]">
                      {t(`items.${k}.body`)}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/visit`}
                className="meta mt-6 inline-flex items-center gap-2 text-[color:var(--color-primary)] underline-offset-4 hover:underline"
              >
                {t("cta")}
              </Link>
            </div>
          }
        />
      </div>
    </section>
  );
}
