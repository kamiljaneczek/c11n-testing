import { test } from "./fixtures";

test("I can create an incident", async ({ c11n }) => {
  const c11nPage = c11n.page;

  await c11nPage.getByRole("button", { name: "Create" }).click();
});
