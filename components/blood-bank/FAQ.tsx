"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";
import type { BloodBankContent } from "@/content/types";
import type { Locale } from "@/lib/locales";

type Props = {
  locale: Locale;
  items: BloodBankContent["faq"];
};

export function FAQ({ locale, items }: Props) {
  const t = useTranslations("bloodBank");
  const [openId, setOpenId] = useState<string | null>(null);

  if (items.length === 0) return null;

  return (
    <section className="bg-white py-12 md:py-20" aria-labelledby="bb-faq-heading">
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)]">
        <h2 id="bb-faq-heading" className="display-md max-w-[24ch] text-[color:var(--color-deep)]">
          {t("sectionFaq")}
        </h2>
        <ul className="mt-8 divide-y divide-[color:var(--color-line-soft)] border-y border-[color:var(--color-line-soft)]">
          {items.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `bb-faq-panel-${item.id}`;
            const buttonId = `bb-faq-button-${item.id}`;
            return (
              <li key={item.id}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 py-4 text-start text-[16px] font-medium text-[color:var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary)]"
                  >
                    <span>{item.q[locale]}</span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "transition-transform motion-reduce:transition-none",
                        isOpen ? "rotate-45" : "rotate-0",
                      )}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="pe-8 pb-5 text-[15px] text-[color:var(--color-ink-soft)]"
                >
                  {item.a[locale]}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
