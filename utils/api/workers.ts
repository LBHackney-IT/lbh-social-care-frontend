import useSWR, { SWRResponse } from 'swr';
import { Worker, ErrorAPI } from 'types';
import { getQueryString } from 'utils/urls';

export const useWorkerById = (id: number): SWRResponse<Worker[], ErrorAPI> =>
  useSWR(`/api/workers/${id}`);

export const useWorker = (
  params:
    | {
        email: string;
      }
    | undefined
): SWRResponse<Worker[], ErrorAPI> =>
  useSWR(params ? `/api/workers?${getQueryString(params)}` : null);
