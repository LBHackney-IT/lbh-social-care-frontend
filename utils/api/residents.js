import axios from 'axios';

export const getResidents = async (params) => {
  const { data } = await axios.get('/api/residents', {
    params,
  });
  return data;
};

export const getResident = async (id) => {
  const { data } = await axios.get(`/api/residents/${id}`);
  return data;
};
