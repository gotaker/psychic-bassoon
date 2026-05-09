import { describe, it, expect } from "vitest";
import { z } from "zod";
import {
  Doctor,
  Department,
  DepartmentDetail,
  NewsItem,
  Stat,
  Location,
} from "@/content/types";
import { doctors } from "@/content/doctors";
import { departments } from "@/content/departments";
import { news } from "@/content/news";
import { stats } from "@/content/stats";
import { locations } from "@/content/locations";
import { cardiology } from "@/content/departments/cardiology";

// L4 acceptance gate: every record in /content must parse cleanly through its
// Zod schema. Failures here mean the seed data has drifted from the contract.

function expectAllParse<T>(
  records: readonly unknown[],
  schema: z.ZodType<T>,
  label: string,
): void {
  records.forEach((record, idx) => {
    const result = schema.safeParse(record);
    if (!result.success) {
      throw new Error(
        `${label}[${idx}] failed schema validation:\n` +
          JSON.stringify(result.error.format(), null, 2),
      );
    }
  });
}

describe("content shape", () => {
  it("all doctors parse as Doctor", () => {
    expectAllParse(doctors, Doctor, "doctors");
    expect(doctors.length).toBeGreaterThan(0);
  });

  it("all departments parse as Department", () => {
    expectAllParse(departments, Department, "departments");
    expect(departments.length).toBeGreaterThan(0);
  });

  it("all news items parse as NewsItem", () => {
    expectAllParse(news, NewsItem, "news");
    expect(news.length).toBeGreaterThan(0);
  });

  it("all stats parse as Stat", () => {
    expectAllParse(stats, Stat, "stats");
    expect(stats.length).toBeGreaterThan(0);
  });

  it("all locations parse as Location", () => {
    expectAllParse(locations, Location, "locations");
    expect(locations.length).toBeGreaterThan(0);
  });

  it("cardiology parses as DepartmentDetail", () => {
    const result = DepartmentDetail.safeParse(cardiology);
    if (!result.success) {
      throw new Error(
        `cardiology failed schema validation:\n${JSON.stringify(result.error.format(), null, 2)}`,
      );
    }
    expect(result.success).toBe(true);
  });

  it("every doctor's departmentSlugs reference real department slugs", () => {
    const validSlugs = new Set<string>(departments.map((d) => d.slug));
    for (const doc of doctors) {
      for (const slug of doc.departmentSlugs) {
        expect(validSlugs.has(slug)).toBe(true);
      }
    }
  });

  it("blood-bank dept entry exists and uses richPageHref", () => {
    // Widen the `as const` literal-narrowed array to the schema type so the
    // optional `richPageHref` property is visible across all union members.
    const all: readonly Department[] = departments;
    const entry = all.find((d) => d.slug === "blood-bank");
    expect(entry).toBeDefined();
    expect(entry?.richPageHref).toBe("/en/blood-bank");
  });

  it("every richPageHref is locale-prefixed (en|hi)", () => {
    const all: readonly Department[] = departments;
    for (const d of all) {
      if (d.richPageHref) {
        expect(d.richPageHref).toMatch(/^\/(?:en|hi)\//);
      }
    }
  });
});
