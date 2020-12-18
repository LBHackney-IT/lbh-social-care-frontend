import axios from 'axios';

const { ENDPOINT_API, AWS_KEY } = process.env;

const headers = { 'x-api-key': AWS_KEY };

export const getResidents = async (params) => {
  const { data } = await axios.get(`${ENDPOINT_API}/residents`, {
    headers,
    params,
  });
  return data;
};

export const getResident = async (id, params) => {
  const { data } = await axios.get(`${ENDPOINT_API}/residents`, {
    headers,
    params: { mosaic_id: id, ...params },
  });
  return data?.residents?.[0];
};

export const addResident = async (formData) => {
  const { data } = await axios.post(`${ENDPOINT_API}/residents`, formData, {
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
  return data;
};
