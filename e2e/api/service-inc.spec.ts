import { test } from "../../lib/playwright/api/fixture";
import { expect } from "@playwright/test";
import {
  createCaseAPI,
  flowUpCallAPI,
  getIncidentStatusAPI,
  openCase,
  submiManagerApprovalAPI,
  submitCreateScreenFAAPI,
  submitEligibilityCheckAPI,
  submitHandleTicketAPI,
  submitLinkSimilarAPI,
} from "../../lib/playwright/api/incident";
import { loadIncidentServiceData } from "../../lib/load-inc-test-data";

// Define the fixture type

// Change to test.describe.serial to run tests in sequence
test.describe.serial("Create Incident case related to product so customer receive help to thier issues - API", async () => {
  const caseTypeID = "SL-TellUsMoreRef-Work-Incident";
  let incidentPzInsKey: string;
  let eTag: string;
  const testData = loadIncidentServiceData("incident-service");

  test("Create Incident case", async ({ request }) => {
    const caseResponse = await createCaseAPI(request, caseTypeID, "", "");
    incidentPzInsKey = encodeURIComponent(caseResponse.response.data.caseInfo.ID);
    eTag = caseResponse.eTag;
    expect(eTag).not.toBe("");
  });

  test("Select type and subtype of incident", async ({ request }) => {
    const data = JSON.stringify({
      content: {
        IncidentType: testData.incidentType,
        IncidentSubType: testData.incidentSubType,
      },
      pageInstructions: [],
    });

    const response = await submitCreateScreenFAAPI(request, eTag, incidentPzInsKey, "DetermineCategory", data);
    eTag = response.eTag;
    expect(eTag).not.toBe("");
  });

  test("Select service issue details", async ({ request }) => {
    const data = JSON.stringify({
        content: { CommunicationChannel: testData.communicationMethod, What: testData.whatHappened, Where: testData.whereHappened, When: testData.whenHappened },
      pageInstructions: [],
    });
    const response = await submitCreateScreenFAAPI(request, eTag, incidentPzInsKey, "ServiceDetails", data);
    eTag = response.eTag;
    expect(eTag).not.toBe("");
  });

  test("Provide customer details", async ({ request }) => {
    const data = JSON.stringify({
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
    const response = await submitCreateScreenFAAPI(request, eTag, incidentPzInsKey, "ContactInfo", data);
    eTag = response.eTag;
    expect(eTag).not.toBe("");
  });

  test("Review and submit", async ({ request }) => {
    const data = JSON.stringify({ content: { UserConsent: true, PrivacyPolicy: true }, pageInstructions: [] });
    const response = await submitCreateScreenFAAPI(request, eTag, incidentPzInsKey, "Review", data);
    eTag = response.eTag;
    expect(eTag).not.toBe("");
  });

  if (testData.breakAfter === "Create") {
    return;
  }

  test("Eligibility check", async ({ request }) => {
    const incidentCase = await openCase(request, incidentPzInsKey);
    eTag = incidentCase.eTag;
    expect(eTag).not.toBe("");
    const data = JSON.stringify({ content: { EligibilityType: testData.eligibility, OverwriteAssignment: false, ShallIncreaseUrgency: false }, pageInstructions: [] });
    await submitEligibilityCheckAPI(request, eTag, incidentPzInsKey, data);
  });

  if (testData.breakAfter === "Dispatch") {
    return;
  }

  test("Handle ticket", async ({ request }) => {
    const incidentCase = await openCase(request, incidentPzInsKey);
    eTag = incidentCase.eTag;
    expect(eTag).not.toBe("");
    const data = JSON.stringify({ content: { ResolutionMethod: testData.resolutionMethod }, pageInstructions: [] });
    await submitHandleTicketAPI(request, eTag, incidentPzInsKey, data);
  });

  
  if (testData.breakAfter === "Handle Ticket") {
    return;
  }


  test("Link similar", async ({ request }) => {
    const incidentCase = await openCase(request, incidentPzInsKey);
    eTag = incidentCase.eTag;

    expect(eTag).not.toBe("");
    const data = JSON.stringify({ content: {}, pageInstructions: [] });
    await submitLinkSimilarAPI(request, eTag, incidentPzInsKey, data);
  });

  
  if (testData.breakAfter === "Link Similar") {
    return;
  }


  test("Manager approval", async ({ request }) => {
    const incidentCase = await openCase(request, incidentPzInsKey);
    eTag = incidentCase.eTag;
    expect(eTag).not.toBe("");
    const data = JSON.stringify({ content: {}, pageInstructions: [] });
    await submiManagerApprovalAPI(request, eTag, incidentPzInsKey, data);
  });

  if (testData.breakAfter === "Manager Approval") {
    return;
  }

  test("Flow up call", async ({ request }) => {
    const incidentCase = await openCase(request, incidentPzInsKey);
    eTag = incidentCase.eTag;
    expect(eTag).not.toBe("");
    const data = JSON.stringify({ content: {}, pageInstructions: [] });
    await flowUpCallAPI(request, eTag, incidentPzInsKey, data);

    const incidentStatus = await getIncidentStatusAPI(request, incidentPzInsKey);
    expect(incidentStatus.status).toBe("Resolved-Completed");
  });
});
