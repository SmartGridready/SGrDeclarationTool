import {
  JSonOutputFunctionalProfile,
  JSonArrayOutputFunctionalProfile,
  JSonElemFunctionalProfile,
} from "@/models";
import {
  setOptionalXmlField,
  setOptionalXmlArray,
  wrapInArray,
} from "@/sections/shared/utils/builder-utils";

/**
 * Builds XML object for json dataType from JSonOutputFunctionalProfile model
 */
export function buildJsonDataType(
  jsonOutput: JSonOutputFunctionalProfile
): Record<string, unknown> {
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
function buildJsonItem(
  item: JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile
): Record<string, unknown> {
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
function buildJsonArray(
  array: JSonArrayOutputFunctionalProfile
): Record<string, unknown> {
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
function buildJsonElement(
  element: JSonElemFunctionalProfile
): Record<string, unknown> {
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
