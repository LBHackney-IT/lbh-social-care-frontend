import axios from 'axios';

export const getResidents = async (params) => {
  const { data } = await axios.get('/api/residents', {
    params,
  });
  return data;
};

export const getResident = async (id, params) => {
  const { data } = await axios.get(`/api/residents/${id}`, {
    params,
  });
  return data;
};

export const getResidentCases = async (id) => {
  const { data } = await axios.get(`/api/residents/${id}/cases`);
  return data;
};

export const postResidentCase = async (id, formData) => {
  const { data } = await axios.post(`/api/residents/${id}/cases`, formData);
  return data;
};
