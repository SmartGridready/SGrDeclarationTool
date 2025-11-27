import {
  EnumMapFunctionalProfile,
  EnumEntryRecordFunctionalProfile,
} from "@/models";

/**
 * Maps XML enum dataType to EnumMapFunctionalProfile model
 */
export function mapEnumDataType(enumXml: any): EnumMapFunctionalProfile {
  const enumMap: EnumMapFunctionalProfile = {};

  // Map optional hexMask
  if (enumXml.hexMask?.[0]) {
    enumMap.hexMask = enumXml.hexMask[0];
  }

  // Map optional enumEntry array
  if (enumXml.enumEntry && Array.isArray(enumXml.enumEntry)) {
    enumMap.enumEntry = enumXml.enumEntry.map((entry: any) =>
      mapEnumEntry(entry)
    );
  }

  return enumMap;
}

/**
 * Maps XML enumEntry to EnumEntryRecordFunctionalProfile model
 */
function mapEnumEntry(entryXml: any): EnumEntryRecordFunctionalProfile {
  const entry: EnumEntryRecordFunctionalProfile = {
    literal: entryXml.literal?.[0] || "",
  };

  // Map optional description
  if (entryXml.description?.[0]) {
    entry.description = entryXml.description[0];
  }

  return entry;
}
