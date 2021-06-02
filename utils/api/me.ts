import useSWR, { SWRResponse } from 'swr';

import type { Allocation, ErrorAPI, Worker, User } from 'types';

interface MyData extends Worker {
  allocations: Allocation[];
  auth: User;
}

export const useMyData = (): SWRResponse<MyData, ErrorAPI> => useSWR(`/api/me`);
