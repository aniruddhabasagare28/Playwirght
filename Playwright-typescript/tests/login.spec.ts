import {test, expect} from '@playwright/test';

test('Login test', async ({page})=>{
    //open browser
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.waitForLoadState('networkidle');
    //Enter valid username and password
    await page.getByRole('textbox',({name:'Username'})).fill('Admin');
    await page.getByRole('textbox', ({name: 'Password'})).fill('admin123');

    //Click on the login button
    await page.getByRole('button', ({name: 'Login'})).click();

    //Verify that the user is successfully logged in by checking for a specific element on the dashboard page
    await expect( page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
})