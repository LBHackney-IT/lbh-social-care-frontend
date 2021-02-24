import axios from 'axios';
import useSWR, {
  useSWRInfinite,
  responseInterface,
  SWRInfiniteResponseInterface,
} from 'swr';

import { getInfiniteKey } from 'utils/api';

import type { CaseData, ErrorAPI } from 'types';

export const useCases = (
  params: Record<string, unknown>,
  invoke = true
): SWRInfiniteResponseInterface<Record<string, unknown>, Error> =>
  // @ts-ignore
  useSWRInfinite(invoke ? getInfiniteKey('/api/cases', 'cases', params) : null);

export const useCasesByResident = (
  id: number,
  params: Record<string, unknown>
): SWRInfiniteResponseInterface<Record<string, unknown>, Error> =>
  // @ts-ignore
  useSWRInfinite(getInfiniteKey(`/api/residents/${id}/cases`, 'cases', params));

export const useCaseByResident = (
  id: number,
  caseId: number
): responseInterface<CaseData, ErrorAPI> =>
  useSWR(`/api/residents/${id}/cases/${caseId}`);

export const addCase = async (
  formData: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const { data } = await axios.post(`/api/cases`, formData);
  return data;
};
