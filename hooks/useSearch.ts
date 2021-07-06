import { useMemo } from 'react';
import Fuse from 'fuse.js';

/** use client-side search */
const useSearch = <Haystack>(
  needle: string,
  haystack: Haystack[],
  keysToSearch: string[],
  minimumCharacters?: number
): Haystack[] => {
  const index = useMemo(
    () =>
      new Fuse(haystack, {
        includeScore: true,
        keys: keysToSearch,
      }),
    [haystack, keysToSearch]
  );

  if (needle.length > (minimumCharacters || 2)) {
    return index.search(needle).map((result) => result.item);
  }

  return haystack;
};

export default useSearch;
