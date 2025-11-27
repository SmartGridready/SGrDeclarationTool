import {
  BitmapFunctionalProfile,
  BitmapEntryFunctionalProfile,
} from "@/models";
import {
  setOptionalXmlField,
  setOptionalXmlArray,
  wrapInArray,
} from "@/sections/shared/utils/builder-utils";

/**
 * Builds XML object for bitmap dataType from BitmapFunctionalProfile model
 */
export function buildBitmapDataType(
  bitmap: BitmapFunctionalProfile
): Record<string, unknown> {
  const bitmapXml: Record<string, unknown> = {};

  // Add optional bitmapEntry array
  setOptionalXmlArray(
    bitmapXml,
    "bitmapEntry",
    bitmap.bitmapEntry?.map((entry) => buildBitmapEntry(entry))
  );

  return bitmapXml;
}

/**
 * Builds XML object for bitmapEntry from BitmapEntryFunctionalProfile model
 */
function buildBitmapEntry(
  entry: BitmapEntryFunctionalProfile
): Record<string, unknown> {
  const entryXml: Record<string, unknown> = {
    literal: wrapInArray(entry.literal),
  };

  // Add optional description
  setOptionalXmlField(entryXml, "description", entry.description);

  return entryXml;
}
