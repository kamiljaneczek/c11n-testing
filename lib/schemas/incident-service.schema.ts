import { z } from "zod";

export const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  country: z.string(),
});

export const contactInfoSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: addressSchema,
});

export const incidentServiceSchema = z.object({
  incidentType: z.string(),
  incidentSubType: z.string(),
  communicationMethod: z.string(),
  whatHappened: z.string(),
  whereHappened: z.string(),
  whenHappened: z.string(),
  contactInfo: contactInfoSchema,
  resolutionMethod: z.string(),
  eligibility: z.string(),
  customerSentiment: z.string(),
  NPS: z.union([z.number(), z.literal("$random")]),
  breakAfter: z.string(),
});

export type TIncidentService = z.infer<typeof incidentServiceSchema>; 