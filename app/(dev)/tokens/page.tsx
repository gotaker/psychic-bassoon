import { notFound } from "next/navigation";

const PALETTES = ["teal", "forest", "burgundy", "navy"] as const;
const DENSITIES = ["compact", "regular", "spacious"] as const;
const COLOR_TOKENS = [
  "ink",
  "ink-soft",
  "deep",
  "primary",
  "primary-2",
  "accent",
  "accent-2",
  "paper",
  "paper-2",
  "white",
  "line",
  "line-soft",
  "emergency",
] as const;

export default function TokensDevPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <main
      style={{
        padding: "32px 40px",
        background: "var(--color-paper)",
        color: "var(--color-ink)",
        minHeight: "100vh",
      }}
    >
      <header style={{ marginBottom: 48 }}>
        <p className="mono-kicker" style={{ marginBottom: 8 }}>
          dev · L1 · tokens
        </p>
        <h1 className="display-md" style={{ marginBottom: 8 }}>
          Token system verification
        </h1>
        <p className="lede">
          Renders all four palettes, three densities, and the full type scale. Visual regression
          target for L1.
        </p>
      </header>

      {/* Palette swatches */}
      <section style={{ marginBottom: 64 }}>
        <h2 className="display-sm" style={{ marginBottom: 24 }}>
          Palettes
        </h2>
        <div style={{ display: "grid", gap: 24 }}>
          {PALETTES.map((p) => (
            <div key={p} data-palette={p}>
              <p className="mono-kicker" style={{ marginBottom: 12 }}>
                {p}
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                  gap: 8,
                }}
              >
                {COLOR_TOKENS.map((tok) => (
                  <div
                    key={tok}
                    style={{
                      padding: 12,
                      borderRadius: "var(--radius-md)",
                      background: `var(--color-${tok})`,
                      border: "1px solid var(--color-line-soft)",
                      minHeight: 72,
                    }}
                  >
                    <span
                      className="mono-tag"
                      style={{
                        background: "var(--color-white)",
                        padding: "2px 6px",
                        borderRadius: 2,
                      }}
                    >
                      {tok}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Density */}
      <section style={{ marginBottom: 64 }}>
        <h2 className="display-sm" style={{ marginBottom: 24 }}>
          Density
        </h2>
        <div style={{ display: "grid", gap: 16 }}>
          {DENSITIES.map((d) => (
            <div
              key={d}
              data-density={d}
              style={{
                background: "var(--color-white)",
                border: "1px solid var(--color-line-soft)",
                borderRadius: "var(--radius-lg)",
                padding: "var(--card-padding)",
              }}
            >
              <p className="mono-kicker" style={{ marginBottom: 12 }}>
                {d}
              </p>
              <p className="body">
                Section padding-y: <span className="meta">var(--section-py)</span>
                {" · "}
                Card padding: <span className="meta">var(--card-padding)</span>
                {" · "}
                Hero padding-y: <span className="meta">var(--hero-py)</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Type scale */}
      <section style={{ marginBottom: 64 }}>
        <h2 className="display-sm" style={{ marginBottom: 24 }}>
          Type scale
        </h2>
        <div style={{ display: "grid", gap: 18 }}>
          <p className="mono-kicker">mono-kicker · 11 / 0.18em</p>
          <p className="display-xl">Display XL · 84 / 0.98</p>
          <p className="display-lg">Display LG · 64 / 1.02</p>
          <p className="display-md">Display MD · 46 / 1.05</p>
          <p className="display-sm">Display SM · 30–34 / 1.05</p>
          <p className="lede">
            Lede · 19 / 1.5 — A few sentences of leading copy. The hospital is 65 years old, well
            regarded, and not flashy. The site reflects that: editorial, not corporate; quiet
            confidence; spacious; photographic.
          </p>
          <p className="body">
            Body · 16 / 1.5 — Default body type. Doctors are named with full credentials. Numbers
            are exact. Hindi is first-class.
          </p>
          <p className="body-sm">Body small · 13 / 1.55 — Card body, captions.</p>
          <p className="meta">Meta · 12 / 1.4</p>
          <p className="mono-tag">mono-tag · 10 / 0.14em</p>
        </div>
      </section>

      {/* Hindi sample (Devanagari font loads via :lang(hi)) */}
      <section style={{ marginBottom: 64 }} lang="hi">
        <h2 className="display-sm" style={{ marginBottom: 24 }}>
          Hindi (Devanagari)
        </h2>
        <p className="mono-kicker" lang="en">
          Verifies :lang(hi) → --font-sans-hi swap and 5% line-height bump on serif headings.
        </p>
        <h3 className="display-md" style={{ marginTop: 16 }}>
          देव नंदिनी अस्पताल
        </h3>
        <p className="lede" style={{ marginTop: 12 }}>
          हापुड़ में १९५८ से एक भरोसेमंद बहु-विशेषज्ञ अस्पताल। ५४० बिस्तर, २८ विभाग, १८४ चिकित्सक।
        </p>
      </section>

      {/* Surfaces with tone */}
      <section style={{ marginBottom: 64 }}>
        <h2 className="display-sm" style={{ marginBottom: 24 }}>
          Surface tones
        </h2>
        <div style={{ display: "grid", gap: 16 }}>
          {(["paper", "paper-2", "white", "deep"] as const).map((tone) => {
            const onDark = tone === "deep";
            return (
              <div
                key={tone}
                data-tone={tone}
                style={{
                  background: `var(--color-${tone})`,
                  color: onDark ? "var(--color-white)" : "var(--color-ink)",
                  padding: 32,
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--color-line-soft)",
                }}
              >
                <p className="mono-kicker" style={{ marginBottom: 8 }}>
                  tone · {tone}
                </p>
                <p className="display-sm">A surface of paper or deep.</p>
                <p className="body" style={{ marginTop: 8, opacity: onDark ? 0.85 : 0.75 }}>
                  Body copy on this tone. Mono kickers shift to accent on deep surfaces.
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
