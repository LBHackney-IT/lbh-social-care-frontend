import axios from 'axios';

const { ENDPOINT_API, AWS_KEY } = process.env;

const headersWithKey = {
  'x-api-key': AWS_KEY,
};

export const getWorkers = async (params) => {
  const { data } = await axios.get(`${ENDPOINT_API}/workers`, {
    headers: headersWithKey,
    params,
  });
  return data;
};
