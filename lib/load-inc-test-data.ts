import { faker } from "@faker-js/faker";
import { incidentProductSchema, TIncidentProduct } from "./schemas/incident-product.schema";
import { incidentServiceSchema, TIncidentService } from "./schemas/incident-service.schema";
import * as fs from "fs";
import * as path from "path";

export function loadIncidentProductData(filename: string, breakAfter: string): TIncidentProduct {
  const jsonPath = path.join(process.cwd(), "data", "case", `${filename}.json`);
  const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  // Replace $random values with generated data
  const processedData = {
    ...jsonData,
    cost: jsonData.cost === "$random" ? faker.number.int({ min: 10, max: 30 }) : jsonData.cost,
    whatHappened: jsonData.whatHappened === "$random" ? faker.lorem.sentence() : jsonData.whatHappened,
    whereHappened: jsonData.whereHappened === "$random" ? faker.location.city() : jsonData.whereHappened,
    whenHappened: jsonData.whenHappened === "$random" ? faker.date.recent().toISOString().split("T")[0] : jsonData.whenHappened,
    contactInfo: {
      ...jsonData.contactInfo,
      firstName: jsonData.contactInfo.firstName === "$random" ? faker.person.firstName() : jsonData.contactInfo.firstName,
      lastName: jsonData.contactInfo.lastName === "$random" ? faker.person.lastName() : jsonData.contactInfo.lastName,
      email: jsonData.contactInfo.email === "$random" ? faker.internet.email() : jsonData.contactInfo.email,
      phone: jsonData.contactInfo.phone === "$random" ? faker.number.int({ min: 100000000, max: 999999999 }).toString() : jsonData.contactInfo.phone,
      address: {
        ...jsonData.contactInfo.address,
        street: jsonData.contactInfo.address.street === "$random" ? faker.location.streetAddress() : jsonData.contactInfo.address.street,
        city: jsonData.contactInfo.address.city === "$random" ? faker.location.city() : jsonData.contactInfo.address.city,
        state: jsonData.contactInfo.address.state === "$random" ? faker.location.state() : jsonData.contactInfo.address.state,
        zip: jsonData.contactInfo.address.zip === "$random" ? faker.location.zipCode() : jsonData.contactInfo.address.zip,
        country: jsonData.contactInfo.address.country === "$random" ? faker.location.country() : jsonData.contactInfo.address.country,
      },
    },
    NPS: jsonData.NPS === "$random" ? faker.number.int({ min: 7, max: 10 }) : jsonData.NPS,
  };

  if (breakAfter) {
    processedData.breakAfter = breakAfter;
  }
  const parsedData = incidentProductSchema.parse(processedData);
  // Validate the processed data
  return parsedData;
}

export function loadIncidentServiceData(filename: string, breakAfter: string): TIncidentService {
  const jsonPath = path.join(process.cwd(), "data", "case", `${filename}.json`);
  const jsonData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  // Replace $random values with generated data
  const processedData = {
    ...jsonData,
    whatHappened: jsonData.whatHappened === "$random" ? faker.lorem.sentence() : jsonData.whatHappened,
    whereHappened: jsonData.whereHappened === "$random" ? faker.location.city() : jsonData.whereHappened,
    whenHappened: jsonData.whenHappened === "$random" ? faker.date.recent().toISOString().split("T")[0] : jsonData.whenHappened,
    contactInfo: {
      ...jsonData.contactInfo,
      firstName: jsonData.contactInfo.firstName === "$random" ? faker.person.firstName() : jsonData.contactInfo.firstName,
      lastName: jsonData.contactInfo.lastName === "$random" ? faker.person.lastName() : jsonData.contactInfo.lastName,
      email: jsonData.contactInfo.email === "$random" ? faker.internet.email() : jsonData.contactInfo.email,
      phone: jsonData.contactInfo.phone === "$random" ? faker.number.int({ min: 100000000, max: 999999999 }).toString() : jsonData.contactInfo.phone,
      address: {
        ...jsonData.contactInfo.address,
        street: jsonData.contactInfo.address.street === "$random" ? faker.location.streetAddress() : jsonData.contactInfo.address.street,
        city: jsonData.contactInfo.address.city === "$random" ? faker.location.city() : jsonData.contactInfo.address.city,
        state: jsonData.contactInfo.address.state === "$random" ? faker.location.state() : jsonData.contactInfo.address.state,
        zip: jsonData.contactInfo.address.zip === "$random" ? faker.location.zipCode() : jsonData.contactInfo.address.zip,
        country: jsonData.contactInfo.address.country === "$random" ? faker.location.country() : jsonData.contactInfo.address.country,
      },
    },
    NPS: jsonData.NPS === "$random" ? faker.number.int({ min: 7, max: 10 }) : jsonData.NPS,
  };

  if (breakAfter) {
    processedData.breakAfter = breakAfter;
  }
  const parsedData = incidentServiceSchema.parse(processedData);
  // Validate the processed data
  return parsedData;
}
