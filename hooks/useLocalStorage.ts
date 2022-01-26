import { useEffect, useState } from 'react';

/** like useState, but it persists the value in localStorage using a specified key, so we can remember user preferences over time */
function useLocalStorage<T>(
  key: string,
  initialValue?: T
): [T, (newVal: T) => void] {
  const getValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (e) {
      return initialValue;
    }
  };

  const [value, setValue] = useState<T>(getValue());

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export default useLocalStorage;
