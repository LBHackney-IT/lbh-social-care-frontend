import axios from 'axios';
import useSWR, { useSWRInfinite, SWRResponse, SWRInfiniteResponse } from 'swr';

import { getInfiniteKey } from 'utils/api';

import type {
  CaseData,
  HistoricCaseData,
  HistoricVisitData,
  Case,
  ErrorAPI,
} from 'types';

export const useCases = (
  params: Record<string, unknown>,
  invoke = true
): SWRInfiniteResponse<CaseData, Error> =>
  // @ts-ignore
  useSWRInfinite(invoke ? getInfiniteKey('/api/cases', 'cases', params) : null);

export const useCasesByResident = (
  id: number,
  params?: Record<string, unknown>
): SWRInfiniteResponse<CaseData, Error> =>
  // @ts-ignore
  useSWRInfinite(getInfiniteKey(`/api/residents/${id}/cases`, 'cases', params));

export const useCase = (
  caseId: string,
  residentId: number
): SWRResponse<Case, ErrorAPI> =>
  useSWR(`/api/cases/${caseId}?residentId=${residentId}`);

export const useHistoricCaseNote = (
  caseId: string
): SWRResponse<HistoricCaseData, ErrorAPI> =>
  useSWR(`/api/cases/historic-note/${caseId}`);

export const useHistoricCaseVisit = (
  caseId: string
): SWRResponse<HistoricVisitData, ErrorAPI> =>
  useSWR(`/api/cases/historic-visit/${caseId}`);

export const addCase = async (
  formData: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const { data } = await axios.post(`/api/cases`, formData);
  return data;
};
