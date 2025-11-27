import { BitmapProduct, BitmapEntryProduct } from "@/models";
import {
  mapArray,
  getStringValue,
  getOptionalStringValue,
  setOptionalField,
} from "@/sections/shared/utils/mapper-utils";

/**
 * Maps XML bitmap dataType to BitmapProduct model (for parameterList)
 */
export function mapBitmapProductDataType(bitmapXml: any): BitmapProduct {
  return {
    bitmapEntry: mapArray(bitmapXml, "bitmapEntry", mapBitmapProductEntry),
  };
}

/**
 * Maps XML bitmapEntry to BitmapEntryProduct model
 */
function mapBitmapProductEntry(entryXml: any): BitmapEntryProduct {
  const entry: BitmapEntryProduct = {
    literal: getStringValue(entryXml, "literal"),
    hexMask: getStringValue(entryXml, "hexMask"), // Required for Product
  };

  // Map optional description
  setOptionalField(
    entry,
    "description",
    getOptionalStringValue(entryXml, "description")
  );

  return entry;
}
