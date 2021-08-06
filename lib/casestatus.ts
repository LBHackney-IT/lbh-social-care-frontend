import axios from 'axios';
import type { PersonCaseStatus } from 'types';
const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;
const headers = { 'x-api-key': AWS_KEY };

export const getCaseStatusByPersonId = async (
  personId: number
): Promise<PersonCaseStatus> => {
  const { data }: { data: PersonCaseStatus } = await axios.get(
    `https://virtserver.swaggerhub.com/Hackney/social-care-case-viewer-api/1.0.0/residents/${personId}/casestatuses`,
    // `${ENDPOINT_API}/residents/${personId}/casestatus`,
    {
      headers,
    }
  );
  return data;
};
