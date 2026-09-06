// handle Alert, Confirm and Prompt dialog boxes in Playwright using TypeScript

import { test, expect } from '@playwright/test';

test('Alert dialog', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    // Click the button to trigger the alert
    page.on('dialog', async (dialog) => {   
        const alertMessage = dialog.message();
        console.log('Alert message:', alertMessage);
        await expect(alertMessage).toBe('I am a JS Alert');
        await dialog.accept();
    })
    await page.getByRole('button', { name: 'Click for JS Alert' }).click();
    await page.waitForTimeout(2000); // Wait for 2 seconds to observe the alert handling
    await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
})

test('Confirm dialog', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');  
  await page.on('dialog', async (dialog) => {
    const confirmMessage = dialog.message();
    console.log('Confirm message:', confirmMessage);
    await expect(confirmMessage).toBe('I am a JS Confirm');
    await dialog.dismiss(); // Dismiss the confirm dialog
  })
  await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
  await page.waitForTimeout(2000);  
    await expect(page.locator('#result')).toHaveText('You clicked: Cancel');
})

test('Prompt dialog', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await page.on('dialog', async (dialog) => {
        const promptMessage = dialog.message();
        console.log('Prompt message:', promptMessage);
        await expect(promptMessage).toBe('I am a JS prompt');
        await dialog.accept('Enter Playwright'); // Accept the prompt and provide input
    })
    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
    await page.waitForTimeout(2000);  
    await expect(page.locator('#result')).toHaveText('You entered: Playwright');
})