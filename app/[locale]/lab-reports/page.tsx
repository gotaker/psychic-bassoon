import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import type { Locale } from "@/lib/locales";

export default async function LabReportsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <SiteHeader locale={locale} />
      <PlaceholderPage
        locale={locale}
        kicker={{ en: "LAB REPORTS", hi: "लैब रिपोर्ट" }}
        headline={{
          en: "Soon. For now, please call the front desk.",
          hi: "जल्द ही उपलब्ध। अभी, कृपया स्वागत डेस्क पर कॉल करें।",
        }}
        body={{
          en: (
            <>
              <p>
                We&apos;re integrating online lab-report retrieval. Until that&apos;s live, the
                front-desk team can read your report to you over the phone or have a copy ready for
                collection from Block A reception.
              </p>
              <p>Bring your report ID (printed on the test slip) and a photo ID.</p>
            </>
          ),
          hi: (
            <>
              <p>
                ऑनलाइन लैब-रिपोर्ट प्रणाली एकीकृत हो रही है। तब तक स्वागत डेस्क टीम फ़ोन पर रिपोर्ट
                पढ़ सकती है, या आप ब्लॉक A स्वागत से प्रति ले सकते हैं।
              </p>
              <p>रिपोर्ट आईडी (टेस्ट स्लिप पर) व फ़ोटो आईडी साथ लाएँ।</p>
            </>
          ),
        }}
      />
      <SiteFooter locale={locale} />
      <StickyCtaBar locale={locale} />
    </>
  );
}
