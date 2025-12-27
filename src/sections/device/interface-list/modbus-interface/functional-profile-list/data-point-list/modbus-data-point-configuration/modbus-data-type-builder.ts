import { ModbusDataType, ModbusBoolean } from "@/models/product/modbus-types";
import { Enum, BitmapProduct, EmptyType } from "@/models/generic";
import { wrapInArray, setOptionalXmlField, buildSimpleDataType } from "@/utils/builder-utils";
import {
  buildEnumProductDataType,
  buildBitmapProductDataType,
} from "@/sections/shared/data-type-product/data-type-product-builder";

/**
 * Builds XML modbusDataType element for ModbusDataType
 * The XML structure uses nested elements like <float64 /> instead of a string value
 */
export function buildModbusDataType(dataType: ModbusDataType): Record<string, unknown> {
  // Check for boolean first (has special structure with trueValue/falseValue)
  if ("boolean" in dataType) {
    return { boolean: wrapInArray(buildModbusBoolean(dataType.boolean)) };
  }

  // Check for enum
  if ("enum" in dataType) {
    return { enum: wrapInArray(buildEnumProductDataType(dataType.enum)) };
  }

  // Check for bitmap
  if ("bitmap" in dataType) {
    return { bitmap: wrapInArray(buildBitmapProductDataType(dataType.bitmap)) };
  }

  // Build simple data types
  const typeMap: Record<string, string> = {
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
 * Builds XML object for boolean from ModbusBoolean model
 * ModbusBoolean can be empty, or have trueValue, or have falseValue
 */
function buildModbusBoolean(boolean: ModbusBoolean): Record<string, unknown> {
  const booleanXml: Record<string, unknown> = {};

  if ("trueValue" in boolean) {
    booleanXml.trueValue = wrapInArray(boolean.trueValue);
  } else if ("falseValue" in boolean) {
    booleanXml.falseValue = wrapInArray(boolean.falseValue);
  }
  // If empty, return empty object (will render as <boolean />)

  return booleanXml;
}
