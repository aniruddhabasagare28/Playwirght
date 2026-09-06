//dropdown test case 

import { test, expect } from "@playwright/test";

test('dropdown', async({page})=>{
    await page.goto('https://demo.automationtesting.in/Register.html')
    const dropdown = page.locator('#Skills');
    await dropdown.selectOption('Java');
    await expect(dropdown).toHaveValue('Java');

    await  page.selectOption('#Skills', 'C');
    await expect(dropdown).toHaveValue('C');

    await page.selectOption('#Skills', 'Python');
    await expect(dropdown).toHaveValue('Python');

   await page.selectOption('#Skills', {value: 'Adobe InDesign'});
   await expect(dropdown).toHaveValue('Adobe InDesign');
})

test('non searchable', async({page})=>{
    await page.goto('https://demo.automationtesting.in/Register.html')
    await page.locator('span[role="combobox"]').click();
    await page.locator('ul#select2-country-results>li', {hasText: 'India'}).click();
    await expect(page.locator('span.select2-selection__rendered')).toHaveText('India');

})