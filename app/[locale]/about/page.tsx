import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { LeadershipGrid } from "@/components/about/LeadershipGrid";
import { VisionMission } from "@/components/about/VisionMission";
import type { Locale } from "@/lib/locales";

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <SiteHeader locale={locale} />
      <PlaceholderPage
        locale={locale}
        kicker={{ en: "ABOUT", hi: "हमारे बारे में" }}
        headline={{
          en: "Sixty-eight years, one institution.",
          hi: "अड़सठ वर्ष, एक संस्थान।",
        }}
        body={{
          en: (
            <>
              <p>
                Dev Nandini Hospital was founded in 1958 by a single physician seeing patients out
                of a converted bungalow in Hapur. It is now a 540-bed multi-specialty hospital with
                184 consultants across 28 specialties, an attached medical college, and an active
                clinical-research programme.
              </p>
              <p>
                NABH, NABL, NMC, and ISO 15189 accredited. Full leadership, history, and annual
                report rolling out post-launch.
              </p>
            </>
          ),
          hi: (
            <>
              <p>
                देव नंदिनी अस्पताल की स्थापना १९५८ में हापुड़ में एक चिकित्सक ने एक रूपांतरित बंगले से
                शुरू की थी। आज यह ५४० बिस्तरों का बहु-विशेषज्ञ अस्पताल है — २८ विशेषज्ञताओं में १८४
                परामर्शदाता, संलग्न मेडिकल कॉलेज, सक्रिय अनुसंधान कार्यक्रम।
              </p>
              <p>
                NABH, NABL, NMC, ISO 15189 मान्यता प्राप्त। नेतृत्व, इतिहास, वार्षिक रिपोर्ट लॉन्च के
                बाद विस्तार से।
              </p>
            </>
          ),
        }}
        showCallCta={false}
      />
      <VisionMission locale={locale} />
      <LeadershipGrid locale={locale} />
      <SiteFooter locale={locale} />
      <StickyCtaBar locale={locale} />
    </>
  );
}
