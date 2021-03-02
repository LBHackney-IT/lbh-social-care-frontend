import axios from 'axios';

import type { Case, CaseData } from 'types';

const { ENDPOINT_API, AWS_KEY } = process.env;

const headersWithKey = {
  'x-api-key': AWS_KEY,
};

const regex = /"_id.*ObjectId\(.*\),./;

const sanitiseCaseFormData = (caseFormData: string): string =>
  caseFormData && JSON.parse(caseFormData.replace(regex, ''));

export const getCases = async (
  params: Record<string, unknown>
): Promise<CaseData> => {
  const { data } = await axios.get(`${ENDPOINT_API}/cases`, {
    headers: headersWithKey,
    params: params,
  });
  return {
    ...data,
    cases: data.cases?.map((c: Record<string, string>) => ({
      ...c,
      caseFormData: sanitiseCaseFormData(c.caseFormData),
    })),
  };
};

export const getCasesByResident = (
  mosaic_id: number,
  params: Record<string, unknown>
): Promise<CaseData> => getCases({ mosaic_id, ...params });

export const getCaseByResident = async (
  mosaic_id: number,
  case_id: string,
  params: Record<string, unknown>
): Promise<Case | undefined> => {
  // TODO: this should be covered by the BE
  const data = await getCases({ mosaic_id, ...params, limit: 100 });
  return data.cases?.find(({ recordId }) => recordId === case_id);
};

export const addCase = async (
  formData: Record<string, unknown>
): Promise<{ ref: string }> => {
  const { data } = await axios.post(`${ENDPOINT_API}/cases`, formData, {
    headers: { 'Content-Type': 'application/json', 'x-api-key': AWS_KEY },
  });
  return data;
};
