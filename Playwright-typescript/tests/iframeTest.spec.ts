// Frame handling 

import { test, expect } from '@playwright/test';

test('Frame handling', async({page})=>{
    await page.goto('https://demo.automationtesting.in/Frames.html')
    const frame1 = page.frameLocator('#singleframe');
    await frame1.locator('input[type="text"]').fill('Hello Frame');
    await expect(frame1.locator('input[type="text"]')).toHaveValue('Hello Frame');  
})


test('Nested Frame handling', async({page})=>{
    await page.goto('https://demo.automationtesting.in/Frames.html')
    await page.locator('a[href="#Multiple"]').click();          
    await page.frameLocator('iframe[src="MultipleFrames.html"]').frameLocator('iframe[src="SingleFrame.html"]').locator('input[type="text"]').fill('Hello Nested Frame');
    await expect(page.frameLocator('iframe[src="MultipleFrames.html"]').frameLocator('iframe[src="SingleFrame.html"]').locator('input[type="text"]')).toHaveValue('Hello Nested Frame');
})