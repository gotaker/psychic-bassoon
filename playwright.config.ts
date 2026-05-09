// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3000);
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: /.*\.spec\.ts$/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "mobile-chromium",
      use: { ...devices["iPhone 13"] },
    },
  ],
  webServer: {
    command: process.env.CI ? "pnpm build && pnpm start" : "pnpm dev",
    // Probe a locale-prefixed route directly. The site redirects `/` to
    // `/en` via middleware, and on Next 16 dev the middleware redirect
    // can cause Playwright's readiness probe to fail to detect the server.
    url: `${BASE_URL}/en`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
