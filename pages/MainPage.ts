import { Locator, Page } from '@playwright/test';

export class MainPage {
    readonly signInButton: Locator;
    readonly signUpButton: Locator;
    readonly guestLoginButton: Locator;
    readonly logo: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(readonly page: Page) {
        this.signInButton = page.locator('button.header_signin');
        this.signUpButton = page.locator('button[class*="btn-primary"]');
        this.guestLoginButton = page.locator('button[class$="-guest"]');
        this.logo = page.locator('.header_logo');
        this.emailInput = page.locator('#signinEmail');
        this.passwordInput = page.locator('#signinPassword');
        this.loginButton = page.locator('button[class="btn btn-primary"]');
    }

    async clickSignInButton() {
        await this.signInButton.click();
    }

    async clickSignUpButton() {
        await this.signUpButton.click();
    }

    async clickGuestLoginButton() {
        await this.guestLoginButton.click();
    }

    async loginWithExistingUser(email: string, password: string) {
        await this.clickSignInButton();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
