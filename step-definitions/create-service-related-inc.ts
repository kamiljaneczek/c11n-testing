import { Given, When, Then, DataTable } from "@cucumber/cucumber";

Given(`I am logged into the customer portal`, () => {
  // [Given] Sets up the initial state of the system.
});

Given(`I am on the new incident submission page`, () => {
  // [Given] Sets up the initial state of the system.
});

When(`I select {string} as the Incident Type`, (IncidentType: string) => {
  // [When] Describes the action or event that triggers the scenario.
  const data = IncidentType;
  console.log(data);
});

When(`I select {string} as the Incident SubType`, (IncidentSubType: string) => {
  // [When] Describes the action or event that triggers the scenario.
  const data = IncidentSubType;
  console.log(data);
});

When(`I fill in the service details:`, (ServiceDetails: DataTable) => {
  // [When] Describes the action or event that triggers the scenario.
  // <DataTable> argument is detected:
  // - With column headers: use DataTable.rowsHash(), which outputs an object containing key-value pairs for each row (e.g. { key1: value, key2: value }).
  // - With row headers: use DataTable.hashes(), which outputs an array of objects (e.g. [{ key1: value, key2: value }]).
  const data = ServiceDetails.rowsHash();
  console.log(data);
});

When(`I complete the contact information form`, () => {
  // [When] Describes the action or event that triggers the scenario.
});

When(`I select {string} as preferred resolution method`, (PreferredResolutionMethod: string) => {
  // [When] Describes the action or event that triggers the scenario.
  const data = PreferredResolutionMethod;
  console.log(data);
});

When(`I review and accept terms and conditions`, () => {
  // [When] Describes the action or event that triggers the scenario.
});

When(`I submit the incident`, () => {
  // [When] Describes the action or event that triggers the scenario.
});

Then(`I should see a confirmation message`, () => {
  // [Then] Describes the expected outcome or result of the scenario.
});

Then(`the incident should be routed to the service complaints queue`, () => {
  // [Then] Describes the expected outcome or result of the scenario.
});
