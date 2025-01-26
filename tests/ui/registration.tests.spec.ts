import { test, expect } from '@playwright/test';
import { RegistrationModal } from '../../pages/RegistrationModal';
import { MainPage } from '../../pages/MainPage';
import { BasePage } from '../../pages/basePage';
import { UserModel } from '../../models/UserModel';
import { GaragePage } from '../../pages/GaragePage';
import { generateRandomString, generatePassword } from '../../utils/generators';

test.describe('Registration tests', () => {
    let basePage: BasePage;
    let mainPage: MainPage;
    let registrationModal: RegistrationModal;
    let garagePage: GaragePage;
    let user: UserModel;

    test.beforeAll(async ({ page }) => {
        basePage = new BasePage(page);
        mainPage = new MainPage(page);
        registrationModal = new RegistrationModal(page);
        garagePage = new GaragePage(page);
        user = UserModel.createNewUser();

        await basePage.openMainPage();
        await mainPage.clickSignUpButton();
    });

    test('Verify fields empty state', async () => {
        await registrationModal.clickNameInput();
        await registrationModal.clickOutside();
        expect(await registrationModal.getNameInputError()).toBe('Name required');

        await registrationModal.clickLastNameInput();
        await registrationModal.clickOutside();
        expect(await registrationModal.getLastNameInputError()).toBe('Last name required');

        await registrationModal.clickEmailInput();
        await registrationModal.clickOutside();
        expect(await registrationModal.getEmailInputError()).toBe('Email required');

        await registrationModal.clickPasswordInput();
        await registrationModal.clickOutside();
        expect(await registrationModal.getPasswordInputError()).toBe('Password required');

        await registrationModal.clickReEnterPasswordInput();
        await registrationModal.clickOutside();
        expect(await registrationModal.getReEnterPasswordInputError()).toBe('Re-enter password required');
    });

    test('Verify name field validations', async () => {
        await registrationModal.fillNameInput(generateRandomString(1));
        await registrationModal.clickOutside();
        expect(await registrationModal.getNameInputError()).toBe('Name has to be from 2 to 20 characters long');

        await registrationModal.fillNameInput(generateRandomString(21));
        expect(await registrationModal.getNameInputError()).toBe('Name has to be from 2 to 20 characters long');
    });

    test('Verify last name field validations', async () => {
        await registrationModal.fillLastNameInput(generateRandomString(1));
        await registrationModal.clickOutside();
        expect(await registrationModal.getLastNameInputError()).toBe('Last name has to be from 2 to 20 characters long');

        await registrationModal.fillLastNameInput(generateRandomString(21));
        expect(await registrationModal.getLastNameInputError()).toBe('Last name has to be from 2 to 20 characters long');
    });

    test('Verify email field validations', async () => {
        await registrationModal.fillEmailInput('invalidEmail');
        await registrationModal.clickOutside();
        expect(await registrationModal.getEmailInputError()).toBe('Email is incorrect');
    });

    test('Verify password field validations', async () => {
        await registrationModal.fillPasswordInput(generateRandomString(7));
        await registrationModal.clickOutside();
        expect(await registrationModal.getPasswordInputError()).toBe('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

        await registrationModal.fillPasswordInput(generateRandomString(16));
        expect(await registrationModal.getPasswordInputError()).toBe('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    test('Verify re-enter password field validations', async () => {
        const password = generatePassword();
        user.password = password;
    
        await registrationModal.fillPasswordInput(user.password);
        await registrationModal.fillReEnterPasswordInput(user.password + '1');
        await registrationModal.clickOutside();
        expect(await registrationModal.getReEnterPasswordInputError()).toBe('Passwords do not match');
    });

    test('Verify successful registration', async () => {
        await registrationModal.fillNameInput(user.name);
        await registrationModal.fillLastNameInput(user.lastName);
        await registrationModal.fillEmailInput(user.email);
        await registrationModal.fillPasswordInput(user.password);
        await registrationModal.fillReEnterPasswordInput(user.password);
        await registrationModal.clickRegisterButton();

        expect(await garagePage.profileButton.isVisible());
        expect(await garagePage.getSuccessRegistrationAlertText()).toBe('Registration complete');
    });
});
