import { z } from "zod";
import { GenericInterface } from "@/models/product/generic-interface";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { genericFunctionalProfileListSchema } from "./functional-profile-list/generic-functional-profile-list-schema";

/**
 * Generic Interface validation schemas and validators
 */

export const genericInterfaceSchema = z.object({
  functionalProfileList: genericFunctionalProfileListSchema,
});

// Type exports for TypeScript inference
export type GenericInterfaceInput = z.input<typeof genericInterfaceSchema>;

// Validators
export function validateGenericInterface(genericInterface: GenericInterface): ValidationResult<GenericInterface> {
  const result = validateWithSchema(genericInterfaceSchema, genericInterface);
  return result as ValidationResult<GenericInterface>;
}
