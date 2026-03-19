import { test, expect } from '../fixtures/auth.fixture';

import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.resolve(__dirname, '../../../screenshots/verified');

test.describe('Client Detail', () => {
  test('identification tab', async ({ authedPage: page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    // Navigate to clients
    await page.getByRole('link', { name: 'Clients' }).click();
    await page.waitForURL('**/clients');
    await page.waitForTimeout(2000);

    // Click first View button
    const viewBtns = page.getByRole('button', { name: /View/i });
    await viewBtns.first().waitFor({ state: 'visible', timeout: 15000 });
    await viewBtns.first().click();
    await page.waitForURL(/\/clients\/\d+/);
    await page.waitForTimeout(2000);

    // Should default to identification tab
    await expect(page.getByText('Identification').first()).toBeVisible({ timeout: 10000 });

    await page.screenshot({
      path: `${screenshotsDir}/05-client-detail.png`,
      fullPage: false,
    });
  });

  test('business tab', async ({ authedPage: page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    await page.getByRole('link', { name: 'Clients' }).click();
    await page.waitForURL('**/clients');
    await page.waitForTimeout(2000);

    const viewBtns = page.getByRole('button', { name: /View/i });
    await viewBtns.first().waitFor({ state: 'visible', timeout: 15000 });
    await viewBtns.first().click();
    await page.waitForURL(/\/clients\/\d+/);
    await page.waitForTimeout(2000);

    await page.getByRole('link', { name: 'Business' }).click();
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: `${screenshotsDir}/06-client-business.png`,
      fullPage: false,
    });
  });

  test('next of kin tab', async ({ authedPage: page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    await page.getByRole('link', { name: 'Clients' }).click();
    await page.waitForURL('**/clients');
    await page.waitForTimeout(2000);

    const viewBtns = page.getByRole('button', { name: /View/i });
    await viewBtns.first().waitFor({ state: 'visible', timeout: 15000 });
    await viewBtns.first().click();
    await page.waitForURL(/\/clients\/\d+/);
    await page.waitForTimeout(2000);

    await page.getByRole('link', { name: 'Next of Kin' }).click();
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: `${screenshotsDir}/07-client-nextofkin.png`,
      fullPage: false,
    });
  });

  test('documents tab', async ({ authedPage: page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    await page.getByRole('link', { name: 'Clients' }).click();
    await page.waitForURL('**/clients');
    await page.waitForTimeout(2000);

    const viewBtns = page.getByRole('button', { name: /View/i });
    await viewBtns.first().waitFor({ state: 'visible', timeout: 15000 });
    await viewBtns.first().click();
    await page.waitForURL(/\/clients\/\d+/);
    await page.waitForTimeout(2000);

    await page.getByRole('link', { name: 'Documents' }).click();
    await page.waitForTimeout(1000);

    await page.screenshot({
      path: `${screenshotsDir}/08-client-documents.png`,
      fullPage: false,
    });
  });
});
