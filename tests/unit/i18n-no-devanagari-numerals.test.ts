import { describe, it, expect } from "vitest";
import hi from "@/messages/hi.json";

// Per DESIGN.md R-1 / CLAUDE.md: numerals MUST come from `lib/formatters.ts` at
// render time, never from hardcoded literals in `messages/hi.json`. This guard
// fails the build if any Devanagari digit codepoint (U+0966–U+096F) appears in
// any string value.

const DEVANAGARI_DIGIT_RE = /[०-९]/;

type AnyJson = string | number | boolean | null | { [k: string]: AnyJson } | AnyJson[];

function findOffenders(
  node: AnyJson,
  prefix = "",
  out: Array<{ path: string; value: string }> = [],
): Array<{ path: string; value: string }> {
  if (typeof node === "string") {
    if (DEVANAGARI_DIGIT_RE.test(node)) {
      out.push({ path: prefix, value: node });
    }
    return out;
  }
  if (node !== null && typeof node === "object" && !Array.isArray(node)) {
    for (const [k, v] of Object.entries(node)) {
      const path = prefix ? `${prefix}.${k}` : k;
      findOffenders(v, path, out);
    }
  } else if (Array.isArray(node)) {
    node.forEach((v, i) => findOffenders(v, `${prefix}[${i}]`, out));
  }
  return out;
}

describe("messages/hi.json: no Devanagari numerals", () => {
  it("contains zero Devanagari digit codepoints in any string value", () => {
    const offenders = findOffenders(hi as AnyJson);
    if (offenders.length > 0) {
      const lines = offenders.map((o) => `  - ${o.path}: ${JSON.stringify(o.value)}`);
      throw new Error(
        `messages/hi.json contains Devanagari numerals — these must come from lib/formatters.ts at render time, not from message literals.\n` +
          `${offenders.length} offending key${offenders.length === 1 ? "" : "s"}:\n${lines.join("\n")}`,
      );
    }
    expect(offenders).toEqual([]);
  });
});
