import type { Metadata } from "next";
import Script from "next/script";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/locales";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { BloodBankHero } from "@/components/blood-bank/BloodBankHero";
import { AccreditationStrip } from "@/components/blood-bank/AccreditationStrip";
import { ServicesGrid } from "@/components/blood-bank/ServicesGrid";
import { DonateLane } from "@/components/blood-bank/DonateLane";
import { RequestLane } from "@/components/blood-bank/RequestLane";
import { FAQ } from "@/components/blood-bank/FAQ";
import { BloodBankContact } from "@/components/blood-bank/BloodBankContact";
import { bloodBank } from "@/content/blood-bank";
import { bloodBankServiceLD } from "@/lib/structured-data";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "bloodBank" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: `/${locale}/blood-bank`,
      languages: {
        en: "/en/blood-bank",
        hi: "/hi/blood-bank",
        "x-default": "/en/blood-bank",
      },
    },
  };
}

export default async function BloodBankPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);

  return (
    <>
      <Script
        id="ld-blood-bank"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(bloodBankServiceLD(typedLocale))}
      </Script>
      <SiteHeader locale={typedLocale} />
      <main>
        <BloodBankHero locale={typedLocale} hero={bloodBank.hero} />
        <AccreditationStrip accreditations={bloodBank.accreditations} />
        <ServicesGrid locale={typedLocale} services={bloodBank.services} />
        <DonateLane locale={typedLocale} donate={bloodBank.donate} />
        <RequestLane locale={typedLocale} request={bloodBank.request} />
        <FAQ locale={typedLocale} items={bloodBank.faq} />
        <BloodBankContact locale={typedLocale} contact={bloodBank.contact} />
      </main>
      <SiteFooter locale={locale} />
      <StickyCtaBar locale={typedLocale} />
    </>
  );
}
