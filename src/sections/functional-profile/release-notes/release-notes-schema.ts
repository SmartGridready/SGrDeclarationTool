import { z } from "zod";
import { ReleaseNotes, ChangeLog } from "@/models";
import { RELEASE_STATE_OPTIONS } from "@/sections/functional-profile/release-notes/release-notes-form-options";
import { ValidationResult, validateWithSchema } from "@/sections/shared/utils/validation-utils";

/**
 * Release Notes validation schemas and validators
 */

// Extract release state values from constants
const RELEASE_STATE_VALUES = RELEASE_STATE_OPTIONS.map((option) => option.value) as [
  string,
  ...string[],
];

// Change Log Entry Schema
export const changeLogSchema = z.object({
  version: z.string({ message: "Version is required" }).min(1, "Version cannot be empty"),
  date: z.string({ message: "Date is required" }).min(1, "Date cannot be empty"),
  author: z.string({ message: "Author is required" }).min(1, "Author cannot be empty"),
  comment: z.string({ message: "Comment is required" }).min(1, "Comment cannot be empty"),
});

// Release Notes Schema
export const releaseNotesSchema = z.object({
  state: z.enum(RELEASE_STATE_VALUES, {
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
