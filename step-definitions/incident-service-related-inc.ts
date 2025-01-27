import { When } from "@cucumber/cucumber";
import { fixture } from "../lib/cucumber/page-fixture";

import { goToNextStep } from "../lib/case";
import { fillTextArea, selecetDropdown } from "../lib/playwright/controls";

When("I fill in the service details:", async (dataTable) => {
  const c11nPage = fixture.page;
  const details = dataTable.rowsHash();
  await selecetDropdown(c11nPage, "Communication channel used", details["Channel"]);

  await fillTextArea(c11nPage, "What", details["What happened?"]);
  await c11nPage.getByTestId(":date-input:control-month").click();
  await c11nPage.getByTestId(":date-input:control-month").fill("11");
  await c11nPage.getByTestId(":date-input:control-day").click();
  await c11nPage.getByTestId(":date-input:control-day").fill("11");
  await c11nPage.getByTestId(":date-input:control-year").click();
  await c11nPage.getByTestId(":date-input:control-year").fill("2022");
  await fillTextArea(c11nPage, "Where", details["Where did it happen?"]);
  await goToNextStep(c11nPage);
});
