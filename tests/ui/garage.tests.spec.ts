import { test } from './fixtures';
import { expect } from '@playwright/test';

test('Verify profile button is visible after login', async ({ garagePageAsLoggedUser }) => {
  await expect(garagePageAsLoggedUser.profileButton).toBeVisible();
});

test('Verify that the garage is empty for a new user', async ({ garagePageAsLoggedUser }) => {
  const isEmpty = await garagePageAsLoggedUser.isGarageEmptyMessage();
  expect(isEmpty).toBe(true);
});

test('User should see success registration alert', async ({ garagePageAsLoggedUser }) => {
  const successText = await garagePageAsLoggedUser.getSuccessRegistrationAlertText();
  expect(successText).toBe('You have been successfully logged in');
});

test('User can add a car to the garage', async ({ garagePageAsLoggedUser }) => {
  await garagePageAsLoggedUser.addCar('BMW', 'X5', '1000');

  await expect(garagePageAsLoggedUser.emptyGarageMessage).toHaveCount(0);
  await expect(garagePageAsLoggedUser.addedCarItem).toBeVisible();
});
