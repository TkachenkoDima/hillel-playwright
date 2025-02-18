import { test } from './fixtures';
import { expect } from '@playwright/test';

import { MainPage } from '../../pages/MainPage';
import { BasePage } from '../../pages/BasePage';
import { config } from '../../data.config';
import { ProfilePage } from '../../pages/ProfilePage';
import { faker } from '@faker-js/faker';

test('Mock user profile text', async ({ page }) => {
    const mainPage = new MainPage(page);
    const basePage = new BasePage(page);
    const profilePage = new ProfilePage(page);

    const randomFirstName = faker.person.firstName();
    const randomLastName = faker.person.lastName();

    await page.route('**/profile', async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                status: "ok",
                data: {
                    userId: 1,
                    photoFilename: "kek-image.jpg",
                    name: randomFirstName,
                    lastName: randomLastName,
                }
            }),
        });
    });

    await basePage.openMainPage();

    await mainPage.loginWithExistingUser(config.userEmail, config.userPassword);

    await profilePage.clickProfileButton();

    expect(await profilePage.getProfileText()).toBe(`${randomFirstName} ${randomLastName}`);
});
