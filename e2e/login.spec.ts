import { expect } from '@playwright/test';
import { loginButton, passwordField, userNameField } from '../lib/login/login';
import { test } from './fixtures';

test('Open login page', async ({ loginPage }) => {
  // The page.goto('/') is now automatically handled by the custom fixture

  await expect(loginPage.page).toHaveTitle(/Login Page/);
  await expect(userNameField(loginPage.page)).toBeVisible();
  await expect(passwordField(loginPage.page)).toBeVisible();
  await expect(loginButton(loginPage.page)).toBeVisible();
});

test('Login to Pega', async ({ c11nPage }) => {
  // The page.goto('/') is now automatically handled by the custom fixture
  await expect(c11nPage.page).toHaveTitle(/Tell Us More/);
  await expect(c11nPage.page.getByRole('heading', { name: 'Tell Us More - Refrence App' })).toBeVisible();
  
});