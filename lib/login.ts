
import { Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export const userNameField = (page: Page) => page.locator('[id="txtUserID"]');
export const passwordField = (page: Page) => page.locator('[id="txtPassword"]');
export const loginButton = (page: Page) => page.locator('[id="sub"]');
export const acceptPrivacy = (page: Page) => page.getByTestId(':privacy-dialog:accept');

export const login = process.env.USERNAME!;
export const password = process.env.PASSWORD!;


export const loginToPega = async (page: Page) => {
    await userNameField(page).click();
    await userNameField(page).fill(login);
    await passwordField(page).click();
    await passwordField(page).fill(password);
    await loginButton(page).click();
    await acceptPrivacy(page).click();
}
