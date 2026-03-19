import { test, expect } from '../fixtures/auth.fixture';

import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.resolve(__dirname, '../../../screenshots/verified');

test.describe('Navigation / Shell', () => {
  test('desktop navbar renders correctly', async ({ authedPage: page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.waitForTimeout(500);

    // Verify nav bar elements
    const nav = page.locator('nav.sticky');
    await expect(nav).toBeVisible();

    // Logo
    await expect(page.locator('nav img[alt="M-Sacco"]')).toBeVisible();

    // Nav links
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Clients' })).toBeVisible();

    await page.screenshot({
      path: `${screenshotsDir}/02-home-navbar.png`,
      fullPage: false,
    });
  });

  test('mobile nav opens hamburger overlay', async ({ authedPage: page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(500);

    // Click hamburger menu
    const menuBtn = page.locator('button').filter({ has: page.locator('svg.lucide-menu') });
    await menuBtn.click();
    await page.waitForTimeout(300);

    // Verify sheet is open
    await expect(page.getByText('M-Sacco').first()).toBeVisible();

    await page.screenshot({
      path: `${screenshotsDir}/03-home-navbar-mobile.png`,
      fullPage: false,
    });

    // Close with Escape
    await page.keyboard.press('Escape');
  });
});
