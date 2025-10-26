import { useState, useCallback } from 'react';

/**
 * Custom Hook: useToggle
 * Maneja estados booleanos de forma sencilla
 */
export function useToggle(initialValue: boolean = false): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  // useCallback para memorizar la función toggle
  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  // useCallback para memorizar la función setToggle
  const setToggle = useCallback((newValue: boolean) => {
    setValue(newValue);
  }, []);

  return [value, toggle, setToggle];
}

