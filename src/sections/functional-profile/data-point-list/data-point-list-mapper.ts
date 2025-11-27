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
import { mapEnumDataType } from "@/sections/functional-profile/data-point-list/enum/enum-mapper";
import { mapBitmapDataType } from "@/sections/functional-profile/data-point-list/bitmap/bitmap-mapper";
import { mapJsonDataType } from "@/sections/functional-profile/data-point-list/json/json-mapper";
import { mapEnumProductDataType } from "@/sections/functional-profile/data-point-list/enum/enum-product-mapper";
import { mapBitmapProductDataType } from "@/sections/functional-profile/data-point-list/bitmap/bitmap-product-mapper";

/**
 * Maps XML dataPointList to FunctionalProfileDataPointList model
 */
export function mapDataPointList(
  dataPointListXml: any
): FunctionalProfileDataPointList {
  return {
    dataPointListElement: mapArray(
      dataPointListXml,
      "dataPointListElement",
      mapDataPointElement
    ),
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
      dataDirection: getTypedValue<DataDirectionFunctionalProfile>(
        dpXml,
        "dataDirection",
        "R"
      ),
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

  // Map optional legibleDescription
  if (dpXml.legibleDescription && Array.isArray(dpXml.legibleDescription)) {
    dataPoint.dataPoint.legibleDescription = mapLegibleDescription(
      dpXml.legibleDescription
    );
  }

  // Map optional alternativeNames
  const alternativeNamesXml = getFirstElement(dpXml, "alternativeNames");
  setOptionalField(
    dataPoint.dataPoint,
    "alternativeNames",
    alternativeNamesXml && mapAlternativeNames(alternativeNamesXml)
  );

  // Map optional parameterList
  const parameterListXml = getFirstElement(dpXml, "parameterList");
  setOptionalField(
    dataPoint.dataPoint,
    "parameterList",
    parameterListXml && mapParameterList(parameterListXml)
  );

  // Map optional genericAttributeList at element level
  const genericAttributeListXml = getFirstElement(
    elementXml,
    "genericAttributeList"
  );
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
function mapParameterList(
  parameterListXml: any
): DynamicParameterDescriptionList {
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
function mapParameterListElement(
  elementXml: any
): DynamicParameterDescriptionListElement {
  const element: DynamicParameterDescriptionListElement = {
    name: getStringValue(elementXml, "name"),
    dataType: mapDataTypeProduct(getFirstElement(elementXml, "dataType")),
  };

  // Map optional defaultValue
  setOptionalField(
    element,
    "defaultValue",
    getOptionalStringValue(elementXml, "defaultValue")
  );

  // Map optional parameterDescription
  if (
    elementXml.parameterDescription &&
    Array.isArray(elementXml.parameterDescription)
  ) {
    element.parameterDescription = elementXml.parameterDescription.map(
      (desc: any) => mapParameterDescription(desc)
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
  setOptionalField(
    description,
    "label",
    getOptionalStringValue(descXml, "label")
  );

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
