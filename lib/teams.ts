import axios from 'axios';

const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;

const headersWithKey = {
  'x-api-key': AWS_KEY,
};

export const getTeams = async (
  params: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  console.log('getting teams');
  // const { data } = await axios.get(`${ENDPOINT_API}/teams`, {
  const { data } = await axios.get(
    `https://virtserver.swaggerhub.com/Hackney/social-care-case-viewer-api/1.0.0/teams`,
    {
      headers: headersWithKey,
      params,
    }
  );
  return data;
};
