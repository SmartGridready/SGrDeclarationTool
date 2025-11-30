import {
  FunctionalProfileDataPointList,
  FunctionalProfileDataPoint,
  DataDirectionFunctionalProfile,
  PresenceLevel,
  DataTypeFunctionalProfile,
  Units,
  DataTypeProduct,
  DynamicParameterDescriptionList,
  DynamicParameterDescriptionListElement,
  DynamicParameterDescription,
} from "@/models";
import {
  mapArray,
  mapOptionalArray,
  getStringValue,
  getTypedValue,
  getOptionalNumberValue,
  getFirstElement,
  getOptionalStringValue,
  mapSimpleDataType,
  setOptionalField,
} from "@/sections/shared/utils/mapper-utils";
import {
  mapLegibleDescription,
  mapLegibleDescriptionItem,
} from "@/sections/functional-profile/legible-description/legible-description-mapper";
import { mapAlternativeNames } from "@/sections/functional-profile/alternative-names/alternative-names-mapper";
import { mapGenericAttributeList } from "@/sections/functional-profile/generic-attribute-list/generic-attribute-list-mapper";
import {
  EnumMapFunctionalProfile,
  EnumEntryRecordFunctionalProfile,
  BitmapFunctionalProfile,
  BitmapEntryFunctionalProfile,
  JSonOutputFunctionalProfile,
  JSonArrayOutputFunctionalProfile,
  JSonElemFunctionalProfile,
  EnumMapProduct,
  EnumEntryProductRecord,
  BitmapProduct,
  BitmapEntryProduct,
} from "@/models";

/**
 * Maps XML dataPointList to FunctionalProfileDataPointList model
 */
export function mapDataPointList(dataPointListXml: any): FunctionalProfileDataPointList {
  return {
    dataPointListElement: mapArray(dataPointListXml, "dataPointListElement", mapDataPointElement),
  };
}

/**
 * Maps a single XML dataPointListElement to FunctionalProfileDataPoint model
 */
function mapDataPointElement(elementXml: any): FunctionalProfileDataPoint {
  const dpXml = getFirstElement(elementXml, "dataPoint");

  if (!dpXml) {
    return {
      dataPoint: {
        dataPointName: "",
        dataDirection: "R",
        presenceLevel: "M",
        dataType: { float64: {} },
        unit: "NO_UNITS",
      },
    };
  }

  const dataPoint: FunctionalProfileDataPoint = {
    dataPoint: {
      dataPointName: getStringValue(dpXml, "dataPointName"),
      dataDirection: getTypedValue<DataDirectionFunctionalProfile>(dpXml, "dataDirection", "R"),
      presenceLevel: getTypedValue<PresenceLevel>(dpXml, "presenceLevel", "M"),
      dataType: mapDataType(getFirstElement(dpXml, "dataType")),
      unit: getTypedValue<Units>(dpXml, "unit", "NO_UNITS"),
    },
  };

  // Map optional arrayLength
  setOptionalField(
    dataPoint.dataPoint,
    "arrayLength",
    getOptionalNumberValue(dpXml, "arrayLength")
  );

  // Map optional alternativeNames
  const alternativeNamesXml = getFirstElement(dpXml, "alternativeNames");
  setOptionalField(
    dataPoint.dataPoint,
    "alternativeNames",
    alternativeNamesXml && mapAlternativeNames(alternativeNamesXml)
  );

  // Map optional legibleDescription
  if (dpXml.legibleDescription && Array.isArray(dpXml.legibleDescription)) {
    dataPoint.dataPoint.legibleDescription = mapLegibleDescription(dpXml.legibleDescription);
  }

  // Map optional parameterList
  const parameterListXml = getFirstElement(dpXml, "parameterList");
  setOptionalField(
    dataPoint.dataPoint,
    "parameterList",
    parameterListXml && mapParameterList(parameterListXml)
  );

  // Map optional genericAttributeList at element level
  const genericAttributeListXml = getFirstElement(elementXml, "genericAttributeList");
  setOptionalField(
    dataPoint,
    "genericAttributeList",
    genericAttributeListXml && mapGenericAttributeList(genericAttributeListXml)
  );

  return dataPoint;
}

/**
 * Maps XML dataType to DataTypeFunctionalProfile
 * The XML structure uses nested elements like <float64 /> instead of a string value
 */
function mapDataType(dataTypeXml: any): DataTypeFunctionalProfile {
  if (!dataTypeXml) {
    return { float64: {} };
  }

  // Check for enum, bitmap, or json first
  const enumXml = getFirstElement(dataTypeXml, "enum");
  if (enumXml) {
    return { enum: mapEnumDataType(enumXml) };
  }

  const bitmapXml = getFirstElement(dataTypeXml, "bitmap");
  if (bitmapXml) {
    return { bitmap: mapBitmapDataType(bitmapXml) };
  }

  // Check for json - it can be an empty element <json />
  // Empty elements are represented as arrays by xml2js (explicitArray: true)
  // getFirstElement returns undefined for empty arrays, so we check if the field exists
  if (dataTypeXml.json !== undefined) {
    const jsonXml = getFirstElement(dataTypeXml, "json");
    // For empty <json />, jsonXml will be undefined, but we still want to map it
    return { json: jsonXml ? mapJsonDataType(jsonXml) : {} };
  }

  // Map simple data types
  const typeMap: Record<string, DataTypeFunctionalProfile> = {
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
 * Maps XML parameterList to DynamicParameterDescriptionList model
 */
function mapParameterList(parameterListXml: any): DynamicParameterDescriptionList {
  const parameterList: DynamicParameterDescriptionList = {};

  // Map optional parameterListElement
  const parameterListElement = mapOptionalArray(
    parameterListXml,
    "parameterListElement",
    mapParameterListElement
  );
  if (parameterListElement) {
    parameterList.parameterListElement = parameterListElement;
  }

  return parameterList;
}

/**
 * Maps a single XML parameterListElement to DynamicParameterDescriptionListElement model
 */
function mapParameterListElement(elementXml: any): DynamicParameterDescriptionListElement {
  const element: DynamicParameterDescriptionListElement = {
    name: getStringValue(elementXml, "name"),
    dataType: mapDataTypeProduct(getFirstElement(elementXml, "dataType")),
  };

  // Map optional defaultValue
  setOptionalField(element, "defaultValue", getOptionalStringValue(elementXml, "defaultValue"));

  // Map optional parameterDescription
  if (elementXml.parameterDescription && Array.isArray(elementXml.parameterDescription)) {
    element.parameterDescription = elementXml.parameterDescription.map((desc: any) =>
      mapParameterDescription(desc)
    );
  }

  return element;
}

/**
 * Maps XML parameterDescription to DynamicParameterDescription model
 */
function mapParameterDescription(descXml: any): DynamicParameterDescription {
  const description: DynamicParameterDescription = {
    ...mapLegibleDescriptionItem(descXml),
  };

  // Map optional label
  setOptionalField(description, "label", getOptionalStringValue(descXml, "label"));

  return description;
}

/**
 * Maps XML dataType to DataTypeProduct
 * The XML structure uses nested elements like <float64 /> instead of a string value
 */
function mapDataTypeProduct(dataTypeXml: any): DataTypeProduct {
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
 * Maps XML enum dataType to EnumMapFunctionalProfile model
 */
function mapEnumDataType(enumXml: any): EnumMapFunctionalProfile {
  const enumMap: EnumMapFunctionalProfile = {};

  // Map optional fields
  setOptionalField(enumMap, "hexMask", getOptionalStringValue(enumXml, "hexMask"));
  setOptionalField(enumMap, "enumEntry", mapOptionalArray(enumXml, "enumEntry", mapEnumEntry));

  return enumMap;
}

/**
 * Maps XML enumEntry to EnumEntryRecordFunctionalProfile model
 */
function mapEnumEntry(entryXml: any): EnumEntryRecordFunctionalProfile {
  const entry: EnumEntryRecordFunctionalProfile = {
    literal: getStringValue(entryXml, "literal"),
  };

  // Map optional description
  setOptionalField(entry, "description", getOptionalStringValue(entryXml, "description"));

  return entry;
}

/**
 * Maps XML bitmap dataType to BitmapFunctionalProfile model
 */
function mapBitmapDataType(bitmapXml: any): BitmapFunctionalProfile {
  const bitmap: BitmapFunctionalProfile = {};

  // Map optional bitmapEntry array
  setOptionalField(
    bitmap,
    "bitmapEntry",
    mapOptionalArray(bitmapXml, "bitmapEntry", mapBitmapEntry)
  );

  return bitmap;
}

/**
 * Maps XML bitmapEntry to BitmapEntryFunctionalProfile model
 */
function mapBitmapEntry(entryXml: any): BitmapEntryFunctionalProfile {
  const entry: BitmapEntryFunctionalProfile = {
    literal: getStringValue(entryXml, "literal"),
  };

  // Map optional description
  setOptionalField(entry, "description", getOptionalStringValue(entryXml, "description"));

  return entry;
}

/**
 * Maps XML json dataType to JSonOutputFunctionalProfile model
 */
function mapJsonDataType(jsonXml: any): JSonOutputFunctionalProfile {
  const jsonOutput: JSonOutputFunctionalProfile = {};

  // Map optional items array
  setOptionalField(jsonOutput, "items", mapOptionalArray(jsonXml, "items", mapJsonItem));

  return jsonOutput;
}

/**
 * Maps XML json item (array or element) to JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile
 */
function mapJsonItem(itemXml: any): JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile {
  // Check if it's an array (has name property)
  if (itemXml.name !== undefined) {
    return mapJsonArray(itemXml);
  }

  // Otherwise it's an element (has key property)
  return mapJsonElement(itemXml);
}

/**
 * Maps XML json array to JSonArrayOutputFunctionalProfile model
 */
function mapJsonArray(arrayXml: any): JSonArrayOutputFunctionalProfile {
  const array: JSonArrayOutputFunctionalProfile = {};

  // Map optional fields
  setOptionalField(array, "name", getOptionalStringValue(arrayXml, "name"));
  setOptionalField(array, "items", mapOptionalArray(arrayXml, "items", mapJsonItem));

  return array;
}

/**
 * Maps XML json element to JSonElemFunctionalProfile model
 */
function mapJsonElement(elementXml: any): JSonElemFunctionalProfile {
  const key = getStringValue(elementXml, "key");

  // Check which type it is (date, string, or number)
  if (elementXml.date !== undefined) {
    return { key, date: "" };
  }
  if (elementXml.number !== undefined) {
    return { key, number: "" };
  }
  // Default to string
  return { key, string: "" };
}

/**
 * Maps XML enum dataType to EnumMapProduct model (for parameterList)
 */
function mapEnumProductDataType(enumXml: any): EnumMapProduct {
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
function mapEnumProductEntry(entryXml: any): EnumEntryProductRecord {
  const entry: EnumEntryProductRecord = {
    literal: getStringValue(entryXml, "literal"),
  };

  // Map optional fields
  setOptionalField(entry, "ordinal", getOptionalNumberValue(entryXml, "ordinal"));
  setOptionalField(entry, "description", getOptionalStringValue(entryXml, "description"));

  return entry;
}

/**
 * Maps XML bitmap dataType to BitmapProduct model (for parameterList)
 */
function mapBitmapProductDataType(bitmapXml: any): BitmapProduct {
  return {
    bitmapEntry: mapArray(bitmapXml, "bitmapEntry", mapBitmapProductEntry),
  };
}

/**
 * Maps XML bitmapEntry to BitmapEntryProduct model
 */
function mapBitmapProductEntry(entryXml: any): BitmapEntryProduct {
  const entry: BitmapEntryProduct = {
    literal: getStringValue(entryXml, "literal"),
    hexMask: getStringValue(entryXml, "hexMask"), // Required for Product
  };

  // Map optional description
  setOptionalField(entry, "description", getOptionalStringValue(entryXml, "description"));

  return entry;
}
