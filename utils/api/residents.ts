import axios from 'axios';
import useSWR, { useSWRInfinite, SWRResponse, SWRInfiniteResponse } from 'swr';

import { getInfiniteKey } from 'utils/api';

import type { Resident, ErrorAPI } from 'types';

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
): SWRResponse<Resident, ErrorAPI> => useSWR(`/api/residents/${personId}`);

export const addResident = async (
  formData: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const { data } = await axios.post(`/api/residents`, formData);
  return { ref: data?.id, data };
};

export const updateResident = async (
  personId: number,
  formData: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const { data } = await axios.patch(`/api/residents/${personId}`, formData);
  return { ref: data?.id, data };
};

export const patchResident = async (formData: {
  id: number;
  createdBy: string;
  [key: string]: unknown;
}): Promise<Record<string, unknown>> => {
  const { data } = await axios.patch(`/api/residents`, formData);
  return { ref: data?.id, data };
};
