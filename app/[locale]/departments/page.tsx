import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { DepartmentsGrid } from "@/components/home/DepartmentsGrid";
import { Mono } from "@/components/ui/Mono";
import type { Locale } from "@/lib/locales";

export default async function DepartmentsIndexPage({
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
            <Mono>{locale === "hi" ? "विभाग" : "DEPARTMENTS"}</Mono>
            <h1 className="display-lg mt-4 max-w-[20ch]">
              {locale === "hi"
                ? "एक छत के नीचे अट्ठाईस विशेषज्ञताएँ।"
                : "Twenty-eight specialties under one roof."}
            </h1>
            <p className="lede mt-4 max-w-[60ch]">
              {locale === "hi"
                ? "हृदय रोग की पूर्ण प्रोफ़ाइल अभी उपलब्ध है। शेष विभागों में टीम और अगले अपॉइंटमेंट दिखाए गए हैं — पूर्ण विवरण आगामी सप्ताहों में।"
                : "Cardiology has its full profile up. The remaining specialties show consultants and next slots; full content rolls out in the coming weeks."}
            </p>
          </div>
        </section>
        <DepartmentsGrid locale={locale} />
      </main>
      <SiteFooter locale={locale} />
      <StickyCtaBar locale={locale} />
    </>
  );
}
