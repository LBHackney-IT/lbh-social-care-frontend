import useSWR from 'swr';
import axios from 'axios';

export const useAllocatedWorkers = (id) =>
  useSWR(`/api/residents/${id}/allocations`);

export const useResidentAllocation = (id, allocationId) =>
  useSWR(`/api/residents/${id}/allocations/${allocationId}`);

export const useTeams = ({ ageContext } = {}) =>
  useSWR(`/api/teams${ageContext ? '?ageContext=' + ageContext : ''}`);

export const useTeamWorkers = (teamId) =>
  useSWR(teamId ? `/api/teams/${teamId}/workers` : null);

export const useAllocationsByWorker = (workerId) =>
  useSWR(`/api/workers/${workerId}/allocations`);

export const deleteAllocatedWorker = async (residentId, body) => {
  const { data } = await axios.patch(
    `/api/residents/${residentId}/allocations`,
    body
  );
  return data;
};

export const addAllocatedWorker = async (residentId, body) => {
  const { data } = await axios.post(
    `/api/residents/${residentId}/allocations`,
    body
  );
  return data;
};
