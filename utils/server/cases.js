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
