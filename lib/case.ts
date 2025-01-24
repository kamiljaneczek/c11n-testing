import { Page } from "@playwright/test";
import { TIncidentCase } from "./types";

/**
 * This function creates an incident case and returns the case ID.
 * It uses a promise to wait for the case ID to be received from the API response.
 * The promise is resolved when the case ID is received, and the case ID is returned.
 * @param c11nPage - The page object for the C11n application.
 * @returns The case ID.
 */

export async function createIncidentCase(c11nPage: Page): Promise<string> {
  let caseId: string | undefined;

  // Create a promise that will resolve when we get the case ID
  const caseIdPromise = new Promise<string>((resolve, reject) => {
    c11nPage.route(`*/**/api/application/v2/cases?viewType=page`, async (route) => {
      try {
        const response = await route.fetch();
        const responseJson = (await response.json()) as TIncidentCase;
        caseId = responseJson.data.caseInfo.ID;
        await route.fulfill({ response });
        resolve(caseId);
      } catch (error) {
        reject(error);
      }
    });
  });

  // Trigger the request
  await c11nPage.getByRole("button", { name: "Create" }).click();
  await c11nPage.getByTestId(":menu:").getByLabel("Incident").click();

  // Wait for the case ID to be received
  caseId = await caseIdPromise;

  if (!caseId) {
    throw new Error("Failed to create incident case: Case ID was not returned from the API response");
  }
  return caseId;
}

export async function createIncidentCaseSelfService(c11nPage: Page): Promise<string> {
  let caseId: string | undefined;

  // Create a promise that will resolve when we get the case ID
  const caseIdPromise = new Promise<string>((resolve, reject) => {
    c11nPage.route(`*/**/api/application/v2/cases?viewType=page`, async (route) => {
      try {
        const response = await route.fetch();
        const responseJson = (await response.json()) as TIncidentCase;
        caseId = responseJson.data.caseInfo.ID;
        await route.fulfill({ response });
        resolve(caseId);
      } catch (error) {
        reject(error);
      }
    });
  });

  // Trigger the request
  await c11nPage.getByRole('button', { name: 'Incident' }).click();

  // Wait for the case ID to be received
  caseId = await caseIdPromise;

  if (!caseId) {
    throw new Error("Failed to create incident case: Case ID was not returned from the API response");
  }
  return caseId;
}


/**
 * This function goes to the next step/assignment
 * @param c11nPage - The page object for the C11n application.
 */
export async function goToNextStep(c11nPage: Page) {
  await c11nPage.getByRole("button", { name: "Next" }).click();
}
