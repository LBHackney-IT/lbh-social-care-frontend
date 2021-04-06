import axios from 'axios';
import useSWR, {
  useSWRInfinite,
  SWRResponse,
  SWRInfiniteSWRResponse,
} from 'swr';

import { getInfiniteKey } from 'utils/api';

import type { Resident, ErrorAPI } from 'types';

export const useResidents = (
  params: Record<string, unknown>,
  invoke = true
): SWRInfiniteSWRResponse<Record<string, unknown>, Error> =>
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
  return { ref: data?.personId, data };
};

export const updateResident = async (
  formData: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const { data } = await axios.patch(`/api/residents`, formData);
  return { ref: data?.personId, data };
};
