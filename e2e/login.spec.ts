import { expect } from '@playwright/test';
import { login, loginButton, passwordField, userNameField } from '../lib/login/login';
import { test } from './fixtures';

test('Open login page', async ({ login }) => {
  // The page.goto('/') is now automatically handled by the custom fixture
  const loginPage = login.page;
  await expect(loginPage).toHaveTitle(/Login Page/);
  await expect(userNameField(loginPage)).toBeVisible();
  await expect(passwordField(loginPage)).toBeVisible();
  await expect(loginButton(loginPage)).toBeVisible();
});

test('Login to Pega', async ({ c11n }) => {
  // The page.goto('/') is now automatically handled by the custom fixture
  const loginPage = c11n.page;
  await expect(loginPage).toHaveTitle(/Tell Us More/);
  await expect(loginPage.getByRole('heading', { name: 'Tell Us More - Refrence App' })).toBeVisible();
  
});