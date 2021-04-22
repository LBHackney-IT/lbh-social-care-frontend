import axios from 'axios';
import useSWR, { useSWRInfinite, SWRResponse, SWRInfiniteResponse } from 'swr';

import { getInfiniteKey } from 'utils/api';

import type { ExtendedResident, ErrorAPI } from 'types';

export const useResidents = (
  params: Record<string, unknown>,
  invoke = true
): SWRInfiniteResponse<Record<string, unknown>, Error> =>
  useSWRInfinite(
    // @ts-ignore
    invoke ? getInfiniteKey('/api/residents', 'residents', params) : null
  );

export const useResident = (
  personId: number
): SWRResponse<ExtendedResident, ErrorAPI> =>
  useSWR(`/api/residents/${personId}`);

export const addResident = async (
  formData: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const { data } = await axios.post(`/api/residents`, formData);
  return { ref: data?.personId, data };
};

export const updateResident = async (
  formData: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const { data } = await axios.patch(`/api/residents`, formData);
  return { ref: data?.personId, data };
};
