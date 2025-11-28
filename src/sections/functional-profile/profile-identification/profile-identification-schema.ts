import { z } from "zod";
import { FunctionalProfileIdentification, VersionNumber } from "@/models";
import {
  PROFILE_IDENTIFICATION_CATEGORY,
  LEVEL_OF_OPERATION,
} from "@/sections/functional-profile/profile-identification/profile-identification-form-options";
import { ValidationResult, validateWithSchema } from "@/sections/shared/utils/validation-utils";

/**
 * Profile Identification validation schemas and validators
 */

// Extract category values from constants
const FUNCTIONAL_PROFILE_CATEGORY_VALUES = PROFILE_IDENTIFICATION_CATEGORY.map(
  (option) => option.value
) as [string, ...string[]];

// Extract level of operation values from constants
const LEVEL_OF_OPERATION_VALUES = LEVEL_OF_OPERATION.map((option) => option.value) as [
  string,
  ...string[],
];

// Version Number Schema
export const versionNumberSchema = z.object({
  primaryVersionNumber: z
    .number({ message: "Primary version number is required" })
    .int("Primary version number must be an integer"),
  secondaryVersionNumber: z
    .number({ message: "Secondary version number is required" })
    .int("Secondary version number must be an integer"),
  subReleaseVersionNumber: z
    .number({ message: "Sub release version number is required" })
    .int("Sub release version number must be an integer"),
});

// Functional Profile Identification Schema
export const functionalProfileIdentificationSchema = z.object({
  specificationOwnerIdentification: z
    .string({ message: "Specification owner identification is required" })
    .min(1, "Specification owner identification cannot be empty"),
  functionalProfileCategory: z.enum(FUNCTIONAL_PROFILE_CATEGORY_VALUES, {
    message: "Functional profile category is required",
  }),
  functionalProfileType: z
    .string({ message: "Functional profile type is required" })
    .min(1, "Functional profile type cannot be empty"),
  levelOfOperation: z.enum(LEVEL_OF_OPERATION_VALUES, {
    message: "Level of operation is required",
  }),
  versionNumber: versionNumberSchema,
});

// Type exports for TypeScript inference
export type VersionNumberInput = z.input<typeof versionNumberSchema>;
export type FunctionalProfileIdentificationInput = z.input<
  typeof functionalProfileIdentificationSchema
>;

// Validators
export function validateFunctionalProfileIdentification(
  identification: FunctionalProfileIdentification
): ValidationResult<FunctionalProfileIdentification> {
  const result = validateWithSchema(functionalProfileIdentificationSchema, identification);
  return result as ValidationResult<FunctionalProfileIdentification>;
}

export function validateVersionNumber(
  versionNumber: VersionNumber
): ValidationResult<VersionNumber> {
  const result = validateWithSchema(versionNumberSchema, versionNumber);
  return result as ValidationResult<VersionNumber>;
}
