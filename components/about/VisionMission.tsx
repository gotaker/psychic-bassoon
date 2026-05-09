import { Mono } from "@/components/ui/Mono";
import type { Locale } from "@/lib/locales";

type Card = {
  kicker: { en: string; hi: string };
  statement: { en: string; hi: string };
  body: { en: string; hi: string };
};

const VISION: Card = {
  kicker: { en: "VISION", hi: "दृष्टि" },
  statement: {
    en: "Care worth staying home for.",
    hi: "ऐसी देखभाल — जिसके लिए घर छोड़ना न पड़े।",
  },
  body: {
    en: "To be the hospital western Uttar Pradesh trusts first. For a daughter's first cardiology consult, a grandfather's joint replacement, a difficult pregnancy — so families never feel that good medicine requires a journey to Delhi.",
    hi: "पश्चिमी उत्तर प्रदेश का वह अस्पताल बनना जिस पर परिवार सबसे पहले भरोसा करें — बेटी की पहली हृदय जाँच के लिए, दादाजी के घुटने के ऑपरेशन के लिए, कठिन गर्भावस्था के लिए — ताकि अच्छी चिकित्सा के लिए दिल्ली जाने की आवश्यकता न लगे।",
  },
};

const MISSION: Card = {
  kicker: { en: "MISSION", hi: "मिशन" },
  statement: {
    en: "Treat every patient as someone's family.",
    hi: "हर रोगी को किसी के परिवार का सदस्य मानें।",
  },
  body: {
    en: "Combine accredited clinical standards — NABH, NABL, NMC, ISO 15189 — with the patience of a small-town institution. Never let distance, language, or cost be the reason a patient hesitates to seek care.",
    hi: "मान्यता-प्राप्त चिकित्सीय मानकों — NABH, NABL, NMC, ISO 15189 — को एक छोटे शहर के अस्पताल की संवेदनशीलता के साथ जोड़ें। दूरी, भाषा या लागत किसी भी रोगी को आने से न रोके।",
  },
};

const CARDS = [VISION, MISSION];

export function VisionMission({ locale }: { locale: Locale }) {
  return (
    <section className="border-y border-[color:var(--color-line-soft)] bg-[color:var(--color-paper-2)]">
      <div className="page-gutter section-y mx-auto w-full max-w-[var(--content-max)]">
        <ul className="grid grid-cols-1 gap-px bg-[color:var(--color-line-soft)] md:grid-cols-2">
          {CARDS.map((card) => (
            <li
              key={card.kicker.en}
              className="bg-[color:var(--color-paper-2)] p-8 md:p-12 lg:p-14"
            >
              <Mono>{card.kicker[locale]}</Mono>
              <h2 className="display-sm mt-4 max-w-[20ch] text-[color:var(--color-ink)]">
                {card.statement[locale]}
              </h2>
              <p className="body mt-6 max-w-[48ch] text-[color:var(--color-ink-soft)]">
                {card.body[locale]}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
