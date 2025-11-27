import {
  BitmapFunctionalProfile,
  BitmapEntryFunctionalProfile,
} from "@/models";
import {
  mapOptionalArray,
  getStringValue,
  getOptionalStringValue,
  setOptionalField,
} from "@/sections/shared/utils/mapper-utils";

/**
 * Maps XML bitmap dataType to BitmapFunctionalProfile model
 */
export function mapBitmapDataType(bitmapXml: any): BitmapFunctionalProfile {
  const bitmap: BitmapFunctionalProfile = {};

  // Map optional bitmapEntry array
  setOptionalField(
    bitmap,
    "bitmapEntry",
    mapOptionalArray(bitmapXml, "bitmapEntry", mapBitmapEntry)
  );

  return bitmap;
}

/**
 * Maps XML bitmapEntry to BitmapEntryFunctionalProfile model
 */
function mapBitmapEntry(entryXml: any): BitmapEntryFunctionalProfile {
  const entry: BitmapEntryFunctionalProfile = {
    literal: getStringValue(entryXml, "literal"),
  };

  // Map optional description
  setOptionalField(
    entry,
    "description",
    getOptionalStringValue(entryXml, "description")
  );

  return entry;
}
