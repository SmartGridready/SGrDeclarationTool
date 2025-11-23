import { ReleaseNotes, ChangeLog, ReleaseState } from "@/lib/models";

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
    version: entryXml.version?.[0] || "",
    date: entryXml.date?.[0] || "",
    author: entryXml.author?.[0] || "",
    comment: entryXml.comment?.[0] || "",
  };

  return entry;
}
