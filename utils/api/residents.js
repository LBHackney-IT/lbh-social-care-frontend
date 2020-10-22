import axios from 'axios';

const { AWS_ENDPOINT, AWS_SECRET, API_RESIDENTS } = process.env;

const headers = {
  Authorization: AWS_SECRET,
};

export const getResidents = async (params) => {
  const { data } = await axios.get(`${AWS_ENDPOINT}${API_RESIDENTS}`, {
    headers,
    params,
  });
  return data.residents;
};

export const getResident = async (id) => {
  const { data } = await axios.get(`${AWS_ENDPOINT}${API_RESIDENTS}/${id}`, {
    headers,
  });
  return data;
};
