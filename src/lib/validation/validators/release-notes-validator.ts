import { ReleaseNotes, ChangeLog } from "@/lib/models";
import { releaseNotesSchema, changeLogSchema } from "../schemas";
import {
  ValidationResult,
  validateWithSchema,
} from "../../utils/validation-utils";

/**
 * Validates ReleaseNotes
 */
export function validateReleaseNotes(
  releaseNotes: ReleaseNotes
): ValidationResult<ReleaseNotes> {
  const result = validateWithSchema(releaseNotesSchema, releaseNotes);
  if (result.success && result.data) {
    return {
      ...result,
      data: result.data as ReleaseNotes,
    } as ValidationResult<ReleaseNotes>;
  }
  return result as ValidationResult<ReleaseNotes>;
}

/**
 * Validates ChangeLog
 */
export function validateChangeLog(
  changeLog: ChangeLog
): ValidationResult<ChangeLog> {
  const result = validateWithSchema(changeLogSchema, changeLog);
  if (result.success && result.data) {
    return {
      ...result,
      data: result.data as ChangeLog,
    } as ValidationResult<ChangeLog>;
  }
  return result as ValidationResult<ChangeLog>;
}
