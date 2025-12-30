import { z } from "zod";
import { ContactInterfaceDescription } from "@/models/product/contact-interface";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * Contact Interface Description validation schemas and validators
 */

export const contactInterfaceDescriptionSchema = z.object({
  numberOfContacts: z
    .number({ message: "Number of contacts is required" })
    .int("Number of contacts must be an integer")
    .positive("Number of contacts must be positive"),
  contactStabilisationTimeMs: z
    .number({ message: "Contact stabilisation time is required" })
    .int("Contact stabilisation time must be an integer")
    .nonnegative("Contact stabilisation time must be non-negative"),
});

// Type exports for TypeScript inference
export type ContactInterfaceDescriptionInput = z.input<typeof contactInterfaceDescriptionSchema>;

// Validators
export function validateContactInterfaceDescription(
  description: ContactInterfaceDescription
): ValidationResult<ContactInterfaceDescription> {
  const result = validateWithSchema(contactInterfaceDescriptionSchema, description);
  return result as ValidationResult<ContactInterfaceDescription>;
}
