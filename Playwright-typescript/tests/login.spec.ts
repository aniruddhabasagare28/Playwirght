import {test, expect} from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { DashboardPage } from './pages/dashboardPage';
import * as orangeHrmLoginData from './testData/orangeHrmLoginData.json';

test('Login test', async ({page})=>{
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    //open browser
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    //Enter valid username and password and submit
    await loginPage.enterUsername(orangeHrmLoginData.validCredentials.username);
    await loginPage.enterPassword(orangeHrmLoginData.validCredentials.password);
    await loginPage.clickLogin();

    //Verify that the user is successfully logged in by checking the dashboard URL and heading
    await expect(page).toHaveURL(/dashboard/);
    await expect(dashboardPage.dashboardHeading).toBeVisible();
})