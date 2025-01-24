import { Locator, Page } from '@playwright/test';
export class GaragePage {
    readonly h3: Locator;
    readonly profileButton: Locator;
    readonly successRegistrationAlert: Locator;

    constructor(readonly page: Page) {
        this.h3 = page.locator('h3');
        this.profileButton = page.locator('#userNavDropdown');
        this.successRegistrationAlert = page.locator('div[class="alert alert-success"]');
    }

    async getSuccessRegistrationAlertText() {
        return this.successRegistrationAlert.textContent();
    }
};
