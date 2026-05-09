import "../globals.css";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { isLocale, locales, type Locale } from "@/lib/locales";
import { fontVariableClassName } from "@/lib/fonts";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Dev Nandini Hospital",
  description:
    "A 540-bed multi-specialty hospital in Hapur, Uttar Pradesh — caring for the western UP belt since 1958.",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) notFound();
  if (!isLocale(locale)) notFound();
  const typedLocale: Locale = locale;
  setRequestLocale(typedLocale);

  return (
    <html
      lang={typedLocale}
      data-density="regular"
      data-palette="teal"
      className={fontVariableClassName}
    >
      <body>
        <NextIntlClientProvider locale={typedLocale}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
