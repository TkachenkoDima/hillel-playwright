import { Page, Locator } from '@playwright/test';

export class ProfilePage {
    readonly page: Page;
    readonly profileText: Locator;
    readonly profileButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.profileText = page.locator('p[class^="profile_name"]'); 
        this.profileButton = page.locator('a[routerlink="profile"]');
    }

    async clickProfileButton() {
        await this.profileButton.click();
    }

    async getProfileText() {
        return await this.profileText.textContent();
    }
}
