import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { defaultLocale, locales } from "@/lib/locales";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(locales, requested) ? requested : defaultLocale;

  const messages = (await import(`@/messages/${locale}.json`)).default as Record<string, unknown>;

  return {
    locale,
    messages,
  };
});
