import { z } from "zod";
import { RestApiFunctionalProfileList, RestApiFunctionalProfile } from "@/models/product/rest-api-interface";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";
import { functionalProfileBaseSchema } from "@/sections/shared/functional-profile-base/functional-profile-base-schema";
import { restApiDataPointListSchema } from "./data-point-list/rest-api-data-point-list-schema";

/**
 * REST API Functional Profile List validation schemas and validators
 */

// REST API Functional Profile Schema (extends FunctionalProfileBase)
export const restApiFunctionalProfileSchema = functionalProfileBaseSchema.extend({
  dataPointList: restApiDataPointListSchema,
});

// REST API Functional Profile List Schema
export const restApiFunctionalProfileListSchema = z.object({
  functionalProfileListElement: z
    .array(restApiFunctionalProfileSchema)
    .min(1, "At least one functional profile is required"),
});

// Type exports for TypeScript inference
export type RestApiFunctionalProfileInput = z.input<typeof restApiFunctionalProfileSchema>;
export type RestApiFunctionalProfileListInput = z.input<typeof restApiFunctionalProfileListSchema>;

// Validators
export function validateRestApiFunctionalProfile(
  functionalProfile: RestApiFunctionalProfile
): ValidationResult<RestApiFunctionalProfile> {
  const result = validateWithSchema(restApiFunctionalProfileSchema, functionalProfile);
  return result as ValidationResult<RestApiFunctionalProfile>;
}

export function validateRestApiFunctionalProfileList(
  functionalProfileList: RestApiFunctionalProfileList
): ValidationResult<RestApiFunctionalProfileList> {
  const result = validateWithSchema(restApiFunctionalProfileListSchema, functionalProfileList);
  return result as ValidationResult<RestApiFunctionalProfileList>;
}
