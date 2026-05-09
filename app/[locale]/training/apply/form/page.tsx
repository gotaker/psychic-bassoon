import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { ApplicationFormFillable } from "@/components/training/ApplicationFormFillable";
import { Mono } from "@/components/ui/Mono";
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
      ? "FOGSI प्रशिक्षण आवेदन फ़ॉर्म — देव नंदिनी अस्पताल"
      : "FOGSI training application form — Dev Nandini Hospital",
    description: isHi
      ? "FOGSI बाँझपन प्रशिक्षण के लिए मानक आवेदन फ़ॉर्म — स्क्रीन पर भरें, फिर प्रिंट या ईमेल करें।"
      : "Standard application form for FOGSI infertility training — fill on screen, then print or email.",
    alternates: {
      canonical: `/${locale}/training/apply/form`,
      languages: {
        en: "/en/training/apply/form",
        hi: "/hi/training/apply/form",
        "x-default": "/en/training/apply/form",
      },
    },
  };
}

export default async function ApplicationFormPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <div className="print:hidden">
        <SiteHeader locale={locale} />
      </div>
      <ApplicationFormMain locale={locale} />
      <div className="print:hidden">
        <SiteFooter locale={locale} />
        <StickyCtaBar locale={locale} />
      </div>
    </>
  );
}

function ApplicationFormMain({ locale }: { locale: Locale }) {
  const t = useTranslations("training");
  return (
    <main className="bg-[color:var(--color-paper)] print:bg-white">
      <section className="page-gutter mx-auto w-full max-w-[var(--content-max)] py-16 md:py-24 print:hidden">
        <Link
          href={`/${locale}/training/apply`}
          className="meta inline-flex items-center gap-1.5 text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-primary)]"
        >
          {t("applicationForm.backCta")}
        </Link>
        <div className="mt-6">
          <Mono>{t("applicationForm.kicker")}</Mono>
          <h1 className="display-lg mt-3 max-w-[20ch]">{t("applicationForm.title")}</h1>
          <p className="lede mt-6 max-w-[60ch]">{t("applicationForm.lede")}</p>
        </div>
      </section>

      <ApplicationFormFillable locale={locale} />
    </main>
  );
}
