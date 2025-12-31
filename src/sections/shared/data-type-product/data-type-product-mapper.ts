import { DataTypeProduct, EnumMapProduct, EnumEntryProductRecord, BitmapProduct, BitmapEntryProduct } from "@/models";
import {
  getStringValue,
  getOptionalStringValue,
  getOptionalNumberValue,
  mapArray,
  mapSimpleDataType,
  getFirstElement,
  setOptionalField,
  Xml2JsObject,
} from "@/utils/mapper-utils";

/**
 * Maps XML dataType to DataTypeProduct
 * The XML structure uses nested elements like <float64 /> instead of a string value
 */
export function mapDataTypeProduct(dataTypeXml: Xml2JsObject | undefined): DataTypeProduct {
  if (!dataTypeXml) {
    return { float64: {} };
  }

  // Check for enum, bitmap, or json first
  const enumXml = getFirstElement(dataTypeXml, "enum");
  if (enumXml) {
    return { enum: mapEnumProductDataType(enumXml) };
  }

  const bitmapXml = getFirstElement(dataTypeXml, "bitmap");
  if (bitmapXml) {
    return { bitmap: mapBitmapProductDataType(bitmapXml) };
  }

  // Check for json - it can be an empty element <json />
  // Empty elements are represented as arrays by xml2js (explicitArray: true)
  // So we check if the field exists (even if it's an empty array)
  if (dataTypeXml.json !== undefined) {
    // For DataTypeProduct, json is just an empty string
    return { json: "" };
  }

  // Map simple data types
  const typeMap: Record<string, DataTypeProduct> = {
    boolean: { boolean: {} },
    int8: { int8: {} },
    int16: { int16: {} },
    int32: { int32: {} },
    int64: { int64: {} },
    int8U: { int8U: {} },
    int16U: { int16U: {} },
    int32U: { int32U: {} },
    int64U: { int64U: {} },
    float32: { float32: {} },
    float64: { float64: {} },
    dateTime: { dateTime: {} },
    string: { string: {} },
  };

  return mapSimpleDataType(dataTypeXml, typeMap, { float64: {} });
}

/**
 * Maps XML enum dataType to EnumMapProduct model
 */
export function mapEnumProductDataType(enumXml: Xml2JsObject): EnumMapProduct {
  const enumMap: EnumMapProduct = {
    enumEntry: mapArray(enumXml, "enumEntry", mapEnumProductEntry),
  };

  // Map optional hexMask
  setOptionalField(enumMap, "hexMask", getOptionalStringValue(enumXml, "hexMask"));

  return enumMap;
}

/**
 * Maps XML enumEntry to EnumEntryProductRecord model
 */
export function mapEnumProductEntry(entryXml: Xml2JsObject): EnumEntryProductRecord {
  const entry: EnumEntryProductRecord = {
    literal: getStringValue(entryXml, "literal"),
  };

  // Map optional fields
  setOptionalField(entry, "ordinal", getOptionalNumberValue(entryXml, "ordinal"));
  setOptionalField(entry, "description", getOptionalStringValue(entryXml, "description"));

  return entry;
}

/**
 * Maps XML bitmap dataType to BitmapProduct model
 */
export function mapBitmapProductDataType(bitmapXml: Xml2JsObject): BitmapProduct {
  return {
    bitmapEntry: mapArray(bitmapXml, "bitmapEntry", mapBitmapProductEntry),
  };
}

/**
 * Maps XML bitmapEntry to BitmapEntryProduct model
 */
export function mapBitmapProductEntry(entryXml: Xml2JsObject): BitmapEntryProduct {
  const entry: BitmapEntryProduct = {
    literal: getStringValue(entryXml, "literal"),
    hexMask: getStringValue(entryXml, "hexMask"), // Required for Product
  };

  // Map optional description
  setOptionalField(entry, "description", getOptionalStringValue(entryXml, "description"));

  return entry;
}
