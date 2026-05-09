"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type FilterPillOption = {
  value: string;
  label: ReactNode;
};

type FilterPillGroupProps = {
  label: ReactNode;
  options: FilterPillOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

// Labelled pill group used in find-a-doctor and the home doctor search.
// Active pill: filled --color-deep with white text. DESIGN.md §5.1.
export function FilterPillGroup({
  label,
  options,
  value,
  onChange,
  className,
}: FilterPillGroupProps) {
  return (
    <fieldset className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)}>
      <legend className="meta tracking-[0.14em] text-[color:var(--color-ink-soft)] uppercase">
        {label}
      </legend>
      <div role="radiogroup" className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt.value)}
              className={cn(
                "rounded-[var(--radius-pill)] px-3.5 py-1.5 text-[12.5px] font-medium",
                "transition-colors duration-150 ease-out",
                active
                  ? "bg-[color:var(--color-deep)] text-white"
                  : "bg-transparent text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-2)]",
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
