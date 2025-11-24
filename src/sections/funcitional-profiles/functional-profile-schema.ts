import { z } from "zod";
import {
  releaseNotesSchema,
  changeLogSchema,
} from "@/sections/funcitional-profiles/release-notes/release-notes-schema";
import {
  functionalProfileIdentificationSchema,
  versionNumberSchema,
} from "@/sections/funcitional-profiles/profile-identification/profile-identification-schema";

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
  }),
});

// Re-export schemas for convenience
export {
  versionNumberSchema,
  changeLogSchema,
  releaseNotesSchema,
  functionalProfileIdentificationSchema,
};

// Re-export types for TypeScript inference
export type { VersionNumberInput } from "@/sections/funcitional-profiles/profile-identification/profile-identification-schema";
export type {
  ChangeLogInput,
  ReleaseNotesInput,
} from "@/sections/funcitional-profiles/release-notes/release-notes-schema";
export type { FunctionalProfileIdentificationInput } from "@/sections/funcitional-profiles/profile-identification/profile-identification-schema";
export type FunctionalProfileFrameInput = z.input<
  typeof functionalProfileFrameSchema
>;
