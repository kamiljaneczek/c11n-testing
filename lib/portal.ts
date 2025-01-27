import { Page } from "@playwright/test";

/**
 * This function navigates to the LP page.
 * @param c11nPage - The page object for the C11n application.
 * @param lp - The name of the LP to navigate to - e.g. "Incidents". This string need to matach label of the link.
 */
export const navigateToLP = async (c11nPage: Page, lp: string) => {
  await c11nPage.getByRole("link", { name: lp }).click();
};


export async function getWidgetByTitle(c11nPage: Page, title: string) {
  return c11nPage.locator(`//h2[starts-with(text(),"${title}")]/ancestor::article`);
}


export async function getWidgetWithMultibleQueuesByTitle(c11nPage: Page, title: string) {
  return c11nPage.locator(`//span[starts-with(text(),"${title}")]/ancestor::article`);
}


export async function getMyQueues(c11nPage: Page) {
  return c11nPage.locator(`//span[starts-with(text(),"My queues")]`);
}
