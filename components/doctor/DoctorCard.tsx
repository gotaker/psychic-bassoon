import type { Doctor } from "@/content/types";
import { DoctorAvatar, getInitials } from "./DoctorAvatar";
import { Mono } from "@/components/ui/Mono";
import { Button } from "@/components/ui/Button";
import { CalendarIcon, PinIcon, ArrowIcon } from "@/components/icons";
import type { Locale } from "@/lib/locales";

type DoctorCardProps = {
  doctor: Doctor;
  locale: Locale;
};

// Search-result card. Avatar/photo | (name, specialty, qualifications, bio,
// location, languages, divider, OPD slot + Book). DESIGN.md §5.3.
// <article> with <h3> name; "Book with Dr. X" as the action's accessible name.
export function DoctorCard({ doctor, locale }: DoctorCardProps) {
  const lastName = doctor.name.en.split(" ").slice(-1)[0] ?? doctor.name.en;

  return (
    <article className="grid grid-cols-[84px_1fr] gap-6 rounded-[var(--radius-lg)] border border-[color:var(--color-line-soft)] bg-white p-6 transition-colors focus-within:border-[color:var(--color-deep)] hover:border-[color:var(--color-deep)]/40">
      <DoctorAvatar
        initials={getInitials(doctor.name[locale])}
        tone={doctor.avatarTone as `#${string}`}
        size={84}
        {...(doctor.photo ? { photo: doctor.photo, alt: doctor.name[locale] } : {})}
      />
      <div className="min-w-0">
        <h3
          className="truncate text-[22px] font-medium leading-tight tracking-[-0.015em]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {doctor.name[locale]}
        </h3>
        <p className="mt-0.5 text-[13.5px] font-medium text-[color:var(--color-primary)]">
          {doctor.specialty[locale]}
        </p>
        <p className="meta mt-2 text-[color:var(--color-ink-soft)]">{doctor.qualifications}</p>
        <p className="body-sm mt-3 text-[color:var(--color-ink-soft)]">{doctor.bio[locale]}</p>
        <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
          <div className="flex items-center gap-1.5 text-[color:var(--color-ink-soft)]">
            <dt className="sr-only">{locale === "hi" ? "स्थान" : "Location"}</dt>
            <PinIcon size={12} />
            <dd className="meta">{doctor.location[locale]}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">{locale === "hi" ? "भाषाएँ" : "Languages"}</dt>
            <dd>
              <Mono className="text-[color:var(--color-ink-soft)]">{doctor.languages[locale]}</Mono>
            </dd>
          </div>
        </dl>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-[color:var(--color-line-soft)] pt-4">
          <span className="meta inline-flex items-center gap-1.5 text-[color:var(--color-ink-soft)]">
            <CalendarIcon size={13} />
            {doctor.nextSlot[locale]}
          </span>
          <Button
            variant="primary"
            size="sm"
            href={`/${locale}/book?doctor=${doctor.id}`}
            aria-label={
              locale === "hi"
                ? `डॉ. ${lastName} के साथ बुक करें`
                : `Book with Dr. ${lastName}`
            }
          >
            {locale === "hi" ? "बुक करें" : "Book"}
            <ArrowIcon size={12} />
          </Button>
        </div>
      </div>
    </article>
  );
}
