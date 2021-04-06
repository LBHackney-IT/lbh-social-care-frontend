import axios from 'axios';
import useSWR, {
  useSWRInfinite,
  SWRResponse,
  SWRInfiniteSWRResponse,
} from 'swr';

import { getInfiniteKey } from 'utils/api';

import type { CaseData, HistoricCaseData, Case, ErrorAPI } from 'types';

export const useCases = (
  params: Record<string, unknown>,
  invoke = true
): SWRInfiniteSWRResponse<CaseData, Error> =>
  // @ts-ignore
  useSWRInfinite(invoke ? getInfiniteKey('/api/cases', 'cases', params) : null);

export const useCasesByResident = (
  id: number,
  params?: Record<string, unknown>
): SWRInfiniteSWRResponse<CaseData, Error> =>
  // @ts-ignore
  useSWRInfinite(getInfiniteKey(`/api/residents/${id}/cases`, 'cases', params));

export const useCase = (caseId: string): SWRResponse<Case, ErrorAPI> =>
  useSWR(`/api/cases/${caseId}`);

export const useCaseNote = (
  caseId: string
): SWRResponse<HistoricCaseData, ErrorAPI> =>
  useSWR(`/api/cases/historic/${caseId}`);

export const addCase = async (
  formData: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const { data } = await axios.post(`/api/cases`, formData);
  return data;
};
