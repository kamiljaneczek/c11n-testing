import { Given, When, setDefaultTimeout } from "@cucumber/cucumber";
import { fixture } from "../lib/cucumber/page-fixture";
import { customer } from "../data/users";
import { expect } from "@playwright/test";
import { getTellUsMoreUser } from "../lib/utils";
import { loginToPega } from "../lib/login";
import { createIncidentCaseSelfService } from "../lib/case";

setDefaultTimeout(10000);

Given(`I am logged into the customer portal`, async () => {
  // [Given] Sets up the initial state of the system.
  const c11nPage = fixture.page;
  const user = getTellUsMoreUser(customer);
  await c11nPage.goto(`${process.env.BASE_URL}`);
  await loginToPega(c11nPage, user);

  await expect(c11nPage).toHaveTitle(/Tell Us More/);
});

Given(`I am on the home page`, async () => {
  const c11nPage = fixture.page;
  // [Given] Sets up the initial state of the system.

  await expect(c11nPage.getByRole("heading", { name: "Welcome" })).toBeVisible();

  await expect(c11nPage.getByRole("heading", { name: "Quick links" })).toBeVisible();
});

When(`I click on Incident tile`, async () => {
  const c11nPage = fixture.page;
  // [When] Describes the action or event that triggers the scenario.
  await createIncidentCaseSelfService(c11nPage);
});
