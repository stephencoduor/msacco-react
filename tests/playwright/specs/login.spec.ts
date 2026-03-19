import { test, expect } from '@playwright/test';

import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.resolve(__dirname, '../../../screenshots/verified');

test.describe('Login', () => {
  test('login page renders correctly', async ({ page }) => {
    await page.goto('/login');
    await page.waitForSelector('#username');

    // Verify form elements
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();

    await page.screenshot({
      path: `${screenshotsDir}/01-login.png`,
      fullPage: true,
    });
  });

  test('shows validation errors', async ({ page }) => {
    await page.goto('/login');
    await page.waitForSelector('#username');

    // Submit empty form
    await page.click('button[type="submit"]');

    // Check for error messages
    await expect(page.getByText('Username is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });

  test('successful login redirects to home', async ({ page }) => {
    await page.goto('/login');
    await page.waitForSelector('#username');

    await page.fill('#username', 'mifos');
    await page.fill('#password', 'password');
    await page.click('button[type="submit"]');

    await page.waitForURL('**/home', { timeout: 15000 });
    await expect(page.getByText('Welcome to M-Sacco')).toBeVisible();
  });
});
