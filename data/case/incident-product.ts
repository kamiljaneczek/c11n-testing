import { faker } from "@faker-js/faker";
import { TIncidentProductCaseTestData } from "../../lib/types";

export const incidentProductCase: Partial<TIncidentProductCaseTestData> = {
  incidentType: "Product faulty or unsafe",
  incidentSubType: "Product not as described",
  productName: "Mix",
  productGUID: "5b3d1e3b-65fe-475a-8ae7-15542cd79b3f",
  cost: faker.number.int({ min: 10, max: 30 }),
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
  resolutionMethod: "Refund",
  desiredResolution: "Refund",
  eligibility: "Eligible",
  paymentBroker: "Paypal",
  customerSentiment: "Positive",
  NPS: faker.number.int({ min: 7, max: 10 }),
  breakAfter: "NONE",
};
