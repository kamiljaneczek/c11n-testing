import { Given, When, Then } from "@cucumber/cucumber";

Given(`I am logged in as a dispatcher`, () => {
  // [Given] Sets up the initial state of the system.
});

Given(`there is a new incident in the dispatch queue`, () => {
  // [Given] Sets up the initial state of the system.
});

When(`I open the incident for eligibility check`, () => {
  // [When] Describes the action or event that triggers the scenario.
});

Then(`I should see the incident details in read-only mode`, () => {
  // [Then] Describes the expected outcome or result of the scenario.
});

When(`I set eligibility type to {string}`, (EligibilityType: string) => {
  // [When] Describes the action or event that triggers the scenario.
  const data = EligibilityType;
  console.log(data);
});

When(`I submit the eligibility decision`, () => {
  // [When] Describes the action or event that triggers the scenario.
});

Then(`the incident should be routed to the Product work queue`, () => {
  // [Then] Describes the expected outcome or result of the scenario.
});

Then(`the incident status should be updated to {string}`, (IncidentStatus: string) => {
  // [Then] Describes the expected outcome or result of the scenario.
  const data = IncidentStatus;
  console.log(data);
});

Then(`the incident should be marked as {string}`, (IncidentMark: string) => {
  // [Then] Describes the expected outcome or result of the scenario.
  const data = IncidentMark;
  console.log(data);
});

Then(`the customer should be notified of the rejection`, () => {
  // [Then] Describes the expected outcome or result of the scenario.
});
