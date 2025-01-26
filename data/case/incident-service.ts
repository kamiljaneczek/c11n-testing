import { faker } from "@faker-js/faker";
import { TIncidentServiceCaseTestData } from "../../lib/types";
  
export const incidentServiceCase: Partial<TIncidentServiceCaseTestData> = {
  incidentType: "Customer service issue",
  incidentSubType: "Staff conduct issue",
  communicationChannel: "Phone",
  whatHappened: faker.lorem.sentence(),
  whereHappened: faker.location.city(),
  whenHappened: faker.date.recent().toISOString().split("T")[0],
  contactInfo: {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.number.int({ min: 100000000, max: 999999999 }).toString(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      country: faker.location.country(),
    },
  },
  resolutionMethod: "Explanation",
  eligibility: "Eligible",
  customerSentiment: "Positive",
  NPS: faker.number.int({ min: 7, max: 10 }),
  breakAfter: "NONE"
};
