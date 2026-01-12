import { useCallback, useRef, useEffect } from "react";

/**
 * Creates a debounced callback that delays execution until after wait milliseconds
 * have elapsed since the last time it was invoked.
 *
 * @param callback - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns A debounced version of the callback
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => void>(callback: T, wait: number = 300): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  // Keep callback ref up to date
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, wait);
    }) as T,
    [wait]
  );

  return debouncedCallback;
}
