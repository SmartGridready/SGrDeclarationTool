/**
 * Common utility functions for building XML objects from models
 * These utilities handle common patterns when building from TypeScript models
 * to xml2js compatible XML objects.
 */

/**
 * Wraps a value in an array (xml2js format requirement)
 * xml2js expects all XML element values to be arrays
 */
export function wrapInArray<T>(value: T): T[] {
  return [value];
}

/**
 * Conditionally includes a field in an XML object if the value is defined
 * @param xmlObject - The XML object to add the field to
 * @param field - The field name
 * @param value - The value to include (if defined)
 */
export function setOptionalXmlField(
  xmlObject: Record<string, unknown>,
  field: string,
  value: unknown
): void {
  if (value !== undefined && value !== null) {
    xmlObject[field] = wrapInArray(value);
  }
}

/**
 * Conditionally includes an array field in an XML object if the array has items
 * @param xmlObject - The XML object to add the field to
 * @param field - The field name
 * @param array - The array to include (if it has items)
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
 * Builds a simple data type XML element
 * The XML structure uses nested elements like <float64 /> instead of a string value
 * @param typeName - The type name (e.g., "float64", "string")
 * @returns XML object with the type as a key
 */
export function buildSimpleDataType(typeName: string): Record<string, string[]> {
  // Return an object with the typeName as a key with empty string value
  // xml2js will render this as a self-closing tag like <float64 />
  return { [typeName]: [""] };
}
