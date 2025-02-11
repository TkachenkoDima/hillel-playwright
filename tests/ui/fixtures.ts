import { test as base } from '@playwright/test';
import { MainPage } from '../../pages/MainPage';
import { GaragePage } from '../../pages/GaragePage';
import { config } from '../../data.config';
import { BasePage } from '../../pages/basePage';

type fixturePages = {
  garagePage: GaragePage;
  garagePageAsLoggedUser: GaragePage;
  garagePageAsLoggedUserWithClearedGarage: GaragePage;
};

let basePage: BasePage;
let mainPage: MainPage;
let garagePage: GaragePage;

export const test = base.extend<fixturePages>({
  garagePageAsLoggedUser: async ({ page }, use) => {
    basePage = new BasePage(page);
    mainPage = new MainPage(page);
    garagePage = new GaragePage(page);
    await basePage.openMainPage();
    await mainPage.loginWithExistingUser(config.userEmail, config.userPassword);
    await use(garagePage);
  },
});
