import { ReleaseNotes, ChangeLog } from "@/lib/models";
import { ERROR_MESSAGES } from "@/lib/constants/error-messages";
import {
  validateChangeLog,
  validateReleaseNotes,
} from "@/lib/validation/validators/release-notes-validator";

/**
 * Builds XML object for releaseNotes from ReleaseNotes model
 * @throws Error if required fields are missing
 */
export function buildReleaseNotes(releaseNotes: ReleaseNotes): any {
  // Validate using validation layer
  const validation = validateReleaseNotes(releaseNotes);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage =
      firstError?.message || ERROR_MESSAGES.RELEASE_NOTES.MISSING_STATE;
    throw new Error(errorMessage);
  }

  const releaseNotesXml: any = {
    state: [releaseNotes.state],
  };

  if (releaseNotes.remarks) {
    releaseNotesXml.remarks = [releaseNotes.remarks];
  }

  if (releaseNotes.changeLog && releaseNotes.changeLog.length > 0) {
    releaseNotesXml.changeLog = [
      {
        changeLogEntry: releaseNotes.changeLog.map((entry) =>
          buildChangeLogEntry(entry)
        ),
      },
    ];
  }

  return releaseNotesXml;
}

/**
 * Builds XML object for changeLogEntry from ChangeLog model
 * @throws Error if required fields are missing
 */
function buildChangeLogEntry(entry: ChangeLog): any {
  // Validate using validation layer
  const validation = validateChangeLog(entry);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage =
      firstError?.message || ERROR_MESSAGES.CHANGE_LOG.MISSING_VERSION;
    throw new Error(errorMessage);
  }

  return {
    version: [entry.version],
    date: [entry.date],
    author: [entry.author],
    comment: [entry.comment],
  };
}
