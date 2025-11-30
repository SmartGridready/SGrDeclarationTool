import { EnumMapFunctionalProfile, EnumEntryRecordFunctionalProfile } from "@/models";
import {
  setOptionalXmlField,
  setOptionalXmlArray,
  wrapInArray,
} from "@/sections/shared/utils/builder-utils";

/**
 * Builds XML object for enum dataType from EnumMapFunctionalProfile model
 */
export function buildEnumDataType(enumMap: EnumMapFunctionalProfile): Record<string, unknown> {
  const enumXml: Record<string, unknown> = {};

  // Add optional hexMask
  setOptionalXmlField(enumXml, "hexMask", enumMap.hexMask);

  // Add optional enumEntry array
  setOptionalXmlArray(
    enumXml,
    "enumEntry",
    enumMap.enumEntry?.map((entry) => buildEnumEntry(entry))
  );

  return enumXml;
}

/**
 * Builds XML object for enumEntry from EnumEntryRecordFunctionalProfile model
 */
function buildEnumEntry(entry: EnumEntryRecordFunctionalProfile): Record<string, unknown> {
  const entryXml: Record<string, unknown> = {
    literal: wrapInArray(entry.literal),
  };

  // Add optional description
  setOptionalXmlField(entryXml, "description", entry.description);

  return entryXml;
}
