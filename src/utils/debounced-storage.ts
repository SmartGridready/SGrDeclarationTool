import { createJSONStorage, type PersistStorage } from "zustand/middleware";

/**
 * Creates a debounced localStorage adapter for Zustand persist.
 * Prevents performance issues by batching writes after state changes settle.
 * @param delayMs - Debounce delay in milliseconds (default: 1000ms)
 * @returns Debounced storage adapter
 */
export function createDebouncedStorage<T>(delayMs: number = 1000): PersistStorage<T> {
  const timeouts = new Map<string, NodeJS.Timeout>();

  const baseStorage = createJSONStorage<T>(() => ({
    getItem: (name: string): string | null => {
      return localStorage.getItem(name);
    },
    setItem: (name: string, value: string): void => {
      const existingTimeout = timeouts.get(name);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
      }

      const timeout = setTimeout(() => {
        localStorage.setItem(name, value);
        timeouts.delete(name);
      }, delayMs);

      timeouts.set(name, timeout);
    },
    removeItem: (name: string): void => {
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
 * Creates a debounced storage with default 1000ms delay.
 */
export function debouncedStorage<T>(): PersistStorage<T> {
  return createDebouncedStorage<T>(1000);
}
