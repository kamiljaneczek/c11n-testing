import { Given, When, Then, DataTable } from "@cucumber/cucumber";

Given(`I am logged in as a case worker`, () => {
  // [Given] Sets up the initial state of the system.
});

Given(`I have an assigned incident`, () => {
  // [Given] Sets up the initial state of the system.
});

When(`I open the incident`, () => {
  // [When] Describes the action or event that triggers the scenario.
});

When(`I review the incident details`, () => {
  // [When] Describes the action or event that triggers the scenario.
});

When(`I select {string} as the resolution method`, (ResolutionMethod: string) => {
  // [When] Describes the action or event that triggers the scenario.
  const data = ResolutionMethod;
  console.log(data);
});

Then(`I should see the payment processing form`, () => {
  // [Then] Describes the expected outcome or result of the scenario.
});

When(`I confirm the refund amount`, () => {
  // [When] Describes the action or event that triggers the scenario.
});

Then(`a payment process case should be created`, () => {
  // [Then] Describes the expected outcome or result of the scenario.
});

Then(`the incident status should be updated`, () => {
  // [Then] Describes the expected outcome or result of the scenario.
});

Then(`I should see the shipment form`, () => {
  // [Then] Describes the expected outcome or result of the scenario.
});

When(`I enter shipping details:`, (ShippingDetails: DataTable) => {
  // [When] Describes the action or event that triggers the scenario.
  // <DataTable> argument is detected:
  // - With column headers: use DataTable.rowsHash(), which outputs an object containing key-value pairs for each row (e.g. { key1: value, key2: value }).
  // - With row headers: use DataTable.hashes(), which outputs an array of objects (e.g. [{ key1: value, key2: value }]).
  const data = ShippingDetails.rowsHash();
  console.log(data);
});

When(`I submit the shipping request`, () => {
  // [When] Describes the action or event that triggers the scenario.
});

Then(`a shipment case should be created`, () => {
  // [Then] Describes the expected outcome or result of the scenario.
});

Then(`the customer should receive tracking information`, () => {
  // [Then] Describes the expected outcome or result of the scenario.
});
