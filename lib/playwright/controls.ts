import { Page } from "@playwright/test";

export async function selecetDropdown(page: Page, dropdownTestID: string, option: string) {
  await page.getByTestId(`${dropdownTestID}:select:control`).selectOption(option);
}

export async function fillInput(page: Page, inputTestID: string, value: string) {
  await page.getByTestId(`${inputTestID}:input:control`).click();
  await page.getByTestId(`${inputTestID}:input:control`).fill(value);
}

export async function fillSliderInput(page: Page, inputTestID: string, value: string) {
  await page.getByTestId(`${inputTestID}:slider:control`).click();
  await page.getByTestId(`${inputTestID}:slider:control`).fill(value);
}

export async function fillTextArea(page: Page, inputTestID: string, value: string) {
  await page.getByTestId(`${inputTestID}:text-area:control`).click();
  await page.getByTestId(`${inputTestID}:text-area:control`).fill(value);
}

export async function fillCurrencyInput(page: Page, inputTestID: string, value: string) {
  await page.getByTestId(`${inputTestID}:currency-input:control`).click();
  await page.getByTestId(`${inputTestID}:currency-input:control`).fill(value);
}

export async function fillDateInput(page: Page, inputTestID: string, value: string) {
  await page.getByTestId(`${inputTestID}`).click();
  await page.getByTestId(`${inputTestID}`).fill(value);
}

export async function clickButton(page: Page, buttonTestID: string) {
  await page.getByTestId(`${buttonTestID}:button:control`).click();
}

export async function clickSearchButton(page: Page) {
  await page.getByTestId(":backdrop:").getByRole("button", { name: "Search", exact: true }).click();
}

export async function clickBackdrop(page: Page) {
  await page.getByTestId(":backdrop:").getByTestId(":fullscreen:").getByTestId(":form-field:label").locator("div").click();
}

export async function clickFormFieldLabel(page: Page) {
  await page.getByTestId(":backdrop:").getByTestId(":fullscreen:").getByTestId(":form-field:label").locator("div").click();
}
