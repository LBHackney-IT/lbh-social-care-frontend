import axios from 'axios';
import type { PersonCaseStatus, CaseStatusFields } from 'types';
const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;
const headers = { 'x-api-key': AWS_KEY };

export const getCaseStatusByPersonId = async (
  personId: number
): Promise<PersonCaseStatus> => {
  const { data, error }: { data: PersonCaseStatus; error: Error } =
    await axios.get(`${ENDPOINT_API}/residents/${personId}/casestatuses`, {
      headers,
    });
  return data;
};

export const GetFormValues = async (
  type: string
): Promise<CaseStatusFields> => {
  const { data }: { data: CaseStatusFields; error: Error } = await axios.get(
    `https://virtserver.swaggerhub.com/Hackney/social-care-case-viewer-api/1.0.0/case-status/form-options/${type}`,
    // `${ENDPOINT_API}/case-status/form-options/${type}`,
    {
      headers,
    }
  );
  return data;
};
