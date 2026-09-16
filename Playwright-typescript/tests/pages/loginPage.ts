// page for the login
import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
    readonly loginTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.loginTextBox = page.locator('input[name="username"]');
        this.passwordTextBox = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
    }

    async enterUsername(name: string) {
        await this.b_enterText(this.loginTextBox, name);
    }

    async enterPassword(password: string) {
        await this.b_enterText(this.passwordTextBox, password);
    }

    async clickLogin() {
        await this.b_clickElement(this.loginButton);
    }
}
