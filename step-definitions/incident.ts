import { When, Then } from "@cucumber/cucumber";
import { fixture } from "../lib/cucumber/page-fixture";
import { expect } from "@playwright/test";
import { fillInput, selecetDropdown } from "../lib/playwright/controls";
import { checkCaseStatus, goToNextStep, submitAssignment } from "../lib/case";


Then(`I should see the incident creation form`, async () => {
  // [Then] Describes the expected outcome or result of the scenario.
  const c11nPage = fixture.page;
  await expect(c11nPage.getByTestId(':backdrop:').getByRole('banner')).toBeVisible();
});

When('I select {string} as the Incident Type', async (IncidentType: string) => {
    const c11nPage = fixture.page;
    await selecetDropdown(c11nPage, "DetermineTypeDropdown", IncidentType);
   

});

When('I select {string} as the Incident SubType', async (IncidentSubType: string) => {
    const c11nPage = fixture.page;
    await selecetDropdown(c11nPage, "DetermineSubtypeDropdown", IncidentSubType);
    await goToNextStep(c11nPage);
});


When('I complete the contact information form:', async (dataTable) => {
    const c11nPage = fixture.page;
    const details = dataTable.rowsHash();
    
   
    //Provide customer details
    await fillInput(c11nPage, "FirstName", details['First Name']);
    await fillInput(c11nPage, "LastName", details['Last Name']);
    await fillInput(c11nPage, "Email", details['Email']);
    await c11nPage.getByTestId('PhoneNumber:phone-input:country-code').selectOption('+48');
    await c11nPage.getByTestId("PhoneNumber:phone-input:control").click();
    await c11nPage.getByTestId("PhoneNumber:phone-input:control").fill(details['Phone']);

    //Provide customer address
    await fillInput(c11nPage, "CIty", details['City']);
    await fillInput(c11nPage, "Street", details['Street']);
    await fillInput(c11nPage, "PostalCode", details['Postal Code']);
    await selecetDropdown(c11nPage, "Country", details['Country']);
    await goToNextStep(c11nPage);

});




When(`I review and accept terms and conditions`, async () => {
  // [When] Describes the action or event that triggers the scenario.
  const c11nPage = fixture.page;
   await c11nPage.getByTestId("TC-parent").getByTestId(":form-field:").getByTestId(":form-field:label").locator("div").click();
    await c11nPage.getByTestId("PP-parent").getByTestId(":form-field:").getByTestId(":form-field:label").locator("div").click();


});

When(`I submit the incident`, async() => {
  // [When] Describes the action or event that triggers the scenario.
    const c11nPage = fixture.page;

    await submitAssignment(c11nPage);
});

Then(`I should see a confirmation message`, async () => {
  // [Then] Describes the expected outcome or result of the scenario.
  const c11nPage = fixture.page;
   await checkCaseStatus(c11nPage, "Pending-Dispatch");
});
