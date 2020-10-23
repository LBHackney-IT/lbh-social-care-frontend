import axios from 'axios';

const {
  ENDPOINT_API,
  ENDPOINT_MOSAIC,
  AWS_KEY,
  AWS_AUTHORIZATION,
} = process.env;

export const getResidents = async (params) => {
  const { data } = await axios.get(`${ENDPOINT_API}/residents`, {
    headers: {
      'x-api-key': AWS_KEY,
    },
    params,
  });
  return data.residents;
};

export const getResident = async (id) => {
  const { data } = await axios.get(`${ENDPOINT_MOSAIC}/residents/${id}`, {
    headers: {
      Authorization: AWS_AUTHORIZATION,
    },
  });
  return data;
};
