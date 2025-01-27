import { Given, When, Then, BeforeAll, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { dispatcher } from "../data/users";
import { fixture  } from "../lib/cucumber/page-fixture";
import { loginToPega } from "../lib/login";
import { getTellUsMoreUser } from "../lib/utils";
import { getWidgetByTitle } from "../lib/portal";
import { checkCaseStatus, doneAssignment, submitAssignment } from "../lib/case";
import { TestRunner } from "../e2e/utils/test-runner";
import { createCaseAPI, createCaseAPIResponse, submitAssignmentAPIResponse, submitCreateScreenFAAPI } from "../lib/playwright/api/incident";
import { loadIncidentServiceData } from "../lib/load-inc-test-data";

let caseID: string;
const testRunner = new TestRunner();

setDefaultTimeout(12000);
    const testData = loadIncidentServiceData("incident-service", "");


BeforeAll(async function () {
  let eTag: string;
  let data: string;
  let createCaseResponse: createCaseAPIResponse;
  let response: submitAssignmentAPIResponse;
 await testRunner.setup();
 const context = await testRunner.getContext();
 createCaseResponse = await createCaseAPI(context, "SL-TellUsMoreRef-Work-Incident", "", "")  ;
 eTag = createCaseResponse.eTag;

 const pzInsKey = createCaseResponse.response.data.caseInfo.ID;
 caseID = pzInsKey.split(" ")[1];

 data = JSON.stringify({
    content: {
      IncidentType: testData.incidentType,
      IncidentSubType: testData.incidentSubType,
    },
    pageInstructions: [],
  });

  response = await submitCreateScreenFAAPI(context, eTag, pzInsKey, "DetermineCategory", data);
 eTag = response.eTag;

       data = JSON.stringify({
        content: { CommunicationChannel: testData.communicationMethod, What: testData.whatHappened, Where: testData.whereHappened, When: testData.whenHappened },
        pageInstructions: [],
      });
 response = await submitCreateScreenFAAPI(context, eTag, pzInsKey, "ServiceDetails", data);
  eTag = response.eTag;
  

   data = JSON.stringify({
        content: {
          Customer: {
            FName: testData.contactInfo?.firstName,
            LName: testData.contactInfo?.lastName,
            EMail: testData.contactInfo?.email,
            PhoneNumber: testData.contactInfo?.phone,
            Address: { pyStreet: testData.contactInfo?.address?.street, pyCity: testData.contactInfo?.address?.city, pyPostalCode: testData.contactInfo?.address?.zip, pyCountry: testData.contactInfo?.address?.country },
          },
        },
        pageInstructions: [],
      });
       response = await submitCreateScreenFAAPI(context, eTag, pzInsKey, "ContactInfo", data);
      eTag = response.eTag;
  
  
       data = JSON.stringify({ content: { UserConsent: true, PrivacyPolicy: true }, pageInstructions: [] });
         response = await submitCreateScreenFAAPI(context, eTag, pzInsKey, "Review", data);
  
});



Given(`I am logged in as a dispatcher`, async () => {
    // [Given] Sets up the initial state of the system.
  const c11nPage = fixture.page;
  const user = getTellUsMoreUser(dispatcher);
  await c11nPage.goto(`${process.env.BASE_URL}`);
  await loginToPega(c11nPage, user);

  await expect(c11nPage).toHaveTitle(/Tell Us More/);
});


Given(`there is a new Service related incident in the dispatch queue`, async () => {
  // [Given] Sets up the initial state of the system.

  
    const c11nPage = fixture.page;
    const widget = await getWidgetByTitle(c11nPage, "My queues");
  
    await widget.getByTestId(':tasks:show-more-less').click();
    await expect(c11nPage.getByRole('link', { name: `Incident (${caseID})` })).toBeVisible();

});

When(`I open the incident for eligibility check`, async () => {
  // [When] Describes the action or event that triggers the scenario.
    const c11nPage = fixture.page;
    await c11nPage.getByRole('link', { name: `Incident (${caseID})` }).click();
  

});

Then(`I should see the incident details`, async () => {
  // [Then] Describes the expected outcome or result of the scenario.
  const c11nPage = fixture.page;
  await checkCaseStatus(c11nPage, "Pending-Dispatch");
});



When(`I set eligibility type to {string}`, async (eligibility: string) => {
  // [When] Describes the action or event that triggers the scenario.
  const c11nPage = fixture.page;
    await c11nPage.getByTestId(':assignment:action').click();

    // /^`Eligible`$/ 
    await c11nPage.locator('label').filter({ hasText: new RegExp(`^${eligibility}$`, 'i') }).locator('div').click();
    
  await submitAssignment(c11nPage);
    //there is type in status
});

Then(`the incident should be routed to the ServiceUrgentWB_REF work queue`, async () => {
  // [Then] Describes the expected outcome or result of the scenario.
  const c11nPage = fixture.page;
  await doneAssignment(c11nPage);
  await expect(c11nPage.getByRole('button', { name: `ServiceUrgentWB_REF` })).toBeVisible();
});



Then(`the incident status should be updated to Pending-Handling`, async () => {
  // [Then] Describes the expected outcome or result of the scenario.
  const c11nPage = fixture.page;
  await checkCaseStatus(c11nPage, "Pending- Handling");
});


Then(`the incident status should be updated to Resolved-Ineligible`, async () => {
  // [Then] Describes the expected outcome or result of the scenario.
  const c11nPage = fixture.page;
  await checkCaseStatus(c11nPage, "Resolved-Ineligible");
});