import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import type { Locale } from "@/lib/locales";

export default async function GivingPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <SiteHeader locale={locale} />
      <PlaceholderPage
        locale={locale}
        kicker={{ en: "GIVING", hi: "दान" }}
        headline={{
          en: "Care that has been here since 1958. Help keep it here.",
          hi: "१९५८ से यहीं है यह देखभाल। इसे बनाए रखने में सहायता करें।",
        }}
        body={{
          en: (
            <p>
              80G-eligible donations support our charity-care fund, the cardiac wing's cath-lab,
              and the medical college's scholarship programme. Email{" "}
              <a className="underline underline-offset-4" href="mailto:trust@dnh.in">
                trust@dnh.in
              </a>{" "}
              or call the front desk for a one-page giving brief. A full giving page rolls out
              post-launch.
            </p>
          ),
          hi: (
            <p>
              80G पात्र दान — चैरिटी-केयर निधि, हृदय विंग की कैथ-लैब, मेडिकल कॉलेज छात्रवृत्ति। ईमेल
              करें{" "}
              <a className="underline underline-offset-4" href="mailto:trust@dnh.in">
                trust@dnh.in
              </a>{" "}
              या स्वागत डेस्क पर कॉल करें। विस्तृत पृष्ठ लॉन्च के बाद।
            </p>
          ),
        }}
      />
      <SiteFooter locale={locale} />
      <StickyCtaBar locale={locale} />
    </>
  );
}
