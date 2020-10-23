import axios from 'axios';

const { AWS_KEY, ENDPOINT_CASES } = process.env;

const headers = {
  'x-api-key': AWS_KEY
};

export const getCases = async mosaic_id => {
  const { data } = await axios.get(ENDPOINT_CASES, {
    headers,
    params: { mosaic_id }
  });
  return data.cases;
};
