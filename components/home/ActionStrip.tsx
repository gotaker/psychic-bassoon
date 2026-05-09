import Link from "next/link";
import { useTranslations } from "next-intl";
import { Mono } from "@/components/ui/Mono";
import { ArrowIcon, CalendarIcon, SearchIcon } from "@/components/icons";
import type { Locale } from "@/lib/locales";

type Tile = {
  key: "book" | "findDoctor" | "labs" | "billing";
  href: string;
  Icon: React.ComponentType<{ size?: number }>;
};

export function ActionStrip({ locale }: { locale: Locale }) {
  const t = useTranslations("home.actionStrip");
  const tiles: Tile[] = [
    { key: "book", href: `/${locale}/book`, Icon: CalendarIcon },
    { key: "findDoctor", href: `/${locale}/find-a-doctor`, Icon: SearchIcon },
    { key: "labs", href: `/${locale}/lab-reports`, Icon: ArrowIcon },
    { key: "billing", href: `/${locale}/pay-bill`, Icon: ArrowIcon },
  ];

  return (
    <section
      data-tone="paper-2"
      className="bg-[color:var(--color-paper-2)] border-y border-[color:var(--color-line-soft)]"
    >
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)] py-8">
        <Mono className="mb-4 block">{t("kicker")}</Mono>
        <ul className="grid grid-cols-1 divide-y divide-[color:var(--color-line-soft)] sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          {tiles.map(({ key, href, Icon }) => (
            <li key={key}>
              <Link
                href={href}
                className="group flex items-center gap-4 px-2 py-4 transition-colors hover:bg-white/40"
              >
                <span className="text-[color:var(--color-deep)]">
                  <Icon size={20} />
                </span>
                <span className="flex-1">
                  <span className="block text-[15px] font-semibold leading-tight tracking-[-0.005em]">
                    {t(`tiles.${key}.title`)}
                  </span>
                  <span className="body-sm mt-1 block text-[color:var(--color-ink-soft)]">
                    {t(`tiles.${key}.sub`)}
                  </span>
                </span>
                <ArrowIcon
                  size={14}
                  className="text-[color:var(--color-ink-soft)] transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
