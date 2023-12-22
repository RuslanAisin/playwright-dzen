import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "allure-playwright",
  timeout: 2 * 60 * 1000,
  use: {
    // launchOptions: {
    //   args: ["--start-maximized"],
    // },
    baseURL: "https://dzen.ru",
    screenshot: "only-on-failure",
    actionTimeout: 30000,
    trace: "off",
    headless: true,
    ignoreHTTPSErrors: true,
    video: {
      mode: "on",
      // size: { width: 1920, height: 1080 },
    },
  },
  projects: [
    {
      name: 'chromium',
      use: {  
        ...devices['Desktop Chromium'],
        viewport: null,
        launchOptions: {
          args: ["--start-maximized"]
      } 
      }, 
  ],
});
