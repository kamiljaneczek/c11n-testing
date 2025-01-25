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
