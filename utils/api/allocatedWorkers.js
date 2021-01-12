import axios from 'axios';

export const getAllocatedWorkers = async (id) => {
  const { data } = await axios.get(`/api/residents/${id}/allocated-workers`);
  return data;
};

export const deleteAllocatedWorkers = async (id, formData) => {
  const { data } = await axios.patch(
    `/api/residents/${id}/allocated-workers`,
    formData
  );
  return data;
};
