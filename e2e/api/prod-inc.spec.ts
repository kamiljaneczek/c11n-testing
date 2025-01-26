import { test } from "../../lib/playwright/api/fixture";
import { expect } from "@playwright/test";
import {
  createCaseAPI,
  flowUpCallAPI,
  getIncidentDescendatsAPI,
  getIncidentStatusAPI,
  openCase,
  submitCreateScreenFAAPI,
  submitDispatchPaymentAPI,
  submitEligibilityCheckAPI,
  submitHandleTicketAPI,
  submitLinkSimilarAPI,
  submitSchedulePaymentAPI,
} from "../../lib/playwright/api/incident";
import { incidentProductCase } from "../../data/case/incident-product";

// Define the fixture type

// Change to test.describe.serial to run tests in sequence
test.describe.serial("Create Incident case related to product so customer receive help to thier issues - API", async () => {
  const caseTypeID = "SL-TellUsMoreRef-Work-Incident";
  const workPool = "SL-TellUsMoreRef-Work";
  let incidentPzInsKey: string;
  let eTag: string;
  let paymentPzInsKey: string;

  test("Create Incident case", async ({ request }) => {
    const caseResponse = await createCaseAPI(request, caseTypeID, "", "");
    incidentPzInsKey = encodeURIComponent(caseResponse.response.data.caseInfo.ID);
    eTag = caseResponse.eTag;
    expect(eTag).not.toBe("");
  });


  test("Select type and subtype of incident", async ({ request }) => {
    const data = JSON.stringify({
      content: {
        IncidentType: incidentProductCase.incidentType,
        IncidentSubType: incidentProductCase.incidentSubType,
      },
      pageInstructions: [],
    });

    const response = await submitCreateScreenFAAPI(request, eTag, incidentPzInsKey, "DetermineCategory", data);
    eTag = response.eTag;
    expect(eTag).not.toBe("");
  });

  test("Select product details", async ({ request }) => {
    const data = JSON.stringify({
        content: { Product: { pyGUID: incidentProductCase.productGUID, Cost: incidentProductCase.cost }, What: incidentProductCase.whatHappened, Where: incidentProductCase.whereHappened, When: incidentProductCase.whenHappened },
      pageInstructions: [],
    });
    const response = await submitCreateScreenFAAPI(request, eTag, incidentPzInsKey, "ProductDetials", data);
    eTag = response.eTag;
    expect(eTag).not.toBe("");
  });

  test("Provide customer details", async ({ request }) => {
    const data = JSON.stringify({
      content: {
        Customer: {
          FName: incidentProductCase.contactInfo?.firstName,
          LName: incidentProductCase.contactInfo?.lastName,
          EMail: incidentProductCase.contactInfo?.email,
          PhoneNumber: incidentProductCase.contactInfo?.phone,
          Address: { pyStreet: incidentProductCase.contactInfo?.address?.street, pyCity: incidentProductCase.contactInfo?.address?.city, pyPostalCode: incidentProductCase.contactInfo?.address?.zip, pyCountry: incidentProductCase.contactInfo?.address?.country },
        },
      },
      pageInstructions: [],
    });
    const response = await submitCreateScreenFAAPI(request, eTag, incidentPzInsKey, "ContactInfo", data);
    eTag = response.eTag;
    expect(eTag).not.toBe("");
  });

  test("Select desired resolution method", async ({ request }) => {
    const data = JSON.stringify({ content: { PreferredResolutionMethod: incidentProductCase.desiredResolution }, pageInstructions: [] });
    const response = await submitCreateScreenFAAPI(request, eTag, incidentPzInsKey, "ResolutionMethod", data);
    eTag = response.eTag;
    expect(eTag).not.toBe("");
  });

  test("Review and submit", async ({ request }) => {
    const data = JSON.stringify({ content: { UserConsent: true, PrivacyPolicy: true }, pageInstructions: [] });
    const response = await submitCreateScreenFAAPI(request, eTag, incidentPzInsKey, "Review", data);
    eTag = response.eTag;
    expect(eTag).not.toBe("");
  });

    if (incidentProductCase.breakAfter === "Create") {
    return;
  }


  test("Eligibility check", async ({ request }) => {
    const incidentCase = await openCase(request, incidentPzInsKey);
    eTag = incidentCase.eTag;
    expect(eTag).not.toBe("");
    const data = JSON.stringify({ content: { EligibilityType: incidentProductCase.eligibility, OverwriteAssignment: false, ShallIncreaseUrgency: false }, pageInstructions: [] });
    await submitEligibilityCheckAPI(request, eTag, incidentPzInsKey, data);
  });

    if (incidentProductCase.breakAfter === "Dispatch") {
    return;
  }


  test("Handle ticket", async ({ request }) => {
    const incidentCase = await openCase(request, incidentPzInsKey);
    eTag = incidentCase.eTag;
    expect(eTag).not.toBe("");
    const data = JSON.stringify({ content: { ResolutionMethod: incidentProductCase.resolutionMethod }, pageInstructions: [] });
    await submitHandleTicketAPI(request, eTag, incidentPzInsKey, data);
  });

  if (incidentProductCase.breakAfter === "Handle Ticket") {
    return;
  }

  test("Link similar", async ({ request }) => {
    const incidentCase = await openCase(request, incidentPzInsKey);
    eTag = incidentCase.eTag;

    expect(eTag).not.toBe("");
    const data = JSON.stringify({ content: {}, pageInstructions: [] });
    await submitLinkSimilarAPI(request, eTag, incidentPzInsKey, data);
  });

  if (incidentProductCase.breakAfter === "Link Similar") {
    return;
  }

  test("Dispatch payment", async ({ request }) => {
    const incidentCase = await openCase(request, incidentPzInsKey);
    eTag = incidentCase.eTag;
    expect(eTag).not.toBe("");
    const data = JSON.stringify({ content: {}, pageInstructions: [] });
    await submitDispatchPaymentAPI(request, eTag, incidentPzInsKey, data);
    const paymentCaseID = await getIncidentDescendatsAPI(request, incidentPzInsKey);
    paymentPzInsKey = encodeURIComponent(`${workPool} ${paymentCaseID.childCaseID}`);
    expect(paymentCaseID).not.toBe("");
  });



  test("Schedule payment", async ({ request }) => {
    try {
      const openCaseResponse = await openCase(request, paymentPzInsKey);
      eTag = openCaseResponse.eTag;
      expect(eTag).not.toBe("");
    } catch (error) {
      console.error(error);
      throw error;
    }

    const data = JSON.stringify({ content: {}, pageInstructions: [] });
    const response = await submitSchedulePaymentAPI(request, eTag, paymentPzInsKey, data);
    eTag = response.eTag;
    expect(eTag).not.toBe("");
  });

    if (incidentProductCase.breakAfter === "Payment") {
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
