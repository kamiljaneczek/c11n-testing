import { Given, When, Then, DataTable } from "@cucumber/cucumber";
import { fixture } from "../lib/cucumber/page-fixture";
import { customer } from "../data/users";
import { expect } from "@playwright/test";
import { getTellUsMoreUser } from "../lib/utils";
import { loginToPega } from "../lib/login";


 
Given(`I am logged into the customer portal`, async () => {
  // [Given] Sets up the initial state of the system.
  const user = getTellUsMoreUser(customer);
  await fixture.page.goto(`${process.env.BASE_URL}`);
  await loginToPega(fixture.page, user);

  
});

Given(`I am on the home page`, async () => {
  // [Given] Sets up the initial state of the system.
  await expect(fixture.page).toHaveTitle(/Tell Us More/);
});

When(`I click on Incident tile`, () => {
  // [When] Describes the action or event that triggers the scenario.
  fixture.page.getByRole("link", { name: "Incident" }).click();
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

When(`I fill in the product details:`, (ProductDetails: DataTable) => {
  // [When] Describes the action or event that triggers the scenario.
  // <DataTable> argument is detected:
  // - With column headers: use DataTable.rowsHash(), which outputs an object containing key-value pairs for each row (e.g. { key1: value, key2: value }).
  // - With row headers: use DataTable.hashes(), which outputs an array of objects (e.g. [{ key1: value, key2: value }]).
  const data = ProductDetails.rowsHash();
  console.log(data);
});

When(`I fill in contact information:`, (ContactInformation: DataTable) => {
  // [When] Describes the action or event that triggers the scenario.
  // <DataTable> argument is detected:
  // - With column headers: use DataTable.rowsHash(), which outputs an object containing key-value pairs for each row (e.g. { key1: value, key2: value }).
  // - With row headers: use DataTable.hashes(), which outputs an array of objects (e.g. [{ key1: value, key2: value }]).
  const data = ContactInformation.rowsHash();
  console.log(data);
});

When(`I select {string} as the address mode`, (AddressMode: string) => {
  // [When] Describes the action or event that triggers the scenario.
  const data = AddressMode;
  console.log(data);
});

When(`I fill in the address details:`, (AddressDetails: DataTable) => {
  // [When] Describes the action or event that triggers the scenario.
  // <DataTable> argument is detected:
  // - With column headers: use DataTable.rowsHash(), which outputs an object containing key-value pairs for each row (e.g. { key1: value, key2: value }).
  // - With row headers: use DataTable.hashes(), which outputs an array of objects (e.g. [{ key1: value, key2: value }]).
  const data = AddressDetails.rowsHash();
  console.log(data);
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

Then(`I should see {string} in What's Next section`, (WhatsNext: string) => {
  // [Then] Describes the expected outcome or result of the scenario.
  const data = WhatsNext;
  console.log(data);
});
