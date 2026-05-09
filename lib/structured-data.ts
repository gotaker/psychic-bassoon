import type { Doctor, DepartmentDetail } from "@/content/types";
import type { Locale } from "@/lib/locales";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://devnandinihospital.in";

// Always render server-side via <Script type="application/ld+json"> so the JSON-LD
// reaches search engines without depending on JS execution.

export function medicalOrganizationLD(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Hospital",
    "@id": `${SITE_URL}/${locale}/#hospital`,
    name: "Dev Nandini Hospital",
    foundingDate: "1958",
    legalName: "Dev Nandini Hospital & Medical College Trust",
    url: `${SITE_URL}/${locale}`,
    telephone: "+91-80-4422-0099",
    address: {
      "@type": "PostalAddress",
      streetAddress: "NH-9, Hapur Bypass",
      addressLocality: "Hapur",
      addressRegion: "Uttar Pradesh",
      postalCode: "245101",
      addressCountry: "IN",
    },
    medicalSpecialty: [
      "Cardiovascular",
      "Neurology",
      "Oncologic",
      "Orthopedic",
      "ObstetricsAndGynecology",
      "Pediatric",
      "InternalMedicine",
      "Gastroenterologic",
      "Nephrology",
      "Pulmonary",
      "Ophthalmology",
      "Otolaryngology",
      "Dermatology",
      "Psychiatry",
      "Radiology",
      "Emergency",
    ],
    isAcceptingNewPatients: true,
    accreditation: ["NABH", "NABL", "NMC", "ISO 15189"],
  } as const;
}

export function physicianLD(doctor: Doctor, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${SITE_URL}/${locale}/find-a-doctor#${doctor.id}`,
    name: doctor.name[locale],
    medicalSpecialty: doctor.specialty[locale],
    description: doctor.bio[locale],
    knowsLanguage: doctor.languages[locale]
      .split("·")
      .map((s) => s.trim())
      .filter(Boolean),
    worksFor: { "@id": `${SITE_URL}/${locale}/#hospital` },
  } as const;
}

export function medicalProcedureLD(detail: DepartmentDetail, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": detail.procedures.map((p) => ({
      "@type": "MedicalProcedure",
      "@id": `${SITE_URL}/${locale}/departments/${detail.slug}#${p.id}`,
      name: p.title[locale],
      description: p.description[locale],
      bodyLocation: detail.slug,
    })),
  };
}

export function jsonLdScript(value: unknown): string {
  // Sanitize against `</script>` close-tag injection; this is the standard guard.
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

// MedicalBusiness representation of the on-site blood bank.
export function bloodBankServiceLD(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": `${SITE_URL}/${locale}/blood-bank#service`,
    name: locale === "hi" ? "रक्त बैंक" : "Blood Bank",
    parentOrganization: { "@id": `${SITE_URL}/${locale}/#hospital` },
    medicalSpecialty: "Hematologic",
    availableService: [
      "Whole blood collection",
      "Packed red cell preparation",
      "Fresh frozen plasma",
      "Platelet concentrate",
      "Cross-match and screening",
      "Component separation",
    ],
    accreditation: ["NABH", "NABL", "ISO 15189"],
    url: `${SITE_URL}/${locale}/blood-bank`,
  } as const;
}
