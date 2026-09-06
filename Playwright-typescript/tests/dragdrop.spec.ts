// Handling the drag and drop functionality in playwright

import { test, expect } from '@playwright/test';

test('Drag and Drop functionality in playwright', async ({ page }) => {
  // Navigate to the drag and drop page
  await page.goto('https://demo.automationtesting.in/Static.html');
  await page.waitForLoadState('domcontentloaded');
    // Locate the source and target elements for drag and drop
    const sourceElement = page.locator('#angular');
    const targetElement = page.locator('#droparea');

    // Perform the drag and drop action
    await sourceElement.dragTo(targetElement);

    // Verify the drop actually happened: #angular should now be nested inside #droparea
    await expect(targetElement.locator('#angular')).toBeVisible();
});


test('Drag and Drop functionality in playwright Hover', async ({ page }) => {
  // Navigate to the drag and drop page
  await page.goto('https://demo.automationtesting.in/Static.html');
  await page.waitForLoadState('domcontentloaded');
    // Locate the source and target elements for drag and drop
    const sourceElement = page.locator('#angular');
    const targetElement = page.locator('#droparea');

    // Perform the drag and drop action
    await sourceElement.hover();
    await page.mouse.down();
    await targetElement.hover();
    await page.mouse.up();

    // Verify the drop actually happened: #angular should now be nested inside #droparea
    await expect(targetElement.locator('#angular')).toBeVisible();
});
