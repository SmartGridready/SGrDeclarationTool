import { FunctionalProfileFrame } from "@/models";

/**
 * Common store state type used by all slices
 */
export type SliceStoreState = {
  profile?: FunctionalProfileFrame;
};

/**
 * Common set state function type used by all slices
 */
export type SetState = (fn: (state: SliceStoreState) => void) => void;

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

/**
 * Helper to safely update an array item
 */
export function updateArrayItem<T>(
  array: T[] | undefined,
  index: number,
  updater: (item: T) => void
): void {
  if (array && index >= 0 && index < array.length) {
    updater(array[index]);
  }
}

/**
 * Helper to safely get a data point by index
 */
export function getDataPoint(state: SliceStoreState, index: number) {
  return state.profile?.dataPointList?.dataPointListElement?.[index];
}

/**
 * Factory function to create a field updater that normalizes strings
 */
export function createStringFieldUpdater<T>(
  getter: (state: SliceStoreState) => T | undefined,
  setter: (state: SliceStoreState, value: string | undefined) => void
) {
  return (value: string | undefined) => {
    const normalized = normalizeString(value);
    return (state: SliceStoreState) => {
      const target = getter(state);
      if (target) {
        setter(state, normalized);
      }
    };
  };
}

/**
 * Factory function to create a simple field updater
 */
export function createFieldUpdater<TValue, TTarget>(
  getter: (state: SliceStoreState) => TTarget | undefined,
  setter: (target: TTarget, value: TValue) => void
) {
  return (value: TValue) => {
    return (state: SliceStoreState) => {
      const target = getter(state);
      if (target && value !== undefined) {
        setter(target, value);
      }
    };
  };
}

/**
 * Factory function to create an array item updater
 */
export function createArrayItemUpdater<T>(
  getArray: (state: SliceStoreState) => T[] | undefined,
  updater: (item: T) => void
) {
  return (index: number) => {
    return (state: SliceStoreState) => {
      updateArrayItem(getArray(state), index, updater);
    };
  };
}
