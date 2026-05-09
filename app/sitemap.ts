import type { MetadataRoute } from "next";
import { locales } from "@/lib/locales";
import { departments } from "@/content/departments";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://devnandinihospital.in";

const STATIC_PATHS = [
  "",
  "/find-a-doctor",
  "/departments",
  "/book",
  "/visit",
  "/about",
  "/news",
  "/locations",
  "/careers",
  "/giving",
  "/lab-reports",
  "/pay-bill",
  "/annual-report",
];

function entryFor(path: string): MetadataRoute.Sitemap[number] {
  const url = `${SITE_URL}/en${path}`;
  return {
    url,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: `${SITE_URL}/en${path}`,
        hi: `${SITE_URL}/hi${path}`,
        "x-default": `${SITE_URL}/en${path}`,
      },
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const statics = STATIC_PATHS.flatMap((p) => locales.map(() => entryFor(p))).filter(
    // De-dupe — entryFor already covers both locales via alternates.
    (e, i, arr) => arr.findIndex((x) => x.url === e.url) === i,
  );
  const deptDetails = departments.map((d) => entryFor(`/departments/${d.slug}`));
  return [...statics, ...deptDetails];
}
