import useSWR, { SWRResponse, useSWRInfinite, SWRInfiniteResponse } from 'swr';
import axios from 'axios';
import { getInfiniteKey } from 'utils/api';
import { getQueryString } from 'utils/urls';

import type {
  AgeContext,
  Allocation,
  AllocationData,
  ErrorAPI,
  TeamData,
  Worker,
  WorkerAllocation,
} from 'types';

export const useAllocatedWorkers = (
  id: number
): SWRResponse<AllocationData, ErrorAPI> =>
  useSWR(`/api/residents/${id}/allocations`);

export const useResidentAllocation = (
  id: number,
  allocationId: number
): SWRResponse<Allocation, ErrorAPI> =>
  useSWR(`/api/residents/${id}/allocations/${allocationId}`);

export const useTeams = ({
  ageContext,
}: {
  ageContext: AgeContext;
}): SWRResponse<TeamData, ErrorAPI> =>
  useSWR(`/api/teams${ageContext ? '?ageContext=' + ageContext : ''}`);

export const useTeamWorkers = (
  teamId?: number
): SWRResponse<Worker[], ErrorAPI> =>
  useSWR(teamId ? `/api/teams/${teamId}/workers` : null);

export const useAllocationsByWorker = (
  workerId: number,
  parameters: Record<string, unknown> = {}
): SWRResponse<WorkerAllocation, ErrorAPI> => {
  const requestParameters = Object.keys(parameters).length
    ? `?${getQueryString(parameters)}`
    : '';
  return useSWR(`/api/workers/${workerId}/allocations${requestParameters}`);
};

export const useAllocationsByTeam = (
  teamId: number,
  parameters?: Record<string, unknown>
): SWRInfiniteResponse<AllocationData, Error> =>
  // @ts-ignore
  useSWRInfinite(
    // @ts-ignore
    getInfiniteKey(
      // @ts-ignore
      `/api/teams/${teamId}/allocations`,
      'allocations',
      // @ts-ignore
      parameters
    )
  );

export const deleteAllocation = async (
  residentId: number,
  body: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const { data } = await axios.patch(
    `/api/residents/${residentId}/allocations`,
    body
  );
  return data;
};

export const addAllocatedWorker = async (
  residentId: number,
  body: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const { data } = await axios.post(
    `/api/residents/${residentId}/allocations`,
    body
  );
  return data;
};

export const addWorkerToAllocation = async (
  type: string,
  residentId: number,
  body: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const { data } = await axios.post(
    `/api/residents/${residentId}/allocations?type=${type}`,
    body
  );
  return data;
};
export const deallocateTeamWorker = async (
  residentId: number,
  body: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const { data } = await axios.patch(
    `/api/residents/${residentId}/allocations?type=deallocate`,
    body
  );
  return data;
};

export const patchAllocation = async (
  residentId: number,
  body: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const { data } = await axios.patch(
    `/api/residents/${residentId}/allocations?type=edit`,
    body
  );
  return data;
};
