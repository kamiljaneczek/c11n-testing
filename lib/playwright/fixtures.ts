import { test as base, Page } from "@playwright/test";
import { loginToPega } from "../../lib/login";
import { getTellUsMoreUser } from "../../lib/utils";

type C11nFixture = {
  login: LoginPage;
  c11n: C11nPage;
  case: CasePage;
  lp: LPPage;
};

type CaseFixtureInputs = C11nFixture & {};

// Extend the base test with a custom fixture
export const test = base.extend<CaseFixtureInputs>({
  login: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  c11n: async ({ page }, use) => {
    const c11nPage = new C11nPage(page);
    await use(c11nPage);
  },
  case: async ({ page }, use) => {
    const casePage = new CasePage(page);
    await use(casePage);
  },
});

/**
 * Login Page
 * Represents the login page for Pega application
 */
export class LoginPage {
  constructor(public readonly page: Page) {}
  async openLoginPage() {
    await this.page.goto("/");
  }
}

/**
 * C11n Page
 * Represents the C11n page for Pega application - user is logged in
 */
export class C11nPage {
  constructor(public readonly page: Page) {}

  async loginToPega(pUserName: string) {
    const user = getTellUsMoreUser(pUserName);
    await this.page.goto("/");
    await loginToPega(this.page, user);
  }
}

/**
 * Case Page
 * Represents the Case page for Pega application - user is logged in and has a case open in review mode
 * @param caseID - The ID of the case
 */
export class CasePage {
  constructor(public readonly page: Page) {}
  async openCase(caseID: string) {
    await this.page.goto(`/case/${caseID}`);
  }
}

/**
 * LP Page
 * Represents the LP page for Pega application - user is logged in and has a given Landing Page open
 * @param lpName - The name of the Landing Page
 */
export class LPPage {
  constructor(public readonly page: Page) {}
  async openLP(lpName: string) {
    await this.page.goto(`/lp/${lpName}`);
  }
}
