import axios from 'axios';

export const getAllocatedWorkers = async (id) => {
  const { data } = await axios.get(`/api/residents/${id}/allocated-workers`);
  return data;
};

export const deleteAllocatedWorkers = async (formData) => {
  const { data } = await axios.patch(`/api/allocated-workers`, formData);
  return data;
};
