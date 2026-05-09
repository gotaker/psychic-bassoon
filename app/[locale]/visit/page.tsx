import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import type { Locale } from "@/lib/locales";

export default async function VisitPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <SiteHeader locale={locale} />
      <PlaceholderPage
        locale={locale}
        kicker={{ en: "PLAN YOUR VISIT", hi: "मुलाक़ात की तैयारी" }}
        headline={{
          en: "What you need to know before you come.",
          hi: "आने से पहले जानने योग्य बातें।",
        }}
        body={{
          en: (
            <>
              <p>
                OPD hours are Monday–Saturday, 08:00–20:00. Inpatient visiting hours are 11:00–13:00
                and 17:00–19:00. Emergency is open 24/7.
              </p>
              <p>
                We&apos;re cashless across 38 insurance networks including CGHS, ECHS, ESI, Star,
                Bajaj Allianz, and HDFC ERGO. Bring your insurance card and a photo ID.
              </p>
              <p>
                International patients: visa-letter assistance, airport pickup, and a dedicated
                coordinator are available — please call ahead.
              </p>
              <p>
                We&apos;re on NH-9 at the Hapur Bypass. A free shuttle runs between Hapur Junction
                and the main campus every 30 minutes.
              </p>
              <p>
                Full visit page rolls out in the coming weeks. For specific questions, please call
                the front desk.
              </p>
            </>
          ),
          hi: (
            <>
              <p>
                ओपीडी समय: सोमवार–शनिवार, ०८:००–२०:००। अंतर्रोगी मुलाक़ात: ११:००–१३:०० व
                १७:००–१९:००। आपातकाल हमेशा खुला है।
              </p>
              <p>
                हम ३८ बीमा नेटवर्क पर कैशलेस हैं — सीजीएचएस, ईसीएचएस, ईएसआई, स्टार, बजाज एलियांज़,
                एचडीएफसी एर्गो आदि। बीमा कार्ड व फ़ोटो आईडी साथ लाएँ।
              </p>
              <p>
                अंतरराष्ट्रीय रोगी: वीज़ा-पत्र, हवाई अड्डा पिकअप, समर्पित समन्वयक उपलब्ध — पहले से
                कॉल करें।
              </p>
              <p>
                एनएच-९ पर हापुड़ बाईपास के पास। हापुड़ जंक्शन से मुख्य परिसर तक हर ३० मिनट में
                निःशुल्क शटल चलती है।
              </p>
              <p>
                विस्तृत पृष्ठ आगामी सप्ताहों में। विशिष्ट प्रश्नों के लिए स्वागत डेस्क पर कॉल करें।
              </p>
            </>
          ),
        }}
      />
      <SiteFooter locale={locale} />
      <StickyCtaBar locale={locale} />
    </>
  );
}
