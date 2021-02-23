import axios from 'axios';
import useSWR, { useSWRInfinite } from 'swr';

import { getInfiniteKey } from 'utils/api';

export const useResidents = (params, invoke = true) =>
  useSWRInfinite(
    invoke ? getInfiniteKey('/api/residents', 'residents', params) : null
  );

export const useResident = (personId) => useSWR(`/api/residents/${personId}`);

export const addResident = async (formData) => {
  const { data } = await axios.post(`/api/residents`, formData);
  return { ref: data?.personId, data };
};
