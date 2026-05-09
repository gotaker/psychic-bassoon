"use client";

import { forwardRef } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { useTranslations } from "next-intl";
import { useForm, type UseFormRegister } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { TRAINING_COURSES, TRAINING_ENQUIRY_EMAIL } from "@/content/training";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/locales";

type CourseId = "iui" | "basic" | "advanced";

type FormValues = {
  centre: string;
  surname: string;
  firstName: string;
  middleName: string;
  certificateName: string;
  sex: string;
  dob: string;
  qualification: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  mobile: string;
  email: string;
  memberOf: string;
  ddNo: string;
  drawnOn: string;
  ddAmount: string;
  numDays: string;
  fromDate: string;
  toDate: string;
  selectedCourses: CourseId[];
};

const DEFAULT_VALUES: FormValues = {
  centre: "",
  surname: "",
  firstName: "",
  middleName: "",
  certificateName: "",
  sex: "",
  dob: "",
  qualification: "",
  address: "",
  city: "",
  state: "",
  pin: "",
  mobile: "",
  email: "",
  memberOf: "",
  ddNo: "",
  drawnOn: "",
  ddAmount: "",
  numDays: "",
  fromDate: "",
  toDate: "",
  selectedCourses: [],
};

const COURSE_LABELS: Record<CourseId, string> = {
  iui: "IUI & Stimulation Protocol",
  basic: "Basic Infertility Course",
  advanced: "Advanced Infertility Course",
};

export function ApplicationFormFillable({ locale }: { locale: Locale }) {
  const t = useTranslations("training.applicationForm");
  const feeFormatter = new Intl.NumberFormat(locale === "hi" ? "hi-IN" : "en-IN");
  const courseFee = (id: CourseId) =>
    feeFormatter.format(TRAINING_COURSES.find((c) => c.id === id)?.feeINR ?? 0);

  const { register, getValues, reset } = useForm<FormValues>({
    defaultValues: DEFAULT_VALUES,
  });

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print();
  };

  const handleEmail = () => {
    const v = getValues();
    const selected = v.selectedCourses.length
      ? v.selectedCourses.map((id) => COURSE_LABELS[id]).join(", ")
      : "(not specified)";
    const lines = [
      "FOGSI Training Application — Dev Nandini Hospital, Hapur",
      "",
      `Name of the Centre: ${v.centre}`,
      `Surname: ${v.surname}`,
      `First Name (Dr.): ${v.firstName}`,
      `Middle Name: ${v.middleName}`,
      `Name on Certificate (Dr.): ${v.certificateName}`,
      `Sex: ${v.sex}`,
      `Date of Birth: ${v.dob}`,
      `Qualification: ${v.qualification}`,
      `Address: ${v.address}`,
      `City: ${v.city}    State: ${v.state}    Pin: ${v.pin}`,
      `Mobile: ${v.mobile}    Email: ${v.email}`,
      `Member of: ${v.memberOf} Obstetric and Gynecological Society`,
      "",
      `Course(s) selected: ${selected}`,
      `D.D. No.: ${v.ddNo}    Drawn on: ${v.drawnOn}    Amount (Rs.): ${v.ddAmount}`,
      `No. of Days: ${v.numDays}    From: ${v.fromDate}    To: ${v.toDate}`,
      "",
      "Note: a signed printed copy with the Demand Draft must still be posted to the FOGSI office.",
    ];
    const fullName = [v.firstName, v.surname].filter(Boolean).join(" ");
    const subject = fullName
      ? `FOGSI Training Application — ${fullName}`
      : "FOGSI Training Application";
    const href =
      `mailto:${TRAINING_ENQUIRY_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = href;
  };

  const handleReset = () => reset(DEFAULT_VALUES);

  return (
    <form onSubmit={(e) => e.preventDefault()} noValidate>
      <section className="page-gutter mx-auto w-full max-w-[820px] pt-2 pb-8 print:hidden">
        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" variant="primary" size="md" onClick={handlePrint}>
            {t("printCta")}
          </Button>
          <Button type="button" variant="ghost" size="md" onClick={handleEmail}>
            {t("mailCta")}
          </Button>
          <Button type="button" variant="ghost" size="md" onClick={handleReset}>
            {t("resetCta")}
          </Button>
        </div>
        <p className="meta mt-3 text-[color:var(--color-ink-soft)]">{t("postNote")}</p>
      </section>

      <section className="page-gutter pb-24 print:p-0">
        <article className="mx-auto w-full max-w-[820px] border border-[color:var(--color-ink)]/80 bg-white p-8 text-[color:var(--color-ink)] shadow-sm md:p-12 print:border-black print:p-6 print:shadow-none">
          <FormHeader />
          <FormTitleBlock />
          <CourseTracksTable />
          <p className="mt-6 text-[12.5px] leading-relaxed italic">
            <strong className="not-italic">
              For FOGSI members having a Degree and Diploma in Obstetrics and Gynecology from
              MCI-recognized universities.
            </strong>
          </p>
          <p className="mt-4 text-[12px] leading-relaxed text-[color:var(--color-ink-soft)]">
            The course Director of each Centre should send proper &amp; complete form or in the
            standard ready form prepared by FOGSI.
          </p>

          <div className="mt-6 space-y-5 text-[12.5px]">
            <FillRow label="Name of the Centre" {...register("centre")} />

            <FillGroup>
              <FillField label="Surname" {...register("surname")} />
              <FillField label="First Name (Dr.)" {...register("firstName")} />
              <FillField label="Middle name" {...register("middleName")} />
            </FillGroup>

            <FillRow label="Name on Certificate (Dr.)" {...register("certificateName")} />

            <FillGroup>
              <FillField label="Sex" widthClass="w-[120px]" {...register("sex")} />
              <FillField
                label="Date of Birth (DD / MM / YY)"
                widthClass="w-[230px]"
                placeholder="DD / MM / YY"
                {...register("dob")}
              />
              <FillField label="Qualification" {...register("qualification")} />
            </FillGroup>

            <FillRow label="Address" {...register("address")} />

            <FillGroup>
              <FillField label="City" {...register("city")} />
              <FillField label="State" {...register("state")} />
              <FillField
                label="Pin"
                widthClass="w-[160px]"
                inputMode="numeric"
                {...register("pin")}
              />
            </FillGroup>

            <FillGroup>
              <FillField label="Mobile" type="tel" {...register("mobile")} />
              <FillField label="Email ID" type="email" {...register("email")} />
            </FillGroup>

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
              <FieldLabel>Member of</FieldLabel>
              <FillInput
                aria-label="Member of (society name)"
                className="min-w-[220px] flex-1"
                {...register("memberOf")}
              />
              <span className="text-[12px] text-[color:var(--color-ink-soft)]">
                Obstetric and Gynecological Society
              </span>
            </div>

            <FillGroup>
              <FillField label="D.D. No." {...register("ddNo")} />
              <FillField label="Drawn on" {...register("drawnOn")} />
              <FillField
                label="Rs."
                widthClass="w-[180px]"
                inputMode="numeric"
                {...register("ddAmount")}
              />
            </FillGroup>

            <FillGroup>
              <FillField
                label="No. of Days"
                widthClass="w-[160px]"
                inputMode="numeric"
                {...register("numDays")}
              />
              <FillField label="From" {...register("fromDate")} />
              <FillField label="To" {...register("toDate")} />
            </FillGroup>

            <div className="flex justify-end pt-2">
              <div className="flex w-full max-w-[360px] items-baseline gap-3">
                <FieldLabel>Signature of Applicant</FieldLabel>
                <SignatureLine className="flex-1" />
              </div>
            </div>
          </div>

          <CourseFeesPanel
            iuiFee={courseFee("iui")}
            basicFee={courseFee("basic")}
            advancedFee={courseFee("advanced")}
            register={register}
          />

          <p className="mt-5 text-[11.5px] leading-relaxed">
            Fees are paid by a Demand Draft or a Banker&apos;s Cheque payable at Mumbai in favour of{" "}
            <strong>&ldquo;FOGSI&rdquo;</strong>. Along with the DD this form is to be submitted
            with choice of Centre and preferable months you would like to have the training. All
            applications should be sent to FOGSI Office. FOGSI Awardees of Travelling fellowship
            will get two weeks training free for their particular year. A completion certificate
            will be issued after successful completion of the course.
          </p>

          <OfficeUseRow />

          <p className="mt-6 border-t border-[color:var(--color-ink)]/40 pt-4 text-[10.5px] leading-relaxed text-[color:var(--color-ink-soft)] italic">
            <strong className="not-italic">Disclaimer:</strong> The training courses are meant to be
            comprehensive refresher training for already qualified Ob-Gyn (Category A) candidates.
            The information provided during training is not intended to substitute for formal
            medical training or certification. FOGSI is in no way responsible for legal
            credentialing or training in any procedure or technique, nor are the training programs
            described a replacement for credentialing requirements. All curricula described are
            subject to change depending on available resources, as well as on the needs of the
            course participants. FOGSI cannot take responsibility for the services provided by the
            trainees / trainers. FOGSI is registered trademark and the logo is to be used only as
            per the guidelines.
          </p>
        </article>
      </section>
    </form>
  );
}

function FormHeader() {
  return (
    <header className="border-b border-[color:var(--color-ink)] pb-4">
      <p className="text-[14px] font-semibold tracking-[-0.005em]">
        The Federation of Obstetric &amp; Gynecological Societies of India
      </p>
      <address className="mt-1 text-[11.5px] leading-relaxed text-[color:var(--color-ink-soft)] not-italic">
        C – 5, 6, 7, 9, 12, 13, 1<sup>st</sup> Floor, Trade World, Kamala City,
        <br />
        Senapati Bapat Marg, Lower Parel (W), Mumbai – 400 013
        <br />
        Tel: +91-22-2495 1648, 2495 1654, 2494 8032, 22-2494 8048
        <br />
        Email: fogsi2007@gmail.com, Office@fogsi.org, training@fogsi.org &nbsp;·&nbsp; Web:
        www.fogsi.org
      </address>
    </header>
  );
}

function FormTitleBlock() {
  return (
    <div className="mt-5 text-center">
      <h2 className="text-[16px] font-semibold tracking-[-0.005em]">
        Application form for training courses
      </h2>
      <p className="mt-1 text-[14px] font-semibold underline">
        Basic / Advanced Infertility / IUI in Obstetrics &amp; Gynecology
      </p>
    </div>
  );
}

function CourseTracksTable() {
  const tracks = [
    "Basic Infertility — 7 days course Training",
    "Advanced Infertility — 14 days course Training",
    "IUI & Stimulation — 2 days Course Protocol",
  ];
  return (
    <table className="mt-5 w-full border-collapse text-[12px]">
      <tbody>
        <tr>
          {tracks.map((track) => (
            <td
              key={track}
              className="w-1/3 border border-[color:var(--color-ink)] px-3 py-2 align-top"
            >
              {track}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

function CourseFeesPanel({
  iuiFee,
  basicFee,
  advancedFee,
  register,
}: {
  iuiFee: string;
  basicFee: string;
  advancedFee: string;
  register: UseFormRegister<FormValues>;
}) {
  const rows: { id: CourseId; label: string; amount: string }[] = [
    { id: "iui", label: "IUI & Stimulation Protocol", amount: `Rs. ${iuiFee}/-` },
    { id: "basic", label: "Basic Infertility Course", amount: `Rs. ${basicFee}/-` },
    { id: "advanced", label: "Advanced Infertility Course", amount: `Rs. ${advancedFee}/-` },
  ];
  return (
    <fieldset className="mt-6 border border-[color:var(--color-ink)]">
      <legend className="sr-only">Course selection</legend>
      <p className="border-b border-[color:var(--color-ink)] py-1.5 text-center text-[13px] font-semibold">
        Course Fees
      </p>
      <div className="grid grid-cols-1 gap-3 p-4 text-[12.5px] sm:grid-cols-2">
        {rows.map((row) => (
          <label key={row.id} className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              value={row.id}
              {...register("selectedCourses")}
              className="h-3 w-3 shrink-0 accent-[color:var(--color-ink)]"
            />
            <span className="font-semibold">{row.label}</span>
            <span className="ml-auto whitespace-nowrap">{row.amount}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function OfficeUseRow() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-[color:var(--color-ink)]/40 pt-5 text-[12px] sm:grid-cols-3">
      <StaticField label="Approved by: Dr." />
      <StaticField label="Signature" />
      <StaticField label="Issued On" />
      <StaticField label="Form Revised on" />
      <StaticField label="Revision No." />
    </div>
  );
}

function FillGroup({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3 sm:items-baseline">
      {children}
    </div>
  );
}

type FillRowProps = InputHTMLAttributes<HTMLInputElement> & { label: string };

const FillRow = forwardRef<HTMLInputElement, FillRowProps>(function FillRow(
  { label, ...rest },
  ref,
) {
  return (
    <div className="flex items-baseline gap-3">
      <FieldLabel>{label}</FieldLabel>
      <FillInput ref={ref} className="flex-1" aria-label={label} {...rest} />
    </div>
  );
});

type FillFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  widthClass?: string;
};

const FillField = forwardRef<HTMLInputElement, FillFieldProps>(function FillField(
  { label, widthClass, ...rest },
  ref,
) {
  return (
    <div className={cn("flex items-baseline gap-2", widthClass)}>
      <FieldLabel>{label}</FieldLabel>
      <FillInput ref={ref} className="flex-1" aria-label={label} {...rest} />
    </div>
  );
});

function StaticField({ label }: { label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <FieldLabel>{label}</FieldLabel>
      <SignatureLine className="flex-1" />
    </div>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <span className="meta shrink-0 tracking-[0.06em] whitespace-nowrap text-[color:var(--color-ink)]">
      {children}:
    </span>
  );
}

function SignatureLine({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block h-5 border-b border-dotted border-[color:var(--color-ink)]/70",
        className,
      )}
    />
  );
}

const fillInputClasses =
  "min-w-0 appearance-none border-x-0 border-t-0 border-b border-dotted " +
  "border-[color:var(--color-ink)]/70 bg-transparent px-1 py-0.5 " +
  "text-[12.5px] leading-tight text-[color:var(--color-ink)] outline-none " +
  "placeholder:text-[color:var(--color-ink-soft)]/60 " +
  "focus:border-solid focus:border-[color:var(--color-primary)] " +
  "print:placeholder:text-transparent";

const FillInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function FillInput({ className, type = "text", ...rest }, ref) {
    return <input ref={ref} type={type} className={cn(fillInputClasses, className)} {...rest} />;
  },
);
