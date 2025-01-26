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
import { incidentServiceCase } from "../../data/case/incident-service";

// Define the fixture type

// Change to test.describe.serial to run tests in sequence
test.describe.serial("Create Incident case related to product so customer receive help to thier issues - API", async () => {
  const caseTypeID = "SL-TellUsMoreRef-Work-Incident";
  let incidentPzInsKey: string;
  let eTag: string;


  test("Create Incident case", async ({ request }) => {
    const caseResponse = await createCaseAPI(request, caseTypeID, "", "");
    incidentPzInsKey = encodeURIComponent(caseResponse.response.data.caseInfo.ID);
    eTag = caseResponse.eTag;
    expect(eTag).not.toBe("");
  });

  test("Select type and subtype of incident", async ({ request }) => {
    const data = JSON.stringify({
      content: {
        IncidentType: incidentServiceCase.incidentType,
        IncidentSubType: incidentServiceCase.incidentSubType,
      },
      pageInstructions: [],
    });

    const response = await submitCreateScreenFAAPI(request, eTag, incidentPzInsKey, "DetermineCategory", data);
    eTag = response.eTag;
    expect(eTag).not.toBe("");
  });

  test("Select service issue details", async ({ request }) => {
    const data = JSON.stringify({
        content: { CommunicationChannel: incidentServiceCase.communicationChannel, What: incidentServiceCase.whatHappened, Where: incidentServiceCase.whereHappened, When: incidentServiceCase.whenHappened },
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
          FName: incidentServiceCase.contactInfo?.firstName,
          LName: incidentServiceCase.contactInfo?.lastName,
          EMail: incidentServiceCase.contactInfo?.email,
          PhoneNumber: incidentServiceCase.contactInfo?.phone,
          Address: { pyStreet: incidentServiceCase.contactInfo?.address?.street, pyCity: incidentServiceCase.contactInfo?.address?.city, pyPostalCode: incidentServiceCase.contactInfo?.address?.zip, pyCountry: incidentServiceCase.contactInfo?.address?.country },
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

  if (incidentServiceCase.breakAfter === "Create") {
    return;
  }

  test("Eligibility check", async ({ request }) => {
    const incidentCase = await openCase(request, incidentPzInsKey);
    eTag = incidentCase.eTag;
    expect(eTag).not.toBe("");
    const data = JSON.stringify({ content: { EligibilityType: incidentServiceCase.eligibility, OverwriteAssignment: false, ShallIncreaseUrgency: false }, pageInstructions: [] });
    await submitEligibilityCheckAPI(request, eTag, incidentPzInsKey, data);
  });

  if (incidentServiceCase.breakAfter === "Dispatch") {
    return;
  }

  test("Handle ticket", async ({ request }) => {
    const incidentCase = await openCase(request, incidentPzInsKey);
    eTag = incidentCase.eTag;
    expect(eTag).not.toBe("");
    const data = JSON.stringify({ content: { ResolutionMethod: incidentServiceCase.resolutionMethod }, pageInstructions: [] });
    await submitHandleTicketAPI(request, eTag, incidentPzInsKey, data);
  });

  
  if (incidentServiceCase.breakAfter === "Handle Ticket") {
    return;
  }


  test("Link similar", async ({ request }) => {
    const incidentCase = await openCase(request, incidentPzInsKey);
    eTag = incidentCase.eTag;

    expect(eTag).not.toBe("");
    const data = JSON.stringify({ content: {}, pageInstructions: [] });
    await submitLinkSimilarAPI(request, eTag, incidentPzInsKey, data);
  });

  
  if (incidentServiceCase.breakAfter === "Link Similar") {
    return;
  }


  test("Manager approval", async ({ request }) => {
    const incidentCase = await openCase(request, incidentPzInsKey);
    eTag = incidentCase.eTag;
    expect(eTag).not.toBe("");
    const data = JSON.stringify({ content: {}, pageInstructions: [] });
    await submiManagerApprovalAPI(request, eTag, incidentPzInsKey, data);
  });

  if (incidentServiceCase.breakAfter === "Manager Approval") {
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
