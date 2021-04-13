import useSWR, { SWRResponse } from 'swr';
import { Worker, ErrorAPI } from 'types';
import { getQueryString } from 'utils/urls';

export const useWorker = (params: {
  email: string;
}): SWRResponse<Worker, ErrorAPI> =>
  useSWR(params ? `/api/workers?${getQueryString(params)}` : null);
