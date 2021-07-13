import { useMemo } from 'react';
import Fuse from 'fuse.js';

/** use client-side search */
const useSearch = <Haystack>(
  needle: string,
  haystack: Haystack[],
  keysToSearch: string[],
  options?: any,
  minimumCharacters?: number
): Haystack[] => {
  const index = useMemo(
    () =>
      new Fuse(haystack, {
        includeScore: true,
        keys: keysToSearch,
        ...options,
      }),
    [haystack, keysToSearch, options]
  );

  if (needle.length > (minimumCharacters || 2)) {
    return index.search(needle).map((result) => result.item);
  }

  return haystack;
};

export default useSearch;
