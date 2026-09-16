import {test, expect} from '../fixtures/pomFixtures'
import * as orangeHrmLoginData from './testData/orangeHrmLoginData.json';

test('Orang hrm page onject model test', async({page,loginPage, dashboardPage, adminPage})=>{
    
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

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