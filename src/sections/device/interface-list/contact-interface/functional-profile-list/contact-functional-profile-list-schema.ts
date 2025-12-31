import { z } from "zod";
import { ContactFunctionalProfileList, ContactFunctionalProfile } from "@/models/product/contact-interface";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { functionalProfileBaseSchema } from "@/sections/shared/functional-profile-base/functional-profile-base-schema";
import { contactDataPointListSchema } from "./data-point-list/contact-data-point-list-schema";

/**
 * Contact Functional Profile List validation schemas and validators
 */

// Contact Functional Profile Schema (extends FunctionalProfileBase)
export const contactFunctionalProfileSchema = functionalProfileBaseSchema.extend({
  dataPointList: contactDataPointListSchema,
});

// Contact Functional Profile List Schema
export const contactFunctionalProfileListSchema = z.object({
  functionalProfileListElement: z.array(contactFunctionalProfileSchema),
});

// Type exports for TypeScript inference
export type ContactFunctionalProfileInput = z.input<typeof contactFunctionalProfileSchema>;
export type ContactFunctionalProfileListInput = z.input<typeof contactFunctionalProfileListSchema>;

// Validators
export function validateContactFunctionalProfile(
  functionalProfile: ContactFunctionalProfile
): ValidationResult<ContactFunctionalProfile> {
  const result = validateWithSchema(contactFunctionalProfileSchema, functionalProfile);
  return result as ValidationResult<ContactFunctionalProfile>;
}

export function validateContactFunctionalProfileList(
  functionalProfileList: ContactFunctionalProfileList
): ValidationResult<ContactFunctionalProfileList> {
  const result = validateWithSchema(contactFunctionalProfileListSchema, functionalProfileList);
  return result as ValidationResult<ContactFunctionalProfileList>;
}
