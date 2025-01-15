import { Page } from "@playwright/test";

export async function createIncidentCase(c11nPage: Page) {
  await c11nPage.getByRole("button", { name: "Create" }).click();
  await c11nPage.getByTestId(":menu:").getByLabel("Incident").click();

}


export async function goToNextStep(c11nPage: Page) {
  await c11nPage.getByRole("button", { name: "Next" }).click();
}
