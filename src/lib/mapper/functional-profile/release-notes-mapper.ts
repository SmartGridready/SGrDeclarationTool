import { ReleaseNotes, ChangeLog, ReleaseState } from "@/lib/models";

/**
 * Maps XML releaseNotes to ReleaseNotes model
 */
export function mapReleaseNotes(releaseNotesXml: any): ReleaseNotes {
  // State is required
  if (!releaseNotesXml.state || !Array.isArray(releaseNotesXml.state)) {
    throw new Error("ReleaseNotes must have a 'state' field");
  }

  const state = releaseNotesXml.state[0] as string;
  if (!isValidReleaseState(state)) {
    throw new Error(
      `Invalid release state: ${state}. Must be one of: Draft, Review, Published, Revoked`
    );
  }

  const releaseNotes: ReleaseNotes = {
    state: state as ReleaseState,
  };

  // Map optional remarks
  if (
    releaseNotesXml.remarks &&
    Array.isArray(releaseNotesXml.remarks) &&
    releaseNotesXml.remarks[0]
  ) {
    releaseNotes.remarks = releaseNotesXml.remarks[0];
  }

  // Map optional changeLog
  if (
    releaseNotesXml.changeLog &&
    Array.isArray(releaseNotesXml.changeLog) &&
    releaseNotesXml.changeLog[0] &&
    releaseNotesXml.changeLog[0].changeLogEntry
  ) {
    const changeLogEntries = releaseNotesXml.changeLog[0].changeLogEntry;
    releaseNotes.changeLog = changeLogEntries.map((entry: any) =>
      mapChangeLogEntry(entry)
    );
  }

  return releaseNotes;
}

/**
 * Maps XML changeLogEntry to ChangeLog model
 */
function mapChangeLogEntry(entryXml: any): ChangeLog {
  const entry: ChangeLog = {
    version: "",
    date: "",
    author: "",
    comment: "",
  };

  if (entryXml.version && Array.isArray(entryXml.version)) {
    entry.version = entryXml.version[0];
  } else {
    throw new Error("ChangeLogEntry must have a 'version' field");
  }

  if (entryXml.date && Array.isArray(entryXml.date)) {
    entry.date = entryXml.date[0];
  } else {
    throw new Error("ChangeLogEntry must have a 'date' field");
  }

  if (entryXml.author && Array.isArray(entryXml.author)) {
    entry.author = entryXml.author[0];
  } else {
    throw new Error("ChangeLogEntry must have an 'author' field");
  }

  if (entryXml.comment && Array.isArray(entryXml.comment)) {
    entry.comment = entryXml.comment[0];
  } else {
    throw new Error("ChangeLogEntry must have a 'comment' field");
  }

  return entry;
}

/**
 * Validates if a string is a valid ReleaseState
 */
function isValidReleaseState(state: string): state is ReleaseState {
  return ["Draft", "Review", "Published", "Revoked"].includes(state);
}
