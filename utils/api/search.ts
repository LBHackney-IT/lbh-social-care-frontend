import { useSWRInfinite, SWRInfiniteResponse } from 'swr';

import { getInfiniteKey } from 'utils/api';

export const SearchPerson = (
  params: Record<string, unknown>,
  invoke = true
): SWRInfiniteResponse<Record<string, unknown>, Error> => {
  const internal_params = Object.assign({}, params);

  if (internal_params.first_name || internal_params.last_name) {
    const first_name = internal_params.first_name;
    const last_name = internal_params.last_name;

    delete internal_params.first_name;
    delete internal_params.last_name;

    internal_params.name = `${first_name ?? ''} ${last_name ?? ''}`;
  }

  return useSWRInfinite(
    // @ts-ignore
    invoke
      ? getInfiniteKey('/api/search/person', 'residents', internal_params)
      : null
  );
};
