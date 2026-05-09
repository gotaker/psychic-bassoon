import type { Metadata } from "next";
import Script from "next/script";
import { setRequestLocale } from "next-intl/server";
import { medicalOrganizationLD } from "@/lib/structured-data";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { Hero } from "@/components/home/Hero";
import { ActionStrip } from "@/components/home/ActionStrip";
import { InlineFindDoctor } from "@/components/home/InlineFindDoctor";
import { AccreditationsMarquee } from "@/components/home/AccreditationsMarquee";
import { PhotoStrip } from "@/components/home/PhotoStrip";
import { StatsBand } from "@/components/home/StatsBand";
import { VisitPanel } from "@/components/home/VisitPanel";
import { TrainingCentreSplit } from "@/components/home/TrainingCentreSplit";
import { NewsGrid } from "@/components/home/NewsGrid";
import { Quote } from "@/components/home/Quote";
import { LocationsBand } from "@/components/home/LocationsBand";
import type { Locale } from "@/lib/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isHi = locale === "hi";
  return {
    title: isHi
      ? "देव नंदिनी अस्पताल — हापुड़ में 1958 से"
      : "Dev Nandini Hospital — Caring for Hapur since 1958",
    description: isHi
      ? "540 बिस्तर, 28 विशेषज्ञताएँ, 184 चिकित्सक। NABH, NABL, NMC, ISO 15189 मान्यता प्राप्त।"
      : "540 beds. 28 specialties. 184 named consultants. NABH, NABL, NMC, and ISO 15189 accredited.",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        hi: "/hi",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "hi" ? "hi_IN" : "en_IN",
      siteName: "Dev Nandini Hospital",
    },
  };
}

// Homepage composition matches DESIGN.md §6 anatomy in order.
// Drops `IAm` (defined but unrendered in prototype Hybrid).
export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Script id="ld-org" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(medicalOrganizationLD(locale))}
      </Script>
      <SiteHeader locale={locale} />
      <main>
        <Hero locale={locale} />
        <ActionStrip locale={locale} />
        <InlineFindDoctor locale={locale} />
        <AccreditationsMarquee />
        <VisitPanel locale={locale} />
        <PhotoStrip />
        <StatsBand locale={locale} />
        <TrainingCentreSplit />
        <NewsGrid locale={locale} />
        <Quote />
        <LocationsBand locale={locale} />
      </main>
      <SiteFooter />
      <StickyCtaBar locale={locale} />
    </>
  );
}
