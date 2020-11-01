import axios from 'axios';

const { AWS_KEY, ENDPOINT_API } = process.env;

console.log(ENDPOINT_API);
const headers = {
  'x-api-key': AWS_KEY,
};

export const getCases = async (mosaic_id) => {
  const { data } = await axios.get(`${ENDPOINT_API}/residents/cases`, {
    headers,
    params: { mosaic_id },
  });
  return data.cases;
};

// TODO tests
export const postCase = async (data) => {
  const { record } = await axios.post(`${ENDPOINT_API}/residents/cases`, {
    headers,
    body: { data },
  });
  console.log('naomi from the server');
  return record.id;
};
