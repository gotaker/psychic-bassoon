import { describe, it, expect } from "vitest";
import {
  formatNumber,
  formatDate,
  formatReadMinutes,
  formatPhone,
  formatYearsExperience,
} from "@/lib/formatters";

// Devanagari digits 0-9 for assertion helpers.
const DEVANAGARI_DIGITS = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
const containsDevanagariDigit = (s: string): boolean =>
  DEVANAGARI_DIGITS.some((d) => s.includes(d));
const containsLatinDigit = (s: string): boolean => /\d/.test(s);

describe("formatNumber", () => {
  it("renders Latin digits for EN", () => {
    expect(formatNumber(1958, "en")).toBe("1,958");
    expect(formatNumber(540, "en")).toBe("540");
    expect(formatNumber(1800, "en")).toBe("1,800");
  });

  it("renders Devanagari digits for HI", () => {
    const out = formatNumber(1958, "hi");
    expect(containsDevanagariDigit(out)).toBe(true);
    expect(containsLatinDigit(out)).toBe(false);
    // sanity: contains the right digits
    expect(out).toContain("१");
    expect(out).toContain("९");
    expect(out).toContain("५");
    expect(out).toContain("८");
  });

  it("respects Intl.NumberFormatOptions (percent)", () => {
    const en = formatNumber(0.94, "en", { style: "percent" });
    expect(en).toBe("94%");
    const hi = formatNumber(0.94, "hi", { style: "percent" });
    expect(containsDevanagariDigit(hi)).toBe(true);
    expect(hi).toContain("%");
  });

  it("supports decimals", () => {
    expect(formatNumber(2.4, "en", { maximumFractionDigits: 1 })).toBe("2.4");
    const hi = formatNumber(2.4, "hi", { maximumFractionDigits: 1 });
    expect(hi).toContain("२");
    expect(hi).toContain("४");
  });
});

describe("formatDate", () => {
  it("formats ISO date in EN short style", () => {
    const out = formatDate("2026-04-04", "en");
    // en-IN short month — accept either "Apr" or "Apr." across ICU versions
    expect(out).toMatch(/Apr/);
    expect(out).toContain("4");
    expect(out).toContain("2026");
  });

  it("formats ISO date in HI with Devanagari digits", () => {
    const out = formatDate("2026-04-04", "hi");
    expect(containsDevanagariDigit(out)).toBe(true);
    // year 2026 -> २०२६
    expect(out).toContain("२०२६");
  });

  it("supports long style", () => {
    const en = formatDate("2026-04-04", "en", "long");
    expect(en).toContain("April");
    expect(en).toContain("2026");
  });

  it("throws on malformed input", () => {
    expect(() => formatDate("not-a-date", "en")).toThrow();
    expect(() => formatDate("2026/04/04", "en")).toThrow();
    expect(() => formatDate("", "hi")).toThrow();
  });

  it("does not drift across timezones (uses UTC)", () => {
    // 2026-01-01 should always render January, never December prior year.
    const en = formatDate("2026-01-01", "en");
    expect(en).toContain("Jan");
    expect(en).toContain("2026");
  });
});

describe("formatReadMinutes", () => {
  it("uses 'min' in EN", () => {
    expect(formatReadMinutes(6, "en")).toBe("6 min");
    expect(formatReadMinutes(14, "en")).toBe("14 min");
  });

  it("uses 'मिनट' with Devanagari digits in HI", () => {
    expect(formatReadMinutes(6, "hi")).toBe("६ मिनट");
    expect(formatReadMinutes(14, "hi")).toBe("१४ मिनट");
  });
});

describe("formatPhone", () => {
  it("preserves Latin digits regardless of locale (international convention)", () => {
    expect(formatPhone("+91 80 4422 0099")).toBe("+91 80 4422 0099");
  });

  it("collapses repeated whitespace", () => {
    expect(formatPhone("+91   80    4422   0099")).toBe("+91 80 4422 0099");
  });

  it("trims surrounding whitespace", () => {
    expect(formatPhone("  +91 80 4422 0099  ")).toBe("+91 80 4422 0099");
  });

  it("throws on missing leading +", () => {
    expect(() => formatPhone("91 80 4422 0099")).toThrow();
  });

  it("throws on garbage input", () => {
    expect(() => formatPhone("call us!")).toThrow();
    expect(() => formatPhone("")).toThrow();
  });
});

describe("formatYearsExperience", () => {
  it("uses 'years' in EN", () => {
    expect(formatYearsExperience(24, "en")).toBe("24 years");
    expect(formatYearsExperience(1, "en")).toBe("1 years");
  });

  it("uses 'वर्ष' with Devanagari digits in HI", () => {
    expect(formatYearsExperience(24, "hi")).toBe("२४ वर्ष");
    expect(formatYearsExperience(18, "hi")).toBe("१८ वर्ष");
  });
});
