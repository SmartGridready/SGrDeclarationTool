/**
 * Helper function to convert const arrays to form options
 * The label will be 1:1 with the value
 */
export function createFormOptions<T extends readonly string[]>(
  values: T
): Array<{ value: T[number]; label: T[number] }> {
  return values.map((value) => ({ value, label: value }));
}
