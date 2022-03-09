import { useSWRInfinite, SWRInfiniteResponse } from 'swr';

import { getInfiniteKey } from 'utils/api';

export const SearchPerson = (
  params: Record<string, unknown>,
  invoke = true
): SWRInfiniteResponse<Record<string, unknown>, Error> => {
  console.log('searchPerson utils/api ', params);
  return useSWRInfinite(
    // @ts-ignore
    invoke ? getInfiniteKey('/api/search/person', 'person', params) : null
  );
};
