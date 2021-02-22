import axios from 'axios';
import useSWR, { useSWRInfinite } from 'swr';

import { getInfiniteKey } from 'utils/api';

export const useCases = (params, invoke = true) =>
  useSWRInfinite(invoke ? getInfiniteKey('/api/cases', 'cases', params) : null);

export const useCasesByResident = (id, params) =>
  useSWRInfinite(getInfiniteKey(`/api/residents/${id}/cases`, 'cases', params));

export const useCaseByResident = (id, caseId) =>
  useSWR(`/api/residents/${id}/cases/${caseId}`);

export const addCase = async (formData) => {
  const { data } = await axios.post(`/api/cases`, formData);
  return data;
};
