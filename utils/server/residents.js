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
  'x-api-key': AWS_KEY,
  'Content-Type': 'application/json',
};

export const getResidents = async (params) => {
  const { data } = await axios.get(`${ENDPOINT_MOSAIC}/residents`, {
    headers: {
      Authorization: AWS_AUTHORIZATION,
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

export const getResidentCases = async (mosaic_id) => {
  const { data } = await axios.get(`${ENDPOINT_API}/cases`, {
    headers: headersWithKey,
    params: { mosaic_id },
  });
  return data.cases;
};

export const postResidentCase = async (mosaic_id, formData) => {
  const { data } = await axios.post(
    `${ENDPOINT_API}/residents/cases?mosaic_id=${mosaic_id}`,
    {
      body: formData,
    },
    {
      headers: headersWithKeyAndContent,
    }
  );
  return data?.id;
};
