import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import type { Locale } from "@/lib/locales";

export default async function CareersPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <SiteHeader locale={locale} />
      <PlaceholderPage
        locale={locale}
        kicker={{ en: "CAREERS", hi: "करियर" }}
        headline={{
          en: "Work where the bedside is the syllabus.",
          hi: "जहाँ रोगी का बिस्तर ही पाठ्यक्रम है, वहीं काम करें।"
        }}
        body={{
          en: (
            <p>
              We're hiring across nursing, allied-health, and consultancy roles. Send a CV to{" "}
              <a className="underline underline-offset-4" href="mailto:careers@dnh.in">
                careers@dnh.in
              </a>{" "}
              or call the front desk to ask for the HR office. A full careers page rolls out
              post-launch.
            </p>
          ),
          hi: (
            <p>
              हम नर्सिंग, सहायक चिकित्सकीय व परामर्श भूमिकाओं के लिए नियुक्ति कर रहे हैं। CV भेजें{" "}
              <a className="underline underline-offset-4" href="mailto:careers@dnh.in">
                careers@dnh.in
              </a>{" "}
              पर या स्वागत डेस्क पर कॉल करके HR से जुड़ें। विस्तृत पृष्ठ लॉन्च के बाद।
            </p>
          ),
        }}
      />
      <SiteFooter locale={locale} />
      <StickyCtaBar locale={locale} />
    </>
  );
}
