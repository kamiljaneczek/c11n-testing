import { Page } from "@playwright/test";

export const navigateToIncidents = async (c11nPage: Page) => {
  await c11nPage.getByRole("link", { name: "Incidents" }).click();
};
