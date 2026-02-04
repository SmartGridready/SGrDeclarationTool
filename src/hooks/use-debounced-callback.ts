import { useCallback, useRef, useEffect } from "react";

/**
 * Creates a debounced callback that delays execution until after the wait period.
 * @param callback - The function to debounce
 * @param wait - Delay in milliseconds (default: 300)
 * @returns Debounced version of the callback
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => void>(callback: T, wait: number = 300): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

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
