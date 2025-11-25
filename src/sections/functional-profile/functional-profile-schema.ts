import { z } from "zod";
import {
  releaseNotesSchema,
  changeLogSchema,
} from "@/sections/functional-profile/release-notes/release-notes-schema";
import {
  functionalProfileIdentificationSchema,
  versionNumberSchema,
} from "@/sections/functional-profile/profile-identification/profile-identification-schema";
import { alternativeNamesSchema } from "@/sections/functional-profile/alternative-names/alternative-names-schema";
import { legibleDescriptionsSchema } from "@/sections/functional-profile/legible-description/legible-description-schema";

/**
 * Main validation schemas for Functional Profile models
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
});

// Re-export schemas for convenience
export {
  versionNumberSchema,
  changeLogSchema,
  releaseNotesSchema,
  functionalProfileIdentificationSchema,
  alternativeNamesSchema,
  legibleDescriptionsSchema,
};

// Re-export types for TypeScript inference
export type { VersionNumberInput } from "@/sections/functional-profile/profile-identification/profile-identification-schema";
export type {
  ChangeLogInput,
  ReleaseNotesInput,
} from "@/sections/functional-profile/release-notes/release-notes-schema";
export type { FunctionalProfileIdentificationInput } from "@/sections/functional-profile/profile-identification/profile-identification-schema";
export type { AlternativeNamesInput } from "@/sections/functional-profile/alternative-names/alternative-names-schema";
export type { LegibleDescriptionsInput } from "@/sections/functional-profile/legible-description/legible-description-schema";
export type FunctionalProfileFrameInput = z.input<
  typeof functionalProfileFrameSchema
>;
