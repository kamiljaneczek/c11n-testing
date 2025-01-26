/**
 * This type is used to represent the response from the API when creating an incident case.
 * Represents the response from the API when creating an incident case.
 * This is a simplified version of the response - it only includes the fields that are needed for the tests.
 */


export type TBreakAfter = "NONE"| "Create" | "Dispatch" | "Handle Ticket" | "Link Similar" | "Manager Approval" | "Payment" | "Shipment";

export type TIncidentCase = {
  data: {
    caseInfo: {
      caseTypeName: "Incident";
      urgency: "10";
      ID: string;
      caseTypeID: string;
      owner: string;
      lastUpdatedBy: string;
      hasNewAttachments: boolean;
      businessID: string;
      createTime: string;
      createdBy: string;
      name: string;
      caseTypeIcon: string;
      status: string;
      stageID: string;
      stageLabel: string;
      lastUpdateTime: string;
    };
    shared: { D_DictionaryList: [object] };
  };
  ID: string;
};

export type TIncidentProductCaseTestData = {
  incidentType: string;
  incidentSubType: string;
  productName: string;
  productGUID: string;
  cost: number;
  whatHappened: string;
  whereHappened: string;
  whenHappened: string;
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  };
  resolutionMethod: string;
  desiredResolution: string;
  eligibility: string;
  paymentBroker: string;
  customerSentiment: string;
  NPS: number;
  breakAfter: TBreakAfter;
};


export type TIncidentServiceCaseTestData = {
  incidentType: string;
  incidentSubType: string;
  communicationChannel: string;
  whatHappened: string;
  whereHappened: string;
  whenHappened: string;
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  };
  resolutionMethod: string;
  eligibility: string;
  customerSentiment: string;
  NPS: number;
  breakAfter: TBreakAfter;
};

export type CaseCreateResponseData = {
  data: {
    caseInfo: {
      associations: {
        [key: string]: unknown;
      };
      relatedCaseTypes: Array<unknown>;
      assignments: Array<unknown>;
      caseTypeName: string;
      urgency: string;
      ID: string;
      caseTypeID: string;
      owner: string;
      availableChildCaseTypes: Array<unknown>;
      availableActions: Array<unknown>;
      lastUpdatedBy: string;
      hasNewAttachments: boolean;
      businessID: string;
      sla: Array<unknown>;
      WidgetsToRefresh: Array<unknown>;
      createTime: string;
      createdBy: string;
      name: string;
      stages: Array<unknown>;
      caseTypeIcon: string;
      status: string;
      stageID: string;
      stageLabel: string;
      lastUpdateTime: string;
      content: object;
    };
  };
  ID: string;
  nextAssignmentInfo: {
    context: string;
    className: string;
    links: { open: [object] };
    ID: string;
  };
};
