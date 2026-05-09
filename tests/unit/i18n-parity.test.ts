import { describe, it, expect } from "vitest";
import en from "@/messages/en.json";
import hi from "@/messages/hi.json";

type AnyJson = string | number | boolean | null | { [k: string]: AnyJson } | AnyJson[];

function collectKeyPaths(node: AnyJson, prefix = "", out: string[] = []): string[] {
  if (node !== null && typeof node === "object" && !Array.isArray(node)) {
    for (const [k, v] of Object.entries(node)) {
      const path = prefix ? `${prefix}.${k}` : k;
      if (v !== null && typeof v === "object" && !Array.isArray(v)) {
        collectKeyPaths(v, path, out);
      } else {
        out.push(path);
      }
    }
  }
  return out;
}

describe("messages key parity", () => {
  it("en.json and hi.json have identical key paths", () => {
    const enKeys = new Set(collectKeyPaths(en as AnyJson));
    const hiKeys = new Set(collectKeyPaths(hi as AnyJson));

    const onlyInEn = [...enKeys].filter((k) => !hiKeys.has(k)).sort();
    const onlyInHi = [...hiKeys].filter((k) => !enKeys.has(k)).sort();

    if (onlyInEn.length || onlyInHi.length) {
      const lines: string[] = [];
      if (onlyInEn.length) {
        lines.push(`Keys present in en.json but missing from hi.json:`);
        for (const k of onlyInEn) lines.push(`  - ${k}`);
      }
      if (onlyInHi.length) {
        if (lines.length) lines.push("");
        lines.push(`Keys present in hi.json but missing from en.json:`);
        for (const k of onlyInHi) lines.push(`  - ${k}`);
      }
      throw new Error(`Message-key parity broken:\n${lines.join("\n")}`);
    }

    expect(onlyInEn).toEqual([]);
    expect(onlyInHi).toEqual([]);
  });
});
