import { faker } from "@faker-js/faker";
import { TIncidentCaseData } from "../../lib/types";

export const incidentBaseCase: TIncidentCaseData = {
  incidentType: "Product faulty or unsafe",
  incidentSubType: "Product not as described",
  productName: "Mix",
  cost: faker.number.int({ min: 100, max: 1000 }),
  whatHappened: faker.lorem.paragraph(),
  whereHappened: faker.location.city(),
  whenHappened: faker.date.recent(),
  contactInfo: {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: "1 (231) 231-2367",
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      country: faker.location.country(),
    },
  },
  resolutionMethod: "Replacement",
  eligibility: "Eligible",
  customerSentiment: "Positive",
  NPS: faker.number.int({ min: 1, max: 10 }),
};
