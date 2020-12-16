import axios from 'axios';

const { ENDPOINT_API, AWS_KEY } = process.env;

const headersWithKey = {
  'x-api-key': AWS_KEY,
};

export const getCases = async (params) => {
  const { data } = await axios.get(`${ENDPOINT_API}/cases`, {
    headers: headersWithKey,
    params: params,
  });

  return data;
};

export const getResidentCases = async (mosaic_id) => {
  const { data } = await axios.get(`${ENDPOINT_API}/cases`, {
    headers: { 'x-api-key': AWS_KEY },
    params: { mosaic_id },
  });
  return data.cases;
};

export const addCase = async (formData) => {
  const { data } = await axios.post(`${ENDPOINT_API}/cases`, formData, {
    headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
  });
  return { ref: data?.['_id'] };
};
