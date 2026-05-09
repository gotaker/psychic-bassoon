"use client";

import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { locales, type Locale } from "@/lib/locales";

// Pill group EN / हिंदी. Persists via URL (next-intl's locale-segment routing
// owns persistence; cookie is set automatically by the middleware).
export function LangToggle({ className }: { className?: string }) {
  const t = useTranslations("lang");
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ locale?: string }>();
  const [pending, startTransition] = useTransition();
  const current = (params.locale ?? "en") as Locale;

  const switchTo = (next: Locale) => {
    if (next === current) return;
    // Replace the leading /<locale>/... segment.
    const segments = pathname.split("/");
    if (segments[1] && (locales as readonly string[]).includes(segments[1])) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    const target = segments.join("/") || "/";
    startTransition(() => {
      router.replace(target);
    });
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-[var(--radius-pill)] bg-[color:var(--color-paper)] p-0.5",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {locales.map((loc) => {
        const active = loc === current;
        return (
          <button
            key={loc}
            type="button"
            onClick={() => switchTo(loc)}
            disabled={pending}
            aria-pressed={active}
            className={cn(
              "rounded-[var(--radius-pill)] px-3 py-1.5 text-[11.5px] font-medium leading-none",
              "transition-colors duration-150 ease-out",
              active
                ? "bg-[color:var(--color-deep)] text-white"
                : "bg-transparent text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]",
            )}
          >
            {loc === "en" ? t("en") : t("hi")}
          </button>
        );
      })}
    </div>
  );
}
