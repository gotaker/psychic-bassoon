"use client";

import { useMemo, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { submitBooking } from "@/app/[locale]/book/actions";
import { Stepper } from "@/components/ui/Stepper";
import { Button } from "@/components/ui/Button";
import { Field, TextareaField } from "@/components/ui/Field";
import { Mono } from "@/components/ui/Mono";
import { DoctorAvatar, getInitials } from "@/components/doctor/DoctorAvatar";
import { ArrowIcon, BackIcon, CalendarIcon, CheckIcon } from "@/components/icons";
import type { Doctor } from "@/content/types";
import type { Locale } from "@/lib/locales";

type BookingDay = "today" | "tomorrow" | "d2" | "d3";

type BookingFlowProps = {
  locale: Locale;
  departments: { slug: string; name: { en: string; hi: string }; tagline: { en: string; hi: string } }[];
  doctors: Doctor[];
  initialDoctorId?: string;
};

const SLOT_TIMES = [
  "09:00",
  "09:30",
  "10:30",
  "11:15",
  "14:00",
  "14:45",
  "16:00",
  "16:45",
];
// Mock taken slots (deterministic by doctor id hash) — L6 will swap to real availability.
function isSlotTaken(doctorId: string, time: string): boolean {
  const hash = [...`${doctorId}${time}`].reduce((a, c) => a + c.charCodeAt(0), 0);
  return hash % 4 === 0;
}

const phoneRegex = /^\+91 9\d{2}[\s-]?\d{3}[\s-]?\d{4}$/;
const formSchema = z.object({
  patientName: z.string().min(2),
  phoneE164: z.string().regex(phoneRegex),
  notes: z.string().max(500).optional(),
});
type FormValues = z.infer<typeof formSchema>;

// Ref generation moved to server action (app/[locale]/book/actions.ts).

export function BookingFlow({ locale, departments, doctors, initialDoctorId }: BookingFlowProps) {
  const initialDoctor = initialDoctorId ? doctors.find((d) => d.id === initialDoctorId) : undefined;
  const [step, setStep] = useState(initialDoctor ? 1 : 0);
  const [deptSlug, setDeptSlug] = useState<string | null>(
    initialDoctor ? (initialDoctor.departmentSlugs[0] ?? null) : null,
  );
  const [doctorId, setDoctorId] = useState<string | null>(initialDoctor?.id ?? null);
  const [day, setDay] = useState<BookingDay>("today");
  const [time, setTime] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ ref: string; firstName: string } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { patientName: "", phoneE164: "", notes: "" },
  });

  const selectedDept = deptSlug ? departments.find((d) => d.slug === deptSlug) ?? null : null;
  const selectedDoctor = doctorId ? doctors.find((d) => d.id === doctorId) ?? null : null;
  const filteredDoctors = useMemo(() => {
    if (!deptSlug) return [];
    return doctors.filter((d) => (d.departmentSlugs as readonly string[]).includes(deptSlug));
  }, [doctors, deptSlug]);

  const days: { id: BookingDay; label: string }[] = [
    { id: "today", label: locale === "hi" ? "आज" : "Today" },
    { id: "tomorrow", label: locale === "hi" ? "कल" : "Tomorrow" },
    { id: "d2", label: locale === "hi" ? "+२ दिन" : "+2 days" },
    { id: "d3", label: locale === "hi" ? "+३ दिन" : "+3 days" },
  ];

  const onSubmit = (values: FormValues) => {
    if (!selectedDept || !selectedDoctor || !time) return;
    setServerError(null);
    startTransition(async () => {
      const result = await submitBooking({
        departmentId: selectedDept.slug,
        doctorId: selectedDoctor.id,
        day,
        time,
        patientName: values.patientName,
        phoneE164: values.phoneE164,
        notes: values.notes,
      });
      if (!result.ok) {
        setServerError(result.message);
        return;
      }
      const firstName = values.patientName.trim().split(/\s+/)[0] ?? values.patientName;
      setConfirmation({ ref: result.ref, firstName });
      setStep(3);
    });
  };

  if (confirmation) {
    return (
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max-booking)] section-y">
        <div className="rounded-[var(--radius-lg)] bg-[color:var(--color-deep)] p-10 text-white md:p-16">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
            <CheckIcon size={20} />
          </div>
          <Mono className="mt-6 block text-[color:var(--color-accent)]">
            {locale === "hi" ? "संदर्भ" : "REFERENCE"} · {confirmation.ref}
          </Mono>
          <h1
            className="mt-3 max-w-[24ch] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-serif)", fontSize: 56, lineHeight: 1.02 }}
          >
            {locale === "hi"
              ? `${confirmation.firstName}, आपकी बुकिंग पक्की है।`
              : `You're booked, ${confirmation.firstName}.`}
          </h1>
          <p className="lede mt-6 max-w-[60ch] text-white/85">
            {locale === "hi"
              ? "हम ३० मिनट के भीतर आपको SMS से पुष्टि भेजेंगे। दो घंटे पहले तक रद्द करना निःशुल्क है।"
              : "We will SMS you within 30 minutes to confirm. Free cancellation up to two hours before your slot."}
          </p>
          <ul className="mt-8 grid gap-3 text-[14px] text-white/85">
            <li>
              {locale === "hi" ? "क्या लाएँ:" : "What to bring:"}{" "}
              {locale === "hi"
                ? "एक फोटो आईडी, पिछले रिपोर्ट (यदि हों), और दवाओं की सूची।"
                : "A photo ID, previous reports if any, and your current medication list."}
            </li>
            <li>
              {locale === "hi" ? "कैसे पहुँचें:" : "How to reach us:"} NH-9 Hapur Bypass · +91 80
              4422 0099
            </li>
          </ul>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button variant="accent" size="md" href={`/${locale}`}>
              {locale === "hi" ? "होम पर लौटें" : "Back to home"}
            </Button>
            <Button variant="ghost" size="md" href={`/${locale}/visit`}>
              {locale === "hi" ? "मुलाक़ात की जानकारी" : "Plan your visit"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-gutter mx-auto w-full max-w-[var(--content-max-booking)] section-y">
      <Mono>{locale === "hi" ? "अपॉइंटमेंट" : "BOOKING"}</Mono>
      <h1 className="display-lg mt-3 max-w-[18ch]">
        {locale === "hi"
          ? "तीन क्लिक — अकाउंट की ज़रूरत नहीं।"
          : "Three clicks — no account needed."}
      </h1>
      <div className="mt-8">
        <Stepper
          current={step}
          steps={[
            { id: "department", label: locale === "hi" ? "विभाग" : "Department" },
            { id: "doctor", label: locale === "hi" ? "चिकित्सक व समय" : "Doctor & time" },
            { id: "details", label: locale === "hi" ? "आपकी जानकारी" : "Your details" },
            { id: "done", label: locale === "hi" ? "पुष्टि" : "Confirmation" },
          ]}
        />
      </div>

      {/* Step 0 — Department */}
      {step === 0 ? (
        <section className="mt-10">
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {departments.slice(0, 6).map((dept) => (
              <li key={dept.slug}>
                <button
                  type="button"
                  onClick={() => {
                    setDeptSlug(dept.slug);
                    setDoctorId(null);
                    setStep(1);
                  }}
                  className="group flex h-full w-full flex-col items-start gap-3 rounded-[var(--radius-lg)] border border-[color:var(--color-line-soft)] bg-white p-6 text-left transition-colors hover:border-[color:var(--color-deep)]/50"
                >
                  <span
                    aria-hidden="true"
                    className="h-12 w-12 rounded-full bg-[color:var(--color-accent-2)]"
                  />
                  <span className="block text-[18px] font-semibold leading-tight tracking-[-0.005em]">
                    {dept.name[locale]}
                  </span>
                  <span className="body-sm text-[color:var(--color-ink-soft)]">
                    {dept.tagline[locale]}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Step 1 — Doctor + day + time */}
      {step === 1 && selectedDept ? (
        <section className="mt-10">
          <div className="mb-6 flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setStep(0);
                setDoctorId(null);
              }}
            >
              <BackIcon size={12} />
              {locale === "hi" ? "विभाग बदलें" : "Change department"}
            </Button>
            <span className="meta text-[color:var(--color-ink-soft)]">
              · {selectedDept.name[locale]}
            </span>
          </div>
          <ul className="grid gap-4 md:grid-cols-2">
            {filteredDoctors.map((d) => {
              const active = doctorId === d.id;
              return (
                <li key={d.id}>
                  <button
                    type="button"
                    onClick={() => setDoctorId(d.id)}
                    className={`grid w-full grid-cols-[64px_1fr] gap-4 rounded-[var(--radius-lg)] border-2 bg-white p-5 text-left transition-colors ${active ? "border-[color:var(--color-deep)]" : "border-[color:var(--color-line-soft)] hover:border-[color:var(--color-deep)]/40"}`}
                  >
                    <DoctorAvatar
                      initials={getInitials(d.name[locale])}
                      tone={d.avatarTone as `#${string}`}
                      size={64}
                      {...(d.photo ? { photo: d.photo, alt: d.name[locale] } : {})}
                    />
                    <span className="min-w-0">
                      <span
                        className="block truncate text-[18px] font-medium tracking-[-0.015em]"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {d.name[locale]}
                      </span>
                      <span className="mt-1 block text-[12.5px] text-[color:var(--color-primary)]">
                        {d.specialty[locale]}
                      </span>
                      <span className="meta mt-2 block text-[color:var(--color-ink-soft)]">
                        {d.languages[locale]} · {d.location[locale]}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {selectedDoctor ? (
            <div className="mt-10 rounded-[var(--radius-lg)] bg-white p-6">
              <Mono>{locale === "hi" ? "दिन चुनें" : "PICK A DAY"}</Mono>
              <div className="mt-4 flex flex-wrap gap-2">
                {days.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      setDay(d.id);
                      setTime(null);
                    }}
                    className={`rounded-[var(--radius-pill)] px-4 py-2 text-[13px] font-medium transition-colors ${day === d.id ? "bg-[color:var(--color-deep)] text-white" : "bg-[color:var(--color-paper)] text-[color:var(--color-ink-soft)] hover:bg-[color:var(--color-paper-2)]"}`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
              <Mono className="mt-6 block">
                {locale === "hi" ? "समय चुनें" : "PICK A TIME"}
              </Mono>
              <ul className="mt-3 grid grid-cols-4 gap-2">
                {SLOT_TIMES.map((slot) => {
                  const taken = isSlotTaken(selectedDoctor.id, slot);
                  const active = time === slot;
                  return (
                    <li key={slot}>
                      <button
                        type="button"
                        disabled={taken}
                        onClick={() => setTime(slot)}
                        className={`w-full rounded-[var(--radius-md)] border px-3 py-2.5 text-[13px] font-medium ${active ? "border-[color:var(--color-deep)] bg-[color:var(--color-deep)] text-white" : taken ? "border-[color:var(--color-line-soft)] bg-[color:var(--color-paper)] text-[color:var(--color-ink-soft)] line-through opacity-60" : "border-[color:var(--color-line-soft)] hover:border-[color:var(--color-deep)]/40"}`}
                      >
                        {slot}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-6 flex justify-end">
                <Button
                  variant="primary"
                  size="md"
                  disabled={!time}
                  onClick={() => setStep(2)}
                >
                  {locale === "hi" ? "आगे बढ़ें" : "Continue"}
                  <ArrowIcon size={13} />
                </Button>
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {/* Step 2 — Details */}
      {step === 2 && selectedDoctor && time ? (
        <section className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-5 rounded-[var(--radius-lg)] bg-white p-6"
            noValidate
          >
            <Field
              id="patient-name"
              label={locale === "hi" ? "रोगी का नाम" : "Patient name"}
              {...register("patientName")}
              {...(errors.patientName?.message
                ? { error: locale === "hi" ? "कृपया पूरा नाम दर्ज करें।" : "Please enter the full name." }
                : {})}
            />
            <Field
              id="phone-e164"
              label={locale === "hi" ? "मोबाइल" : "Mobile"}
              placeholder="+91 9XXX XXX XXX"
              {...register("phoneE164")}
              {...(errors.phoneE164?.message
                ? {
                    error:
                      locale === "hi"
                        ? "10 अंकों का भारतीय मोबाइल नंबर दर्ज करें।"
                        : "Enter a 10-digit Indian mobile number, prefixed with +91.",
                  }
                : { hint: locale === "hi"
                    ? "हम पुष्टि के लिए SMS भेजेंगे।"
                    : "We'll text the confirmation here." })}
            />
            <TextareaField
              id="notes"
              label={locale === "hi" ? "नोट्स (वैकल्पिक)" : "Notes (optional)"}
              placeholder={
                locale === "hi"
                  ? "कोई जानकारी जो चिकित्सक को पहले से चाहिए"
                  : "Anything the doctor should know in advance"
              }
              {...register("notes")}
            />
            <p className="body-sm text-[color:var(--color-ink-soft)]">
              {locale === "hi"
                ? "अपने स्लॉट से दो घंटे पहले तक निःशुल्क रद्द करें।"
                : "Free cancellation up to two hours before your slot."}
            </p>
            {serverError ? (
              <p
                role="alert"
                className="body-sm rounded-[var(--radius-md)] bg-[color:var(--color-emergency)]/10 px-3 py-2 text-[color:var(--color-emergency)]"
              >
                {serverError}
              </p>
            ) : null}
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="md" type="button" onClick={() => setStep(1)}>
                <BackIcon size={12} />
                {locale === "hi" ? "वापस" : "Back"}
              </Button>
              <Button variant="primary" size="md" type="submit" disabled={pending}>
                {locale === "hi" ? "अपॉइंटमेंट पक्का करें" : "Confirm appointment"}
                <ArrowIcon size={13} />
              </Button>
            </div>
          </form>
          <aside className="rounded-[var(--radius-lg)] bg-[color:var(--color-deep)] p-6 text-white">
            <Mono className="text-[color:var(--color-accent)]">
              {locale === "hi" ? "सारांश" : "SUMMARY"}
            </Mono>
            <dl className="mt-5 grid gap-4 text-[13.5px]">
              <div>
                <dt className="text-white/60">{locale === "hi" ? "विभाग" : "Department"}</dt>
                <dd className="mt-0.5">{selectedDept?.name[locale]}</dd>
              </div>
              <div>
                <dt className="text-white/60">{locale === "hi" ? "चिकित्सक" : "Doctor"}</dt>
                <dd className="mt-0.5">{selectedDoctor.name[locale]}</dd>
              </div>
              <div>
                <dt className="text-white/60">{locale === "hi" ? "दिन" : "Day"}</dt>
                <dd className="mt-0.5">{days.find((d) => d.id === day)?.label}</dd>
              </div>
              <div>
                <dt className="text-white/60">{locale === "hi" ? "समय" : "Time"}</dt>
                <dd className="mt-0.5 inline-flex items-center gap-2">
                  <CalendarIcon size={13} />
                  {time}
                </dd>
              </div>
              <div>
                <dt className="text-white/60">
                  {locale === "hi" ? "स्थान" : "Location"}
                </dt>
                <dd className="mt-0.5">{selectedDoctor.location[locale]}</dd>
              </div>
            </dl>
            <p className="mt-6 border-t border-white/15 pt-5 text-[12px] text-white/60">
              {locale === "hi"
                ? "मॉक स्लॉट — असली सत्यापन SMS के बाद होगा।"
                : "Mocked slot — final confirmation arrives by SMS."}
            </p>
          </aside>
        </section>
      ) : null}
    </div>
  );
}
