/**
 * Helper to normalize string values (empty strings become undefined)
 */
export function normalizeString(value: string | undefined): string | undefined {
  return !value || value.trim() === "" ? undefined : value;
}

/**
 * Helper to ensure an array exists and return it
 */
export function ensureArray<T>(array: T[] | undefined, init: () => T[]): T[] {
  if (!array) {
    return init();
  }
  return array;
}

/**
 * Helper to safely remove an item from an array and clean up if empty
 */
export function removeArrayItem<T>(
  array: T[] | undefined,
  index: number,
  onEmpty?: () => void
): void {
  if (array && index >= 0 && index < array.length) {
    array.splice(index, 1);
    if (array.length === 0 && onEmpty) {
      onEmpty();
    }
  }
}
