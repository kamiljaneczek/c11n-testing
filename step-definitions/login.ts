import { Given, setDefaultTimeout, Then, When } from "@cucumber/cucumber";
import { fixture } from "../lib/cucumber/page-fixture";
import { loginToPega } from "../lib/login";
import { createIncidentCase } from "../lib/case";
import { getTellUsMoreUser } from "../lib/utils";

setDefaultTimeout(60 * 1000 * 2);

Given("A User logs in as customer", async function () {
  await fixture.page.goto("https://lab-03764-bos.lab.pega.com/prweb/app/tell-us-more-refrence");
  const user = getTellUsMoreUser("CustomerREF@SL");
  await loginToPega(fixture.page, user);
});

When("I create a new incident", function () {
  return createIncidentCase(fixture.page);
});

When("I select incident type {string} with subtype {string}", function (incidentType: string, incidentSubtype: string) {
  // Implement the step
});

Then("I search by {string} having category like {string} and cost {string}", function (string, string2, string3) {
  // Then('I search by {string} having category like {string} and cost {float}', function (string, string2, float) {
  // Write code here that turns the phrase above into concrete actions
});

When("i select the {string} product", function (string) {
  // Write code here that turns the phrase above into concrete actions
});

When("i provide contact info with manual address", function () {
  // Write code here that turns the phrase above into concrete actions
});

When("i select {string} for resolution method", function (string) {
  // Write code here that turns the phrase above into concrete actions
});

Then("i review the case and submit", function () {
  // Write code here that turns the phrase above into concrete actions
});
