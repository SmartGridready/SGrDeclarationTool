/**
 * Shared utilities for working with DataTypeProduct
 * Used in both ParameterList (functional profiles) and ConfigurationList (devices)
 */

import { DataTypeProduct, EnumMapProduct, BitmapProduct, DataTypeChoice } from "@/models";

/**
 * Type guard to check if a DataTypeProduct is an enum type
 */
export function isEnumDataTypeProduct(
  dataType: DataTypeProduct
): dataType is { enum: EnumMapProduct } {
  return typeof dataType === "object" && "enum" in dataType;
}

/**
 * Type guard to check if a DataTypeProduct is a bitmap type
 */
export function isBitmapDataTypeProduct(
  dataType: DataTypeProduct
): dataType is { bitmap: BitmapProduct } {
  return typeof dataType === "object" && "bitmap" in dataType;
}

/**
 * Type guard to check if a DataTypeProduct is a json type
 */
export function isJsonDataTypeProduct(dataType: DataTypeProduct): dataType is { json: "" } {
  return typeof dataType === "object" && "json" in dataType;
}

/**
 * Gets the simple type name as a string from a DataTypeProduct
 * Returns undefined if not a simple type
 */
export function getSimpleTypeNameProduct(dataType: DataTypeProduct): string | undefined {
  // Check if it's a simple type (not enum, bitmap, or json)
  if (
    typeof dataType !== "object" ||
    "enum" in dataType ||
    "bitmap" in dataType ||
    "json" in dataType
  ) {
    return undefined;
  }

  if ("boolean" in dataType) return "boolean";
  if ("int8" in dataType) return "int8";
  if ("int16" in dataType) return "int16";
  if ("int32" in dataType) return "int32";
  if ("int64" in dataType) return "int64";
  if ("int8U" in dataType) return "int8U";
  if ("int16U" in dataType) return "int16U";
  if ("int32U" in dataType) return "int32U";
  if ("int64U" in dataType) return "int64U";
  if ("float32" in dataType) return "float32";
  if ("float64" in dataType) return "float64";
  if ("dateTime" in dataType) return "dateTime";
  if ("string" in dataType) return "string";

  return undefined;
}

/**
 * Creates a simple DataTypeProduct from a string type name
 */
export function createSimpleDataTypeProduct(typeName: string): DataTypeProduct {
  const typeMap: Record<string, DataTypeChoice> = {
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

  return typeMap[typeName] || { float64: {} };
}

/**
 * Converts DataTypeProduct to a string value for form select
 */
export function getDataTypeProductStringValue(dataType: DataTypeProduct): string {
  if (isEnumDataTypeProduct(dataType)) return "enum";
  if (isBitmapDataTypeProduct(dataType)) return "bitmap";
  if (isJsonDataTypeProduct(dataType)) return "json";
  return getSimpleTypeNameProduct(dataType) || "float64";
}

/**
 * Creates DataTypeProduct from a string value (for form select)
 */
export function createDataTypeProductFromString(value: string): DataTypeProduct {
  if (value === "enum") {
    return { enum: { enumEntry: [] } };
  }
  if (value === "bitmap") {
    return { bitmap: { bitmapEntry: [] } };
  }
  if (value === "json") {
    return { json: "" };
  }
  return createSimpleDataTypeProduct(value);
}
