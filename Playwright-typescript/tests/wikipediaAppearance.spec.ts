import { test, expect } from '@playwright/test';

test('selects large appearance on Wikipedia', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');

  await page.getByRole('link', { name: /^English/ }).click();
  await page.getByRole('button', { name: 'Appearance' }).click();
  await page.getByRole('radio', { name: 'Large' }).check();

  await expect(page.getByRole('radio', { name: 'Large' })).toBeChecked();
});
