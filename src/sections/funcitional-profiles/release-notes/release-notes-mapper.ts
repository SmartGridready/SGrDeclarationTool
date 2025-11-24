import { ReleaseNotes, ChangeLog, ReleaseState } from "@/models";

/**
 * Maps XML releaseNotes to ReleaseNotes model
 */
export function mapReleaseNotes(releaseNotesXml: any): ReleaseNotes {
  const releaseNotes: ReleaseNotes = {
    state: (releaseNotesXml.state?.[0] as ReleaseState) || "Draft",
  };

  // Map optional remarks
  if (releaseNotesXml.remarks?.[0]) {
    releaseNotes.remarks = releaseNotesXml.remarks[0];
  }

  // Map optional changeLog
  if (releaseNotesXml.changeLog && Array.isArray(releaseNotesXml.changeLog)) {
    releaseNotes.changeLog = releaseNotesXml.changeLog.map((entry: any) =>
      mapChangeLogEntry(entry)
    );
  }

  return releaseNotes;
}

/**
 * Maps XML changeLog to ChangeLog model
 */
function mapChangeLogEntry(entryXml: any): ChangeLog {
  const entry: ChangeLog = {
    version: entryXml.version?.[0] || "",
    date: entryXml.date?.[0] || "",
    author: entryXml.author?.[0] || "",
    comment: entryXml.comment?.[0] || "",
  };

  return entry;
}
