import { When, Then, DataTable, Given } from "@cucumber/cucumber";

Given(`I am logged in as a manager`, () => {
  // [Given] Sets up the initial state of the system.
});

When(`I go to Products landing page`, () => {
  // [When] Describes the action or event that triggers the scenario.
});

When(`I open the product creation form`, () => {
  // [When] Describes the action or event that triggers the scenario.
});

Then(`I should see the product details`, () => {
  // [Then] Describes the expected outcome or result of the scenario.
});

When(`I record the product details:`, (arg0: DataTable) => {
  // [When] Describes the action or event that triggers the scenario.
  // <DataTable> argument is detected:
  // - With column headers: use DataTable.rowsHash(), which outputs an object containing key-value pairs for each row (e.g. { key1: value, key2: value }).
  // - With row headers: use DataTable.hashes(), which outputs an array of objects (e.g. [{ key1: value, key2: value }]).
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = arg0.rowsHash();
});

When(`I submit the product`, () => {
  // [When] Describes the action or event that triggers the scenario.
});

Then(`the product should be created`, () => {
  // [Then] Describes the expected outcome or result of the scenario.
});
