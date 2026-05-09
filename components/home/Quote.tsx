import { useTranslations } from "next-intl";
import { EditorialSplit } from "@/components/layout/EditorialSplit";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";

export function Quote() {
  const t = useTranslations("home.quote");
  return (
    <section className="bg-[color:var(--color-paper-2)]">
      <div className="page-gutter section-y mx-auto w-full max-w-[var(--content-max)]">
        <EditorialSplit
          ratio="1.15-1"
          left={
            <blockquote>
              <p
                className="text-[color:var(--color-ink)]"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(28px, 3.5vw, 42px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.018em",
                  fontWeight: 400,
                  maxWidth: "30ch",
                }}
              >
                “{t("text")}”
              </p>
              <footer className="meta mt-6 text-[color:var(--color-ink-soft)]">
                — {t("attribution")}
              </footer>
            </blockquote>
          }
          right={
            <PhotoPlaceholder
              tone="mocha"
              caption={t("photoCaption")}
              ratio="square"
              radius="sm"
              image={{
                src: "/images/contextual/home-quote.jpg",
                alt: "Patient in a hospital ward",
              }}
            />
          }
        />
      </div>
    </section>
  );
}
