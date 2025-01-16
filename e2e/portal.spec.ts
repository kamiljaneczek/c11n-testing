//ts-check

import { expect } from "@playwright/test";
import { test } from "./fixtures";
import { caseWorker } from "../data/users";

test.beforeEach(async ({ c11n }) => {
  await c11n.loginToPega(caseWorker);
});

test("Portal is working", async ({ c11n }) => {
  // The page.goto('/') is now automatically handled by the custom fixture
  const c11nPage = c11n.page;

  // Check if the page is loaded by checking the title and the presence of the heading and the toolbar
  await expect(c11nPage).toHaveTitle(/Tell Us More/);
  await expect(c11nPage.getByRole("heading", { level: 1, name: "Tell Us More - Refrence App" })).toBeVisible();
  await expect(c11nPage.getByTestId(":list-toolbar:heading").getByText("Tasks")).toBeVisible();
  await expect(c11nPage.getByRole("heading", { level: 2, name: "Announcements" })).toBeVisible();
  await expect(c11nPage.getByRole("heading", { level: 2, name: "Pulse" })).toBeVisible();
});
