import axios from 'axios';
import { CaseStatus } from 'types';

const ENDPOINT_API = process.env.ENDPOINT_API;
const AWS_KEY = process.env.AWS_KEY;
const headers = { 'x-api-key': AWS_KEY };
export const getCaseStatusByPersonId = async (
  personId: number
): Promise<CaseStatus[]> => {
  const { data } = await axios.get<CaseStatus[]>(
    `${ENDPOINT_API}/residents/${personId}/case-statuses`,
    {
      headers,
    }
  );
  return data;
};

export const getFormValues = async (type: string): Promise<CaseStatus[]> => {
  const { data } = await axios.get<CaseStatus[]>(
    `${ENDPOINT_API}/case-statuses/form-options/${type}`,
    {
      headers,
    }
  );
  return data;
};

export const addCaseStatus = async (
  personId: number,
  params: Record<string, unknown>
): Promise<void> => {
  await axios.post(
    `${ENDPOINT_API}/residents/${personId}/case-statuses`,
    params,
    {
      headers: { ...headers, 'Content-Type': 'application/json' },
    }
  );
};

export const updateCaseStatus = async (
  caseStatusId: number,
  params: Record<string, unknown>
): Promise<void> => {
  await axios.post(
    `${ENDPOINT_API}/case-statuses/${caseStatusId}/answers`,
    params,
    {
      headers: { ...headers, 'Content-Type': 'application/json' },
    }
  );
};

export const patchCaseStatus = async (
  caseStatusId: number,
  params: Record<string, unknown>
): Promise<void> => {
  await axios.patch(`${ENDPOINT_API}/case-statuses/${caseStatusId}/`, params, {
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
};
