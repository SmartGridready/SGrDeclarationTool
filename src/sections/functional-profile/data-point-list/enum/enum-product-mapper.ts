import { EnumMapProduct, EnumEntryProductRecord } from "@/models";
import {
  getOptionalStringValue,
  mapArray,
  getStringValue,
  getOptionalNumberValue,
  setOptionalField,
} from "@/sections/shared/utils/mapper-utils";

/**
 * Maps XML enum dataType to EnumMapProduct model (for parameterList)
 */
export function mapEnumProductDataType(enumXml: any): EnumMapProduct {
  const enumMap: EnumMapProduct = {
    enumEntry: mapArray(enumXml, "enumEntry", mapEnumProductEntry),
  };

  // Map optional hexMask
  setOptionalField(
    enumMap,
    "hexMask",
    getOptionalStringValue(enumXml, "hexMask")
  );

  return enumMap;
}

/**
 * Maps XML enumEntry to EnumEntryProductRecord model
 */
function mapEnumProductEntry(entryXml: any): EnumEntryProductRecord {
  const entry: EnumEntryProductRecord = {
    literal: getStringValue(entryXml, "literal"),
  };

  // Map optional fields
  setOptionalField(
    entry,
    "ordinal",
    getOptionalNumberValue(entryXml, "ordinal")
  );
  setOptionalField(
    entry,
    "description",
    getOptionalStringValue(entryXml, "description")
  );

  return entry;
}
