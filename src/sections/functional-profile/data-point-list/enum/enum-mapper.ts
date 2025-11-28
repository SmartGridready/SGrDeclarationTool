import { EnumMapFunctionalProfile, EnumEntryRecordFunctionalProfile } from "@/models";
import {
  getOptionalStringValue,
  mapOptionalArray,
  getStringValue,
  setOptionalField,
} from "@/sections/shared/utils/mapper-utils";

/**
 * Maps XML enum dataType to EnumMapFunctionalProfile model
 */
export function mapEnumDataType(enumXml: any): EnumMapFunctionalProfile {
  const enumMap: EnumMapFunctionalProfile = {};

  // Map optional fields
  setOptionalField(enumMap, "hexMask", getOptionalStringValue(enumXml, "hexMask"));
  setOptionalField(enumMap, "enumEntry", mapOptionalArray(enumXml, "enumEntry", mapEnumEntry));

  return enumMap;
}

/**
 * Maps XML enumEntry to EnumEntryRecordFunctionalProfile model
 */
function mapEnumEntry(entryXml: any): EnumEntryRecordFunctionalProfile {
  const entry: EnumEntryRecordFunctionalProfile = {
    literal: getStringValue(entryXml, "literal"),
  };

  // Map optional description
  setOptionalField(entry, "description", getOptionalStringValue(entryXml, "description"));

  return entry;
}
