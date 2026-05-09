import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { DepartmentTemplate } from "@/components/department/DepartmentTemplate";
import { departments, departmentsBySlug } from "@/content/departments";
import { getDoctorsByDepartment } from "@/content/doctors";
import { cardiology } from "@/content/departments/cardiology";
import { medicalProcedureLD } from "@/lib/structured-data";
import { locales, type Locale } from "@/lib/locales";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    departments.map((dept) => ({ locale, slug: dept.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const dept = departmentsBySlug[slug];
  if (!dept) return {};
  return {
    title: `${dept.name[locale]} — Dev Nandini Hospital`,
    description: dept.tagline[locale],
    alternates: {
      canonical: `/${locale}/departments/${slug}`,
      languages: {
        en: `/en/departments/${slug}`,
        hi: `/hi/departments/${slug}`,
        "x-default": `/en/departments/${slug}`,
      },
    },
  };
}

export default async function DepartmentDetailPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const department = departmentsBySlug[slug];
  if (!department) notFound();

  const detail = department.hasFullDetail && slug === "cardiology" ? cardiology : null;
  const consultants = getDoctorsByDepartment(slug);
  const index = departments.findIndex((d) => d.slug === slug) + 1;

  return (
    <>
      {detail ? (
        <Script id={`ld-${slug}`} type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(medicalProcedureLD(detail, locale))}
        </Script>
      ) : null}
      <SiteHeader locale={locale} />
      <DepartmentTemplate
        locale={locale}
        department={department}
        detail={detail}
        consultants={consultants}
        index={index}
      />
      <SiteFooter />
      <StickyCtaBar locale={locale} />
    </>
  );
}
