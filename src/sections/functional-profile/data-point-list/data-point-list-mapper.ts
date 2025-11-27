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
  const elements = dataPointListXml.dataPointListElement;

  if (!Array.isArray(elements)) {
    return { dataPointListElement: [] };
  }

  return {
    dataPointListElement: elements.map((element: any) =>
      mapDataPointElement(element)
    ),
  };
}

/**
 * Maps a single XML dataPointListElement to FunctionalProfileDataPoint model
 */
function mapDataPointElement(elementXml: any): FunctionalProfileDataPoint {
  const dpXml = elementXml.dataPoint?.[0];

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
      dataPointName: dpXml.dataPointName?.[0] || "",
      dataDirection:
        (dpXml.dataDirection?.[0] as DataDirectionFunctionalProfile) || "R",
      presenceLevel: (dpXml.presenceLevel?.[0] as PresenceLevel) || "M",
      dataType: mapDataType(dpXml.dataType?.[0]),
      unit: (dpXml.unit?.[0] as Units) || "NO_UNITS",
    },
  };

  // Map optional arrayLength
  if (dpXml.arrayLength?.[0]) {
    dataPoint.dataPoint.arrayLength = parseInt(dpXml.arrayLength[0], 10);
  }

  // Map legibleDescription if present
  if (dpXml.legibleDescription && Array.isArray(dpXml.legibleDescription)) {
    dataPoint.dataPoint.legibleDescription = mapLegibleDescription(
      dpXml.legibleDescription
    );
  }

  // Map alternativeNames if present
  if (dpXml.alternativeNames?.[0]) {
    dataPoint.dataPoint.alternativeNames = mapAlternativeNames(
      dpXml.alternativeNames[0]
    );
  }

  // Map parameterList if present
  if (dpXml.parameterList?.[0]) {
    dataPoint.dataPoint.parameterList = mapParameterList(
      dpXml.parameterList[0]
    );
  }

  // Map genericAttributeList at element level if present
  if (elementXml.genericAttributeList?.[0]) {
    dataPoint.genericAttributeList = mapGenericAttributeList(
      elementXml.genericAttributeList[0]
    );
  }

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
  if (dataTypeXml.enum) {
    return { enum: mapEnumDataType(dataTypeXml.enum[0]) };
  }
  if (dataTypeXml.bitmap) {
    return { bitmap: mapBitmapDataType(dataTypeXml.bitmap[0]) };
  }
  if (dataTypeXml.json) {
    return { json: mapJsonDataType(dataTypeXml.json[0]) };
  }

  // Check for each possible simple data type element
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

  for (const [key, value] of Object.entries(typeMap)) {
    if (dataTypeXml[key] !== undefined) {
      return value;
    }
  }

  return { float64: {} };
}

/**
 * Maps XML parameterList to DynamicParameterDescriptionList model
 */
function mapParameterList(
  parameterListXml: any
): DynamicParameterDescriptionList {
  const elements = parameterListXml.parameterListElement;

  if (!Array.isArray(elements)) {
    return { parameterListElement: [] };
  }

  return {
    parameterListElement: elements.map((element: any) =>
      mapParameterListElement(element)
    ),
  };
}

/**
 * Maps a single XML parameterListElement to DynamicParameterDescriptionListElement model
 */
function mapParameterListElement(
  elementXml: any
): DynamicParameterDescriptionListElement {
  const element: DynamicParameterDescriptionListElement = {
    name: elementXml.name?.[0] || "",
    dataType: mapDataTypeProduct(elementXml.dataType?.[0]),
  };

  // Map optional defaultValue
  if (elementXml.defaultValue?.[0]) {
    element.defaultValue = elementXml.defaultValue[0];
  }

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
  if (descXml.label?.[0]) {
    description.label = descXml.label[0];
  }

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
  if (dataTypeXml.enum) {
    return { enum: mapEnumProductDataType(dataTypeXml.enum[0]) };
  }
  if (dataTypeXml.bitmap) {
    return { bitmap: mapBitmapProductDataType(dataTypeXml.bitmap[0]) };
  }
  if (dataTypeXml.json) {
    return { json: "" };
  }

  // Check for each possible simple data type element
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

  for (const [key, value] of Object.entries(typeMap)) {
    if (dataTypeXml[key] !== undefined) {
      return value;
    }
  }

  return { float64: {} };
}
