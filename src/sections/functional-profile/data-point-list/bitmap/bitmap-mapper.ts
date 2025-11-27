import {
  BitmapFunctionalProfile,
  BitmapEntryFunctionalProfile,
} from "@/models";

/**
 * Maps XML bitmap dataType to BitmapFunctionalProfile model
 */
export function mapBitmapDataType(bitmapXml: any): BitmapFunctionalProfile {
  const bitmap: BitmapFunctionalProfile = {};

  // Map optional bitmapEntry array
  if (bitmapXml.bitmapEntry && Array.isArray(bitmapXml.bitmapEntry)) {
    bitmap.bitmapEntry = bitmapXml.bitmapEntry.map((entry: any) =>
      mapBitmapEntry(entry)
    );
  }

  return bitmap;
}

/**
 * Maps XML bitmapEntry to BitmapEntryFunctionalProfile model
 */
function mapBitmapEntry(entryXml: any): BitmapEntryFunctionalProfile {
  const entry: BitmapEntryFunctionalProfile = {
    literal: entryXml.literal?.[0] || "",
  };

  // Map optional description
  if (entryXml.description?.[0]) {
    entry.description = entryXml.description[0];
  }

  return entry;
}
