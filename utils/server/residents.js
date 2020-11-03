import axios from 'axios';

const {
  ENDPOINT_API,
  ENDPOINT_MOSAIC,
  AWS_KEY,
  AWS_AUTHORIZATION,
} = process.env;

const headersWithKey = {
  'x-api-key': AWS_KEY,
};

const headersWithKeyAndContent = {
  'Content-Type': 'application/json',
  'x-api-key': AWS_KEY,
};

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

export const getResidentCases = async (mosaic_id) => {
  const { data } = await axios.get(`${ENDPOINT_API}/cases`, {
    headers: headersWithKey,
    params: { mosaic_id },
  });
  return data.cases;
};

export const postResidentCase = async (mosaic_id, formData) => {
  const { data } = await axios.post(
    `${ENDPOINT_API}/cases?mosaic_id=${mosaic_id}`,
    formData,
    {
      headers: headersWithKeyAndContent,
    }
  );
  return data;
};
