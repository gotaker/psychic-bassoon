import { notFound } from "next/navigation";
import { Mono, Eyebrow } from "@/components/ui/Mono";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Field, TextareaField } from "@/components/ui/Field";
import { FilterPillGroup } from "@/components/ui/FilterPillGroup";
import { PhotoPlaceholder, type PhotoTone } from "@/components/ui/PhotoPlaceholder";
import { Marquee } from "@/components/ui/Marquee";
import { Stepper } from "@/components/ui/Stepper";
import { DoctorAvatar, getInitials } from "@/components/doctor/DoctorAvatar";
import { Icons, type IconName } from "@/components/icons";
import { FilterDemo } from "./_filter-demo";

const TONES: PhotoTone[] = ["mocha", "slate", "sand", "sage", "clay"];
const ICON_NAMES: IconName[] = [
  "arrow",
  "search",
  "pin",
  "phone",
  "cal",
  "check",
  "chev",
  "back",
  "star",
];

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <h2 className="display-sm mb-6 border-b border-[color:var(--color-line-soft)] pb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function PrimitivesDevPage() {
  if (process.env.NODE_ENV === "production") notFound();

  const sampleDoctor = {
    name: "Dr. Anjali Kapoor",
    tone: "#5a7a82" as const,
  };

  return (
    <main className="page-gutter mx-auto max-w-[1200px] py-12">
      <header className="mb-12">
        <Mono>dev · L2 · primitives</Mono>
        <h1 className="display-lg mt-3">Primitive vocabulary</h1>
        <p className="lede mt-3 max-w-[58ch]">
          Every primitive in every variant. Visual regression target for L2; reference for L3+
          composition.
        </p>
      </header>

      <Block title="Mono / Eyebrow">
        <div className="flex flex-col gap-3">
          <Mono>mono kicker — 11 / 0.18em</Mono>
          <Eyebrow>eyebrow alias</Eyebrow>
          <div data-tone="deep" className="bg-[color:var(--color-deep)] p-4 text-white">
            <Mono>kicker on deep — accent color</Mono>
          </div>
        </div>
      </Block>

      <Block title="SectionHeading">
        <SectionHeading
          kicker="No. 04 — Departments"
          rightLink={{ href: "#", label: "View all 28 →" }}
        >
          Six lines that carry the bench
        </SectionHeading>
      </Block>

      <Block title="Buttons — 4 variants × 3 sizes">
        <div className="grid gap-6">
          {(["sm", "md", "lg"] as const).map((size) => (
            <div key={size} className="flex flex-wrap items-center gap-3">
              <span className="meta w-12 tracking-[0.14em] text-[color:var(--color-ink-soft)] uppercase">
                {size}
              </span>
              <Button variant="primary" size={size}>
                Book appointment
              </Button>
              <Button variant="ghost" size={size}>
                Find a doctor
              </Button>
              <Button variant="accent" size={size}>
                Continue
              </Button>
              <Button variant="emergency" size={size}>
                Emergency · 102
              </Button>
            </div>
          ))}
          <div className="flex gap-3">
            <Button variant="primary" size="md" disabled>
              Disabled
            </Button>
            <Button variant="primary" size="md" href="/en">
              As link →
            </Button>
          </div>
        </div>
      </Block>

      <Block title="Field / TextareaField">
        <div className="grid max-w-[480px] gap-5">
          <Field id="demo-name" label="Patient name" placeholder="Full name" />
          <Field
            id="demo-phone"
            label="Mobile"
            placeholder="+91 9XXXXXXXXX"
            hint="We'll send your appointment confirmation here."
          />
          <Field
            id="demo-email"
            label="Email"
            placeholder="you@example.com"
            error="That doesn't look like a valid email."
            defaultValue="not-an-email"
          />
          <TextareaField
            id="demo-notes"
            label="Notes"
            placeholder="Anything the doctor should know in advance"
          />
        </div>
      </Block>

      <Block title="FilterPillGroup (client)">
        <FilterDemo />
      </Block>

      <Block title="PhotoPlaceholder — 5 tones">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {TONES.map((tone) => (
            <PhotoPlaceholder key={tone} tone={tone} caption={`tone · ${tone}`} ratio="tall" />
          ))}
        </div>
        <div className="mt-8">
          <PhotoPlaceholder
            tone="mocha"
            caption="EDITORIAL · CATH-LAB TWO · 06:42"
            overlay="The first case of the day, before the lights come up."
            ratio="wide"
            radius="md"
          />
        </div>
      </Block>

      <Block title="Marquee (client, paused on hover/focus, reduced-motion respected)">
        <div className="bg-[color:var(--color-paper-2)] py-3">
          <Marquee speed={50} ariaLabel="Accreditations and facts">
            <span className="mono-tag">NABH ACCREDITED</span>
            <span className="mono-tag">NMC RECOGNIZED</span>
            <span className="mono-tag">NABL · ISO 15189</span>
            <span className="mono-tag">EST. 1958 · HAPUR</span>
            <span className="mono-tag">540 BEDS · 28 SPECIALTIES</span>
            <span className="mono-tag">184 CONSULTANTS</span>
            <span className="mono-tag">1,800 ANGIOPLASTIES / YEAR</span>
            <span className="mono-tag">38 MIN AVG DOOR-TO-BALLOON</span>
          </Marquee>
        </div>
      </Block>

      <Block title="Stepper — 3+1 with confirmation">
        <div className="flex flex-col gap-8">
          {[0, 1, 2, 3].map((step) => (
            <div key={step}>
              <Mono>step {step}</Mono>
              <div className="mt-3">
                <Stepper
                  current={step}
                  steps={[
                    { id: "department", label: "Department" },
                    { id: "doctor", label: "Doctor & time" },
                    { id: "details", label: "Your details" },
                    { id: "done", label: "Confirmation" },
                  ]}
                />
              </div>
            </div>
          ))}
        </div>
      </Block>

      <Block title="DoctorAvatar — 4 sizes">
        <div className="flex flex-wrap items-end gap-6">
          {([56, 64, 72, 84] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <DoctorAvatar
                initials={getInitials(sampleDoctor.name)}
                tone={sampleDoctor.tone}
                size={size}
              />
              <span className="meta">{size}px</span>
            </div>
          ))}
        </div>
        <p className="body-sm mt-4 text-[color:var(--color-ink-soft)]">
          Initials derived from “{sampleDoctor.name}” → “{getInitials(sampleDoctor.name)}”.
          getInitials() strips the Dr./डॉ. honorific.
        </p>
      </Block>

      <Block title={`Icons — all ${ICON_NAMES.length} from DESIGN.md §3`}>
        <div className="grid grid-cols-3 gap-6 md:grid-cols-5 lg:grid-cols-9">
          {ICON_NAMES.map((name) => {
            const Icon = Icons[name];
            return (
              <div
                key={name}
                className="flex flex-col items-center gap-2 rounded-[var(--radius-md)] border border-[color:var(--color-line-soft)] p-4 text-[color:var(--color-deep)]"
              >
                <Icon size={20} />
                <span className="mono-tag">{name}</span>
              </div>
            );
          })}
        </div>
      </Block>
    </main>
  );
}
