import {test as baseTest} from '@playwright/test';
import { AdminPage } from '../tests/pages/adminPage';
import { LoginPage } from '../tests/pages/loginPage';
import { DashboardPage } from '../tests/pages/dashboardPage';

type pages={
    loginPage:LoginPage;
    adminPage:AdminPage;
    dashboardPage:DashboardPage;
}

const testPages = baseTest.extend<pages>({
    loginPage: async({page}, use)=>{
        await use(new LoginPage(page));
    },

    adminPage:async ({page}, use)=>{
        await use(new AdminPage(page));
    },

    dashboardPage: async({page}, use)=>{
        await use(new DashboardPage(page));
    }
})

export const test = testPages;
export const expect = testPages.expect;

