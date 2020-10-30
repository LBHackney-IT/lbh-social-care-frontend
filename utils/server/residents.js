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

export const getResidents = async (params) => {
  const { data } = await axios.get(`${ENDPOINT_API}/residents`, {
    headers: headersWithKey,
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
  const { data } = await axios.get(`${ENDPOINT_API}/residents/cases`, {
    headers: headersWithKey,
    params: { mosaic_id },
  });
  return data.cases;
};
