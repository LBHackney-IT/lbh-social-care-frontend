import axios from 'axios';
import useSWR, { SWRResponse } from 'swr';
import { Worker, ErrorAPI } from 'types';
import { getQueryString } from 'utils/urls';

export const useWorker = (
  params:
    | {
        email: string;
      }
    | undefined
): SWRResponse<Worker[], ErrorAPI> =>
  useSWR(
    params ? `/api/workers?${getQueryString(params)}` : null
    // (resource, options) => axios.get(resource, options).then((res) => res.data),
    // {
    //   onErrorRetry: (error) => {
    //     if (error.status === 404) return error;
    //   },
    // }
  );
