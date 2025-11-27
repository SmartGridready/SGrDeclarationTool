import { BitmapProduct, BitmapEntryProduct } from "@/models";

/**
 * Maps XML bitmap dataType to BitmapProduct model (for parameterList)
 */
export function mapBitmapProductDataType(bitmapXml: any): BitmapProduct {
  const bitmap: BitmapProduct = {
    bitmapEntry: [],
  };

  // Map bitmapEntry array (required for Product)
  if (bitmapXml.bitmapEntry && Array.isArray(bitmapXml.bitmapEntry)) {
    bitmap.bitmapEntry = bitmapXml.bitmapEntry.map((entry: any) =>
      mapBitmapProductEntry(entry)
    );
  }

  return bitmap;
}

/**
 * Maps XML bitmapEntry to BitmapEntryProduct model
 */
function mapBitmapProductEntry(entryXml: any): BitmapEntryProduct {
  const entry: BitmapEntryProduct = {
    literal: entryXml.literal?.[0] || "",
    hexMask: entryXml.hexMask?.[0] || "", // Required for Product
  };

  // Map optional description
  if (entryXml.description?.[0]) {
    entry.description = entryXml.description[0];
  }

  return entry;
}
