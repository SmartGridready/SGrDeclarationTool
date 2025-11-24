import { z } from "zod";
import {
  PROFILE_IDENTIFICATION_CATEGORY,
  LEVEL_OF_OPERATION,
} from "./profile-identification-form-options";

/**
 * Profile Identification validation schemas
 */

// Extract category values from constants
const FUNCTIONAL_PROFILE_CATEGORY_VALUES = PROFILE_IDENTIFICATION_CATEGORY.map(
  (option) => option.value
) as [string, ...string[]];

// Extract level of operation values from constants
const LEVEL_OF_OPERATION_VALUES = LEVEL_OF_OPERATION.map(
  (option) => option.value
) as [string, ...string[]];

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
