import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { Button } from "@/components/ui/Button";
import { Mono } from "@/components/ui/Mono";
import { TRAINING_COURSES, TRAINING_ENQUIRY_EMAIL } from "@/content/training";
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
      ? "FOGSI बाँझपन प्रशिक्षण के लिए आवेदन — देव नंदिनी अस्पताल"
      : "Apply — FOGSI infertility training at Dev Nandini Hospital",
    description: isHi
      ? "देव नंदिनी अस्पताल में FOGSI-मान्यता प्राप्त बाँझपन प्रशिक्षण के लिए पात्रता, शुल्क, और आवेदन प्रक्रिया।"
      : "Eligibility, fees, and application process for FOGSI-recognised infertility training at Dev Nandini Hospital.",
    alternates: {
      canonical: `/${locale}/training/apply`,
      languages: {
        en: "/en/training/apply",
        hi: "/hi/training/apply",
        "x-default": "/en/training/apply",
      },
    },
  };
}

export default async function ApplyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <SiteHeader locale={locale} />
      <ApplyMain locale={locale} />
      <SiteFooter locale={locale} />
      <StickyCtaBar locale={locale} />
    </>
  );
}

const PROCESS_STEPS = ["step1", "step2", "step3", "step4"] as const;

function ApplyMain({ locale }: { locale: Locale }) {
  const t = useTranslations("training");
  const feeFormatter = new Intl.NumberFormat(locale === "hi" ? "hi-IN" : "en-IN");

  return (
    <main className="bg-[color:var(--color-paper)]">
      <section className="page-gutter mx-auto w-full max-w-[var(--content-max)] py-16 md:py-24">
        <Link
          href={`/${locale}`}
          className="meta inline-flex items-center gap-1.5 text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-primary)]"
        >
          {t("back")}
        </Link>
        <div className="mt-6">
          <Mono>{t("apply.kicker")}</Mono>
          <h1 className="display-lg mt-3 max-w-[18ch]">{t("apply.title")}</h1>
          <p className="lede mt-6 max-w-[60ch]">{t("apply.lede")}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="primary" size="md" href={`/${locale}/training/apply/form`}>
            {t("apply.downloadCta")}
          </Button>
          <Button variant="ghost" size="md" href={`/${locale}/training/curriculum`}>
            {t("apply.syllabusCta")}
          </Button>
        </div>
      </section>

      <section className="border-t border-[color:var(--color-line-soft)] bg-[color:var(--color-paper-2)]">
        <div className="page-gutter section-y mx-auto w-full max-w-[var(--content-max)]">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <div>
              <Mono>{t("apply.eligibilityKicker")}</Mono>
              <h2 className="display-sm mt-3">{t("apply.eligibilityKicker")}</h2>
            </div>
            <p className="lede max-w-[58ch]">{t("apply.eligibility")}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--color-line-soft)] bg-[color:var(--color-paper)]">
        <div className="page-gutter section-y mx-auto w-full max-w-[var(--content-max)]">
          <Mono>{t("apply.feesKicker")}</Mono>
          <ul className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-line-soft)] bg-[color:var(--color-line-soft)] sm:grid-cols-3">
            {TRAINING_COURSES.map((c) => (
              <li
                key={c.id}
                id={c.id}
                className="flex flex-col gap-3 bg-[color:var(--color-paper)] p-6"
              >
                <span className="meta tracking-[0.12em] text-[color:var(--color-ink-soft)] uppercase">
                  {c.duration[locale]}
                </span>
                <span className="text-[15px] font-semibold tracking-[-0.005em] text-[color:var(--color-ink)]">
                  {c.title[locale]}
                </span>
                <span
                  className="leading-none text-[color:var(--color-ink)]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 30,
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t("apply.feeUnit")} {feeFormatter.format(c.feeINR)}
                </span>
              </li>
            ))}
          </ul>
          <p className="body-sm mt-6 max-w-[68ch] text-[color:var(--color-ink-soft)]">
            {t("apply.feesNote")}
          </p>
        </div>
      </section>

      <section className="border-t border-[color:var(--color-line-soft)] bg-[color:var(--color-paper-2)]">
        <div className="page-gutter section-y mx-auto w-full max-w-[var(--content-max)]">
          <Mono>{t("apply.processKicker")}</Mono>
          <ol className="mt-8 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
            {PROCESS_STEPS.map((step, i) => (
              <li key={step} className="flex gap-5">
                <span
                  className="shrink-0 leading-none text-[color:var(--color-primary)]"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 32,
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="body-sm pt-1 text-[color:var(--color-ink)]">
                  {t(`apply.process.${step}`)}
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Button variant="primary" size="md" href={`/${locale}/training/apply/form`}>
              {t("apply.downloadCta")}
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-[color:var(--color-line-soft)] bg-[color:var(--color-deep)] text-white">
        <div className="page-gutter section-y mx-auto flex w-full max-w-[var(--content-max)] flex-col">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
            <div>
              <Mono>{t("apply.enquireKicker")}</Mono>
              <h2 className="display-sm mt-3 text-white">{t("apply.enquireKicker")}</h2>
            </div>
            <div className="max-w-[58ch]">
              <p className="lede text-white/85">{t("apply.enquireBody")}</p>
              <a
                href={`mailto:${TRAINING_ENQUIRY_EMAIL}`}
                className="meta mt-6 inline-flex items-center gap-2 text-[color:var(--color-accent)] underline-offset-4 hover:underline"
              >
                {t("apply.enquireCta", { email: TRAINING_ENQUIRY_EMAIL })} →
              </a>
            </div>
          </div>
          <div className="mt-16 border-t border-white/15 pt-8 md:mt-24">
            <Mono>{t("apply.disclaimerKicker")}</Mono>
            <p className="body-sm mt-4 max-w-[80ch] text-white/65">
              {t("apply.disclaimer")}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
