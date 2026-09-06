//writing hooks for playwright

import { test, expect } from '@playwright/test';

test.describe('Suite 1', ()=>{

    // `page` is a per-test fixture created fresh for every test, so beforeAll/afterAll
// (which run once for the whole file, not per test) can't meaningfully use it.
// beforeEach/afterEach DO get a real, isolated `page` for the test they wrap, so
// goto + login lives there instead - each test stays independent and can run in
// parallel, rather than every test sharing one browser tab/session.
test.beforeAll(async () => {
    console.log('Before all tests');
});

test.beforeEach(async ({ page }) => {
    console.log('Before each test');
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.locator('.inventory_list')).toBeVisible();
});

test.afterEach(async ({ page }) => {
    console.log('After each test');
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();
    await expect(page.locator('#login-button')).toBeVisible();
});

test.afterAll(async () => {
    console.log('After all tests');
});

test('inventory page is shown after login', async ({ page }) => {
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
});

test('add item to cart', async ({ page }) => {
    const addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    await addToCartButton.click();

    // Button turns into "Remove" once the item is in the cart
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});



});

test.describe('Suite 2', ()=>{

    test.beforeEach(async ({ page }) => {
    console.log('Before each test');
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.locator('.inventory_list')).toBeVisible();
});

test.afterEach(async ({ page }) => {
    console.log('After each test');
    await page.locator('#react-burger-menu-btn').click();
    await page.locator('#logout_sidebar_link').click();
    await expect(page.locator('#login-button')).toBeVisible();
});

test('remove item from cart', async ({ page }) => {
    // Add the item first so there's something to remove
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    await removeButton.click();

    // Badge disappears entirely once the cart is empty, and the button reverts to "Add to cart"
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
});
});





