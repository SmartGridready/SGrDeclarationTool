/**
 * Normalizes a string value, returning undefined for empty strings.
 */
export function normalizeString(value: string | undefined): string | undefined {
  return !value || value.trim() === "" ? undefined : value;
}

/**
 * Ensures an array exists, initializing it if undefined.
 */
export function ensureArray<T>(array: T[] | undefined, init: () => T[]): T[] {
  if (!array) {
    return init();
  }
  return array;
}

/**
 * Removes an item from an array and optionally calls a callback when empty.
 */
export function removeArrayItem<T>(array: T[] | undefined, index: number, onEmpty?: () => void): void {
  if (array && index >= 0 && index < array.length) {
    array.splice(index, 1);
    if (array.length === 0 && onEmpty) {
      onEmpty();
    }
  }
}
