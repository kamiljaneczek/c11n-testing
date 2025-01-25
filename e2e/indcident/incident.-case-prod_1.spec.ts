import { caseWorker } from "../../data/users";
import { createIncidentCase, goToNextStep } from "../../lib/case";
import { clickBackdrop, clickSearchButton, fillInput, selecetDropdown } from "../../lib/playwright/controls";

import { test } from "../../lib/playwright/fixtures";

test.beforeEach(async ({ c11n }) => {
  await c11n.loginToPega(caseWorker);
});

test.describe("As a customer, I can create a product related incident and my incident is handled so I get my issue resolved", () => {
  test("I can create a product related incident", async ({ c11n }) => {
    const c11nPage = c11n.page;

    const caseId = await createIncidentCase(c11nPage);
    console.log("Case ID:", caseId);

    await selecetDropdown(c11nPage, "DetermineTypeDropdown", "Product faulty or unsafe");
    await selecetDropdown(c11nPage, "DetermineSubtypeDropdown", "Product not as described");
    await goToNextStep(c11nPage);

    await fillInput(c11nPage, "Name", "Mix");
    await clickSearchButton(c11nPage);
    await clickBackdrop(c11nPage);
    await fillInput(c11nPage, "Cost", "$123");
    await goToNextStep(c11nPage);
  });

  test("I can select a product that is the cause of my incident", async ({ c11n }) => {
    const c11nPage = c11n.page;
    await goToNextStep(c11nPage);
  });

  test("I can provide my contact information", async ({ c11n }) => {
    const c11nPage = c11n.page;
    await goToNextStep(c11nPage);
  });

  test("I can provide a description of my incident", async ({ c11n }) => {
    const c11nPage = c11n.page;
    await goToNextStep(c11nPage);
  });

  test("Customer incident is being displayed", async ({ c11n }) => {
    const c11nPage = c11n.page;
    await goToNextStep(c11nPage);
  });

  test("Customer incident is being processed towards resolution", async ({ c11n }) => {
    const c11nPage = c11n.page;
    await goToNextStep(c11nPage);
  });
});
