import axios from 'axios';
import type { PersonCaseStatus } from 'types';
// const ENDPOINT_API = process.env.ENDPOINT_API;
const ENDPOINT_API =
  'https://virtserver.swaggerhub.com/Hackney/social-care-case-viewer-api/1.0.0';
const AWS_KEY = process.env.AWS_KEY;
const headers = { 'x-api-key': AWS_KEY };

export const GetFormValues = async (
  type: string
): Promise<PersonCaseStatus> => {
  const { data }: { data: PersonCaseStatus; error: Error } = await axios.get(
    `${ENDPOINT_API}/case-status/form-options/${type}`,
    {
      headers,
    }
  );
  return data;
};
