import axios from 'axios';

export const getAllocatedWorkers = async (id) => {
  const { data } = await axios.get(`/api/residents/${id}/allocated-workers`);
  return data;
};

export const addAllocatedWorker = async (residentId, body) => {
  const { data } = await axios.post(
    `/api/residents/${residentId}/allocated-workers`,
    body
  );
  return data;
};

export const getTeams = async () => {
  const { data } = await axios.get(`/api/teams`);
  return data;
};

export const getTeamWorkers = async (teamId) => {
  const { data } = await axios.get(`/api/teams/${teamId}/workers`);
  return data;
};
