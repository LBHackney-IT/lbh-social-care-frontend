import axios from 'axios';

export const getCases = async (params) => {
  const { data } = await axios.get('/api/cases', {
    params,
  });
  return data;
};

export const getCasesByResident = async (id, params) => {
  const { data } = await axios.get(`/api/residents/${id}/cases`, {
    params,
  });
  return data;
};

export const addCase = async (formData) => {
  const { data } = await axios.post(`/api/cases`, formData);
  return data;
};
