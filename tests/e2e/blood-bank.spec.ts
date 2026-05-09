import { test, expect } from "@playwright/test";
import { bloodBank } from "@/content/blood-bank";

test.describe("/[locale]/blood-bank", () => {
  test("AC-1: hero CTA scrolls to #request lane (en)", async ({ page }) => {
    await page.goto("/en/blood-bank");
    const cta = page.getByRole("link", { name: /need blood for a patient/i }).first();
    await cta.click();
    await expect(page).toHaveURL(/#request$/);
    await expect(page.locator("#request")).toBeInViewport();
  });

  test("AC-2: donor lane tap-to-call uses tel: with donate.phone (hi)", async ({ page }) => {
    await page.goto("/hi/blood-bank");
    const callDonor = page
      .locator("#donate")
      .getByRole("link", { name: /रक्त बैंक/ })
      .first();
    const href = await callDonor.getAttribute("href");
    expect(href).toBe(`tel:${bloodBank.donate.phone}`);
  });

  test("AC-3: request lane tap-to-call uses tel: with request.phone (en)", async ({ page }) => {
    await page.goto("/en/blood-bank");
    const callReq = page
      .locator("#request")
      .getByRole("link", { name: /call the blood bank/i })
      .first();
    const href = await callReq.getAttribute("href");
    expect(href).toBe(`tel:${bloodBank.request.phone}`);
  });

  test("AC-4: FAQ expands by keyboard (en)", async ({ page }) => {
    await page.goto("/en/blood-bank");
    const firstQ = page.getByRole("button", { name: /who can donate/i });
    await firstQ.focus();
    await page.keyboard.press("Enter");
    await expect(firstQ).toHaveAttribute("aria-expanded", "true");
  });

  test("AC-5: header nav 'Blood Bank' / 'रक्त बैंक' both locales", async ({ page }) => {
    await page.goto("/en");
    const enLink = page.getByRole("link", { name: "Blood Bank" }).first();
    await expect(enLink).toHaveAttribute("href", "/en/blood-bank");

    await page.goto("/hi");
    const hiLink = page.getByRole("link", { name: "रक्त बैंक" }).first();
    await expect(hiLink).toHaveAttribute("href", "/hi/blood-bank");
  });

  test("AC-6: /departments/blood-bank stub renders with single rich-page CTA", async ({ page }) => {
    await page.goto("/en/departments/blood-bank");
    const cta = page.getByRole("link", { name: /visit our blood bank/i });
    await expect(cta).toHaveAttribute("href", "/en/blood-bank");
    await expect(cta).toHaveCount(1);
  });

  test("AC-7: prefers-reduced-motion → instant scroll lands target in viewport", async ({
    browser,
  }) => {
    const ctx = await browser.newContext({ reducedMotion: "reduce" });
    const page = await ctx.newPage();
    await page.goto("/en/blood-bank");
    const target = page.locator("#request");
    await expect(target).not.toBeInViewport();
    await page
      .getByRole("link", { name: /need blood for a patient/i })
      .first()
      .click();
    await expect(target).toBeInViewport({ timeout: 100 });
    await ctx.close();
  });
});
