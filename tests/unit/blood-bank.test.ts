import { describe, it, expect } from "vitest";
import { BloodBankContent } from "@/content/types";
import { bloodBank } from "@/content/blood-bank";

describe("blood-bank content", () => {
  it("parses through BloodBankContent schema", () => {
    const result = BloodBankContent.safeParse(bloodBank);
    if (!result.success) {
      throw new Error(
        `bloodBank failed schema validation:\n${JSON.stringify(result.error.format(), null, 2)}`,
      );
    }
    expect(result.success).toBe(true);
  });

  it("donate.phone matches the project E.164-relaxed pattern", () => {
    expect(bloodBank.donate.phone).toMatch(/^\+\d[\d\s-]+$/);
  });

  it("request.phone matches the project E.164-relaxed pattern", () => {
    expect(bloodBank.request.phone).toMatch(/^\+\d[\d\s-]+$/);
  });

  it("has at least 1 FAQ item, 1 service, 3 eligibility rules", () => {
    expect(bloodBank.faq.length).toBeGreaterThanOrEqual(1);
    expect(bloodBank.services.length).toBeGreaterThanOrEqual(1);
    expect(bloodBank.donate.eligibility.length).toBeGreaterThanOrEqual(3);
  });
});
