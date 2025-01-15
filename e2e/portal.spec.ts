//ts-check

import { expect } from '@playwright/test';
import { test } from './fixtures';

test('Portal is working', async ({ c11nPage }) => {
  // The page.goto('/') is now automatically handled by the custom fixture


  await expect(c11nPage.page).toHaveTitle(/Tell Us More/);
  await expect(c11nPage.page.getByRole('heading', { level: 1, name: 'Tell Us More - Refrence App' })).toBeVisible();
  await expect(c11nPage.page.getByTestId(':list-toolbar:heading').getByText('Tasks')).toBeVisible();
  await expect(c11nPage.page.getByRole('heading', { level: 2, name: 'Announcements' })).toBeVisible();
   await expect(c11nPage.page.getByRole('heading', { level: 2, name: 'Pulse' })).toBeVisible();
  
});


test('Menu is working', async ({ c11nPage }) => {
  // The page.goto('/') is now automatically handled by the custom fixture
await expect(c11nPage.page.getByLabel('Main')).toBeVisible();
  

});