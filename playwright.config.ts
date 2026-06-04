import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './test',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

 use: {
    baseURL: 'https://practicesoftwaretesting.com',
    headless: true,
    actionTimeout: 15000,       // زدنا هنا شوية الوقت للـ actions
    navigationTimeout: 45000,   // وعطينا 45 ثانية للـ page.goto باش مايطيحش الـ timeout
    screenshot: 'only-on-failure',
    video: 'on', 
    trace: 'on-first-retry',
    ignoreHTTPSErrors: true,
    testIdAttribute: 'data-test'
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        video: 'on', 
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'] 
      },
    },
   
  ],
});