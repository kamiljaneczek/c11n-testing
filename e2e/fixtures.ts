import { test as base, Locator, Page } from '@playwright/test';
import { loginToPega } from '../lib/login';

type C11nFixture = {
  login: LoginPage;
  c11n: C11nPage;
};


// Extend the base test with a custom fixture
export const test = base.extend<C11nFixture >({
  login: async ({ page }, use) => {
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await use(loginPage);
    },
   c11n: async ({ page }, use) => {
        await page.goto('/');
        await loginToPega(page);
        const c11nPage = new C11nPage(page);
        await use(c11nPage);
  },
}); 



export class LoginPage {
  private readonly login: Locator;
  private readonly password: Locator;

  constructor(
  public readonly page: Page,
  ) {
    this.login = page.locator('[id="txtUserID"]');
    this.password = page.locator('[id="txtPassword"]');
  }
}

export class C11nPage {
  private readonly login: Locator;
  private readonly password: Locator;

  constructor(
    public readonly page: Page,
  ) {
    this.login = page.locator('[id="txtUserID"]');
    this.password = page.locator('[id="txtPassword"]');
  }
}