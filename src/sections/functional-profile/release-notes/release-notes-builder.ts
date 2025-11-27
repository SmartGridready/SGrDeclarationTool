import { ReleaseNotes, ChangeLog } from "@/models";
import {
  validateChangeLog,
  validateReleaseNotes,
} from "@/sections/functional-profile/release-notes/release-notes-validator";

/**
 * Builds XML object for releaseNotes from ReleaseNotes model
 * @throws Error if required fields are missing
 */
export function buildReleaseNotes(releaseNotes: ReleaseNotes): any {
  // Validate using validation layer
  const validation = validateReleaseNotes(releaseNotes);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    // Zod always provides error messages, so this should always be defined
    const errorMessage =
      firstError?.message || "Validation failed for release notes";
    throw new Error(errorMessage);
  }

  const releaseNotesXml: any = {
    state: [releaseNotes.state],
  };

  if (releaseNotes.remarks) {
    releaseNotesXml.remarks = [releaseNotes.remarks];
  }

  if (releaseNotes.changeLog && releaseNotes.changeLog.length > 0) {
    releaseNotesXml.changeLog = releaseNotes.changeLog.map((entry) =>
      buildChangeLogEntry(entry)
    );
  }

  return releaseNotesXml;
}

/**
 * Builds XML object for changeLog from ChangeLog model
 * @throws Error if required fields are missing
 */
function buildChangeLogEntry(entry: ChangeLog): any {
  // Validate using validation layer
  const validation = validateChangeLog(entry);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    // Zod always provides error messages, so this should always be defined
    const errorMessage =
      firstError?.message || "Validation failed for change log entry";
    throw new Error(errorMessage);
  }

  return {
    version: [entry.version],
    date: [entry.date],
    author: [entry.author],
    comment: [entry.comment],
  };
}
