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
