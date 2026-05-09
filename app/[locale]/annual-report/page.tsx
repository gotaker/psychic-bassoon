import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import type { Locale } from "@/lib/locales";

export default async function AnnualReportPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <SiteHeader locale={locale} />
      <PlaceholderPage
        locale={locale}
        kicker={{ en: "ANNUAL REPORT", hi: "वार्षिक रिपोर्ट" }}
        headline={{
          en: "FY 2025–26 report is in production.",
          hi: "वित्त वर्ष २०२५–२६ की रिपोर्ट तैयार हो रही है।",
        }}
        body={{
          en: (
            <p>
              The full PDF lands here in the coming weeks. For specific data — clinical outcomes,
              research output, financials — call the front desk and ask for the trust office, or
              email{" "}
              <a className="underline underline-offset-4" href="mailto:trust@dnh.in">
                trust@dnh.in
              </a>
              .
            </p>
          ),
          hi: (
            <p>
              पूर्ण पीडीएफ़ आगामी सप्ताहों में यहाँ उपलब्ध होगी। विशिष्ट डेटा — नैदानिक परिणाम, अनुसंधान,
              वित्तीय — के लिए स्वागत डेस्क पर कॉल करके ट्रस्ट कार्यालय से बात करें, या{" "}
              <a className="underline underline-offset-4" href="mailto:trust@dnh.in">
                trust@dnh.in
              </a>{" "}
              पर ईमेल करें।
            </p>
          ),
        }}
      />
      <SiteFooter />
      <StickyCtaBar locale={locale} />
    </>
  );
}
