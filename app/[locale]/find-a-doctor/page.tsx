import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { Mono } from "@/components/ui/Mono";
import { DoctorCard } from "@/components/doctor/DoctorCard";
import { FilterBar } from "./_filter-bar";
import { doctors } from "@/content/doctors";
import { departments } from "@/content/departments";
import type { Locale } from "@/lib/locales";

type SearchParams = Record<string, string | string[] | undefined>;

function pickString(v: string | string[] | undefined): string | null {
  if (Array.isArray(v)) return v[0] ?? null;
  return v ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === "hi"
        ? "चिकित्सक खोजें — देव नंदिनी अस्पताल"
        : "Find a doctor — Dev Nandini Hospital",
    description:
      locale === "hi"
        ? "184 चिकित्सक, 28 विशेषज्ञताएँ। नाम, विशेषज्ञता या स्थिति से छाँटें।"
        : "184 consultants across 28 specialties. Filter by name, specialty, or condition.",
    alternates: {
      canonical: `/${locale}/find-a-doctor`,
      languages: {
        en: "/en/find-a-doctor",
        hi: "/hi/find-a-doctor",
        "x-default": "/en/find-a-doctor",
      },
    },
  };
}

export default async function FindADoctorPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);

  const q = (pickString(sp.q) ?? "").toLowerCase();
  const specSlug = pickString(sp.spec) ?? "all";
  const day = pickString(sp.day) ?? "any";

  const filtered = doctors.filter((d) => {
    const slugs = d.departmentSlugs as readonly string[];
    if (specSlug !== "all" && !slugs.includes(specSlug)) return false;
    if (q) {
      const hay = `${d.name[locale]} ${d.specialty[locale]} ${d.bio[locale]}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (day === "today" && !d.nextSlot[locale].toLowerCase().includes("today")) {
      // Heuristic v1: only English content has "today"; HI matches via either label.
      if (locale === "hi" && !d.nextSlot.hi.includes("आज")) return false;
      if (locale === "en" && !d.nextSlot.en.toLowerCase().includes("today")) return false;
    }
    return true;
  });

  // Build specialty options from the actual department list, restricted to
  // slugs that have at least one consultant in the v1 seed.
  const specialtySlugs = new Set<string>(doctors.flatMap((d) => d.departmentSlugs));
  const specialtyOptions = [
    { value: "all", label: locale === "hi" ? "सभी" : "All" },
    ...departments
      .filter((dept) => specialtySlugs.has(dept.slug))
      .map((dept) => ({ value: dept.slug, label: dept.name[locale] })),
  ];
  const dayOptions = [
    { value: "any", label: locale === "hi" ? "किसी भी दिन" : "Any day" },
    { value: "today", label: locale === "hi" ? "आज" : "Today" },
    { value: "tomorrow", label: locale === "hi" ? "कल" : "Tomorrow" },
    { value: "week", label: locale === "hi" ? "इस सप्ताह" : "This week" },
  ];

  return (
    <>
      <SiteHeader locale={locale} />
      <main>
        <section className="bg-white">
          <div className="page-gutter mx-auto w-full max-w-[var(--content-max)] py-12 md:py-16">
            <Mono>{locale === "hi" ? "चिकित्सक खोजें" : "FIND A DOCTOR"}</Mono>
            <h1 className="display-lg mt-4 max-w-[18ch]">
              {locale === "hi"
                ? "१८४ चिकित्सक, २८ विशेषज्ञताएँ।"
                : "184 consultants. 28 specialties."}
            </h1>
            <p className="lede mt-4 max-w-[60ch]">
              {locale === "hi"
                ? "नाम, विशेषज्ञता या स्थिति से छाँटें। अपॉइंटमेंट सीधे चिकित्सक के साथ बुक करें।"
                : "Filter by name, specialty, or condition. Book directly with the consultant."}
            </p>
          </div>
        </section>
        <section className="bg-[color:var(--color-paper)]">
          <div className="page-gutter mx-auto w-full max-w-[var(--content-max)] section-y">
            <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
              <aside>
                <FilterBar
                  locale={locale}
                  specialtyOptions={specialtyOptions}
                  dayOptions={dayOptions}
                />
              </aside>
              <div>
                <p className="meta mb-4 text-[color:var(--color-ink-soft)]">
                  {locale === "hi"
                    ? `${new Intl.NumberFormat("hi-IN-u-nu-deva").format(filtered.length)} परिणाम`
                    : `${filtered.length} ${filtered.length === 1 ? "result" : "results"}`}
                </p>
                {filtered.length === 0 ? (
                  <div className="rounded-[var(--radius-lg)] border border-[color:var(--color-line-soft)] bg-white p-10 text-center">
                    <h2 className="display-sm">
                      {locale === "hi" ? "कोई चिकित्सक नहीं मिला" : "No consultants matched"}
                    </h2>
                    <p className="lede mt-3 text-[color:var(--color-ink-soft)]">
                      {locale === "hi"
                        ? "खोज शब्द बदलें या सभी २८ विशेषज्ञताओं को देखें।"
                        : "Adjust your filters or browse all 28 specialties."}
                    </p>
                    <a
                      href={`/${locale}/departments`}
                      className="meta mt-6 inline-flex items-center gap-2 text-[color:var(--color-primary)] underline-offset-4 hover:underline"
                    >
                      {locale === "hi" ? "सभी विभाग देखें" : "Browse all departments"} →
                    </a>
                  </div>
                ) : (
                  <ul className="grid gap-4 md:grid-cols-1 xl:grid-cols-2">
                    {filtered.map((d) => (
                      <li key={d.id}>
                        <DoctorCard doctor={d} locale={locale} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <StickyCtaBar locale={locale} />
    </>
  );
}
