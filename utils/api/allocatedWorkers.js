import axios from 'axios';

export const getAllocatedWorkers = async (params) => {
  const { data } = await axios.get('/api/allocated-workers', {
    params,
  });
  return data;
};

export const addAllocatedWorkers = async (formData) => {
  const { data } = await axios.post(`/api/allocated-workers`, formData);
  return data;
};
