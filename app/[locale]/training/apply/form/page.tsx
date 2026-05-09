import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StickyCtaBar } from "@/components/layout/StickyCtaBar";
import { PrintButton } from "@/components/training/PrintButton";
import { Button } from "@/components/ui/Button";
import { Mono } from "@/components/ui/Mono";
import { TRAINING_COURSES } from "@/content/training";
import type { Locale } from "@/lib/locales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isHi = locale === "hi";
  return {
    title: isHi
      ? "FOGSI प्रशिक्षण आवेदन फ़ॉर्म — देव नंदिनी अस्पताल"
      : "FOGSI training application form — Dev Nandini Hospital",
    description: isHi
      ? "FOGSI बाँझपन प्रशिक्षण के लिए मानक आवेदन फ़ॉर्म — प्रिंट करने योग्य संस्करण।"
      : "Standard application form for FOGSI infertility training — printable version.",
    alternates: {
      canonical: `/${locale}/training/apply/form`,
      languages: {
        en: "/en/training/apply/form",
        hi: "/hi/training/apply/form",
        "x-default": "/en/training/apply/form",
      },
    },
  };
}

export default async function ApplicationFormPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <div className="print:hidden">
        <SiteHeader locale={locale} />
      </div>
      <ApplicationFormMain locale={locale} />
      <div className="print:hidden">
        <SiteFooter />
        <StickyCtaBar locale={locale} />
      </div>
    </>
  );
}

function ApplicationFormMain({ locale }: { locale: Locale }) {
  const t = useTranslations("training");
  const feeFormatter = new Intl.NumberFormat(locale === "hi" ? "hi-IN" : "en-IN");

  const courseFee = (id: "basic" | "advanced" | "iui") =>
    feeFormatter.format(TRAINING_COURSES.find((c) => c.id === id)?.feeINR ?? 0);

  return (
    <main className="bg-[color:var(--color-paper)] print:bg-white">
      <section className="page-gutter mx-auto w-full max-w-[var(--content-max)] py-16 md:py-24 print:hidden">
        <Link
          href={`/${locale}/training/apply`}
          className="meta inline-flex items-center gap-1.5 text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-primary)]"
        >
          {t("applicationForm.backCta")}
        </Link>
        <div className="mt-6">
          <Mono>{t("applicationForm.kicker")}</Mono>
          <h1 className="display-lg mt-3 max-w-[20ch]">{t("applicationForm.title")}</h1>
          <p className="lede mt-6 max-w-[60ch]">{t("applicationForm.lede")}</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <PrintButton>{t("applicationForm.printCta")}</PrintButton>
          <Button variant="ghost" size="md" href={`/${locale}/training/curriculum`}>
            {t("apply.syllabusCta")}
          </Button>
        </div>
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

          <FormFields />

          <CourseFeesPanel
            iuiFee={courseFee("iui")}
            basicFee={courseFee("basic")}
            advancedFee={courseFee("advanced")}
          />

          <p className="mt-5 text-[11.5px] leading-relaxed">
            Fees are paid by a Demand Draft or a Banker&apos;s Cheque payable at Mumbai in favour of{" "}
            <strong>&ldquo;FOGSI&rdquo;</strong>. Along with the DD this form is to be submitted with
            choice of Centre and preferable months you would like to have the training. All
            applications should be sent to FOGSI Office. FOGSI Awardees of Travelling fellowship
            will get two weeks training free for their particular year. A completion certificate
            will be issued after successful completion of the course.
          </p>

          <OfficeUseRow />

          <p className="mt-6 border-t border-[color:var(--color-ink)]/40 pt-4 text-[10.5px] leading-relaxed italic text-[color:var(--color-ink-soft)]">
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
    </main>
  );
}

function FormHeader() {
  return (
    <header className="border-b border-[color:var(--color-ink)] pb-4">
      <p className="text-[14px] font-semibold tracking-[-0.005em]">
        The Federation of Obstetric &amp; Gynecological Societies of India
      </p>
      <address className="mt-1 text-[11.5px] leading-relaxed not-italic text-[color:var(--color-ink-soft)]">
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

function FormFields() {
  return (
    <div className="mt-6 space-y-5 text-[12.5px]">
      <FieldRow label="Name of the Centre" />

      <FieldGroup>
        <Field label="Surname" />
        <Field label="First Name (Dr.)" />
        <Field label="Middle name" />
      </FieldGroup>

      <FieldRow label="Name on Certificate (Dr.)" />

      <FieldGroup>
        <Field label="Sex" widthClass="w-[120px]" />
        <Field label="Date of Birth (DD / MM / YY)" widthClass="w-[200px]" />
        <Field label="Qualification" />
      </FieldGroup>

      <FieldRow label="Address" />

      <FieldGroup>
        <Field label="City" />
        <Field label="State" />
        <Field label="Pin" widthClass="w-[140px]" />
      </FieldGroup>

      <FieldGroup>
        <Field label="Mobile" />
        <Field label="Email ID" />
      </FieldGroup>

      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <FieldLabel>Member of</FieldLabel>
        <FieldLine className="min-w-[220px] flex-1" />
        <span className="text-[12px] text-[color:var(--color-ink-soft)]">
          Obstetric and Gynecological Society
        </span>
      </div>

      <FieldGroup>
        <Field label="D.D. No." />
        <Field label="Drawn on" />
        <Field label="Rs." widthClass="w-[160px]" />
      </FieldGroup>

      <FieldGroup>
        <Field label="No. of Days" widthClass="w-[140px]" />
        <Field label="From" />
        <Field label="To" />
      </FieldGroup>

      <div className="flex justify-end pt-2">
        <div className="flex w-full max-w-[360px] items-baseline gap-3">
          <FieldLabel>Signature of Applicant</FieldLabel>
          <FieldLine className="flex-1" />
        </div>
      </div>
    </div>
  );
}

function CourseFeesPanel({
  iuiFee,
  basicFee,
  advancedFee,
}: {
  iuiFee: string;
  basicFee: string;
  advancedFee: string;
}) {
  return (
    <div className="mt-6 border border-[color:var(--color-ink)]">
      <p className="border-b border-[color:var(--color-ink)] py-1.5 text-center text-[13px] font-semibold">
        Course Fees
      </p>
      <div className="grid grid-cols-1 gap-3 p-4 text-[12.5px] sm:grid-cols-2">
        <FeeRow label="IUI & Stimulation Protocol" amount={`Rs. ${iuiFee}/-`} />
        <FeeRow label="Basic Infertility Course" amount={`Rs. ${basicFee}/-`} />
        <FeeRow label="Advanced Infertility Course" amount={`Rs. ${advancedFee}/-`} />
      </div>
    </div>
  );
}

function FeeRow({ label, amount }: { label: string; amount: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden
        className="inline-block h-3 w-3 shrink-0 border border-[color:var(--color-ink)]"
      />
      <span className="font-semibold">{label}</span>
      <span className="ml-auto whitespace-nowrap">{amount}</span>
    </div>
  );
}

function OfficeUseRow() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-[color:var(--color-ink)]/40 pt-5 text-[12px] sm:grid-cols-3">
      <Field label="Approved by: Dr." />
      <Field label="Signature" />
      <Field label="Issued On" />
      <Field label="Form Revised on" />
      <Field label="Revision No." />
    </div>
  );
}

function FieldGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3 sm:items-baseline">
      {children}
    </div>
  );
}

function FieldRow({ label }: { label: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <FieldLabel>{label}</FieldLabel>
      <FieldLine className="flex-1" />
    </div>
  );
}

function Field({ label, widthClass }: { label: string; widthClass?: string }) {
  return (
    <div className={`flex items-baseline gap-2 ${widthClass ?? ""}`}>
      <FieldLabel>{label}</FieldLabel>
      <FieldLine className="flex-1" />
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="meta shrink-0 tracking-[0.06em] whitespace-nowrap text-[color:var(--color-ink)]">
      {children}:
    </span>
  );
}

function FieldLine({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block h-5 border-b border-dotted border-[color:var(--color-ink)]/70 ${className ?? ""}`}
    />
  );
}
