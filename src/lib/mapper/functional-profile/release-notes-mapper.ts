import { ReleaseNotes, ChangeLog, ReleaseState } from "@/lib/models";

/**
 * Maps XML releaseNotes to ReleaseNotes model
 */
export function mapReleaseNotes(releaseNotesXml: any): ReleaseNotes {
  // State is required
  if (!releaseNotesXml.state?.[0]) {
    throw new Error("ReleaseNotes must have a 'state' field");
  }

  const releaseNotes: ReleaseNotes = {
    state: releaseNotesXml.state[0] as ReleaseState,
  };

  // Map optional remarks
  if (releaseNotesXml.remarks?.[0]) {
    releaseNotes.remarks = releaseNotesXml.remarks[0];
  }

  // Map optional changeLog
  if (releaseNotesXml.changeLog?.[0]?.changeLogEntry) {
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

  if (!entryXml.version?.[0]) {
    throw new Error("ChangeLogEntry must have a 'version' field");
  }
  entry.version = entryXml.version[0];

  if (!entryXml.date?.[0]) {
    throw new Error("ChangeLogEntry must have a 'date' field");
  }
  entry.date = entryXml.date[0];

  if (!entryXml.author?.[0]) {
    throw new Error("ChangeLogEntry must have an 'author' field");
  }
  entry.author = entryXml.author[0];

  if (!entryXml.comment?.[0]) {
    throw new Error("ChangeLogEntry must have a 'comment' field");
  }
  entry.comment = entryXml.comment[0];

  return entry;
}
