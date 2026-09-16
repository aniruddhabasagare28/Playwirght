// page for the dashboard
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class DashboardPage extends BasePage {
    readonly page: Page;
    readonly userDropdown: Locator;
    readonly logoutLink: Locator;
    readonly adminTab: Locator;

    constructor(page: Page) {
        super(page)
        this.page = page;
        this.userDropdown = page.locator('.oxd-userdropdown-tab');
        this.logoutLink = page.getByRole('menuitem', { name: 'Logout' });
        this.adminTab = page.getByRole('link', { name: 'Admin' });
    }

    async clickProfileAccordion() {
        await this.userDropdown.click();
    }

    async logout() {
        await this.clickProfileAccordion();
        await this.logoutLink.click();
    }

    async clickAdminTab() {
        await this.adminTab.click();
    }
}
