/**
 * Converts a const array to form options with matching label and value.
 */
export function createFormOptions<T extends readonly string[]>(
  values: T
): Array<{ value: T[number]; label: T[number] }> {
  return values.map((value) => ({ value, label: value }));
}
