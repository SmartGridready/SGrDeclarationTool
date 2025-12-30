import { z } from "zod";
import { ContactInterface } from "@/models/product/contact-interface";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { contactInterfaceDescriptionSchema } from "./interface-description/interface-description-schema";
import { contactFunctionalProfileListSchema } from "./functional-profile-list/contact-functional-profile-list-schema";

/**
 * Contact Interface validation schemas and validators
 */

export const contactInterfaceSchema = z.object({
  contactInterfaceDescription: contactInterfaceDescriptionSchema,
  functionalProfileList: contactFunctionalProfileListSchema,
});

// Type exports for TypeScript inference
export type ContactInterfaceInput = z.input<typeof contactInterfaceSchema>;

// Validators
export function validateContactInterface(
  contactInterface: ContactInterface
): ValidationResult<ContactInterface> {
  const result = validateWithSchema(contactInterfaceSchema, contactInterface);
  return result as ValidationResult<ContactInterface>;
}
