import axios from 'axios';
import useSWR, {
  useSWRInfinite,
  responseInterface,
  SWRInfiniteResponseInterface,
} from 'swr';

import { getInfiniteKey } from 'utils/api';

import type { ResidentAPI, ErrorAPI } from 'types';

export const useResidents = (
  params: Record<string, unknown>,
  invoke = true
): SWRInfiniteResponseInterface<Record<string, unknown>, Error> =>
  useSWRInfinite(
    // @ts-ignore
    invoke ? getInfiniteKey('/api/residents', 'residents', params) : null
  );

export const useResident = (
  personId: number
): responseInterface<ResidentAPI, ErrorAPI> =>
  useSWR(`/api/residents/${personId}`);

export const addResident = async (
  formData: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const { data } = await axios.post(`/api/residents`, formData);
  return data;
};
