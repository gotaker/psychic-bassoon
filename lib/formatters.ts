import type { Locale } from "@/lib/locales";

// Locale-aware formatters. The single rule: numerals render in Devanagari for
// `hi` and Latin for `en`. Achieved by using BCP-47 tags with the `nu-deva`
// numbering-system extension for Hindi (`hi-IN-u-nu-deva`). Phone numbers are
// the explicit exception — international convention keeps them in Latin digits
// regardless of locale.

const localeTag: Record<Locale, string> = {
  en: "en-IN",
  hi: "hi-IN-u-nu-deva",
};

export function formatNumber(
  value: number,
  locale: Locale,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(localeTag[locale], options).format(value);
}

export function formatDate(
  isoDate: string,
  locale: Locale,
  style: "short" | "long" = "short",
): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) {
    throw new Error(`formatDate: invalid ISO date "${isoDate}"`);
  }
  const [, y, m, d] = match;
  const year = Number(y);
  const month = Number(m) - 1;
  const day = Number(d);
  const date = new Date(Date.UTC(year, month, day));

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: style === "long" ? "long" : "short",
    day: "numeric",
    timeZone: "UTC",
  };
  return new Intl.DateTimeFormat(localeTag[locale], options).format(date);
}

export function formatReadMinutes(value: number, locale: Locale): string {
  const n = formatNumber(value, locale);
  return locale === "hi" ? `${n} मिनट` : `${n} min`;
}

export function formatPhone(e164: string): string {
  const trimmed = e164.trim().replace(/\s+/g, " ");
  if (!/^\+\d[\d\s-]+$/.test(trimmed)) {
    throw new Error(`formatPhone: invalid phone "${e164}"`);
  }
  return trimmed;
}

export function formatYearsExperience(value: number, locale: Locale): string {
  const n = formatNumber(value, locale);
  return locale === "hi" ? `${n} वर्ष` : `${n} years`;
}
