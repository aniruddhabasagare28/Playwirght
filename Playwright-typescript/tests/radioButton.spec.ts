import {test, expect} from '@playwright/test';

test('Radio button', async({page})=>{
    await page.goto('https://demo.automationtesting.in/Register.html')
    const maleRadioButton = page.locator('input[value="Male"]');
    const femaleRadioButton = page.locator('input[value="FeMale"]');
     
    await expect(maleRadioButton).not.toBeChecked();
    await expect(femaleRadioButton).not.toBeChecked();

    //Select the Male radio button
    await maleRadioButton.check();
    await expect(maleRadioButton).toBeChecked();
    await expect(femaleRadioButton).not.toBeChecked();

    //female radio button
    await femaleRadioButton.check();
    await expect(femaleRadioButton).toBeChecked();
    await expect(maleRadioButton).not.toBeChecked();


})