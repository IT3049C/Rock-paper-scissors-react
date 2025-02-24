import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  globalTimeout: 60000, // Increased to 60 seconds
  timeout: 30000,      // Added timeout for individual tests (30 seconds)
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3000",

    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

  ],

  webServer: {
    command: "npm run dev -- --port=3000",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,   // Added webServer startup timeout (120 seconds)
  },
});