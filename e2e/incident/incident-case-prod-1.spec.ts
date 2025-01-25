import { expect } from "@playwright/test";
import { caseWorker, customer, dispatcher } from "../../data/users";
import { createIncidentCase, createIncidentCaseSelfService, goToNextStep } from "../../lib/case";
import { clickBackdrop, clickSearchButton, fillInput, selecetDropdown } from "../../lib/playwright/controls";

import { test as base } from "../../lib/playwright/fixtures";
import { incidentBaseCase } from "../../data/case/incident-base";



type IncidentFixture = {
  incidentPzInskey: string;
  paymentPzInskey: string;
};

const test = base.extend<IncidentFixture>({
  incidentPzInskey: [async ({}, use) => {
    await use('');
  }, { scope: 'test' }],
  paymentPzInskey: [async ({}, use) => {
    await use('');
  }, { scope: 'test' }],
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
      await c11nPage.getByTestId("field-block__column-count-3").getByTestId("Cost:currency-input:control").click();
      await c11nPage.getByTestId("field-block__column-count-3").getByTestId("Cost:currency-input:control").fill("$68");
      await fillInput(c11nPage, "What", incidentBaseCase.whatHappened);
      await fillInput(c11nPage, "Where", incidentBaseCase.whereHappened);
      await fillInput(c11nPage, "When", incidentBaseCase.whenHappened.toISOString());
      await goToNextStep(c11nPage);

      //Provide customer details
      await fillInput(c11nPage, "FName", incidentBaseCase.contactInfo.firstName);
      await fillInput(c11nPage, "LName", incidentBaseCase.contactInfo.lastName);
      await fillInput(c11nPage, "EMail", incidentBaseCase.contactInfo.email);
      await fillInput(c11nPage, "PhoneNumber", incidentBaseCase.contactInfo.phone);
  

      //Provide customer address
      await fillInput(c11nPage, "City", "Warsaw");
      await fillInput(c11nPage, "Street", "Warsaw");
      await fillInput(c11nPage, "Postal Code", "37-77");
      await fillInput(c11nPage, "Country", "Poland");
      await goToNextStep(c11nPage);

      //Provide preffered resolution method
      await selecetDropdown(c11nPage, "ResolutionMethod", "Refund");
      await goToNextStep(c11nPage);

      //Provide additional information


    });


  
test("As a dispatcher, I can review the incident and route it to the case worker group", async ({ c11n }) => {
  const c11nPage = c11n.page;
    await c11n.loginToPega(dispatcher);

  });
});