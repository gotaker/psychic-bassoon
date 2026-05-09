import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = ["/en/blood-bank", "/hi/blood-bank"] as const;

test.describe("/[locale]/blood-bank a11y", () => {
  for (const route of ROUTES) {
    test(`AC-8: zero axe violations at ${route}`, async ({ page }) => {
      await page.goto(route);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag22aa"])
        .analyze();
      expect(result.violations, JSON.stringify(result.violations, null, 2)).toEqual([]);
    });

    test(`AC-9: heading order is strict at ${route}`, async ({ page }) => {
      await page.goto(route);
      const headings = page.locator("h1, h2, h3, h4, h5, h6");
      const count = await headings.count();
      const levels: number[] = [];
      for (let i = 0; i < count; i += 1) {
        const tag = await headings.nth(i).evaluate((el: Element) => el.tagName);
        levels.push(Number(tag.substring(1)));
      }
      expect(levels.filter((n) => n === 1).length).toBe(1);
      for (let i = 1; i < levels.length; i += 1) {
        const maxSoFar = Math.max(...levels.slice(0, i));
        expect(levels[i]).toBeLessThanOrEqual(maxSoFar + 1);
      }
    });
  }
});
