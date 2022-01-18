import useSWR, { SWRResponse } from 'swr';
import { Worker, ErrorAPI, WorkerSearchResult } from 'types';
import { getQueryString } from 'utils/urls';
import axios from 'axios';

export const useWorkerById = (id: number): SWRResponse<Worker, ErrorAPI> =>
  useSWR(`/api/workers/${id}`);

export const useWorker = (
  params:
    | {
        email: string;
      }
    | undefined
): SWRResponse<Worker[], ErrorAPI> =>
  useSWR(params ? `/api/workers?${getQueryString(params)}` : null);

export const addWorker = async (
  formData: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const { data } = await axios.post(`/api/workers`, formData);
  return { ref: data?.id, data };
};

export const updateWorker = async (
  workerId: number,
  formData: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const { data } = await axios.patch(`/api/workers/${workerId}`, formData);
  return { ref: data?.id, data };
};

export const useWorkersSearch = (
  workerName: string
): SWRResponse<WorkerSearchResult[], ErrorAPI> =>
  useSWR(workerName ? `/api/workersearch?workerName=${workerName}` : null);
