import { ReleaseNotes, ChangeLog } from "@/lib/models";

/**
 * Builds XML object for releaseNotes from ReleaseNotes model
 */
export function buildReleaseNotes(releaseNotes: ReleaseNotes): any {
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
 */
function buildChangeLogEntry(entry: ChangeLog): any {
  return {
    version: [entry.version],
    date: [entry.date],
    author: [entry.author],
    comment: [entry.comment],
  };
}
