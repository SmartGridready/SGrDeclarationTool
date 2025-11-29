/**
 * Utilities for working with DataTypeFunctionalProfile and DataTypeProduct
 */

import {
  DataTypeFunctionalProfile,
  DataTypeChoice,
  EnumMapFunctionalProfile,
  BitmapFunctionalProfile,
  JSonOutputFunctionalProfile,
  DataTypeProduct,
} from "@/models/generic";

/**
 * Type guard to check if a DataTypeFunctionalProfile is a simple type (from DataTypeChoice)
 */
export function isSimpleDataType(dataType: DataTypeFunctionalProfile): dataType is DataTypeChoice {
  return (
    typeof dataType === "object" &&
    !("enum" in dataType) &&
    !("bitmap" in dataType) &&
    !("json" in dataType) &&
    ("boolean" in dataType ||
      "int8" in dataType ||
      "int16" in dataType ||
      "int32" in dataType ||
      "int64" in dataType ||
      "int8U" in dataType ||
      "int16U" in dataType ||
      "int32U" in dataType ||
      "int64U" in dataType ||
      "float32" in dataType ||
      "float64" in dataType ||
      "dateTime" in dataType ||
      "string" in dataType)
  );
}

/**
 * Type guard to check if a DataTypeFunctionalProfile is an enum type
 */
export function isEnumDataType(
  dataType: DataTypeFunctionalProfile
): dataType is { enum: EnumMapFunctionalProfile } {
  return typeof dataType === "object" && "enum" in dataType;
}

/**
 * Type guard to check if a DataTypeFunctionalProfile is a bitmap type
 */
export function isBitmapDataType(
  dataType: DataTypeFunctionalProfile
): dataType is { bitmap: BitmapFunctionalProfile } {
  return typeof dataType === "object" && "bitmap" in dataType;
}

/**
 * Type guard to check if a DataTypeFunctionalProfile is a json type
 */
export function isJsonDataType(
  dataType: DataTypeFunctionalProfile
): dataType is { json: JSonOutputFunctionalProfile } {
  return typeof dataType === "object" && "json" in dataType;
}

/**
 * Gets the simple type name as a string from a DataTypeChoice
 * Returns undefined if not a simple type
 */
export function getSimpleTypeName(dataType: DataTypeFunctionalProfile): string | undefined {
  if (!isSimpleDataType(dataType)) {
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
 * Creates a simple DataTypeFunctionalProfile from a string type name
 */
export function createSimpleDataType(typeName: string): DataTypeFunctionalProfile {
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
 * Converts DataTypeFunctionalProfile to a string value for form select
 */
export function getDataTypeStringValue(dataType: DataTypeFunctionalProfile): string {
  if (isEnumDataType(dataType)) {
    return "enum";
  }
  if (isBitmapDataType(dataType)) {
    return "bitmap";
  }
  if (isJsonDataType(dataType)) {
    return "json";
  }
  return getSimpleTypeName(dataType) || "float64";
}

/**
 * Creates DataTypeFunctionalProfile from a string value (for form select)
 */
export function createDataTypeFromString(value: string): DataTypeFunctionalProfile {
  if (value === "enum") {
    return { enum: {} };
  }
  if (value === "bitmap") {
    return { bitmap: {} };
  }
  if (value === "json") {
    return { json: {} };
  }
  return createSimpleDataType(value);
}

/**
 * Utilities for DataTypeProduct (used in ParameterList)
 * Reuses the same logic as DataTypeFunctionalProfile since both use DataTypeChoice for simple types
 */

/**
 * Type guard to check if a DataTypeProduct is an enum type
 */
export function isEnumDataTypeProduct(
  dataType: DataTypeProduct
): dataType is { enum: import("@/models/generic").EnumMapProduct } {
  return typeof dataType === "object" && "enum" in dataType;
}

/**
 * Type guard to check if a DataTypeProduct is a bitmap type
 */
export function isBitmapDataTypeProduct(
  dataType: DataTypeProduct
): dataType is { bitmap: import("@/models/generic").BitmapProduct } {
  return typeof dataType === "object" && "bitmap" in dataType;
}

/**
 * Type guard to check if a DataTypeProduct is a json type
 */
export function isJsonDataTypeProduct(dataType: DataTypeProduct): dataType is { json: "" } {
  return typeof dataType === "object" && "json" in dataType;
}

/**
 * Converts DataTypeProduct to a string value for form select
 * Reuses getDataTypeStringValue logic - both use DataTypeChoice for simple types
 */
export function getDataTypeProductStringValue(dataType: DataTypeProduct): string {
  if (isEnumDataTypeProduct(dataType)) return "enum";
  if (isBitmapDataTypeProduct(dataType)) return "bitmap";
  if (isJsonDataTypeProduct(dataType)) return "json";
  // Reuse getDataTypeStringValue for simple types - both use DataTypeChoice
  return getDataTypeStringValue(dataType as unknown as DataTypeFunctionalProfile);
}

/**
 * Creates DataTypeProduct from a string value (for form select)
 * Reuses createDataTypeFromString for simple types, only differs for enum/bitmap/json
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
  // Reuse createDataTypeFromString - both use DataTypeChoice for simple types
  return createDataTypeFromString(value) as DataTypeProduct;
}
