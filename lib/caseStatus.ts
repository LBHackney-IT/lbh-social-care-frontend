import axios from 'axios';
import type { PersonCaseStatus } from 'types';
const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;
const headers = { 'x-api-key': AWS_KEY };

export const getCaseStatusByPersonId = async (
  personId: number
): Promise<PersonCaseStatus> => {
  const { data }: { data: PersonCaseStatus; error: Error } = await axios.get(
    `${ENDPOINT_API}/residents/${personId}/casestatuses`,
    {
      headers,
    }
  );
  return data;
};
