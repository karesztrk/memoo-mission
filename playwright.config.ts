import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "src/test/e2e",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:4321/",
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  webServer: {
    command: "pnpm dev",
    url: "http://localhost:4321/",
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
