import axios from 'axios';

const { ENDPOINT_RESIDENTS, AWS_AUTHORIZATION } = process.env;

const headers = {
  Authorization: AWS_AUTHORIZATION,
};

export const getResidents = async (params) => {
  const { data } = await axios.get(ENDPOINT_RESIDENTS, {
    headers,
    params,
  });
  return data.residents;
};

export const getResident = async (id) => {
  const { data } = await axios.get(`${ENDPOINT_RESIDENTS}/${id}`, {
    headers,
  });
  return data;
};
