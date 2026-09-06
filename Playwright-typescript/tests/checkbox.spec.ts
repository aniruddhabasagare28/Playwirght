//check box check

import {test, expect} from '@playwright/test';

test('check box', async({page})=>{
    await page.goto('https://demo.automationtesting.in/Register.html')
    const cricketCheckBox = page.locator('input[value="Cricket"]');
    const moviesCheckBox = page.locator('input[value="Movies"]');
    const hockeyCheckBox = page.locator('input[value="Hockey"]');

    //select cricket and hoky
    await cricketCheckBox.check();
    await hockeyCheckBox.check();
    await expect(cricketCheckBox).toBeChecked();
    await expect(hockeyCheckBox).toBeChecked();
    await expect(moviesCheckBox).not.toBeChecked();
})