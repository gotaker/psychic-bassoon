import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { LocationsBand } from "@/components/home/LocationsBand";
import { Mono } from "@/components/ui/Mono";
import type { Locale } from "@/lib/locales";

export default async function LocationsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SiteHeader locale={locale} />
      <main>
        <section className="bg-white">
          <div className="page-gutter mx-auto w-full max-w-[var(--content-max)] py-12 md:py-16">
            <Mono>{locale === "hi" ? "स्थान" : "LOCATIONS"}</Mono>
            <h1 className="display-lg mt-4 max-w-[20ch]">
              {locale === "hi" ? "तीन भवन, एक संस्थान।" : "Three buildings, one institution."}
            </h1>
          </div>
        </section>
        <LocationsBand locale={locale} />
      </main>
      <SiteFooter locale={locale} />
      <StickyCtaBar locale={locale} />
    </>
  );
}
