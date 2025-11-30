import { ReleaseNotes, ChangeLog, ReleaseState } from "@/models";
import {
  getTypedValue,
  getOptionalStringValue,
  mapOptionalArray,
  getStringValue,
  setOptionalField,
  Xml2JsObject,
} from "@/sections/shared/utils/mapper-utils";

/**
 * Maps XML releaseNotes to ReleaseNotes model
 */
export function mapReleaseNotes(releaseNotesXml: unknown): ReleaseNotes {
  const xml = releaseNotesXml as Xml2JsObject | undefined;
  const releaseNotes: ReleaseNotes = {
    state: getTypedValue<ReleaseState>(xml, "state", "Draft"),
  };

  // Map optional fields
  setOptionalField(releaseNotes, "remarks", getOptionalStringValue(xml, "remarks"));
  setOptionalField(
    releaseNotes,
    "changeLog",
    mapOptionalArray(xml, "changeLog", mapChangeLogEntry)
  );

  return releaseNotes;
}

/**
 * Maps XML changeLog to ChangeLog model
 */
function mapChangeLogEntry(entryXml: unknown): ChangeLog {
  const xml = entryXml as Xml2JsObject | undefined;
  return {
    version: getStringValue(xml, "version"),
    date: getStringValue(xml, "date"),
    author: getStringValue(xml, "author"),
    comment: getStringValue(xml, "comment"),
  };
}
