import { useSWRInfinite, SWRInfiniteResponse } from 'swr';

import { getInfiniteKey } from 'utils/api';

export const SearchPerson = (
  params: Record<string, unknown>,
  invoke = true
): SWRInfiniteResponse<Record<string, unknown>, Error> => {
  return useSWRInfinite(
    // @ts-ignore
    invoke ? getInfiniteKey('/api/search/person', 'residents', params) : null
  );
};
