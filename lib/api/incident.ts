import { expect } from "@playwright/test";
import { authenticateAPI } from "../utils";
import { createCaseURL,  flowUpCallURL, getDescendatsURL, openCaseURL, submitCreateScreenFAURL, submitDispatchPaymentURL, submitEligibilityCheckURL, submitHandleTicketURL, submitLinkSimilarURL, submitSchedulePaymentURL } from "./api-config";
import { APIRequestContext } from "@playwright/test";
import { CaseCreateResponseData } from "../../e2e/api/types";


export type createCaseAPIResponse = {
  response: CaseCreateResponseData;
  eTag: string;
};

export async function createCaseAPI(request: APIRequestContext, caseTypeID: string, parentCaseID: string, content: string): Promise<createCaseAPIResponse> {
  const oauth2Token = await authenticateAPI();

  const caseContent = content !== "" ? content : {};
  try {
    const response = await request.post(createCaseURL(), {
      data: {
        content: caseContent,
        caseTypeID: caseTypeID,
        parentCaseID: parentCaseID,
      },
      headers: {
        "x-origin-channel": "Web",
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${oauth2Token}`.trim(),
      },
    });
    expect(response.headers()["etag"]).not.toBe("");
    const responseBody: CaseCreateResponseData = await response.json();
    expect(response.status()).toBe(201);
    expect(responseBody.data.caseInfo.ID).toBeDefined();
 
    expect(response.headers()["etag"]).not.toBe("");

  
    return { response: responseBody, eTag: response.headers()["etag"] };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export type submitCreateScreenFAAPIResponse = {
  response: unknown;
  eTag: string;
};

export async function submitCreateScreenFAAPI(request: APIRequestContext, eTag: string, pzInskey: string, action: string, data: string): Promise<submitCreateScreenFAAPIResponse> {
  const oauth2Token = await authenticateAPI();
  try {
    const response = await request.patch(submitCreateScreenFAURL(pzInskey, action), {
      data: data,
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${oauth2Token}`.trim(),
        "if-match": eTag,
      },
    });
    const responseBody = await response.json();
    expect(response.status()).toBe(200);

    return { response: responseBody, eTag: response.headers()["etag"] };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export type submitAssignmentAPIResponse = {
  response: unknown;
  eTag: string;
};

export async function submitEligibilityCheckAPI(request: APIRequestContext, eTag: string, pzInskey: string, data: string): Promise<submitAssignmentAPIResponse> {
  const oauth2Token = await authenticateAPI();
  try {
    const response = await request.patch(submitEligibilityCheckURL(pzInskey), {
      data: data,
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${oauth2Token}`.trim(),
        "if-match": eTag,
      },
    });
    const responseBody = await response.json() ;
    expect(response.status()).toBe(200);
    return { response: responseBody, eTag: response.headers()["etag"] };
  } catch (error) {
    console.error(error);
    throw error;
  }
}



export async function submitHandleTicketAPI(request: APIRequestContext, eTag: string, pzInskey: string, data: string): Promise<submitAssignmentAPIResponse> {
  const oauth2Token = await authenticateAPI();
  try {
        const response = await request.patch(submitHandleTicketURL(pzInskey), {
      data: data,
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${oauth2Token}`.trim(),
        "if-match": eTag,
      },
    });
    const responseBody = await response.json() ;
    expect(response.status()).toBe(200);
    return { response: responseBody, eTag: response.headers()["etag"] };
  } catch (error) {
    console.error(error);
    throw error;
  }
}


export async function submitLinkSimilarAPI(request: APIRequestContext, eTag: string, pzInskey: string, data: string): Promise<submitAssignmentAPIResponse> {
  const oauth2Token = await authenticateAPI();
  try {
        const response = await request.patch(submitLinkSimilarURL(pzInskey), {
      data: data,
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${oauth2Token}`.trim(),
        "if-match": eTag,
      },
    });
    const responseBody = await response.json() ;
    expect(response.status()).toBe(200);
    return { response: responseBody, eTag: response.headers()["etag"] };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function submitDispatchPaymentAPI(request: APIRequestContext, eTag: string, pzInskey: string, data: string): Promise<submitAssignmentAPIResponse> {
  const oauth2Token = await authenticateAPI();
  try {
    const response = await request.patch(submitDispatchPaymentURL(pzInskey), {
      data: data,
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${oauth2Token}`.trim(),
        "if-match": eTag,
      },
    });
    const responseBody = await response.json() ;
    expect(response.status()).toBe(200);
    return { response: responseBody, eTag: response.headers()["etag"] };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export type getIncidentDescendatsAPIResponse = {
  childCaseID: string;
};

export async function getIncidentDescendatsAPI(request: APIRequestContext, pzInskey: string): Promise<getIncidentDescendatsAPIResponse> {
  const oauth2Token = await authenticateAPI();
  try {
    const response = await request.get(getDescendatsURL(pzInskey), {
      headers: {
        authorization: `Bearer ${oauth2Token}`.trim(),
      },
    });
    const responseBody = await response.json();
    const childCaseID = responseBody.childCases[0].businessID;
    expect(response.status()).toBe(200);
    return {  childCaseID: childCaseID };
  } catch (error) {
    console.error(error);
    throw error;
  }
}



export async function submitSchedulePaymentAPI(request: APIRequestContext, eTag: string, pzInskey: string, data: string): Promise<submitAssignmentAPIResponse> {
  const oauth2Token = await authenticateAPI();
  try {
    const response = await request.patch(submitSchedulePaymentURL(pzInskey), {
      data: data,
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        authorization: `Bearer ${oauth2Token}`.trim(),
        "if-match": eTag,
      },
    });
    const responseBody = await response.json() ;
    expect(response.status()).toBe(200);
    return { response: responseBody, eTag: response.headers()["etag"] };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export type openCaseAPIResponse = {
  response: unknown;
  eTag: string;
};

export async function openCase(request: APIRequestContext, pzInskey: string): Promise<openCaseAPIResponse> {
    const oauth2Token = await authenticateAPI();
    const response = await request.get(openCaseURL(pzInskey), {
      headers: {
        authorization: `Bearer ${oauth2Token}`.trim(),  
      },
    });
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    return { response: responseBody, eTag: response.headers()["etag"] };
}


export async function flowUpCallAPI(request: APIRequestContext, eTag: string, pzInskey: string, data: string): Promise<submitAssignmentAPIResponse> {
  const oauth2Token = await authenticateAPI();


  const response = await request.patch(flowUpCallURL(pzInskey), {
    data: data,
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      authorization: `Bearer ${oauth2Token}`.trim(),
      "if-match": eTag,
    },
  });
  const responseBody = await response.json() ;
  expect(response.status()).toBe(200);
  return { response: responseBody, eTag: response.headers()["etag"] };
}


export type getIncidentStatusData = {
  response: {
    data: {
      caseInfo: {
        content: {
          pyStatusWork: string;
        };
      };
    };
  };
};
export type getIncidentStatusAPIResponse = {
  status: string;
};

export async function getIncidentStatusAPI(request: APIRequestContext, pzInskey: string): Promise<getIncidentStatusAPIResponse> {
  const openCaseResponse = await openCase(request, pzInskey) as getIncidentStatusData;
  const status = openCaseResponse.response.data.caseInfo.content.pyStatusWork;
  return { status: status };
}