import { EnumMapProduct, EnumEntryProductRecord } from "@/models";

/**
 * Maps XML enum dataType to EnumMapProduct model (for parameterList)
 */
export function mapEnumProductDataType(enumXml: any): EnumMapProduct {
  const enumMap: EnumMapProduct = {
    enumEntry: [],
  };

  // Map optional hexMask
  if (enumXml.hexMask?.[0]) {
    enumMap.hexMask = enumXml.hexMask[0];
  }

  // Map enumEntry array (required for Product)
  if (enumXml.enumEntry && Array.isArray(enumXml.enumEntry)) {
    enumMap.enumEntry = enumXml.enumEntry.map((entry: any) =>
      mapEnumProductEntry(entry)
    );
  }

  return enumMap;
}

/**
 * Maps XML enumEntry to EnumEntryProductRecord model
 */
function mapEnumProductEntry(entryXml: any): EnumEntryProductRecord {
  const entry: EnumEntryProductRecord = {
    literal: entryXml.literal?.[0] || "",
  };

  // Map optional ordinal
  if (entryXml.ordinal?.[0]) {
    entry.ordinal = parseInt(entryXml.ordinal[0], 10);
  }

  // Map optional description
  if (entryXml.description?.[0]) {
    entry.description = entryXml.description[0];
  }

  return entry;
}
