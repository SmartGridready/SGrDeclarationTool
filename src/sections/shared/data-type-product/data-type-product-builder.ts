import {
  DataTypeProduct,
  EnumMapProduct,
  EnumEntryProductRecord,
  BitmapProduct,
  BitmapEntryProduct,
} from "@/models";
import { wrapInArray, setOptionalXmlField, buildSimpleDataType } from "@/utils/builder-utils";

/**
 * Builds XML dataType element for DataTypeProduct
 * The XML structure uses nested elements like <float64 /> instead of a string value
 */
export function buildDataTypeProduct(dataType: DataTypeProduct): Record<string, unknown> {
  // Check for enum, bitmap, or json first
  if ("enum" in dataType) {
    return { enum: wrapInArray(buildEnumProductDataType(dataType.enum)) };
  }

  if ("bitmap" in dataType) {
    return { bitmap: wrapInArray(buildBitmapProductDataType(dataType.bitmap)) };
  }

  if ("json" in dataType) {
    return { json: wrapInArray("") };
  }

  // Build simple data types
  const typeMap: Record<string, string> = {
    boolean: "boolean",
    int8: "int8",
    int16: "int16",
    int32: "int32",
    int64: "int64",
    int8U: "int8U",
    int16U: "int16U",
    int32U: "int32U",
    int64U: "int64U",
    float32: "float32",
    float64: "float64",
    dateTime: "dateTime",
    string: "string",
  };

  for (const [key, typeName] of Object.entries(typeMap)) {
    if (key in dataType) {
      return buildSimpleDataType(typeName);
    }
  }

  // Default to float64
  return buildSimpleDataType("float64");
}

/**
 * Builds XML object for enum dataType from EnumMapProduct model
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
export function buildEnumProductEntry(entry: EnumEntryProductRecord): Record<string, unknown> {
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

/**
 * Builds XML object for bitmap dataType from BitmapProduct model
 */
export function buildBitmapProductDataType(bitmap: BitmapProduct): Record<string, unknown> {
  return {
    bitmapEntry: bitmap.bitmapEntry.map((entry) => buildBitmapProductEntry(entry)),
  };
}

/**
 * Builds XML object for bitmapEntry from BitmapEntryProduct model
 */
export function buildBitmapProductEntry(entry: BitmapEntryProduct): Record<string, unknown> {
  const entryXml: Record<string, unknown> = {
    literal: wrapInArray(entry.literal),
    hexMask: wrapInArray(entry.hexMask), // Required for Product
  };

  // Add optional description
  setOptionalXmlField(entryXml, "description", entry.description);

  return entryXml;
}
