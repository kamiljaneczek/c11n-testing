import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { fixture } from "../lib/cucumber/page-fixture";
import { customer } from "../data/users";
import { expect } from "@playwright/test";
import { getTellUsMoreUser } from "../lib/utils";
import { loginToPega } from "../lib/login";



When(`I fill in the product details:`, (ProductDetails: DataTable) => {
  // [When] Describes the action or event that triggers the scenario.
  // <DataTable> argument is detected:
  // - With column headers: use DataTable.rowsHash(), which outputs an object containing key-value pairs for each row (e.g. { key1: value, key2: value }).
  // - With row headers: use DataTable.hashes(), which outputs an array of objects (e.g. [{ key1: value, key2: value }]).
  const data = ProductDetails.rowsHash();
  console.log(data);
});


When(`I select {string} as preferred resolution method`, (PreferredResolutionMethod: string) => {
  // [When] Describes the action or event that triggers the scenario.
  const data = PreferredResolutionMethod;
  console.log(data);
});

