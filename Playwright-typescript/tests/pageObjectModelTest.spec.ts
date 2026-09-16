import {test, expect} from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import { AdminPage } from './pages/adminPage';
import { DashboardPage } from './pages/dashboardPage';
import * as orangeHrmLoginData from './testData/orangeHrmLoginData.json';

test('Orang hrm page onject model test', async({page})=>{
    
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    const adminPage = new AdminPage(page);
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.enterUsername(orangeHrmLoginData.validCredentials.username);
    await loginPage.enterPassword(orangeHrmLoginData.validCredentials.password);
    await loginPage.clickLogin();
    await expect(page).toHaveURL(/dashboard/);

    await dashboardPage.clickAdminTab();
    await adminPage.enterEmployeeName('John');
    await adminPage.clickSearch();

    await dashboardPage.clickProfileAccordion();
    await dashboardPage.logout();
})