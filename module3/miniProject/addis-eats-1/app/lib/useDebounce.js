"use client";

import { useState, useEffect } from "react";

/**
 * useDebounce hook
 * Delays updating the debounced value until after delay ms have passed
 * since the last time the value changed.
 *
 * @param {any} value - The input value to debounce
 * @param {number} delay - The debounce delay in milliseconds (default 300ms)
 * @returns {any} The debounced value
 */
export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
