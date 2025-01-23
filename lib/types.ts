/**
 * This type is used to represent the response from the API when creating an incident case.
 * Represents the response from the API when creating an incident case.
 * This is a simplified version of the response - it only includes the fields that are needed for the tests.
 */
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

export type TIncidentCaseData = {
  incidentType: string;
  incidentSubType: string;
  productName: string;
  cost: number;
  whatHappened: string;
  whereHappened: string;
  whenHappened: Date;
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
};
