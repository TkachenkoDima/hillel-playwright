import { Locator, Page } from "@playwright/test";

export class RegistrationModal {

    readonly modalTitle: Locator;
    readonly nameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly reEnterPasswordInput: Locator;
    readonly registerButton: Locator;

    constructor(readonly page: Page) {
        this.modalTitle = page.locator(".modal-title");
        this.nameInput = page.locator("#signupName");
        this.lastNameInput = page.locator("#signupLastName");
        this.emailInput = page.locator("#signupEmail");
        this.passwordInput = page.locator("#signupPassword");
        this.reEnterPasswordInput = page.locator("#signupRepeatPassword");
        this.registerButton = page.locator(".modal-footer button");
    }

    async clickOutside() {
        await this.modalTitle.click();
    }

    async clickNameInput() {
        await this.nameInput.click();
    }

    async fillNameInput(name: string) {
        await this.nameInput.fill(name);
    }

    async getNameInputError() {
        return this.page.locator('#signupName + .invalid-feedback').textContent();
    }

    async clickLastNameInput() {
        await this.lastNameInput.click();
    }

    async fillLastNameInput(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    async getLastNameInputError() {
        return this.page.locator('#signupLastName + .invalid-feedback').textContent();
    }

    async clickEmailInput() {
        await this.emailInput.click();
    }

    async fillEmailInput(email: string) {
        await this.emailInput.fill(email);
    }

    async getEmailInputError() {
        return this.page.locator('#signupEmail + .invalid-feedback').textContent();
    }

    async clickPasswordInput() {
        await this.passwordInput.click();
    }

    async fillPasswordInput(password: string) {
        await this.passwordInput.fill(password);
    }

    async getPasswordInputError() {
        return this.page.locator('#signupPassword + .invalid-feedback').textContent();
    }

    async clickReEnterPasswordInput() {
        await this.reEnterPasswordInput.click();
    }

    async fillReEnterPasswordInput(password: string) {
        await this.reEnterPasswordInput.fill(password);
    }

    async getReEnterPasswordInputError() {
        return this.page.locator('#signupRepeatPassword + .invalid-feedback').textContent();
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    async registerNewUser(name: string, lastName: string, email: string, password: string) {
        await this.fillNameInput(name);
        await this.fillLastNameInput(lastName);
        await this.fillEmailInput(email);
        await this.fillPasswordInput(password);
        await this.fillReEnterPasswordInput(password);
        await this.clickRegisterButton();
    }
}
