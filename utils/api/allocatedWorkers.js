import axios from 'axios';

export const getAllocatedWorkers = async (id) => {
  const { data } = await axios.get(`/api/residents/${id}/allocated-workers`);
  return data;
};

export const addAllocatedWorkers = async (formData) => {
  const { data } = await axios.post(
    `/api/residents/allocated-workers`,
    formData
  );
  return data;
};
