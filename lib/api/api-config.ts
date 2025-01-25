export const createCaseURL = () => {
  return `${process.env.BASE_URL}/api/application/v2/cases?viewType=none&pageName=`;
};

export function submitCreateScreenFAURL(pzInskey: string, action: string) {
  return `${process.env.BASE_URL}app/${process.env.APP_NAME}/api/application/v2/assignments/ASSIGN-WORKLIST%20${pzInskey}!CREATEFORM_DEFAULT/actions/${action}?viewType=page`;
}


export function submitEligibilityCheckURL(pzInskey: string): string {
  return `${process.env.BASE_URL}app/${process.env.APP_NAME}/api/application/v2/assignments/ASSIGN-WORKBASKET%20${pzInskey}!DISPATCH_FLOW/actions/EC?viewType=form`;
}

export function submitHandleTicketURL(pzInskey: string): string {
  return `${process.env.BASE_URL}app/${process.env.APP_NAME}/api/application/v2/assignments/ASSIGN-WORKBASKET%20${pzInskey}!PROCESSINCIDENT/actions/HandleTicket?viewType=form`;
}

export function submitLinkSimilarURL(pzInskey: string): string {
  return `${process.env.BASE_URL}app/${process.env.APP_NAME}/api/application/v2/assignments/ASSIGN-WORKBASKET%20${pzInskey}!PROCESSINCIDENT/actions/LinkSimilar?viewType=form`;
}



export function getDescendatsURL(pzInskey: string): string {
  return `${process.env.BASE_URL}app/${process.env.APP_NAME}/api/application/v2/cases/${pzInskey}/descendents`;
}


export function submitSchedulePaymentURL(pzInskey: string): string {
  return `${process.env.BASE_URL}app/${process.env.APP_NAME}/api/application/v2/assignments/ASSIGN-WORKLIST%20${pzInskey}!PROCESS_FLOW/actions/SchedulePayment?viewType=form`;
}

export function submitDispatchPaymentURL(pzInskey: string): string {
  return `${process.env.BASE_URL}app/${process.env.APP_NAME}/api/application/v2/assignments/ASSIGN-WORKLIST%20${pzInskey}!PAYMENT/actions/DispatchPayment?viewType=form`;
}

export function openCaseURL(pzInskey: string): string {
  return `${process.env.BASE_URL}app/${process.env.APP_NAME}/api/application/v2/cases/${pzInskey}?viewType=none`;
}

export function flowUpCallURL(pzInskey: string): string {
  return `${process.env.BASE_URL}app/${process.env.APP_NAME}/api/application/v2/assignments/ASSIGN-WORKLIST%20${pzInskey}!FOLLOWUPCALL/actions/FollowupCall?viewType=form`;
}