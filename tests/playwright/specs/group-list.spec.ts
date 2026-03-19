import { test, expect } from '../fixtures/auth.fixture';
import { fileURLToPath } from 'url';
import path from 'path';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.resolve(__dirname, '../../../screenshots/verified');

test.describe('Group List', () => {
  test('renders group list with data', async ({ authedPage: page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    // Navigate to groups
    await page.getByRole('link', { name: 'Groups' }).click();
    await page.waitForURL('**/groups');

    // Wait for table to load
    await page.waitForSelector('table', { timeout: 15000 });
    await page.waitForTimeout(1000);

    // Verify page structure
    await expect(page.getByText('Groups').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /Create Group/i })).toBeVisible();

    await page.screenshot({
      path: `${screenshotsDir}/09-groups-list.png`,
      fullPage: false,
    });
  });

  test('group detail page loads', async ({ authedPage: page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    await page.getByRole('link', { name: 'Groups' }).click();
    await page.waitForURL('**/groups');
    await page.waitForTimeout(2000);

    // Click first View button
    const viewBtns = page.getByRole('button', { name: /View/i });
    await viewBtns.first().waitFor({ state: 'visible', timeout: 15000 });
    await viewBtns.first().click();
    await page.waitForURL(/\/groups\/\d+/);
    await page.waitForTimeout(2000);

    await expect(page.getByText('Group Details')).toBeVisible();
    await expect(page.getByText('Group Members')).toBeVisible();

    await page.screenshot({
      path: `${screenshotsDir}/10-group-detail.png`,
      fullPage: false,
    });
  });
});
