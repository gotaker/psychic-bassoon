import { test, expect } from "@playwright/test";

test("home page loads in EN", async ({ page }) => {
  await page.goto("/en");
  await expect(page).toHaveURL(/\/en\/?$/);
});
