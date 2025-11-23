import { z } from "zod";
import {
  releaseNotesSchema,
  changeLogSchema,
} from "./schemas/release-notes-schema";
import {
  functionalProfileIdentificationSchema,
  versionNumberSchema,
} from "./schemas/profile-identification-schema";

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
export type { VersionNumberInput } from "./schemas/profile-identification-schema";
export type {
  ChangeLogInput,
  ReleaseNotesInput,
} from "./schemas/release-notes-schema";
export type { FunctionalProfileIdentificationInput } from "./schemas/profile-identification-schema";
export type FunctionalProfileFrameInput = z.input<
  typeof functionalProfileFrameSchema
>;
