import {
  JSonOutputFunctionalProfile,
  JSonArrayOutputFunctionalProfile,
  JSonElemFunctionalProfile,
} from "@/models";

/**
 * Maps XML json dataType to JSonOutputFunctionalProfile model
 */
export function mapJsonDataType(jsonXml: any): JSonOutputFunctionalProfile {
  const jsonOutput: JSonOutputFunctionalProfile = {};

  // Map optional items array
  if (jsonXml.items && Array.isArray(jsonXml.items)) {
    jsonOutput.items = jsonXml.items.map((item: any) => mapJsonItem(item));
  }

  return jsonOutput;
}

/**
 * Maps XML json item (array or element) to JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile
 */
function mapJsonItem(
  itemXml: any
): JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile {
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

  // Map optional name
  if (arrayXml.name?.[0]) {
    array.name = arrayXml.name[0];
  }

  // Map optional nested items
  if (arrayXml.items && Array.isArray(arrayXml.items)) {
    array.items = arrayXml.items.map((item: any) => mapJsonItem(item));
  }

  return array;
}

/**
 * Maps XML json element to JSonElemFunctionalProfile model
 */
function mapJsonElement(elementXml: any): JSonElemFunctionalProfile {
  const key = elementXml.key?.[0] || "";

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
