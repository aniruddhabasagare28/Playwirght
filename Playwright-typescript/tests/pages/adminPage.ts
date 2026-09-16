// page for the admin > user management > system users screen
import { Page, Locator, expect } from "@playwright/test";

export class AdminPage {
    readonly page: Page;
    readonly employeeNameTextBox: Locator;
    readonly employeeNameSuggestions: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // This OXD field has no name/id, only a <label> that isn't linked via
        // for/id - so it's scoped by its containing .oxd-input-group's label text.
        this.employeeNameTextBox = page.locator('.oxd-input-group:has(label:text-is("Employee Name")) input');
        this.employeeNameSuggestions = page.locator('.oxd-autocomplete-dropdown .oxd-autocomplete-option');
        this.searchButton = page.getByRole('button', { name: 'Search' });
    }

    async enterEmployeeName(name: string) {
        // Typing triggers an async lookup; the dropdown briefly shows a
        // "Searching...." placeholder before real suggestions arrive, so wait
        // for that to clear before picking a name.
        await this.employeeNameTextBox.fill(name);
        await expect(this.employeeNameSuggestions.first()).not.toHaveText('Searching....');
        await this.employeeNameSuggestions.first().click();
    }

    async clickSearch() {
        await this.searchButton.click();
    }
}
