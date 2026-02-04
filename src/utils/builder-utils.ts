/**
 * Utility functions for building xml2js compatible XML objects from models.
 */

/**
 * Wraps a value in an array for xml2js format.
 */
export function wrapInArray<T>(value: T): T[] {
  return [value];
}

/**
 * Sets an optional field on an XML object if the value is defined.
 * @param xmlObject - The XML object to modify
 * @param field - The field name
 * @param value - The value to set
 */
export function setOptionalXmlField(xmlObject: Record<string, unknown>, field: string, value: unknown): void {
  if (value !== undefined && value !== null) {
    xmlObject[field] = wrapInArray(value);
  }
}

/**
 * Sets an optional array field on an XML object if the array has items.
 * @param xmlObject - The XML object to modify
 * @param field - The field name
 * @param array - The array to set
 */
export function setOptionalXmlArray<T>(
  xmlObject: Record<string, unknown>,
  field: string,
  array: T[] | undefined
): void {
  if (array && array.length > 0) {
    xmlObject[field] = array;
  }
}

/**
 * Builds a simple data type XML element as a self-closing tag.
 * @param typeName - The type name (e.g., "float64", "string")
 * @returns XML object with the type as a key
 */
export function buildSimpleDataType(typeName: string): Record<string, string[]> {
  return { [typeName]: [""] };
}
