import axios from 'axios';
import type { PersonCaseStatus } from 'types';
const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;
const headers = { 'x-api-key': AWS_KEY };
export const getCaseStatusByPersonId = async (
  personId: number
): Promise<PersonCaseStatus> => {
  const { data }: { data: PersonCaseStatus } = await axios.get(
    `${ENDPOINT_API}/residents/${personId}/casestatuses`,
    {
      headers,
    }
  );
  return data;
};

export const getFormValues = async (
  type: string
): Promise<PersonCaseStatus> => {
  const { data }: { data: PersonCaseStatus } = await axios.get(
    `${ENDPOINT_API}/case-status/form-options/${type}`,
    {
      headers,
    }
  );
  return data;
};

export const addCaseStatus = async (
  params: Record<string, unknown>
): Promise<void> => {
  await axios.post(
    'https://virtserver.swaggerhub.com/Hackney/social-care-case-viewer-api/1.0.0/case-statuses',
    params,
    {
      headers: { ...headers, 'Content-Type': 'application/json' },
    }
  );
};
