import { createJSONStorage, type PersistStorage, type StorageValue } from "zustand/middleware";

/**
 * Creates a debounced localStorage adapter that wraps Zustand's createJSONStorage.
 * This prevents performance issues caused by synchronous localStorage.setItem() calls
 * on every state update (keystroke).
 *
 * The debounce ensures that writes only happen after the user has stopped making changes
 * for the specified delay period, reducing the number of expensive JSON.stringify() and
 * localStorage operations.
 *
 * @param delayMs - Debounce delay in milliseconds (default: 1000ms)
 */
export function createDebouncedStorage<T>(delayMs: number = 1000): PersistStorage<T> {
  const timeouts = new Map<string, NodeJS.Timeout>();

  // Create the base JSON storage
  const baseStorage = createJSONStorage<T>(() => ({
    getItem: (name: string): string | null => {
      return localStorage.getItem(name);
    },
    setItem: (name: string, value: string): void => {
      // Clear any existing timeout for this key
      const existingTimeout = timeouts.get(name);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
      }

      // Set a new debounced write
      const timeout = setTimeout(() => {
        localStorage.setItem(name, value);
        timeouts.delete(name);
      }, delayMs);

      timeouts.set(name, timeout);
    },
    removeItem: (name: string): void => {
      // Clear any pending timeout
      const existingTimeout = timeouts.get(name);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
        timeouts.delete(name);
      }

      localStorage.removeItem(name);
    },
  }));

  return baseStorage as PersistStorage<T>;
}

/**
 * Creates a debounced storage for use with Zustand persist.
 * Call this function to get a typed storage instance.
 *
 * @example
 * persist(store, {
 *   name: "my-storage",
 *   storage: createDebouncedStorage<MyState>(),
 * })
 */
export function debouncedStorage<T>(): PersistStorage<T> {
  return createDebouncedStorage<T>(1000);
}
