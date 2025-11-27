import { ReleaseNotes, ChangeLog, ReleaseState } from "@/models";
import {
  getTypedValue,
  getOptionalStringValue,
  mapOptionalArray,
  getStringValue,
  setOptionalField,
} from "@/sections/shared/utils/mapper-utils";

/**
 * Maps XML releaseNotes to ReleaseNotes model
 */
export function mapReleaseNotes(releaseNotesXml: any): ReleaseNotes {
  const releaseNotes: ReleaseNotes = {
    state: getTypedValue<ReleaseState>(releaseNotesXml, "state", "Draft"),
  };

  // Map optional fields
  setOptionalField(
    releaseNotes,
    "remarks",
    getOptionalStringValue(releaseNotesXml, "remarks")
  );
  setOptionalField(
    releaseNotes,
    "changeLog",
    mapOptionalArray(releaseNotesXml, "changeLog", mapChangeLogEntry)
  );

  return releaseNotes;
}

/**
 * Maps XML changeLog to ChangeLog model
 */
function mapChangeLogEntry(entryXml: any): ChangeLog {
  return {
    version: getStringValue(entryXml, "version"),
    date: getStringValue(entryXml, "date"),
    author: getStringValue(entryXml, "author"),
    comment: getStringValue(entryXml, "comment"),
  };
}
