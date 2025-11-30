import {
  JSonOutputFunctionalProfile,
  JSonArrayOutputFunctionalProfile,
  JSonElemFunctionalProfile,
} from "@/models";
import {
  mapOptionalArray,
  getOptionalStringValue,
  getStringValue,
  setOptionalField,
} from "@/sections/shared/utils/mapper-utils";
/**
 * Maps XML json dataType to JSonOutputFunctionalProfile model
 */
export function mapJsonDataType(jsonXml: any): JSonOutputFunctionalProfile {
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
