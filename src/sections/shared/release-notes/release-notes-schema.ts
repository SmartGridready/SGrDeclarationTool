import { z } from "zod";
import { ReleaseNotes, ChangeLog, RELEASE_STATE_VALUES } from "@/models";
import { ValidationResult, validateWithSchema } from "@/utils/validation-utils";

/**
 * Release Notes validation schemas and validators
 */

// Extract release state values from constants
const RELEASE_STATE_VALUES_ARRAY = RELEASE_STATE_VALUES as unknown as [string, ...string[]];

// Change Log Entry Schema
// Note: date is type="date" in XSD which requires ISO 8601 format (YYYY-MM-DD)
export const changeLogSchema = z.object({
  version: z.string({ message: "Version is required" }).min(1, "Version cannot be empty"),
  date: z
    .string({ message: "Date is required" })
    .min(1, "Date cannot be empty")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in ISO 8601 format (YYYY-MM-DD)"),
  author: z.string({ message: "Author is required" }).min(1, "Author cannot be empty"),
  comment: z.string({ message: "Comment is required" }).min(1, "Comment cannot be empty"),
});

// Release Notes Schema
export const releaseNotesSchema = z.object({
  state: z.enum(RELEASE_STATE_VALUES_ARRAY, {
    message: "Release state is required",
  }),
  remarks: z.string().optional(),
  changeLog: z.array(changeLogSchema).optional(),
});

// Type exports for TypeScript inference
export type ChangeLogInput = z.input<typeof changeLogSchema>;
export type ReleaseNotesInput = z.input<typeof releaseNotesSchema>;

// Validators
export function validateReleaseNotes(releaseNotes: ReleaseNotes): ValidationResult<ReleaseNotes> {
  return validateWithSchema(releaseNotesSchema, releaseNotes) as ValidationResult<ReleaseNotes>;
}

export function validateChangeLog(changeLog: ChangeLog): ValidationResult<ChangeLog> {
  return validateWithSchema(changeLogSchema, changeLog) as ValidationResult<ChangeLog>;
}
