/**
 * Utilities for working with JSON data types
 */

import { JSonArrayOutputFunctionalProfile, JSonElemFunctionalProfile } from "@/models";

/**
 * Type guard to check if a JSON item is an array
 */
export function isJsonArray(
  item: JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile
): item is JSonArrayOutputFunctionalProfile {
  return "name" in item;
}

/**
 * Type guard to check if a JSON item is an element
 */
export function isJsonElement(
  item: JSonArrayOutputFunctionalProfile | JSonElemFunctionalProfile
): item is JSonElemFunctionalProfile {
  return "key" in item;
}

/**
 * Gets the element type (string, number, or date) from a JSON element
 */
export function getJsonElementType(
  element: JSonElemFunctionalProfile
): "string" | "number" | "date" {
  if ("string" in element) return "string";
  if ("number" in element) return "number";
  return "date";
}

/**
 * Creates a JSON element with the specified type
 */
export function createJsonElement(
  key: string,
  type: "string" | "number" | "date"
): JSonElemFunctionalProfile {
  switch (type) {
    case "string":
      return { key, string: "" };
    case "number":
      return { key, number: "" };
    case "date":
      return { key, date: "" };
  }
}

/**
 * Creates an empty JSON array
 */
export function createJsonArray(name: string = ""): JSonArrayOutputFunctionalProfile {
  return { name };
}

/**
 * Creates an empty JSON element
 */
export function createEmptyJsonElement(): JSonElemFunctionalProfile {
  return { key: "", string: "" };
}

/**
 * JSON element type options for select fields
 */
export const JSON_ELEMENT_TYPE_OPTIONS = [
  { value: "string", label: "String" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
] as const;
