import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { Button } from "@/components/ui/Button";
import { Mono } from "@/components/ui/Mono";
import { TRAINING_COURSES, type TrainingCourseRecord } from "@/content/training";
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
      ? "FOGSI बाँझपन प्रशिक्षण पाठ्यक्रम — देव नंदिनी अस्पताल"
      : "FOGSI infertility training syllabus — Dev Nandini Hospital",
    description: isHi
      ? "देव नंदिनी में पढ़ाए जाने वाले तीन FOGSI-मान्यता प्राप्त बाँझपन प्रशिक्षण पाठ्यक्रमों का दिन-वार पाठ्यक्रम।"
      : "Day-by-day syllabus of the three FOGSI-recognised infertility training courses taught at Dev Nandini.",
    alternates: {
      canonical: `/${locale}/training/curriculum`,
      languages: {
        en: "/en/training/curriculum",
        hi: "/hi/training/curriculum",
        "x-default": "/en/training/curriculum",
      },
    },
  };
}

export default async function CurriculumPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <SiteHeader locale={locale} />
      <CurriculumMain locale={locale} />
      <SiteFooter />
      <StickyCtaBar locale={locale} />
    </>
  );
}

function CurriculumMain({ locale }: { locale: Locale }) {
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
          <Mono>{t("curriculum.kicker")}</Mono>
          <h1 className="display-lg mt-3 max-w-[20ch]">{t("curriculum.title")}</h1>
          <p className="lede mt-6 max-w-[60ch]">{t("curriculum.lede")}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="primary" size="md" href={`/${locale}/training/apply`}>
            {t("curriculum.applyCta")}
          </Button>
        </div>
      </section>

      {TRAINING_COURSES.map((course) => (
        <CourseSection
          key={course.id}
          course={course}
          locale={locale}
          formatFee={(n) => feeFormatter.format(n)}
        />
      ))}
    </main>
  );
}

function CourseSection({
  course,
  locale,
  formatFee,
}: {
  course: TrainingCourseRecord;
  locale: Locale;
  formatFee: (n: number) => string;
}) {
  const t = useTranslations("training");
  return (
    <section
      id={course.id}
      className="border-t border-[color:var(--color-line-soft)] bg-[color:var(--color-paper-2)]"
    >
      <div className="page-gutter section-y mx-auto w-full max-w-[var(--content-max)]">
        <header className="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Mono>{course.duration[locale]}</Mono>
            <h2 className="display-md mt-3 max-w-[18ch]">{course.title[locale]}</h2>
            <p className="lede mt-5 max-w-[56ch]">{course.summary[locale]}</p>
          </div>
          <aside className="flex flex-col items-start justify-end gap-4 md:items-end md:text-right">
            <span className="meta tracking-[0.12em] text-[color:var(--color-ink-soft)] uppercase">
              {t("curriculum.courseFee", { amount: formatFee(course.feeINR) })}
            </span>
            <Button variant="primary" size="md" href={`/${locale}/training/apply#${course.id}`}>
              {t("curriculum.applyCta")}
            </Button>
          </aside>
        </header>

        <ol className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-line-soft)] bg-[color:var(--color-line-soft)] sm:grid-cols-2">
          {course.days.map((d) => (
            <li
              key={`${course.id}-${d.day}`}
              className="flex flex-col gap-4 bg-[color:var(--color-paper)] p-6"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span
                  className="leading-none"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: 28,
                    fontWeight: 500,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {t("shared.day", { n: d.day })}
                </span>
              </div>
              <div>
                <span className="meta block tracking-[0.12em] text-[color:var(--color-ink-soft)] uppercase">
                  {t("shared.lectures")}
                </span>
                <ul className="mt-2 space-y-1.5">
                  {d.lectures.map((l, i) => (
                    <li
                      key={i}
                      className="body-sm relative pl-4 text-[color:var(--color-ink)] before:absolute before:top-[0.55em] before:left-0 before:h-1 before:w-1 before:rounded-full before:bg-[color:var(--color-ink-soft)]"
                    >
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="meta block tracking-[0.12em] text-[color:var(--color-ink-soft)] uppercase">
                  {t("shared.liveTraining")}
                </span>
                <p className="body-sm mt-2 text-[color:var(--color-ink)]">{d.liveTraining}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
