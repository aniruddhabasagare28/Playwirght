import {test, expect} from '@playwright/test';

test('verify the clicks', async({page}) =>{
       await page.goto('https://play1.automationcamp.ir/mouse_events.html')
       await page.getByText('Perform mouse                            operations here').click();
         await expect( page.locator('.badge.badge-dark')).toHaveText('Click');
} )

test('Verfiy the double clicks', async({page}) =>{
    await page.goto('https://play1.automationcamp.ir/mouse_events.html')
    await page.getByText('Perform mouse                            operations here').dblclick();
      await expect( page.locator('.badge.badge-dark')).toHaveText('Double-Click');
})

test('Verify the right clicks', async({page}) =>{
    await page.goto('https://play1.automationcamp.ir/mouse_events.html')
    await page.getByText('Perform mouse                            operations here').click({button:'right'});
      await expect( page.locator('.badge.badge-dark')).toHaveText('Right-Click');
})