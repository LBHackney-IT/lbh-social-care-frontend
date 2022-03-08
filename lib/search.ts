import axios from 'axios';
import type { ResidentsAPI } from 'types';

const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;
const headers = { 'x-api-key': AWS_KEY };

export const searchPerson = async (
  params: Record<string, unknown>,
  contextFlag?: string
): Promise<ResidentsAPI | []> => {
  const { data }: { data: ResidentsAPI } = await axios.get(
    `${ENDPOINT_API}/search/person`,
    {
      headers,
      params: { ...params, contextFlag },
    }
  );
  return data;
};
