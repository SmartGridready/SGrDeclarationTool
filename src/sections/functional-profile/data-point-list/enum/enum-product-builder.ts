import { EnumMapProduct, EnumEntryProductRecord } from "@/models";
import { setOptionalXmlField, wrapInArray } from "@/sections/shared/utils/builder-utils";

/**
 * Builds XML object for enum dataType from EnumMapProduct model (for parameterList)
 */
export function buildEnumProductDataType(enumMap: EnumMapProduct): Record<string, unknown> {
  const enumXml: Record<string, unknown> = {
    enumEntry: enumMap.enumEntry.map((entry) => buildEnumProductEntry(entry)),
  };

  // Add optional hexMask
  setOptionalXmlField(enumXml, "hexMask", enumMap.hexMask);

  return enumXml;
}

/**
 * Builds XML object for enumEntry from EnumEntryProductRecord model
 */
function buildEnumProductEntry(entry: EnumEntryProductRecord): Record<string, unknown> {
  const entryXml: Record<string, unknown> = {
    literal: wrapInArray(entry.literal),
  };

  // Add optional ordinal
  if (entry.ordinal !== undefined) {
    entryXml.ordinal = wrapInArray(entry.ordinal.toString());
  }

  // Add optional description
  setOptionalXmlField(entryXml, "description", entry.description);

  return entryXml;
}
