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

export const addResident = async (formData) => {
  const { data } = await axios.post(`/api/residents`, formData);
  return data;
};
