import Link from "next/link";
import type { Department, DepartmentDetail, Doctor } from "@/content/types";
import { EditorialSplit } from "@/components/layout/EditorialSplit";
import { Mono } from "@/components/ui/Mono";
import { Button } from "@/components/ui/Button";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { CheckIcon, BackIcon } from "@/components/icons";
import { DoctorCard } from "@/components/doctor/DoctorCard";
import type { Locale } from "@/lib/locales";

type DepartmentTemplateProps = {
  locale: Locale;
  department: Department;
  detail: DepartmentDetail | null;
  consultants: Doctor[];
  index: number; // 1-based for the "12 / 28" kicker
};

export function DepartmentTemplate({
  locale,
  department,
  detail,
  consultants,
  index,
}: DepartmentTemplateProps) {
  const total = 28;

  return (
    <main>
      {/* Hero */}
      <section className="bg-white">
        <div className="page-gutter mx-auto w-full max-w-[var(--content-max)]">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 pt-6 text-[12px] text-[color:var(--color-ink-soft)]"
          >
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-1.5 hover:text-[color:var(--color-ink)]"
            >
              <BackIcon size={12} /> {locale === "hi" ? "होम" : "Home"}
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href={`/${locale}/departments`}
              className="hover:text-[color:var(--color-ink)]"
            >
              {locale === "hi" ? "विभाग" : "Departments"}
            </Link>
            <span aria-hidden="true">·</span>
            <span className="text-[color:var(--color-ink)]">{department.name[locale]}</span>
          </nav>
          <div className="py-10 md:py-16">
            <EditorialSplit
              ratio="1-1"
              left={
                <>
                  <Mono>
                    {locale === "hi"
                      ? `विभाग — ${index} / ${total}`
                      : `DEPARTMENT — ${index} / ${total}`}
                  </Mono>
                  <h1 className="display-xl mt-4 max-w-[14ch]">
                    {detail ? detail.hero.headline[locale] : department.name[locale]}.
                  </h1>
                  <p className="lede mt-6 max-w-[52ch]">
                    {detail ? detail.hero.lede[locale] : department.tagline[locale]}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button variant="primary" size="lg" href={`/${locale}/book`}>
                      {locale === "hi" ? "परामर्श बुक करें" : "Book a consultation"}
                    </Button>
                    <Link
                      href={`/${locale}/find-a-doctor?spec=${department.slug}`}
                      className="meta inline-flex items-center gap-2 text-[14px] underline-offset-4 hover:underline"
                    >
                      {locale === "hi"
                        ? `सभी ${consultants.length} चिकित्सक देखें`
                        : `See all ${consultants.length} consultants`}{" "}
                      →
                    </Link>
                  </div>
                </>
              }
              right={
                detail ? (
                  <PhotoPlaceholder
                    tone={detail.hero.photoTone}
                    caption={detail.hero.photoCaption[locale]}
                    overlay={detail.hero.photoOverlay[locale]}
                    ratio="hero"
                    radius="sm"
                  />
                ) : (
                  <PhotoPlaceholder
                    tone="slate"
                    caption={
                      locale === "hi"
                        ? `${department.name.hi} · विभाग`
                        : `${department.name.en.toUpperCase()} · DEPARTMENT`
                    }
                    ratio="hero"
                    radius="sm"
                  />
                )
              }
            />
          </div>
        </div>
      </section>

      {/* Procedures (only if hasFullDetail) */}
      {detail ? (
        <section className="bg-[color:var(--color-paper)]">
          <div className="page-gutter mx-auto w-full max-w-[var(--content-max)] section-y">
            <header className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
              <div>
                <Mono>{locale === "hi" ? "हमारा कार्य" : "WHAT WE DO"}</Mono>
                <h2 className="display-md mt-3 max-w-[24ch]">
                  {locale === "hi"
                    ? "छह प्रक्रिया-धाराएँ, एक छत के नीचे।"
                    : "Six procedural lines, all under one roof."}
                </h2>
              </div>
              <a
                href="#"
                className="meta inline-flex items-center gap-1.5 text-[color:var(--color-primary)] underline-offset-4 hover:underline"
              >
                {locale === "hi" ? "उपचार गाइड (PDF)" : "Treatment guide (PDF)"} →
              </a>
            </header>
            <ul className="grid grid-cols-1 border-t border-l border-[color:var(--color-line-soft)] sm:grid-cols-2 lg:grid-cols-3">
              {detail.procedures.map((proc, i) => (
                <li
                  key={proc.id}
                  className="border-r border-b border-[color:var(--color-line-soft)] bg-white px-7 py-7"
                >
                  <Mono className="block">{String(i + 1).padStart(2, "0")}</Mono>
                  <h3 className="mt-3 text-[18px] font-semibold leading-tight tracking-[-0.005em]">
                    {proc.title[locale]}
                  </h3>
                  <p
                    className="mt-3 text-[color:var(--color-deep)]"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: 24,
                      lineHeight: 1,
                      letterSpacing: "-0.01em",
                      fontWeight: 500,
                    }}
                  >
                    {proc.annualVolume[locale]}
                  </p>
                  <p className="body-sm mt-3 text-[color:var(--color-ink-soft)]">
                    {proc.description[locale]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Outcomes (only if hasFullDetail) */}
      {detail ? (
        <section
          data-tone="deep"
          className="bg-[color:var(--color-deep)] text-white"
        >
          <div className="page-gutter mx-auto w-full max-w-[var(--content-max)] section-y">
            <header className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
              <div>
                <Mono className="text-[color:var(--color-accent)]">
                  {locale === "hi"
                    ? "परिणाम — अप्रैल २०२५ → मार्च २०२६"
                    : "OUTCOMES — APRIL 2025 → MARCH 2026"}
                </Mono>
                <h2 className="display-md mt-3 max-w-[28ch]">
                  {locale === "hi"
                    ? "हम जो मापते हैं, उसे प्रकाशित करते हैं।"
                    : "We publish what we measure."}
                </h2>
              </div>
              <a
                href={`/${locale}/annual-report`}
                className="meta border-b border-white/40 pb-0.5 text-white/85 hover:text-white"
              >
                {locale === "hi" ? "वार्षिक रिपोर्ट" : "Annual report"} →
              </a>
            </header>
            <ul className="grid grid-cols-1 border-t border-white/15 md:grid-cols-2 lg:grid-cols-4">
              {detail.outcomes.map((o) => (
                <li
                  key={o.id}
                  className="border-r border-b border-white/15 px-6 py-7"
                >
                  <span className="meta uppercase tracking-[0.14em] text-white/60">
                    {o.kicker[locale]}
                  </span>
                  <p
                    className="mt-3 leading-[0.95] tracking-[-0.025em]"
                    style={{ fontFamily: "var(--font-serif)", fontSize: 56, fontWeight: 500 }}
                  >
                    {o.value[locale]}
                  </p>
                  <p className="body-sm mt-4 text-white/85">{o.description[locale]}</p>
                  <p className="meta mt-3 italic text-white/50">{o.benchmark[locale]}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* Consultants */}
      <section className="bg-white">
        <div className="page-gutter mx-auto w-full max-w-[var(--content-max)] section-y">
          <Mono>
            {locale === "hi"
              ? `चिकित्सक — ${department.name.hi} में ${new Intl.NumberFormat("hi-IN-u-nu-deva").format(consultants.length)}`
              : `CONSULTANTS — ${consultants.length} IN ${department.name.en.toUpperCase()}`}
          </Mono>
          <header className="mt-3 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
            <h2 className="display-md max-w-[24ch]">
              {consultants.length === 0
                ? locale === "hi"
                  ? "विस्तृत प्रोफ़ाइल जल्द ही।"
                  : "Full profile coming soon."
                : locale === "hi"
                  ? "इस सप्ताह उपलब्ध चिकित्सक।"
                  : "Consultants you can see this week."}
            </h2>
            <Link
              href={`/${locale}/find-a-doctor?spec=${department.slug}`}
              className="meta inline-flex items-center gap-1.5 text-[color:var(--color-primary)] underline-offset-4 hover:underline"
            >
              {locale === "hi" ? "पूरी टीम" : "See full team"} →
            </Link>
          </header>
          {consultants.length === 0 ? (
            <p className="lede mt-8 max-w-[60ch] text-[color:var(--color-ink-soft)]">
              {locale === "hi"
                ? "इस विशेषज्ञता हेतु अपॉइंटमेंट के लिए कृपया स्वागत डेस्क पर कॉल करें — +91 80 4422 0099।"
                : "For appointments in this specialty, please call the front desk — +91 80 4422 0099."}
            </p>
          ) : (
            <ul className="mt-8 grid gap-4 lg:grid-cols-2">
              {consultants.slice(0, 4).map((d) => (
                <li key={d.id}>
                  <DoctorCard doctor={d} locale={locale} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* When to come (only if hasFullDetail) */}
      {detail ? (
        <section className="bg-[color:var(--color-paper-2)]">
          <div className="page-gutter mx-auto w-full max-w-[var(--content-max)] section-y">
            <EditorialSplit
              ratio="1-1"
              left={
                <>
                  <Mono>{locale === "hi" ? "कब आएँ" : "WHEN TO COME"}</Mono>
                  <h2 className="display-md mt-3 max-w-[18ch]">
                    {detail.whenToCome.headline[locale]}
                  </h2>
                </>
              }
              right={
                <ul className="border-t border-[color:var(--color-line-soft)]">
                  {detail.whenToCome.redFlags.map((flag, i) => (
                    <li
                      key={i}
                      className="flex gap-4 border-b border-[color:var(--color-line-soft)] py-4"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex-shrink-0 text-[color:var(--color-primary)]"
                      >
                        <CheckIcon size={16} />
                      </span>
                      <span className="text-[16px] leading-snug tracking-[-0.005em]">
                        {flag[locale]}
                      </span>
                    </li>
                  ))}
                </ul>
              }
            />
          </div>
        </section>
      ) : null}
    </main>
  );
}
