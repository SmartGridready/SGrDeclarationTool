import { BitmapProduct, BitmapEntryProduct } from "@/models";
import {
  setOptionalXmlField,
  wrapInArray,
} from "@/sections/shared/utils/builder-utils";

/**
 * Builds XML object for bitmap dataType from BitmapProduct model (for parameterList)
 */
export function buildBitmapProductDataType(
  bitmap: BitmapProduct
): Record<string, unknown> {
  return {
    bitmapEntry: bitmap.bitmapEntry.map((entry) =>
      buildBitmapProductEntry(entry)
    ),
  };
}

/**
 * Builds XML object for bitmapEntry from BitmapEntryProduct model
 */
function buildBitmapProductEntry(
  entry: BitmapEntryProduct
): Record<string, unknown> {
  const entryXml: Record<string, unknown> = {
    literal: wrapInArray(entry.literal),
    hexMask: wrapInArray(entry.hexMask), // Required for Product
  };

  // Add optional description
  setOptionalXmlField(entryXml, "description", entry.description);

  return entryXml;
}
