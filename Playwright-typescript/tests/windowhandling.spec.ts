//Handling the windows in playwright

import { test, expect } from '@playwright/test';

test('Single Handling multiple windows in playwright', async ({ page, context }) => {
  // Navigate to the initial page
  await page.goto('https://demo.automationtesting.in/Windows.html');
    //await page.locator('button.fc-cta-concent').click();

    // Click on a link that opens a new window
    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.click('button:has-text("click")')
    ]);

    await newPage.waitForLoadState();
    await newPage.bringToFront();

    // Verify the popup opened correctly
    await expect(newPage).toHaveURL('https://www.selenium.dev/');
    await expect(newPage).toHaveTitle('Selenium');

    // Interact with the new window's search widget
    await newPage.locator('.DocSearch-Button-Placeholder').click();
    await newPage.locator('.DocSearch-Input').fill('WebDriver');
    await expect(newPage.locator('.DocSearch-Hit').first()).toBeVisible();

    // Variation: close the popup and switch focus back to the original window
    await newPage.close();
    await page.bringToFront();
    expect(context.pages()).toHaveLength(1);
    await expect(page).toHaveURL('https://demo.automationtesting.in/Windows.html');
})