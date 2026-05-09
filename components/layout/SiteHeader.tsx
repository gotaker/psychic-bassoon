import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { LangToggle } from "./LangToggle";
import type { Locale } from "@/lib/locales";

type SiteHeaderProps = {
  locale: Locale;
  variant?: "transparent" | "solid";
};

// Sticky on interior pages, transparent-on-scroll on home.
// DESIGN.md §5.2. Logo (round monogram + serif name + mono est. line),
// primary nav, language toggle, "Book" button.
export function SiteHeader({ locale, variant = "solid" }: SiteHeaderProps) {
  const tBrand = useTranslations("brand");
  const tNav = useTranslations("nav");
  const tCta = useTranslations("cta");
  const isTransparent = variant === "transparent";

  const navLinks: { href: string; label: string }[] = [
    { href: `/${locale}/find-a-doctor`, label: tNav("findDoctor") },
    { href: `/${locale}/departments`, label: tNav("departments") },
    { href: `/${locale}/blood-bank`, label: tNav("bloodBank") },
    { href: `/${locale}/visit`, label: tNav("visit") },
    { href: `/${locale}/about`, label: tNav("about") },
    { href: `/${locale}/news`, label: tNav("news") },
  ];

  return (
    <header
      className={
        isTransparent
          ? "absolute inset-x-0 top-0 z-30"
          : "sticky top-0 z-30 border-b border-[color:var(--color-line-soft)] bg-white/95 backdrop-blur"
      }
    >
      <div className="page-gutter mx-auto flex h-[72px] w-full max-w-[var(--content-max)] items-center gap-8">
        <Link
          href={`/${locale}`}
          className="flex flex-col items-start gap-1 text-[color:var(--color-deep)]"
          aria-label={tBrand("name")}
        >
          <Image
            src="/brand/dnh-logo.png"
            alt={tBrand("name")}
            width={450}
            height={71}
            priority
            className="h-10 w-auto flex-shrink-0"
            sizes="254px"
          />
          <span className="mono-tag hidden ps-12 text-[color:var(--color-ink-soft)] sm:inline">
            {tBrand("established", { year: 1958 })}
          </span>
        </Link>
        <nav className="ml-2 hidden items-center gap-7 md:flex" aria-label="Primary">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="meta text-[13.5px] font-medium text-[color:var(--color-ink-soft)] transition-colors hover:text-[color:var(--color-ink)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <LangToggle />
          <Button variant="primary" size="sm" href={`/${locale}/book`}>
            {tCta("bookShort")}
          </Button>
        </div>
      </div>
    </header>
  );
}
