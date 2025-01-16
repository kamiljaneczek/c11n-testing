import { expect } from "@playwright/test";
import { acceptPrivacy, loginButton, passwordField, userNameField } from "../lib/login";
import { test } from "./fixtures";
import { getTellUsMoreUser } from "../lib/utils";
import { caseWorker } from "../data/users";

test.beforeEach(async ({ login }) => {
  await login.openLoginPage();
});

test("Open login page", async ({ login }) => {
  // The page.goto('/') is now automatically handled by the custom fixture
  const loginPage = login.page;
  // Check if the page is loaded by checking the title and the presence of the heading and the toolbar
  await expect(loginPage).toHaveTitle(/Login Page/);
  await expect(userNameField(loginPage)).toBeVisible();
  await expect(passwordField(loginPage)).toBeVisible();
  await expect(loginButton(loginPage)).toBeVisible();
});

test("Login to Pega with case worker", async ({ c11n }) => {
  // The page.goto('/') is now automatically handled by the custom fixture
  const loginPage = c11n.page;
  const user = getTellUsMoreUser(caseWorker);
  await userNameField(loginPage).click();
  await userNameField(loginPage).fill(user.userName);
  await passwordField(loginPage).click();
  await passwordField(loginPage).fill(user.password);
  await loginButton(loginPage).click();
  await acceptPrivacy(loginPage).click();
  await expect(loginPage).toHaveTitle(/Tell Us More/);
  await expect(loginPage.getByRole("heading", { name: "Tell Us More - Refrence App" })).toBeVisible();
});
