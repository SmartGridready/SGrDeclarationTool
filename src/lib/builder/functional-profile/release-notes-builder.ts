import { ReleaseNotes, ChangeLog } from "@/lib/models";
import { ERROR_MESSAGES } from "@/lib/constants/error-messages";

/**
 * Builds XML object for releaseNotes from ReleaseNotes model
 * @throws Error if required fields are missing
 */
export function buildReleaseNotes(releaseNotes: ReleaseNotes): any {
  // Validate required fields
  if (!releaseNotes.state) {
    throw new Error(ERROR_MESSAGES.RELEASE_NOTES.MISSING_STATE);
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
  // Validate required fields
  if (!entry.version) {
    throw new Error(ERROR_MESSAGES.CHANGE_LOG.MISSING_VERSION);
  }
  if (!entry.date) {
    throw new Error(ERROR_MESSAGES.CHANGE_LOG.MISSING_DATE);
  }
  if (!entry.author) {
    throw new Error(ERROR_MESSAGES.CHANGE_LOG.MISSING_AUTHOR);
  }
  if (!entry.comment) {
    throw new Error(ERROR_MESSAGES.CHANGE_LOG.MISSING_COMMENT);
  }

  return {
    version: [entry.version],
    date: [entry.date],
    author: [entry.author],
    comment: [entry.comment],
  };
}
