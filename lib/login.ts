import { Page } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

/**
 * Low level functions for logging into the C11n application.
 * @param page
 * @returns
 */

export const userNameField = (page: Page) => page.locator('[id="txtUserID"]');
export const passwordField = (page: Page) => page.locator('[id="txtPassword"]');
export const loginButton = (page: Page) => page.locator('[id="sub"]');
export const acceptPrivacy = (page: Page) => page.getByTestId(":privacy-dialog:accept");

/**
 * The username and password for the C11n application - wrapper for the environment variables
 */
export const login = process.env.USERNAME!;
export const password = process.env.PASSWORD!;

/**
 * This function logs into the C11n application - you need to be on login page. It uses basic auth.
 * @param page - The page object for the C11n application.
 */
export const loginToPega = async (page: Page, user: { userName: string; password: string }) => {
  await userNameField(page).click();
  await userNameField(page).fill(user.userName);
  await passwordField(page).click();
  await passwordField(page).fill(user.password);
  await loginButton(page).click();
  await acceptPrivacy(page).click();
};
