import Link from "next/link";
import { useTranslations } from "next-intl";
import { EditorialSplit } from "@/components/layout/EditorialSplit";
import { Mono } from "@/components/ui/Mono";
import { Button } from "@/components/ui/Button";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import type { Locale } from "@/lib/locales";

export function Hero({ locale }: { locale: Locale }) {
  const tHero = useTranslations("home.hero");
  const tCta = useTranslations("cta");
  return (
    <section className="bg-[color:var(--color-paper)]">
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)] py-16 md:py-24">
        <EditorialSplit
          ratio="1.15-1"
          left={
            <>
              <Mono>{tHero("eyebrow")}</Mono>
              <h1 className="display-xl mt-4 max-w-[14ch]">{tHero("title")}</h1>
              <p className="lede mt-6 max-w-[52ch]">{tHero("sub")}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="primary" size="lg" href={`/${locale}/book`}>
                  {tCta("book")}
                </Button>
                <Link
                  href={`/${locale}/find-a-doctor`}
                  className="meta inline-flex items-center gap-2 text-[14px] underline-offset-4 hover:underline"
                >
                  {tCta("findDoctor")} →
                </Link>
              </div>
            </>
          }
          right={
            <PhotoPlaceholder
              tone="mocha"
              caption={tHero("photoCaption")}
              overlay={tHero("photoOverlay")}
              ratio="hero"
              radius="sm"
              image={{
                src: "/images/hospital/west-wing.webp",
                alt: "Dev Nandini Hospital — west wing",
                priority: true,
              }}
            />
          }
        />
      </div>
    </section>
  );
}
