import { test, expect } from '../fixtures/auth.fixture';

import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.resolve(__dirname, '../../../screenshots/verified');

test.describe('Client List', () => {
  test('renders client list with data', async ({ authedPage: page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    // Navigate to clients
    await page.getByRole('link', { name: 'Clients' }).click();
    await page.waitForURL('**/clients');

    // Wait for table to load
    await page.waitForSelector('table', { timeout: 15000 });
    await page.waitForTimeout(1000);

    // Verify page structure
    await expect(page.getByText('Clients').first()).toBeVisible();

    await page.screenshot({
      path: `${screenshotsDir}/04-clients-list.png`,
      fullPage: false,
    });
  });
});
