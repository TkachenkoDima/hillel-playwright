import { defineConfig } from '@playwright/test';
import { config } from './data.config';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: 'apps/src/tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    baseURL: config.baseURL,
    headless: true,
    actionTimeout: 0,
    trace: 'off',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure', 
  },

  projects: [
    {
      name: 'ui-tests',
      testDir: 'tests/ui',
      use: {
        headless: true,
        video: 'retain-on-failure',  
      },
    },
    {
      name: 'api-tests',
      testDir: 'tests/api',
      use: {
        headless: true,
        video: 'retain-on-failure', 
      },
    },
  ],
});
