import axios from 'axios';

const { ENDPOINT_API, AWS_KEY } = process.env;

const headersWithKey = {
  'x-api-key': AWS_KEY,
};

export const getTeams = async (
  params: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const { data } = await axios.get(`${ENDPOINT_API}/teams`, {
    headers: headersWithKey,
    params,
  });
  return data;
};
