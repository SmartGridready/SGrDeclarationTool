import { z } from "zod";
import { GenericFunctionalProfileList, GenericFunctionalProfile } from "@/models/product/generic-interface";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { functionalProfileBaseSchema } from "@/sections/shared/functional-profile-base/functional-profile-base-schema";
import { genericDataPointListSchema } from "./data-point-list/generic-data-point-list-schema";

/**
 * Generic Functional Profile List validation schemas and validators
 */

// Generic Functional Profile Schema (extends FunctionalProfileBase)
export const genericFunctionalProfileSchema = functionalProfileBaseSchema.extend({
  dataPointList: genericDataPointListSchema,
});

// Generic Functional Profile List Schema
export const genericFunctionalProfileListSchema = z.object({
  functionalProfileListElement: z.array(genericFunctionalProfileSchema),
});

// Type exports for TypeScript inference
export type GenericFunctionalProfileInput = z.input<typeof genericFunctionalProfileSchema>;
export type GenericFunctionalProfileListInput = z.input<typeof genericFunctionalProfileListSchema>;

// Validators
export function validateGenericFunctionalProfile(
  functionalProfile: GenericFunctionalProfile
): ValidationResult<GenericFunctionalProfile> {
  const result = validateWithSchema(genericFunctionalProfileSchema, functionalProfile);
  return result as ValidationResult<GenericFunctionalProfile>;
}

export function validateGenericFunctionalProfileList(
  functionalProfileList: GenericFunctionalProfileList
): ValidationResult<GenericFunctionalProfileList> {
  const result = validateWithSchema(genericFunctionalProfileListSchema, functionalProfileList);
  return result as ValidationResult<GenericFunctionalProfileList>;
}
