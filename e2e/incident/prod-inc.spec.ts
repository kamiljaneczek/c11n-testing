/* eslint-disable @typescript-eslint/no-unused-vars */

import { expect } from "@playwright/test";
import { caseWorker, customer, dispatcher } from "../../data/users";
import { checkCaseStatus, createIncidentCaseSelfService, doneAssignment, goToNextStep, submitAssignment } from "../../lib/case";
import { clickBackdrop, clickSearchButton, fillCurrencyInput, fillDateInput, fillInput, fillSliderInput, fillTextArea, selecetDropdown } from "../../lib/playwright/controls";

import { test  } from "../../lib/playwright/fixtures";
import { getWidgetByTitle, getWidgetWithMultibleQueuesByTitle } from "../../lib/portal";
import { loadIncidentProductData } from "../../lib/load-inc-test-data";


test.describe.serial("E2E test for incident case", () => {
  const caseTypeID = "SL-TellUsMoreRef-Work-Incident";
  const workPool = "SL-TellUsMoreRef-Work";
  let incidentPzInsKey: string;
  let eTag: string;
  let paymentPzInsKey: string;
    const testData = loadIncidentProductData("incident-product");

  test("I can create a product related incident", async ({ c11n }) => {
    const c11nPage = c11n.page;
    await c11n.loginToPega(customer);

    const caseId = await createIncidentCaseSelfService(c11nPage);
    expect(caseId).not.toBe("");
    incidentPzInsKey = caseId;

    //Determine type and subtype
    await selecetDropdown(c11nPage, "DetermineTypeDropdown", testData.incidentType);
    await selecetDropdown(c11nPage, "DetermineSubtypeDropdown", testData.incidentSubType);
    await goToNextStep(c11nPage);

    //Provide product details

    await fillInput(c11nPage, "Name", testData.productName);
    await clickSearchButton(c11nPage);
    await clickBackdrop(c11nPage);
    await fillCurrencyInput(c11nPage, "ActualPricePaid", testData.cost.toString());

    await fillTextArea(c11nPage, "What", testData.whatHappened);
    await c11nPage.getByTestId(':date-input:control-month').click();
    await c11nPage.getByTestId(':date-input:control-month').fill('11');
    await c11nPage.getByTestId(':date-input:control-day').click();
    await c11nPage.getByTestId(':date-input:control-day').fill('11');
    await c11nPage.getByTestId(":date-input:control-year").click();
    await c11nPage.getByTestId(":date-input:control-year").fill("2022");
    await fillTextArea(c11nPage, "Where", testData.whereHappened);


    await goToNextStep(c11nPage);

    //Provide customer details
    await fillInput(c11nPage, "FirstName", testData.contactInfo?.firstName ?? "");
    await fillInput(c11nPage, "LastName", testData.contactInfo?.lastName ?? "");
    await fillInput(c11nPage, "Email", testData.contactInfo?.email ?? "");
    await c11nPage.getByTestId('PhoneNumber:phone-input:country-code').selectOption('+48');
    await c11nPage.getByTestId("PhoneNumber:phone-input:control").click();
    await c11nPage.getByTestId("PhoneNumber:phone-input:control").fill(testData.contactInfo?.phone ?? "");

    //Provide customer address
    await fillInput(c11nPage, "CIty", testData.contactInfo?.address?.city ?? "");
    await fillInput(c11nPage, "Street", testData.contactInfo?.address?.street ?? "");
    await fillInput(c11nPage, "PostalCode", testData.contactInfo?.address?.zip ?? "");
    await selecetDropdown(c11nPage, "Country", testData.contactInfo?.address?.country ?? "");
    await goToNextStep(c11nPage);

    //Provide desired resolution method
    await selecetDropdown(c11nPage, "ResolutionMethod", testData.desiredResolution);
    await goToNextStep(c11nPage);

    await c11nPage.getByTestId("TC-parent").getByTestId(":form-field:").getByTestId(":form-field:label").locator("div").click();
    await c11nPage.getByTestId("PP-parent").getByTestId(":form-field:").getByTestId(":form-field:label").locator("div").click();

    await submitAssignment(c11nPage);


    await checkCaseStatus(c11nPage, "Pending-Dispatch");
  });

  test("As a dispatcher, I can review the incident and route it to the case worker group", async ({ c11n }) => {
    const caseID = await incidentPzInsKey.split(" ")[1];


    const c11nPage = c11n.page;
    await c11n.loginToPega(dispatcher);
    const widget = await getWidgetByTitle(c11nPage, "My queues");
  
    await widget.getByTestId(':tasks:show-more-less').click();
    await c11nPage.getByRole('link', { name: `Incident (${caseID})` }).click();

    await checkCaseStatus(c11nPage, "Pending-Dispatch");
    
    await c11nPage.getByTestId(':assignment:action').click();
    const eligibility = testData.eligibility;
    // /^`Eligible`$/ 
    await c11nPage.locator('label').filter({ hasText: new RegExp(`^${eligibility}$`, 'i') }).locator('div').click();
    await c11nPage.getByRole('button', { name: 'Submit' }).click()
    //there is type in status
    await checkCaseStatus(c11nPage, "Pending- Handling");
  });

  test("As a case worker, I can handle the incident", async ({ c11n }) => {

    const caseID = await incidentPzInsKey.split(" ")[1];
    const c11nPage = c11n.page;
    await c11n.loginToPega(caseWorker);

    const widget = await getWidgetWithMultibleQueuesByTitle(c11nPage, "My queues");
    await widget.getByTestId(':tasks:show-more-less').click();
    await c11nPage.getByRole('link', { name: `Incident (${caseID})` }).click();

    await checkCaseStatus(c11nPage, "Pending- Handling");
    //handle ticket
    await c11nPage.getByTestId(':assignment:action').click();
    await selecetDropdown(c11nPage, "ResolutionMethod", testData.resolutionMethod);
    await submitAssignment(c11nPage);

    //link similar
    await checkCaseStatus(c11nPage, "Pending- Handling");
    await submitAssignment(c11nPage);

    //fullfillment
    await checkCaseStatus(c11nPage, "Pending-Fullfillment");
    await doneAssignment(c11nPage);
    await c11nPage.getByTestId(':assignment:action').click();

    //dispatch payment
    await submitAssignment(c11nPage);
    await selecetDropdown(c11nPage, "Payment Broker", testData.paymentBroker);
    await submitAssignment(c11nPage);
    await checkCaseStatus(c11nPage, "Resolved-Completed");

    //back to incident case
    await c11nPage.getByTestId(':menu-button:').click();
    await c11nPage.getByRole('link', { name: `Incident (${caseID})` }).click();

    //followup
    await checkCaseStatus(c11nPage, "Pending-Followup");
    await c11nPage.getByTestId(':assignment:action').click();
    await selecetDropdown(c11nPage, "CustomerSentiment", testData.customerSentiment);
    await fillSliderInput(c11nPage, "NPS", testData.NPS.toString());
    await submitAssignment(c11nPage);
    await checkCaseStatus(c11nPage, "Resolved-Completed");

  });
});
