import { z } from "zod";
import { GenericAttributeFunctionalProfile, GenericAttributeListFunctionalProfile } from "@/models";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * Generic Attribute List validation schemas and validators
 */

// Generic Attribute Schema (single attribute)
export const genericAttributeFunctionalProfileSchema = z.object({
  name: z.string({ message: "Name is required" }).min(1, "Name cannot be empty"),
});

// Generic Attribute List Schema
// genericAttributeListElement has minOccurs="1" maxOccurs="unbounded" in XSD
export const genericAttributeListFunctionalProfileSchema = z.object({
  genericAttributeListElement: z
    .array(genericAttributeFunctionalProfileSchema)
    .min(1, "At least one generic attribute list element is required"),
});

// Type exports for TypeScript inference
export type GenericAttributeFunctionalProfileInput = z.input<typeof genericAttributeFunctionalProfileSchema>;
export type GenericAttributeListFunctionalProfileInput = z.input<typeof genericAttributeListFunctionalProfileSchema>;

// Validators
export function validateGenericAttribute(
  attribute: GenericAttributeFunctionalProfile
): ValidationResult<GenericAttributeFunctionalProfile> {
  const result = validateWithSchema(genericAttributeFunctionalProfileSchema, attribute);
  return result as ValidationResult<GenericAttributeFunctionalProfile>;
}

export function validateGenericAttributeList(
  attributeList: GenericAttributeListFunctionalProfile
): ValidationResult<GenericAttributeListFunctionalProfile> {
  const result = validateWithSchema(genericAttributeListFunctionalProfileSchema, attributeList);
  return result as ValidationResult<GenericAttributeListFunctionalProfile>;
}
