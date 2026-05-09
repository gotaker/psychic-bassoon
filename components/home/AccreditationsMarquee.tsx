import { useTranslations } from "next-intl";
import { Marquee } from "@/components/ui/Marquee";
import { Mono } from "@/components/ui/Mono";

export function AccreditationsMarquee() {
  const tA = useTranslations("accreditations");
  const tM = useTranslations("home.marquee");

  const items = [
    tA("nabh"),
    "EST. 1958 · HAPUR",
    tA("nmc"),
    "540 BEDS · 28 SPECIALTIES",
    tA("nabl"),
    "184 CONSULTANTS",
    tA("iso15189"),
    "1,800 ANGIOPLASTIES / YEAR",
  ];

  return (
    <section className="border-y border-[color:var(--color-line-soft)] bg-[color:var(--color-paper-2)] py-3">
      <Marquee speed={50} ariaLabel={tM("label")}>
        {items.map((label, i) => (
          <span key={`${label}-${i}`} className="flex items-center gap-12">
            <Mono className="whitespace-nowrap">{label}</Mono>
            <span aria-hidden="true" className="text-[color:var(--color-ink-soft)]">
              ◆
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
