/**
 * Shared utilities for working with ModbusDataType
 */

import { ModbusDataType, ModbusBoolean, Enum, BitmapProduct, MODBUS_DATA_TYPE_VALUES } from "@/models";
import { EmptyType } from "@/models/generic";
import { createFormOptions } from "@/models/form-options-helper";

/**
 * Type guard to check if a ModbusDataType is a boolean type
 */
export function isModbusBooleanDataType(dataType: ModbusDataType): dataType is { boolean: ModbusBoolean } {
  return typeof dataType === "object" && "boolean" in dataType;
}

/**
 * Type guard to check if a ModbusDataType is an enum type
 */
export function isModbusEnumDataType(dataType: ModbusDataType): dataType is { enum: Enum } {
  return typeof dataType === "object" && "enum" in dataType;
}

/**
 * Type guard to check if a ModbusDataType is a bitmap type
 */
export function isModbusBitmapDataType(dataType: ModbusDataType): dataType is { bitmap: BitmapProduct } {
  return typeof dataType === "object" && "bitmap" in dataType;
}

/**
 * Gets the simple type name as a string from a ModbusDataType
 * Returns undefined if not a simple type
 */
export function getModbusSimpleTypeName(dataType: ModbusDataType): string | undefined {
  // Check if it's a simple type (not boolean, enum, or bitmap)
  if (typeof dataType !== "object" || "boolean" in dataType || "enum" in dataType || "bitmap" in dataType) {
    return undefined;
  }

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
 * Creates a simple ModbusDataType from a string type name
 */
export function createModbusSimpleDataType(typeName: string): ModbusDataType {
  const typeMap: Record<string, ModbusDataType> = {
    int8: { int8: {} as EmptyType },
    int16: { int16: {} as EmptyType },
    int32: { int32: {} as EmptyType },
    int64: { int64: {} as EmptyType },
    int8U: { int8U: {} as EmptyType },
    int16U: { int16U: {} as EmptyType },
    int32U: { int32U: {} as EmptyType },
    int64U: { int64U: {} as EmptyType },
    float32: { float32: {} as EmptyType },
    float64: { float64: {} as EmptyType },
    dateTime: { dateTime: {} as EmptyType },
    string: { string: {} as EmptyType },
  };

  return typeMap[typeName] || ({ float64: {} as EmptyType } as ModbusDataType);
}

/**
 * Converts ModbusDataType to a string value for form select
 */
export function getModbusDataTypeStringValue(dataType: ModbusDataType): string {
  if (isModbusBooleanDataType(dataType)) return "boolean";
  if (isModbusEnumDataType(dataType)) return "enum";
  if (isModbusBitmapDataType(dataType)) return "bitmap";
  return getModbusSimpleTypeName(dataType) || "float64";
}

/**
 * Creates ModbusDataType from a string value (for form select)
 */
export function createModbusDataTypeFromString(value: string): ModbusDataType {
  if (value === "boolean") {
    return { boolean: {} as ModbusBoolean };
  }
  if (value === "enum") {
    return { enum: { enumEntry: [] } };
  }
  if (value === "bitmap") {
    return { bitmap: { bitmapEntry: [] } };
  }
  return createModbusSimpleDataType(value);
}

/**
 * Available ModbusDataType options for form select
 * Created from model values using form options helper
 */
export const MODBUS_DATA_TYPE_OPTIONS = createFormOptions(MODBUS_DATA_TYPE_VALUES);
