import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import type { Locale } from "@/lib/locales";

export default async function PayBillPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <SiteHeader locale={locale} />
      <PlaceholderPage
        locale={locale}
        kicker={{ en: "PAY BILL", hi: "बिल भुगतान" }}
        headline={{
          en: "Soon. For now, please pay at the cashier or call the front desk.",
          hi: "जल्द ही ऑनलाइन। अभी कैशियर पर या स्वागत डेस्क पर कॉल करके भुगतान करें।",
        }}
        body={{
          en: (
            <>
              <p>
                Online billing is in integration. Until then, you can pay at the Block A cashier
                desk (cash, card, UPI) Mon–Sat 08:00–20:00, or call the front desk to arrange
                phone-based UPI billing.
              </p>
              <p>
                For cashless insurance pre-auth, please ask for the TPA help-desk on extension 224.
              </p>
            </>
          ),
          hi: (
            <>
              <p>
                ऑनलाइन बिलिंग एकीकरण में है। तब तक ब्लॉक A कैशियर डेस्क (नकद, कार्ड, यूपीआई) सोम–शनि
                ०८:००–२०:०० पर या स्वागत डेस्क पर कॉल करके फ़ोन-आधारित यूपीआई भुगतान करें।
              </p>
              <p>कैशलेस बीमा प्री-ऑथ के लिए एक्सटेंशन २२४ पर TPA हेल्प-डेस्क से जुड़ें।</p>
            </>
          ),
        }}
      />
      <SiteFooter />
      <StickyCtaBar locale={locale} />
    </>
  );
}
