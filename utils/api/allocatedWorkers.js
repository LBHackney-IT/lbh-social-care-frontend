import axios from 'axios';

export const getASCAllocatedWorkers = async (params) => {
  const { data } = await axios.get('/api/asc-allocations', {
    params,
  });
  return data;
};

export const addAscAllocatedWorker = async (formData) => {
  const { data } = await axios.post(`/api/asc-allocations`, formData);
  return data;
};
