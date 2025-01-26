import { test as base } from "@playwright/test";

type IncidentFixture = {
  caseID: string;
  pzInskey: string;
  encodedPzInskey: string;
  eTag: string;
  paymentCaseID: string;
};

// Create a test with fixtures
export const test = base.extend<IncidentFixture>({
  caseID: [
    async ({}, use) => {
      await use("");
    },
    { scope: "test" },
  ],
  pzInskey: [
    async ({}, use) => {
      await use("");
    },
    { scope: "test" },
  ],
  encodedPzInskey: [
    async ({}, use) => {
      await use("");
    },
    { scope: "test" },
  ],
  eTag: [
    async ({}, use) => {
      await use("");
    },
    { scope: "test" },
  ],
  paymentCaseID: [
    async ({}, use) => {
      await use("");
    },
    { scope: "test" },
  ],
});
