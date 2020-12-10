import axios from 'axios';

const { ENDPOINT_MOSAIC, AWS_AUTHORIZATION } = process.env;

export const getResidents = async (params) => {
  const { data } = await axios.get(`${ENDPOINT_MOSAIC}/residents`, {
    headers: {
      Authorization: AWS_AUTHORIZATION,
    },
    params,
  });
  return data;
};

export const getResident = async (id, params) => {
  const { data } = await axios.get(`${ENDPOINT_MOSAIC}/residents/${id}`, {
    headers: {
      Authorization: AWS_AUTHORIZATION,
    },
    params,
  });
  return data;
};
