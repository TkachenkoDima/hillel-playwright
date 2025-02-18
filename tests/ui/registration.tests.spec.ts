import { test, expect } from '@playwright/test';
import { RegistrationModal } from '../../pages/RegistrationModal';
import { MainPage } from '../../pages/MainPage';
import { UserModel } from '../../models/UserModel';
import { GaragePage } from '../../pages/GaragePage';
import { generateRandomString, generatePassword } from '../../utils/generators';
import { BasePage } from '../../pages/BasePage';

test.describe('Registration tests', () => {
    let basePage: BasePage;
    let mainPage: MainPage;
    let registrationModal: RegistrationModal;
    let garagePage: GaragePage;
    let user: UserModel;
    
    test.beforeEach(async ({ page }) => {
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
        await expect(registrationModal.getNameInputError()).resolves.toBe('Name required');

        await registrationModal.clickLastNameInput();
        await registrationModal.clickOutside();
        await expect(registrationModal.getLastNameInputError()).resolves.toBe('Last name required');

        await registrationModal.clickEmailInput();
        await registrationModal.clickOutside();
        await expect(registrationModal.getEmailInputError()).resolves.toBe('Email required');

        await registrationModal.clickPasswordInput();
        await registrationModal.clickOutside();
        await expect(registrationModal.getPasswordInputError()).resolves.toBe('Password required');

        await registrationModal.clickReEnterPasswordInput();
        await registrationModal.clickOutside();
        await expect(registrationModal.getReEnterPasswordInputError()).resolves.toBe('Re-enter password required');
    });

    test('Verify name field validations', async () => {
        await registrationModal.fillNameInput(generateRandomString(1));
        await registrationModal.clickOutside();
        await expect(registrationModal.getNameInputError()).resolves.toBe('Name has to be from 2 to 20 characters long');

        await registrationModal.fillNameInput(generateRandomString(21));
        await expect(registrationModal.getNameInputError()).resolves.toBe('Name has to be from 2 to 20 characters long');
    });

    test('Verify last name field validations', async () => {
        await registrationModal.fillLastNameInput(generateRandomString(1));
        await registrationModal.clickOutside();
        await expect(registrationModal.getLastNameInputError()).resolves.toBe('Last name has to be from 2 to 20 characters long');

        await registrationModal.fillLastNameInput(generateRandomString(21));
        await expect(registrationModal.getLastNameInputError()).resolves.toBe('Last name has to be from 2 to 20 characters long');
    });

    test('Verify email field validations', async () => {
        await registrationModal.fillEmailInput('invalidEmail');
        await registrationModal.clickOutside();
        await expect(registrationModal.getEmailInputError()).resolves.toBe('Email is incorrect');
    });

    test('Verify password field validations', async () => {
        await registrationModal.fillPasswordInput(generateRandomString(7));
        await registrationModal.clickOutside();
        await expect(registrationModal.getPasswordInputError()).resolves.toBe('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');

        await registrationModal.fillPasswordInput(generateRandomString(16));
        await expect(registrationModal.getPasswordInputError()).resolves.toBe('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    test('Verify re-enter password field validations', async () => {
        const password = generatePassword();
        user.password = password;
    
        await registrationModal.fillPasswordInput(user.password);
        await registrationModal.fillReEnterPasswordInput(user.password + '1');
        await registrationModal.clickOutside();
        await expect(registrationModal.getReEnterPasswordInputError()).resolves.toBe('Passwords do not match');
    });

    test('Verify successful registration', async () => {
        await registrationModal.fillNameInput(user.name);
        await registrationModal.fillLastNameInput(user.lastName);
        await registrationModal.fillEmailInput(user.email);
        await registrationModal.fillPasswordInput(user.password);
        await registrationModal.fillReEnterPasswordInput(user.password);
        await registrationModal.clickRegisterButton();

        await expect(garagePage.profileButton).toBeVisible();
        await expect(await garagePage.getSuccessRegistrationAlertText()).toBe('Registration complete');
    });
});
