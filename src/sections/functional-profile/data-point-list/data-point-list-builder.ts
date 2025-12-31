import {
  FunctionalProfileDataPointList,
  FunctionalProfileDataPoint,
  DataTypeFunctionalProfile,
  GenericAttributeListFunctionalProfile,
} from "@/models";
import { validateDataPointList } from "@/sections/functional-profile/data-point-list/data-point-list-schema";
import { validateGenericAttributeList } from "@/sections/functional-profile/generic-attribute-list/generic-attribute-list-schema";
import { buildLegibleDescription } from "@/sections/shared/legible-description/legible-description-builder";
import { buildAlternativeNames } from "@/sections/shared/alternative-names/alternative-names-builder";
import { buildDynamicParameterList } from "@/sections/shared/dynamic-parameter-list/dynamic-parameter-list-builder";
import {
  EnumMapFunctionalProfile,
  EnumEntryRecordFunctionalProfile,
  BitmapFunctionalProfile,
  BitmapEntryFunctionalProfile,
  JSonOutputFunctionalProfile,
  JSonArrayOutputFunctionalProfile,
  JSonElemFunctionalProfile,
} from "@/models";
import {
  isEnumDataType,
  isBitmapDataType,
  isJsonDataType,
  getSimpleTypeName,
} from "@/sections/functional-profile/data-point-list/data-type-utils";
import { buildSimpleDataType, setOptionalXmlField, wrapInArray, setOptionalXmlArray } from "@/utils/builder-utils";

/**
 * Builds XML object for dataPointList from FunctionalProfileDataPointList model
 */
export function buildDataPointList(dataPointList: FunctionalProfileDataPointList): Record<string, unknown> {
  const validation = validateDataPointList(dataPointList);
  if (!validation.success) {
    const firstError = validation.errors?.issues[0];
    const errorMessage = firstError?.message || "Validation failed for data point list";
    throw new Error(errorMessage);
  }

  return {
    dataPointListElement: dataPointList.dataPointListElement.map((element) => buildDataPointElement(element)),
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
    dataPointXml.parameterList = wrapInArray(buildDynamicParameterList(dp.parameterList));
  }

  // Add optional alternativeNames
  if (dp.alternativeNames) {
    dataPointXml.alternativeNames = wrapInArray(buildAlternativeNames(dp.alternativeNames));
  }

  // Add legibleDescription if present
  setOptionalXmlArray(
    dataPointXml,
    "legibleDescription",
    dp.legibleDescription && dp.legibleDescription.length > 0
      ? buildLegibleDescription(dp.legibleDescription)
      : undefined
  );

  const elementXml: Record<string, unknown> = {
    dataPoint: wrapInArray(dataPointXml),
  };

  // Add optional genericAttributeList at element level
  if (element.genericAttributeList) {
    elementXml.genericAttributeList = [buildGenericAttributeListForDataPoint(element.genericAttributeList)];
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

/**
 * Builds XML object for enum dataType from EnumMapFunctionalProfile model
 */
function buildEnumDataType(enumMap: EnumMapFunctionalProfile): Record<string, unknown> {
  const enumXml: Record<string, unknown> = {};

  // Add optional hexMask
  setOptionalXmlField(enumXml, "hexMask", enumMap.hexMask);

  // Add optional enumEntry array
  setOptionalXmlArray(
    enumXml,
    "enumEntry",
    enumMap.enumEntry?.map((entry) => buildEnumEntry(entry))
  );

  return enumXml;
}

/**
 * Builds XML object for enumEntry from EnumEntryRecordFunctionalProfile model
 */
function buildEnumEntry(entry: EnumEntryRecordFunctionalProfile): Record<string, unknown> {
  const entryXml: Record<string, unknown> = {
    literal: wrapInArray(entry.literal),
  };

  // Add optional description
  setOptionalXmlField(entryXml, "description", entry.description);

  return entryXml;
}

/**
 * Builds XML object for bitmap dataType from BitmapFunctionalProfile model
 */
function buildBitmapDataType(bitmap: BitmapFunctionalProfile): Record<string, unknown> {
  const bitmapXml: Record<string, unknown> = {};

  // Add optional bitmapEntry array
  setOptionalXmlArray(
    bitmapXml,
    "bitmapEntry",
    bitmap.bitmapEntry?.map((entry) => buildBitmapEntry(entry))
  );

  return bitmapXml;
}

/**
 * Builds XML object for bitmapEntry from BitmapEntryFunctionalProfile model
 */
function buildBitmapEntry(entry: BitmapEntryFunctionalProfile): Record<string, unknown> {
  const entryXml: Record<string, unknown> = {
    literal: wrapInArray(entry.literal),
  };

  // Add optional description
  setOptionalXmlField(entryXml, "description", entry.description);

  return entryXml;
}

/**
 * Builds XML object for json dataType from JSonOutputFunctionalProfile model
 */
function buildJsonDataType(jsonOutput: JSonOutputFunctionalProfile): Record<string, unknown> {
  const jsonXml: Record<string, unknown> = {};

  // Add optional items array
  setOptionalXmlArray(
    jsonXml,
    "items",
    jsonOutput.items?.map((item) => buildJsonItem(item))
  );

  return jsonXml;
}

/**
 * Builds XML object for json item (array or element)
 */
function buildJsonItem(item: JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile): Record<string, unknown> {
  // Check if it's an array (has name property)
  if ("name" in item || "items" in item) {
    return buildJsonArray(item as JSonArrayOutputFunctionalProfile);
  }

  // Otherwise it's an element (has key property)
  return buildJsonElement(item as JSonElemFunctionalProfile);
}

/**
 * Builds XML object for json array from JSonArrayOutputFunctionalProfile model
 */
function buildJsonArray(array: JSonArrayOutputFunctionalProfile): Record<string, unknown> {
  const arrayXml: Record<string, unknown> = {};

  // Add optional name
  setOptionalXmlField(arrayXml, "name", array.name);

  // Add optional items array
  setOptionalXmlArray(
    arrayXml,
    "items",
    array.items?.map((item) => buildJsonItem(item))
  );

  return arrayXml;
}

/**
 * Builds XML object for json element from JSonElemFunctionalProfile model
 */
function buildJsonElement(element: JSonElemFunctionalProfile): Record<string, unknown> {
  const elementXml: Record<string, unknown> = {
    key: wrapInArray(element.key),
  };

  // Check which type it is (date, string, or number)
  if ("date" in element) {
    elementXml.date = wrapInArray("");
  } else if ("number" in element) {
    elementXml.number = wrapInArray("");
  } else {
    // Default to string
    elementXml.string = wrapInArray("");
  }

  return elementXml;
}
