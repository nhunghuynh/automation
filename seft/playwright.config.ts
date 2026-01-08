import {defineConfig, devices} from '@playwright/test';
import path from 'path';

// 🕒 Tạo timestamp (vd: 2025-11-10_21-45)
const now = new Date();
const vnTime = new Date(now.getTime() + 7 * 60 * 60 * 1000); // cộng thêm 7 giờ
const timestamp = vnTime
  .toISOString()
  .replace(/T/, '_')
  .replace(/:/g, '-')
  .replace(/\..+/, '');


export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  // slowMo can be controlled with the SLOWMO env var (milliseconds)
  // e.g. SLOWMO=100 npx playwright test
  use: {
    launchOptions: {
      slowMo: 5,
    },
  },
  fullyParallel: true,

  reporter: [
    ['list'],
    ['html', { outputFolder: path.join('reports', timestamp), open: 'never' }],
  ],
});