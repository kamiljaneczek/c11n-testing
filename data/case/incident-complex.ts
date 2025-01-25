import { faker } from "@faker-js/faker";

type TContactInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: TAddress;
};

type TAddress = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

type TIncidentComplexCase = {
  incidentType: string;
  incidentSubType: string;
  productName: string;
  cost: number;
  whatHappened: string;
  whereHappened: string;
  whenHappened: string;
  contactInfo: TContactInfo;
  resolutionMethod: string;
  eligibility: string;
  customerSentiment: string;
  NPS: number;
};

export const incidentComplexCase: TIncidentComplexCase = {
  incidentType: "Customer service issue",
  incidentSubType: "Customer service issue",
  productName: "Mix",
  cost: faker.number.int({ min: 100, max: 1000 }),
  whatHappened: faker.lorem.paragraph(),
  whereHappened: faker.location.city(),
  whenHappened: faker.date.recent().toISOString(),
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
