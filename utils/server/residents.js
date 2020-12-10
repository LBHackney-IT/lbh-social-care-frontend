import axios from 'axios';

const {
  ENDPOINT_MOSAIC,
  ENDPOINT_API,
  AWS_AUTHORIZATION,
  AWS_KEY,
} = process.env;

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

export const addResident = async (formData) => {
  const { data } = await axios.post(`${ENDPOINT_API}/residents`, formData, {
    headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
  });
  return { ref: data?.['_id'] };
};
