import { z } from "zod";
import { FunctionalProfileFrame } from "@/models";
import {
  releaseNotesSchema,
  changeLogSchema,
} from "@/sections/shared/release-notes/release-notes-schema";
import {
  functionalProfileIdentificationSchema,
  versionNumberSchema,
} from "@/sections/shared/profile-identification/profile-identification-schema";
import { alternativeNamesSchema } from "@/sections/shared/alternative-names/alternative-names-schema";
import { legibleDescriptionsSchema } from "@/sections/shared/legible-description/legible-description-schema";
import { genericAttributeListFunctionalProfileSchema } from "@/sections/functional-profile/generic-attribute-list/generic-attribute-list-schema";
import { dataPointListSchema } from "@/sections/functional-profile/data-point-list/data-point-list-schema";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * Main validation schemas and validators for Functional Profile models
 * These schemas are used to validate data before export and provide
 * field-level error messages for form validation.
 */

// Functional Profile Frame Schema
export const functionalProfileFrameSchema = z.object({
  releaseNotes: releaseNotesSchema.optional(),
  functionalProfile: z.object({
    functionalProfileIdentification: functionalProfileIdentificationSchema,
    alternativeNames: alternativeNamesSchema.optional(),
    legibleDescription: legibleDescriptionsSchema.optional(),
  }),
  genericAttributeList: genericAttributeListFunctionalProfileSchema.optional(),
  dataPointList: dataPointListSchema.optional(),
});

// Re-export schemas for convenience
export {
  versionNumberSchema,
  changeLogSchema,
  releaseNotesSchema,
  functionalProfileIdentificationSchema,
  alternativeNamesSchema,
  legibleDescriptionsSchema,
  genericAttributeListFunctionalProfileSchema,
  dataPointListSchema,
};

// Re-export types for TypeScript inference
export type { VersionNumberInput } from "@/sections/shared/profile-identification/profile-identification-schema";
export type {
  ChangeLogInput,
  ReleaseNotesInput,
} from "@/sections/shared/release-notes/release-notes-schema";
export type { FunctionalProfileIdentificationInput } from "@/sections/shared/profile-identification/profile-identification-schema";
export type { AlternativeNamesInput } from "@/sections/shared/alternative-names/alternative-names-schema";
export type { LegibleDescriptionsInput } from "@/sections/shared/legible-description/legible-description-schema";
export type { GenericAttributeListFunctionalProfileInput } from "@/sections/functional-profile/generic-attribute-list/generic-attribute-list-schema";
export type { DataPointListInput } from "@/sections/functional-profile/data-point-list/data-point-list-schema";
export type FunctionalProfileFrameInput = z.input<typeof functionalProfileFrameSchema>;

// Validators
export function validateFunctionalProfileFrame(
  frame: FunctionalProfileFrame
): ValidationResult<FunctionalProfileFrame> {
  const result = validateWithSchema(functionalProfileFrameSchema, frame);
  return result as ValidationResult<FunctionalProfileFrame>;
}
