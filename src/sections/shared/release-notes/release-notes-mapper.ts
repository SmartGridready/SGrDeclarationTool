import { ReleaseNotes, ChangeLog, ReleaseState } from "@/models";
import {
  getTypedValue,
  getOptionalStringValue,
  mapOptionalArray,
  getStringValue,
  setOptionalField,
  Xml2JsObject,
} from "@/utils/mapper-utils";

/**
 * Maps XML releaseNotes to ReleaseNotes model
 */
export function mapReleaseNotes(releaseNotesXml: Xml2JsObject | undefined): ReleaseNotes {
  const releaseNotes: ReleaseNotes = {
    state: getTypedValue<ReleaseState>(releaseNotesXml, "state", "Draft"),
  };

  // Map optional fields
  setOptionalField(releaseNotes, "remarks", getOptionalStringValue(releaseNotesXml, "remarks"));
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
function mapChangeLogEntry(entryXml: Xml2JsObject | undefined): ChangeLog {
  return {
    version: getStringValue(entryXml, "version"),
    date: getStringValue(entryXml, "date"),
    author: getStringValue(entryXml, "author"),
    comment: getStringValue(entryXml, "comment"),
  };
}
