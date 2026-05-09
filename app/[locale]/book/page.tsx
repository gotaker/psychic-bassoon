import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BookingFlow } from "@/components/booking/BookingFlow";
import { departments } from "@/content/departments";
import { doctors } from "@/content/doctors";
import type { Locale } from "@/lib/locales";

type SearchParams = Record<string, string | string[] | undefined>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title:
      locale === "hi"
        ? "अपॉइंटमेंट लें — देव नंदिनी अस्पताल"
        : "Book an appointment — Dev Nandini Hospital",
    description:
      locale === "hi"
        ? "तीन क्लिक में अपॉइंटमेंट। बिना खाते के, बिना देरी के।"
        : "Three clicks to a confirmed appointment. No account required.",
    alternates: {
      canonical: `/${locale}/book`,
      languages: {
        en: "/en/book",
        hi: "/hi/book",
        "x-default": "/en/book",
      },
    },
    robots: { index: true, follow: true },
  };
}

function pickString(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

export default async function BookPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<SearchParams>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);

  const initialDoctorId = pickString(sp.doctor);

  // BookingFlow runs client-side; pass plain serializable data.
  const deptList = departments.map((d) => ({
    slug: d.slug,
    name: d.name,
    tagline: d.tagline,
  }));
  const doctorList = doctors.map((d) => ({ ...d }));

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="bg-[color:var(--color-paper)]">
        <BookingFlow
          locale={locale}
          departments={deptList}
          doctors={doctorList}
          {...(initialDoctorId ? { initialDoctorId } : {})}
        />
      </main>
      <SiteFooter locale={locale} />
    </>
  );
}
