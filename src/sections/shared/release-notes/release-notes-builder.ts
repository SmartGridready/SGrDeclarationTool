import { ReleaseNotes, ChangeLog } from "@/models";
import {
  validateChangeLog,
  validateReleaseNotes,
} from "@/sections/shared/release-notes/release-notes-schema";
import { wrapInArray, setOptionalXmlField, setOptionalXmlArray } from "@/utils/builder-utils";

/**
 * Builds XML object for releaseNotes from ReleaseNotes model
 * @throws Error if required fields are missing
 */
export function buildReleaseNotes(releaseNotes: ReleaseNotes): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateReleaseNotes(releaseNotes);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    // Zod always provides error messages, so this should always be defined
    const errorMessage = firstError?.message || "Validation failed for release notes";
    throw new Error(errorMessage);
  }

  const releaseNotesXml: Record<string, unknown> = {
    state: wrapInArray(releaseNotes.state),
  };

  // Add optional remarks
  setOptionalXmlField(releaseNotesXml, "remarks", releaseNotes.remarks);

  // Add optional changeLog array
  setOptionalXmlArray(
    releaseNotesXml,
    "changeLog",
    releaseNotes.changeLog?.map((entry) => buildChangeLogEntry(entry))
  );

  return releaseNotesXml;
}

/**
 * Builds XML object for changeLog from ChangeLog model
 * @throws Error if required fields are missing
 */
function buildChangeLogEntry(entry: ChangeLog): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateChangeLog(entry);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    // Zod always provides error messages, so this should always be defined
    const errorMessage = firstError?.message || "Validation failed for change log entry";
    throw new Error(errorMessage);
  }

  return {
    version: wrapInArray(entry.version),
    date: wrapInArray(entry.date),
    author: wrapInArray(entry.author),
    comment: wrapInArray(entry.comment),
  };
}
