"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition } from "react";
import { FilterPillGroup, type FilterPillOption } from "@/components/ui/FilterPillGroup";
import { Field } from "@/components/ui/Field";
import type { Locale } from "@/lib/locales";

type FilterBarProps = {
  locale: Locale;
  specialtyOptions: FilterPillOption[];
  dayOptions: FilterPillOption[];
};

export function FilterBar({ locale, specialtyOptions, dayOptions }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();

  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [spec, setSpec] = useState(searchParams.get("spec") ?? "all");
  const [day, setDay] = useState(searchParams.get("day") ?? "any");

  useEffect(() => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (spec !== "all") params.set("spec", spec);
    if (day !== "any") params.set("day", day);
    const qs = params.toString();
    startTransition(() => {
      router.replace(`/${locale}/find-a-doctor${qs ? `?${qs}` : ""}`, { scroll: false });
    });
  }, [q, spec, day, locale, router]);

  return (
    <div className="grid gap-5 rounded-[var(--radius-lg)] border border-[color:var(--color-line-soft)] bg-white p-6">
      <Field
        id="doctor-search"
        label={locale === "hi" ? "खोज" : "Search"}
        placeholder={
          locale === "hi"
            ? "जैसे डॉ. कपूर, हृदय रोग, सीने में दर्द"
            : "e.g. Dr. Kapoor, cardiology, chest pain"
        }
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <FilterPillGroup
        label={locale === "hi" ? "विशेषज्ञता" : "Specialty"}
        value={spec}
        onChange={setSpec}
        options={specialtyOptions}
      />
      <FilterPillGroup
        label={locale === "hi" ? "उपलब्धता" : "Availability"}
        value={day}
        onChange={setDay}
        options={dayOptions}
      />
      <p
        aria-live="polite"
        className="meta text-[color:var(--color-ink-soft)]"
        data-pending={pending}
      >
        {locale === "hi"
          ? "परिणाम URL में रहेंगे — साझा करें या बुकमार्क करें।"
          : "Results stay in the URL — share or bookmark."}
      </p>
    </div>
  );
}
