/* eslint-disable @typescript-eslint/no-unused-vars */

import { expect } from "@playwright/test";
import { caseWorker, customer, dispatcher, manager } from "../../data/users";
import { approveAssignment, checkCaseStatus, createIncidentCaseSelfService, doneAssignment, goToNextStep, submitAssignment } from "../../lib/case";
import { clickBackdrop, clickSearchButton, fillCurrencyInput, fillDateInput, fillInput, fillSliderInput, fillTextArea, selecetDropdown } from "../../lib/playwright/controls";

import { test } from "../../lib/playwright/fixtures";
import { getMyQueues, getWidgetByTitle, getWidgetWithMultibleQueuesByTitle } from "../../lib/portal";
import { loadIncidentServiceData } from "../../lib/load-inc-test-data";

test.describe.serial("E2E test for incident case", () => {
  const caseTypeID = "SL-TellUsMoreRef-Work-Incident";
  const workPool = "SL-TellUsMoreRef-Work";
  let incidentPzInsKey: string;
  let eTag: string;
  let paymentPzInsKey: string;
  const testData = loadIncidentServiceData("incident-service", "");

  test("I can create a service related incident", async ({ c11n }) => {
    const c11nPage = c11n.page;
    await c11n.loginToPega(customer);

    const caseId = await createIncidentCaseSelfService(c11nPage);
    expect(caseId).not.toBe("");
    incidentPzInsKey = caseId;

    //Determine type and subtype
    await selecetDropdown(c11nPage, "DetermineTypeDropdown", testData.incidentType);
    await selecetDropdown(c11nPage, "DetermineSubtypeDropdown", testData.incidentSubType);
    await goToNextStep(c11nPage);

    //Provide service details
    await selecetDropdown(c11nPage, "Communication channel used", testData.communicationMethod);

    await fillTextArea(c11nPage, "What", testData.whatHappened);
    await c11nPage.getByTestId(":date-input:control-month").click();
    await c11nPage.getByTestId(":date-input:control-month").fill("11");
    await c11nPage.getByTestId(":date-input:control-day").click();
    await c11nPage.getByTestId(":date-input:control-day").fill("11");
    await c11nPage.getByTestId(":date-input:control-year").click();
    await c11nPage.getByTestId(":date-input:control-year").fill("2022");
    await fillTextArea(c11nPage, "Where", testData.whereHappened);

    await goToNextStep(c11nPage);

    //Provide customer details
    await fillInput(c11nPage, "FirstName", testData.contactInfo?.firstName ?? "");
    await fillInput(c11nPage, "LastName", testData.contactInfo?.lastName ?? "");
    await fillInput(c11nPage, "Email", testData.contactInfo?.email ?? "");
    await c11nPage.getByTestId("PhoneNumber:phone-input:country-code").selectOption("+48");
    await c11nPage.getByTestId("PhoneNumber:phone-input:control").click();
    await c11nPage.getByTestId("PhoneNumber:phone-input:control").fill(testData.contactInfo?.phone ?? "");

    //Provide customer address
    await fillInput(c11nPage, "CIty", testData.contactInfo?.address?.city ?? "");
    await fillInput(c11nPage, "Street", testData.contactInfo?.address?.street ?? "");
    await fillInput(c11nPage, "PostalCode", testData.contactInfo?.address?.zip ?? "");
    await selecetDropdown(c11nPage, "Country", testData.contactInfo?.address?.country ?? "");
    await goToNextStep(c11nPage);

    //review service details
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

    await widget.getByTestId(":tasks:show-more-less").click();
    await c11nPage.getByRole("link", { name: `Incident (${caseID})` }).click();

    await checkCaseStatus(c11nPage, "Pending-Dispatch");

    await c11nPage.getByTestId(":assignment:action").click();
    const eligibility = testData.eligibility;
    // /^`Eligible`$/
    await c11nPage
      .locator("label")
      .filter({ hasText: new RegExp(`^${eligibility}$`, "i") })
      .locator("div")
      .click();
    await c11nPage.getByRole("button", { name: "Submit" }).click();
    //there is type in status
    await checkCaseStatus(c11nPage, "Pending- Handling");
  });

  test("As a case worker, I can handle the incident", async ({ c11n }) => {
    const caseID = await incidentPzInsKey.split(" ")[1];
    const c11nPage = c11n.page;
    await c11n.loginToPega(caseWorker);

    const changeQueue = await getMyQueues(c11nPage);
    await changeQueue.click();

    const activeQueue = c11nPage.getByText("My queues: ServiceUrgentWB_REF");

    const needToChangeQueue = await activeQueue.isHidden();

    if (needToChangeQueue) {
      // Get and click the service urgent element
      await c11nPage.getByText("ServiceUrgentWB_REF").click();
    }

    const widget = await getWidgetWithMultibleQueuesByTitle(c11nPage, "My queues");

    await widget.getByTestId(":tasks:show-more-less").click();

    await c11nPage.getByRole("link", { name: `Incident (${caseID})` }).click();

    await checkCaseStatus(c11nPage, "Pending- Handling");
    //handle ticket
    await c11nPage.getByTestId(":assignment:action").click();
    await selecetDropdown(c11nPage, "ResolutionMethod", testData.resolutionMethod);
    await submitAssignment(c11nPage);

    //link similar
    await checkCaseStatus(c11nPage, "Pending- Handling");
    await submitAssignment(c11nPage);
    await checkCaseStatus(c11nPage, "Pending-Approval");
  });

  test("As a manager, I can review the incident", async ({ c11n }) => {
    const caseID = await incidentPzInsKey.split(" ")[1];
    const c11nPage = c11n.page;
    await c11n.loginToPega(manager);

    const widget = await getWidgetByTitle(c11nPage, "My queues");
    await widget.getByTestId(":tasks:show-more-less").click();

    await c11nPage.getByRole("link", { name: `Incident (${caseID})` }).click();

    await checkCaseStatus(c11nPage, "Pending-Approval");

    await c11nPage.getByTestId(":assignment:action").click();

    await approveAssignment(c11nPage);
    await checkCaseStatus(c11nPage, "Pending-Followup");
  });

  test("As a case worker, I can resolve the incident", async ({ c11n }) => {
    const caseID = incidentPzInsKey.split(" ")[1];
    const c11nPage = c11n.page;
    await c11n.loginToPega(caseWorker);

    const changeQueue = await getMyQueues(c11nPage);
    await changeQueue.click();

    const activeQueue = c11nPage.getByText("My queues: CaseWorkersWB_REF");

    const needToChangeQueue = await activeQueue.isHidden();

    if (needToChangeQueue) {
      // Get and click the service urgent element
      await c11nPage.getByText("CaseWorkersWB_REF").click();
    }

    const widget = await getWidgetWithMultibleQueuesByTitle(c11nPage, "My queues");

    await widget.getByTestId(":tasks:show-more-less").click();

    await c11nPage.getByRole("link", { name: `Incident (${caseID})` }).click();
    //followup
    await checkCaseStatus(c11nPage, "Pending-Followup");
    await c11nPage.getByTestId(":assignment:action").click();
    await selecetDropdown(c11nPage, "CustomerSentiment", testData.customerSentiment);
    await fillSliderInput(c11nPage, "NPS", testData.NPS.toString());
    await submitAssignment(c11nPage);
    await checkCaseStatus(c11nPage, "Resolved-Completed");
  });
});
