import { test as base, type Page } from '@playwright/test';

export const test = base.extend<{ authedPage: Page }>({
  authedPage: async ({ page }, use) => {
    // Navigate to login
    await page.goto('/login');
    await page.waitForSelector('#username');

    // Fill credentials
    await page.fill('#username', 'mifos');
    await page.fill('#password', 'password');
    await page.click('button[type="submit"]');

    // Wait for redirect to home
    await page.waitForURL('**/home', { timeout: 15000 });

    // Dismiss warning dialog if shown
    const dismissBtn = page.getByRole('button', { name: 'I Understand' });
    if (await dismissBtn.isVisible({ timeout: 2000 }).catch(() => false)) {
      await dismissBtn.click();
    }

    await use(page);
  },
});

export { expect } from '@playwright/test';
