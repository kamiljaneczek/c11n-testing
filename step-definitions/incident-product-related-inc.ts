import { When, DataTable } from "@cucumber/cucumber";

When(`I fill in the product details:`, (ProductDetails: DataTable) => {
  // [When] Describes the action or event that triggers the scenario.
  // <DataTable> argument is detected:
  // - With column headers: use DataTable.rowsHash(), which outputs an object containing key-value pairs for each row (e.g. { key1: value, key2: value }).
  // - With row headers: use DataTable.hashes(), which outputs an array of objects (e.g. [{ key1: value, key2: value }]).
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = ProductDetails.rowsHash();
});

When(`I select {string} as preferred resolution method`, (PreferredResolutionMethod: string) => {
  // [When] Describes the action or event that triggers the scenario.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = PreferredResolutionMethod;
});
