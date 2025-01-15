//ts-check
import { mainmenu } from "../data/portal/main-menu";

import { expect } from "@playwright/test";
import { test } from "./fixtures";
import { navigateToIncidents } from "../lib/portal";

test("Menu is working", async ({ c11n }) => {
  // The page.goto('/') is now automatically handled by the custom fixture
  const c11nPage = c11n.page;
  await expect(c11nPage).toHaveTitle(/Tell Us More/);
  await expect(c11nPage.getByLabel("Main")).toBeVisible();
  for (const item of mainmenu) {
    await expect(c11nPage.getByRole("link", { name: item })).toBeVisible();
  }
});

test("I can navigate to Incidents", async ({ c11n }) => {
  const c11nPage = c11n.page;
  await navigateToIncidents(c11nPage);
  await expect(c11nPage.getByRole("heading", { level: 1, name: "Incidents" })).toBeVisible();
});
