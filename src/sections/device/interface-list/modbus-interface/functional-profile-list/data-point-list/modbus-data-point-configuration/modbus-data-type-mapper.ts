import { ModbusDataType, ModbusBoolean } from "@/models/product/modbus-types";
import { Enum, BitmapProduct, EmptyType } from "@/models/generic";
import {
  getFirstElement,
  getStringValue,
  getNumberValue,
  getOptionalStringValue,
  getOptionalNumberValue,
  mapArray,
  mapSimpleDataType,
  setOptionalField,
  Xml2JsObject,
} from "@/utils/mapper-utils";

/**
 * Maps XML modbusDataType to ModbusDataType model
 * The XML structure uses nested elements like <float64 /> instead of a string value
 */
export function mapModbusDataType(modbusDataTypeXml: Xml2JsObject | undefined): ModbusDataType {
  if (!modbusDataTypeXml) {
    return { float64: {} };
  }

  // Check for boolean first (has special structure with trueValue/falseValue)
  // xml2js parses <boolean /> as { boolean: [""] } or { boolean: [{}] }
  // We need to check if the field exists, even if it's an empty string
  if (modbusDataTypeXml.boolean !== undefined) {
    const booleanXml = getFirstElement(modbusDataTypeXml, "boolean");
    // If booleanXml is undefined but boolean field exists, it means it's an empty element like <boolean />
    // In that case, create an empty object to represent the empty boolean
    const booleanElement = booleanXml || {};
    return { boolean: mapModbusBoolean(booleanElement) };
  }

  // Check for enum
  const enumXml = getFirstElement(modbusDataTypeXml, "enum");
  if (enumXml) {
    return { enum: mapModbusEnumDataType(enumXml) };
  }

  // Check for bitmap
  const bitmapXml = getFirstElement(modbusDataTypeXml, "bitmap");
  if (bitmapXml) {
    return { bitmap: mapModbusBitmapDataType(bitmapXml) };
  }

  // Map simple data types
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

  return mapSimpleDataType(modbusDataTypeXml, typeMap, { float64: {} as EmptyType });
}

/**
 * Maps XML boolean to ModbusBoolean model
 * ModbusBoolean can be empty, or have trueValue, or have falseValue
 */
function mapModbusBoolean(booleanXml: Xml2JsObject): ModbusBoolean {
  // Check if it's an empty element
  const trueValue = getOptionalNumberValue(booleanXml, "trueValue");
  const falseValue = getOptionalNumberValue(booleanXml, "falseValue");

  if (trueValue !== undefined) {
    return { trueValue };
  }
  if (falseValue !== undefined) {
    return { falseValue };
  }
  // Empty boolean
  return {} as EmptyType;
}

/**
 * Maps XML enum dataType to Enum model
 */
function mapModbusEnumDataType(enumXml: Xml2JsObject): Enum {
  const enumMap: Enum = {
    enumEntry: mapArray(enumXml, "enumEntry", mapModbusEnumEntry),
  };

  // Map optional hexMask
  setOptionalField(enumMap, "hexMask", getOptionalStringValue(enumXml, "hexMask"));

  return enumMap;
}

/**
 * Maps XML enumEntry to EnumEntry model
 */
function mapModbusEnumEntry(entryXml: Xml2JsObject) {
  const entry: { literal: string; ordinal: number; description?: string } = {
    literal: getStringValue(entryXml, "literal"),
    ordinal: getNumberValue(entryXml, "ordinal", 0),
  };

  // Map optional description
  const description = getOptionalStringValue(entryXml, "description");
  if (description !== undefined) {
    entry.description = description;
  }

  return entry;
}

/**
 * Maps XML bitmap dataType to BitmapProduct model
 */
function mapModbusBitmapDataType(bitmapXml: Xml2JsObject): BitmapProduct {
  return {
    bitmapEntry: mapArray(bitmapXml, "bitmapEntry", mapModbusBitmapEntry),
  };
}

/**
 * Maps XML bitmapEntry to BitmapEntryProduct model
 */
function mapModbusBitmapEntry(entryXml: Xml2JsObject) {
  const entry: { literal: string; hexMask: string; description?: string } = {
    literal: getStringValue(entryXml, "literal"),
    hexMask: getStringValue(entryXml, "hexMask"), // Required for Product
  };

  // Map optional description
  const description = getOptionalStringValue(entryXml, "description");
  if (description !== undefined) {
    entry.description = description;
  }

  return entry;
}
