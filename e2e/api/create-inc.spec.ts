import { test as base, expect } from "@playwright/test";
import { createCaseAPI, flowUpCallAPI, getIncidentDescendatsAPI, getIncidentStatusAPI, openCase, submitCreateScreenFAAPI, submitDispatchPaymentAPI, submitEligibilityCheckAPI, submitHandleTicketAPI, submitLinkSimilarAPI, submitSchedulePaymentAPI } from "../../lib/api/incident";
import { incidentBaseCase } from "../../data/case/incident-base";

// Define the fixture type
type IncidentFixture = {
  caseID: string;
  pzInskey: string;
  encodedPzInskey: string;
  eTag: string;
  paymentCaseID: string;
};

// Create a test with fixtures
const test = base.extend<IncidentFixture>({
  caseID: [async ({}, use) => {
    await use('');
  }, { scope: 'test' }],
  pzInskey: [async ({}, use) => {
    await use('');
  }, { scope: 'test' }],
  encodedPzInskey: [async ({}, use) => {
    await use('');
  }, { scope: 'test' }],
  eTag: [async ({}, use) => {
    await use('');
  }, { scope: 'test' }],
  paymentCaseID: [async ({}, use) => {
    await use('');
  }, { scope: 'test' }],
});

// Change to test.describe.serial to run tests in sequence
test.describe.serial("Create Incident case related to product so customer receive help to thier issues - API", async () => {
  const caseTypeID = "SL-TellUsMoreRef-Work-Incident";
  const workPool = "SL-TellUsMoreRef-Work";
  let sharedEncodedPzInskey: string;
  let eTag: string;
  let sharedPaymentCaseID: string;

  test("Create Incident case", async ({ request }) => {
    const caseResponse = await createCaseAPI(request, caseTypeID, "", "");
    sharedEncodedPzInskey = encodeURIComponent(caseResponse.response.data.caseInfo.ID);
    eTag = caseResponse.eTag;
    expect(eTag).not.toBe("");
  });
  
  test("Select type and subtype of incident", async ({ request }) => {
    console.log("Etag: ", eTag);
    const data = JSON.stringify({ 
      "content": { 
        "IncidentType": incidentBaseCase.incidentType, 
        "IncidentSubType": incidentBaseCase.incidentSubType 
      }, 
      "pageInstructions": [] 
    });

    const response = await submitCreateScreenFAAPI(request, eTag, sharedEncodedPzInskey, "DetermineCategory", data);
    eTag = response.eTag;
    expect(eTag).not.toBe("");
 
  });

  test("Select product details", async ({ request }) => {
    const data = JSON.stringify({
      "content":
        { "Product": { "pyGUID": "5b3d1e3b-65fe-475a-8ae7-15542cd79b3f", "Cost": 121 }, "What": "sda", "Where": "asda", "When": "2025-01-25" }, "pageInstructions": []
    });
    const response = await submitCreateScreenFAAPI(request, eTag, sharedEncodedPzInskey, "ProductDetials", data);
    eTag = response.eTag;
    expect(eTag).not.toBe("");
  });

    test("Provide customer details", async ({ request }) => {
    const data = JSON.stringify({"content":{"Customer":{"FName":"ghgh","LName":"jghj","EMail":"dfds@o2.pl","PhoneNumber":"+48784621417","Address":{"pyStreet":"sdfsdf","pyCity":"sdfsdf","pyPostalCode":"213234-234","pyCountry":"Poland"}}},"pageInstructions":[]});
    const response = await submitCreateScreenFAAPI(request, eTag, sharedEncodedPzInskey, "ContactInfo", data);
    eTag = response.eTag;
    expect(eTag).not.toBe("");
    });
  

    test("Select desired resolution method", async ({ request }) => {
    const data = JSON.stringify({"content":{"PreferredResolutionMethod":"Refund"},"pageInstructions":[]});
    const response = await submitCreateScreenFAAPI(request, eTag, sharedEncodedPzInskey, "ResolutionMethod", data);
    eTag = response.eTag;
    expect(eTag).not.toBe("");
     });

    test("Review and submit", async ({ request }) => {
    const data = JSON.stringify({"content":{"UserConsent":true,"PrivacyPolicy":true},"pageInstructions":[]});
    const response = await submitCreateScreenFAAPI(request, eTag, sharedEncodedPzInskey, "Review", data);
    eTag = response.eTag;
    expect(eTag).not.toBe("");
    });
  
  test("Eligibility check", async ({ request }) => {
      const incidentCase = await openCase(request, sharedEncodedPzInskey);
      eTag = incidentCase.eTag;
      expect(eTag).not.toBe("");
    const data = JSON.stringify({"content":{"EligibilityType":"Eligible","OverwriteAssignment":false,"ShallIncreaseUrgency":false},"pageInstructions":[]});
    await submitEligibilityCheckAPI(request, eTag, sharedEncodedPzInskey, data);
    });
  
  test("Handle ticket", async ({ request }) => {
            const incidentCase = await openCase(request, sharedEncodedPzInskey);
      eTag = incidentCase.eTag;
      expect(eTag).not.toBe("");
    const data = JSON.stringify({"content":{"ResolutionMethod":"Refund"},"pageInstructions":[]});
    await submitHandleTicketAPI(request, eTag, sharedEncodedPzInskey, data);
    });

  test("Link similar", async ({ request }) => {
            const incidentCase = await openCase(request, sharedEncodedPzInskey);
    eTag = incidentCase.eTag;
    
      expect(eTag).not.toBe("");
    const data = JSON.stringify({"content":{},"pageInstructions":[]});
    await submitLinkSimilarAPI(request, eTag, sharedEncodedPzInskey, data);
    });
  
  
  test("Dispatch payment", async ({ request }) => {
      const incidentCase = await openCase(request, sharedEncodedPzInskey);
      eTag = incidentCase.eTag;
      expect(eTag).not.toBe("");
    const data = JSON.stringify({"content":{},"pageInstructions":[]});
    await submitDispatchPaymentAPI(request, eTag, sharedEncodedPzInskey, data);
    const paymentCaseID = await getIncidentDescendatsAPI(request, sharedEncodedPzInskey);
    sharedPaymentCaseID = paymentCaseID.childCaseID;
    expect(paymentCaseID).not.toBe("");
  });
  
  test("Schedule payment", async ({ request }) => {
    const encodedPaymentPzInskey = encodeURIComponent(`${workPool} ${sharedPaymentCaseID}`);

    try {
    const openCaseResponse = await openCase(request, encodedPaymentPzInskey);
      eTag = openCaseResponse.eTag;
      expect(eTag).not.toBe("");
    } catch (error) {
      console.error(error);
      throw error;
    }
   
    const data = JSON.stringify({"content":{},"pageInstructions":[]});
    const response = await submitSchedulePaymentAPI(request, eTag, encodedPaymentPzInskey, data);
    eTag = response.eTag;
    expect(eTag).not.toBe("");
  }); 

  test("Flow up call", async ({ request }) => {
    const incidentCase = await openCase(request, sharedEncodedPzInskey);
     eTag = incidentCase.eTag;
      expect(eTag).not.toBe("");
    const data = JSON.stringify({"content":{},"pageInstructions":[]});
     await flowUpCallAPI(request, eTag, sharedEncodedPzInskey, data);

    const incidentStatus = await getIncidentStatusAPI(request, sharedEncodedPzInskey);
    expect(incidentStatus.status).toBe("Resolved-Completed");
  });
});





