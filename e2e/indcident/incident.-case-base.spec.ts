import { caseWorker } from "../../data/users";
import { createIncidentCase, goToNextStep } from "../../lib/case";

import { test } from "../../lib/playwright/fixtures";

test.beforeEach(async ({ c11n }) => {
  await c11n.loginToPega(caseWorker);
});

test("I can create an incident", async ({ c11n }) => {
  const c11nPage = c11n.page;

  const caseId = await createIncidentCase(c11nPage);
  console.log("Case ID:", caseId);

  await c11nPage.getByTestId("DetermineTypeDropdown:select:control").selectOption("Product faulty or unsafe");
  await c11nPage.getByTestId("DetermineSubtypeDropdown:select:control").selectOption("Product not as described");
  await goToNextStep(c11nPage);

  await c11nPage.getByTestId("Name:input:control").click();
  await c11nPage.getByTestId("Name:input:control").fill("Mix");
  await c11nPage.getByTestId(":backdrop:").getByRole("button", { name: "Search", exact: true }).click();
  await c11nPage.getByTestId(":backdrop:").getByTestId(":fullscreen:").getByTestId(":form-field:label").locator("div").click();
  await c11nPage.getByRole("textbox", { name: 'Cost *" / "' }).click();
  await c11nPage.getByRole("textbox", { name: 'Cost *" / "' }).fill("$123");
  await goToNextStep(c11nPage);
});
