//ts-check

import { expect } from "@playwright/test";
import { test } from "./fixtures";

test("Portal is working", async ({ c11n }) => {
  // The page.goto('/') is now automatically handled by the custom fixture
  const c11nPage = c11n.page;

  await expect(c11nPage).toHaveTitle(/Tell Us More/);
  await expect(c11nPage.getByRole("heading", { level: 1, name: "Tell Us More - Refrence App" })).toBeVisible();
  await expect(c11nPage.getByTestId(":list-toolbar:heading").getByText("Tasks")).toBeVisible();
  await expect(c11nPage.getByRole("heading", { level: 2, name: "Announcements" })).toBeVisible();
  await expect(c11nPage.getByRole("heading", { level: 2, name: "Pulse" })).toBeVisible();
});
