/* eslint-disable @typescript-eslint/no-unused-vars */

import { expect } from "@playwright/test";
import { customer, dispatcher } from "../../data/users";
import { createIncidentCaseSelfService, goToNextStep } from "../../lib/case";
import { clickBackdrop, clickSearchButton, fillCurrencyInput, fillDateInput, fillInput, fillTextArea, selecetDropdown } from "../../lib/playwright/controls";

import { test as base } from "../../lib/playwright/fixtures";
import {  incidentProductCase } from "../../data/case/incident-product";

type IncidentFixture = {
  incidentPzInskey: string;
  paymentPzInskey: string;
};

const test = base.extend<IncidentFixture>({
  incidentPzInskey: [
    async ({}, use) => {
      await use("");
    },
    { scope: "test" },
  ],
  paymentPzInskey: [
    async ({}, use) => {
      await use("");
    },
    { scope: "test" },
  ],
});

test.describe.serial("E2E test for incident case", () => {
  const caseTypeID = "SL-TellUsMoreRef-Work-Incident";
  const workPool = "SL-TellUsMoreRef-Work";
  let incidentPzInsKey: string;
  let eTag: string;
  let paymentPzInsKey: string;

  test("I can create a product related incident", async ({ c11n }) => {
    const c11nPage = c11n.page;
    await c11n.loginToPega(customer);

    const caseId = await createIncidentCaseSelfService(c11nPage);
    expect(caseId).not.toBe("");
    incidentPzInsKey = caseId;

    //Determine type and subtype
    await selecetDropdown(c11nPage, "DetermineTypeDropdown", "Product faulty or unsafe");
    await selecetDropdown(c11nPage, "DetermineSubtypeDropdown", "Product not as described");
    await goToNextStep(c11nPage);

    //Provide product details

    await fillInput(c11nPage, "Name", "Mix");
    await clickSearchButton(c11nPage);
    await clickBackdrop(c11nPage);
    await fillCurrencyInput(c11nPage, "ActualPricePaid", "68");

    await fillTextArea(c11nPage, "What", incidentProductCase.whatHappened ?? "");
/*     await c11nPage.getByTestId(':date-input:control-month').click();
    await c11nPage.getByTestId(':date-input:control-month').fill('11');
    await c11nPage.getByTestId(':date-input:control-day').click();
    await c11nPage.getByTestId(':date-input:control-day').fill('11');
    await c11nPage.getByTestId(":date-input:control-year").click();
    await c11nPage.getByTestId(":date-input:control-year").fill("2022"); */
    await fillTextArea(c11nPage, "Where", incidentProductCase.whereHappened ?? "");

  

    await goToNextStep(c11nPage);

    //Provide customer details
    await fillInput(c11nPage, "FirstName", incidentProductCase.contactInfo?.firstName ?? "");
    await fillInput(c11nPage, "LastName", incidentProductCase.contactInfo?.lastName ?? "");
    await fillInput(c11nPage, "Email", incidentProductCase.contactInfo?.email ?? "");
     await c11nPage.getByTestId('PhoneNumber:phone-input:country-code').selectOption('+48');
    await c11nPage.getByTestId("PhoneNumber:phone-input:control").click();
    await c11nPage.getByTestId("PhoneNumber:phone-input:control").fill("723 423 123");

    //Provide customer address
    await fillInput(c11nPage, "CIty", "Warsaw");
    await fillInput(c11nPage, "Street", "Warsaw");
    await fillInput(c11nPage, "PostalCode", "37-77");
    await selecetDropdown(c11nPage, "Country", "Poland");
    await goToNextStep(c11nPage);

    //Provide preffered resolution method
    await selecetDropdown(c11nPage, "ResolutionMethod", "Refund");
    await goToNextStep(c11nPage);

    await c11nPage.getByTestId("TC-parent").getByTestId(":form-field:").getByTestId(":form-field:label").locator("div").click();
    await c11nPage.getByTestId("PP-parent").getByTestId(":form-field:").getByTestId(":form-field:label").locator("div").click();
    //Provide additional information

    await expect(c11nPage.getByTestId(":case-view:summary-fields").getByTestId(":status:")).toContainText("Pending-Dispatch");
  });

  test("As a dispatcher, I can review the incident and route it to the case worker group", async ({ c11n }) => {
    const c11nPage = c11n.page;
    await c11n.loginToPega(dispatcher);
  });
});
