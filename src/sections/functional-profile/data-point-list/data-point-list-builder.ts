import {
  FunctionalProfileDataPointList,
  FunctionalProfileDataPoint,
  DataTypeFunctionalProfile,
  GenericAttributeListFunctionalProfile,
  DynamicParameterDescriptionList,
  DynamicParameterDescriptionListElement,
  DynamicParameterDescription,
  DataTypeProduct,
} from "@/models";
import { validateDataPointList } from "@/sections/functional-profile/data-point-list/data-point-list-schema";
import { validateGenericAttributeList } from "@/sections/functional-profile/generic-attribute-list/generic-attribute-list-schema";
import { parameterListSchema } from "@/sections/functional-profile/data-point-list/data-point-list-schema";
import { validateWithSchema } from "@/sections/shared/utils/validation-utils";
import { buildLegibleDescription } from "@/sections/functional-profile/legible-description/legible-description-builder";
import { buildAlternativeNames } from "@/sections/functional-profile/alternative-names/alternative-names-builder";
import { buildEnumDataType } from "@/sections/functional-profile/data-point-list/enum/enum-builder";
import { buildBitmapDataType } from "@/sections/functional-profile/data-point-list/bitmap/bitmap-builder";
import { buildJsonDataType } from "@/sections/functional-profile/data-point-list/json/json-builder";
import { buildEnumProductDataType } from "@/sections/functional-profile/data-point-list/enum/enum-product-builder";
import { buildBitmapProductDataType } from "@/sections/functional-profile/data-point-list/bitmap/bitmap-product-builder";
import {
  isEnumDataType,
  isBitmapDataType,
  isJsonDataType,
  getSimpleTypeName,
} from "@/sections/functional-profile/data-point-list/data-type-utils";
import {
  buildSimpleDataType,
  setOptionalXmlField,
  wrapInArray,
  setOptionalXmlArray,
} from "@/sections/shared/utils/builder-utils";

/**
 * Builds XML object for dataPointList from FunctionalProfileDataPointList model
 */
export function buildDataPointList(
  dataPointList: FunctionalProfileDataPointList
): Record<string, unknown> {
  const validation = validateDataPointList(dataPointList);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for data point list";
    throw new Error(errorMessage);
  }

  return {
    dataPointListElement: dataPointList.dataPointListElement.map((element) =>
      buildDataPointElement(element)
    ),
  };
}

/**
 * Builds XML object for a single dataPointListElement
 */
function buildDataPointElement(element: FunctionalProfileDataPoint): Record<string, unknown> {
  const dp = element.dataPoint;

  const dataPointXml: Record<string, unknown> = {
    dataPointName: wrapInArray(dp.dataPointName),
    dataDirection: wrapInArray(dp.dataDirection),
    presenceLevel: wrapInArray(dp.presenceLevel),
    dataType: wrapInArray(buildDataType(dp.dataType)),
    unit: wrapInArray(dp.unit),
  };

  // Add optional arrayLength
  setOptionalXmlField(dataPointXml, "arrayLength", dp.arrayLength);

  // Add optional parameterList (must come before legibleDescription)
  if (dp.parameterList) {
    dataPointXml.parameterList = wrapInArray(buildParameterListForDataPoint(dp.parameterList));
  }

  // Add legibleDescription if present
  setOptionalXmlArray(
    dataPointXml,
    "legibleDescription",
    dp.legibleDescription && dp.legibleDescription.length > 0
      ? buildLegibleDescription(dp.legibleDescription)
      : undefined
  );

  // Add optional alternativeNames
  if (dp.alternativeNames) {
    dataPointXml.alternativeNames = wrapInArray(buildAlternativeNames(dp.alternativeNames));
  }

  const elementXml: Record<string, unknown> = {
    dataPoint: wrapInArray(dataPointXml),
  };

  // Add optional genericAttributeList at element level
  if (element.genericAttributeList) {
    elementXml.genericAttributeList = [
      buildGenericAttributeListForDataPoint(element.genericAttributeList),
    ];
  }

  return elementXml;
}

/**
 * Builds XML object for genericAttributeList from GenericAttributeListFunctionalProfile model
 * (for data point elements)
 */
function buildGenericAttributeListForDataPoint(
  attributeList: GenericAttributeListFunctionalProfile
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateGenericAttributeList(attributeList);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for generic attribute list";
    throw new Error(errorMessage);
  }

  return {
    genericAttributeListElement: attributeList.genericAttributeListElement.map((attr) => ({
      name: wrapInArray(attr.name),
    })),
  };
}

/**
 * Builds XML object for parameterList from DynamicParameterDescriptionList model
 * (for data points)
 */
function buildParameterListForDataPoint(
  parameterList: DynamicParameterDescriptionList
): Record<string, unknown> {
  // Validate using validation layer
  const validation = validateWithSchema(parameterListSchema, parameterList);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for parameter list";
    throw new Error(errorMessage);
  }

  const parameterListXml: Record<string, unknown> = {};

  // Add optional parameterListElement array
  if (parameterList.parameterListElement && parameterList.parameterListElement.length > 0) {
    parameterListXml.parameterListElement = parameterList.parameterListElement.map((element) =>
      buildParameterListElement(element)
    );
  }

  return parameterListXml;
}

/**
 * Builds XML object for parameterListElement from DynamicParameterDescriptionListElement model
 */
function buildParameterListElement(
  element: DynamicParameterDescriptionListElement
): Record<string, unknown> {
  const elementXml: Record<string, unknown> = {
    name: wrapInArray(element.name),
    dataType: wrapInArray(buildDataTypeProduct(element.dataType)),
  };

  // Add optional defaultValue
  setOptionalXmlField(elementXml, "defaultValue", element.defaultValue);

  // Add optional parameterDescription array
  setOptionalXmlArray(
    elementXml,
    "parameterDescription",
    element.parameterDescription?.map((desc) => buildParameterDescription(desc))
  );

  return elementXml;
}

/**
 * Builds XML object for parameterDescription from DynamicParameterDescription model
 */
function buildParameterDescription(desc: DynamicParameterDescription): Record<string, unknown> {
  const descXml: Record<string, unknown> = {
    textElement: wrapInArray(desc.textElement),
    language: wrapInArray(desc.language),
  };

  // Add optional URI
  setOptionalXmlField(descXml, "uri", desc.uri);

  // Add optional label
  setOptionalXmlField(descXml, "label", desc.label);

  return descXml;
}

/**
 * Builds XML dataType element for DataTypeProduct
 * The XML structure uses nested elements like <float64 /> instead of a string value
 */
function buildDataTypeProduct(dataType: DataTypeProduct): Record<string, unknown> {
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
 * Builds XML dataType element from DataTypeFunctionalProfile
 * The XML structure uses nested elements like <float64 /> instead of a string value
 */
function buildDataType(dataType: DataTypeFunctionalProfile): Record<string, unknown> {
  // Check for enum, bitmap, or json first
  if (isEnumDataType(dataType)) {
    return { enum: wrapInArray(buildEnumDataType(dataType.enum)) };
  }

  if (isBitmapDataType(dataType)) {
    return { bitmap: wrapInArray(buildBitmapDataType(dataType.bitmap)) };
  }

  if (isJsonDataType(dataType)) {
    const jsonContent = buildJsonDataType(dataType.json);
    // If json is empty (no items), serialize as empty element like <json />
    // Similar to how simple types work: { json: [""] }
    if (Object.keys(jsonContent).length === 0) {
      return { json: [""] };
    }
    return { json: wrapInArray(jsonContent) };
  }

  // Build simple data types
  const typeName = getSimpleTypeName(dataType);
  if (typeName) {
    return buildSimpleDataType(typeName);
  }

  // Default to float64
  return buildSimpleDataType("float64");
}
