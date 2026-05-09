import Image from "next/image";
import { Mono } from "@/components/ui/Mono";
import { leadership } from "@/content/leadership";
import type { Locale } from "@/lib/locales";

export function LeadershipGrid({ locale }: { locale: Locale }) {
  return (
    <section className="bg-white">
      <div className="page-gutter mx-auto w-full max-w-[var(--content-max)] section-y">
        <Mono>{locale === "hi" ? "नेतृत्व" : "LEADERSHIP"}</Mono>
        <h2 className="display-md mt-3 max-w-[20ch]">
          {locale === "hi"
            ? "वे लोग जो संस्थान को निर्देश देते हैं।"
            : "The people who steer the institution."}
        </h2>
        <p className="lede mt-4 max-w-[60ch]">
          {locale === "hi"
            ? "ट्रस्टी और प्रबंधन — पदनाम लॉन्च से पहले संस्थान की पुष्टि के साथ अद्यतन होंगे।"
            : "Trustees and management. Titles will be confirmed by the institution before launch."}
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {leadership.map((member) => (
            <li key={member.id}>
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[var(--radius-md)] bg-[color:var(--color-paper-2)]">
                <Image
                  src={member.photo}
                  alt={member.name[locale]}
                  fill
                  sizes="(min-width: 1024px) 200px, (min-width: 640px) 33vw, 50vw"
                  className="object-cover"
                />
              </div>
              <p
                className="mt-3 text-[16px] font-medium leading-tight tracking-[-0.005em]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {member.name[locale]}
              </p>
              {member.role ? (
                <p className="meta mt-1 text-[color:var(--color-ink-soft)]">
                  {member.role[locale]}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
