//Use orangeHRM to login and the data from orangeHrmLoginData

import { test, expect } from "@playwright/test";
import * as orangeHrmData from './testData/orangeHrmLoginData.json';

test('Login with valid credentials from JSON', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await page.getByRole('textbox', { name: 'Username' }).fill(orangeHrmData.validCredentials.username);
    await page.getByRole('textbox', { name: 'Password' }).fill(orangeHrmData.validCredentials.password);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});

test('Login with invalid credentials from JSON', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    await page.getByRole('textbox', { name: 'Username' }).fill(orangeHrmData.invalidCredentials.username);
    await page.getByRole('textbox', { name: 'Password' }).fill(orangeHrmData.invalidCredentials.password);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('.oxd-alert-content-text')).toHaveText('Invalid credentials');
});
