/**
 * Common utility functions for XML to model mapping
 * These utilities handle the common patterns when mapping from xml2js parsed XML
 * to TypeScript model objects.
 */

/**
 * Type representing XML structure parsed by xml2js
 * xml2js converts XML elements to arrays, so each field is an array
 */
type Xml2JsValue = string | number | boolean | Xml2JsObject | Xml2JsValue[];
export type Xml2JsObject = Record<string, Xml2JsValue[]>;

/**
 * Extracts a string value from XML array format (xml2js uses arrays)
 * @param xml - The XML object
 * @param field - The field name to extract
 * @param defaultValue - Default value if field is missing or empty
 * @returns The string value or default
 */
export function getStringValue(xml: Xml2JsObject | undefined, field: string, defaultValue: string = ""): string {
  const value = xml?.[field]?.[0];
  return typeof value === "string" ? value : defaultValue;
}

/**
 * Extracts an optional string value from XML array format
 * @param xml - The XML object
 * @param field - The field name to extract
 * @returns The string value or undefined
 */
export function getOptionalStringValue(xml: Xml2JsObject | undefined, field: string): string | undefined {
  const value = xml?.[field]?.[0];
  return typeof value === "string" ? value : undefined;
}

/**
 * Extracts a number value from XML array format
 * @param xml - The XML object
 * @param field - The field name to extract
 * @param defaultValue - Default value if field is missing or invalid
 * @returns The parsed number or default
 * @note Uses parseFloat to handle both integers and decimal numbers
 */
export function getNumberValue(xml: Xml2JsObject | undefined, field: string, defaultValue: number = 0): number {
  const value = xml?.[field]?.[0];
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }
  const parsed = parseFloat(String(value));
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Extracts an optional number value from XML array format
 * @param xml - The XML object
 * @param field - The field name to extract
 * @returns The parsed number or undefined
 * @note Uses parseFloat to handle both integers and decimal numbers
 */
export function getOptionalNumberValue(xml: Xml2JsObject | undefined, field: string): number | undefined {
  const value = xml?.[field]?.[0];
  if (value === undefined || value === null || value === "") {
    return undefined;
  }
  const parsed = parseFloat(String(value));
  return isNaN(parsed) ? undefined : parsed;
}

/**
 * Extracts a typed value (enum/union type) from XML array format
 * @param xml - The XML object
 * @param field - The field name to extract
 * @param defaultValue - Default value if field is missing
 * @returns The typed value or default
 */
export function getTypedValue<T>(xml: Xml2JsObject | undefined, field: string, defaultValue: T): T {
  const value = xml?.[field]?.[0];
  return (value as T) || defaultValue;
}

/**
 * Extracts an optional typed value from XML array format
 * @param xml - The XML object
 * @param field - The field name to extract
 * @returns The typed value or undefined
 */
export function getOptionalTypedValue<T>(xml: Xml2JsObject | undefined, field: string): T | undefined {
  const value = xml?.[field]?.[0];
  return value ? (value as T) : undefined;
}

/**
 * Extracts an array from XML and maps it using a mapper function
 * @param xml - The XML object
 * @param field - The field name containing the array
 * @param mapper - Function to map each array element
 * @param defaultValue - Default value if field is missing or not an array
 * @returns Mapped array or default
 */
export function mapArray<T>(
  xml: Xml2JsObject | undefined,
  field: string,
  mapper: (item: Xml2JsObject) => T,
  defaultValue: T[] = []
): T[] {
  const array = xml?.[field];
  if (!Array.isArray(array)) {
    return defaultValue;
  }
  const filtered = array.filter(
    (item): item is Xml2JsObject => typeof item === "object" && item !== null && !Array.isArray(item)
  );
  return filtered.map(mapper);
}

/**
 * Extracts an optional array from XML and maps it using a mapper function
 * @param xml - The XML object
 * @param field - The field name containing the array
 * @param mapper - Function to map each array element
 * @returns Mapped array or undefined
 */
export function mapOptionalArray<T>(
  xml: Xml2JsObject | undefined,
  field: string,
  mapper: (item: Xml2JsObject) => T
): T[] | undefined {
  const array = xml?.[field];
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }
  const mapped = array
    .filter((item): item is Xml2JsObject => typeof item === "object" && item !== null && !Array.isArray(item))
    .map(mapper);
  return mapped.length > 0 ? mapped : undefined;
}

/**
 * Extracts the first element from an XML array (common pattern for single elements)
 * @param xml - The XML object
 * @param field - The field name
 * @returns The first element or undefined
 */
export function getFirstElement(xml: Xml2JsObject | undefined, field: string): Xml2JsObject | undefined {
  const array = xml?.[field];
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }
  const first = array[0];
  return typeof first === "object" && first !== null && !Array.isArray(first) ? (first as Xml2JsObject) : undefined;
}

/**
 * Checks if a field exists and has a value in XML
 * @param xml - The XML object
 * @param field - The field name to check
 * @returns True if field exists and has a value
 */
export function hasValue(xml: Xml2JsObject | undefined, field: string): boolean {
  const value = xml?.[field];
  if (Array.isArray(value)) {
    return value.length > 0 && value[0] !== undefined && value[0] !== null && value[0] !== "";
  }
  return value !== undefined && value !== null && value !== "";
}

/**
 * Conditionally sets an optional field on an object if the value is defined
 * @param obj - The object to set the field on
 * @param field - The field name
 * @param value - The value to set (if defined)
 */
export function setOptionalField<T extends object>(obj: T, field: keyof T, value: unknown): void {
  if (value !== undefined && value !== null) {
    (obj as Record<string, unknown>)[field as string] = value;
  }
}

/**
 * Maps simple data types (boolean, int8, int16, etc.) from XML
 * @param dataTypeXml - The XML dataType object
 * @param typeMap - Map of type names to their corresponding model objects
 * @param defaultValue - Default value if no type is found
 * @returns The mapped data type or default
 */
export function mapSimpleDataType<T>(
  dataTypeXml: Xml2JsObject | undefined,
  typeMap: Record<string, T>,
  defaultValue: T
): T {
  if (!dataTypeXml) {
    return defaultValue;
  }

  for (const [key, value] of Object.entries(typeMap)) {
    if (dataTypeXml[key] !== undefined) {
      return value;
    }
  }

  return defaultValue;
}
