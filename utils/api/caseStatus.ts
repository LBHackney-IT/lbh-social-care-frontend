<<<<<<< HEAD
import axios from 'axios';

interface addCaseStatusFormData {
  personId: number;
  type: string;
  fields: [{ name: string; selected: string }];
  startDate: string;
  endDate: string;
  notes: string;
}

export const getCaseStatus = async (
  formData: addCaseStatusFormData
): Promise<Record<string, unknown>> => {
  const { data } = await axios.post(`/api/residents/`, formData);
  return data;
};

export const addCaseStatus = async (
  formData: addCaseStatusFormData
): Promise<Record<string, unknown>> => {
  const { data } = await axios.post(`/api/case-statuses`, formData);

  return data;
};
=======
import useSWR, { SWRResponse } from 'swr';

import type { PersonCaseStatus, ErrorAPI } from 'types';

export const GetCaseStatus = (
  id: number
): SWRResponse<PersonCaseStatus, ErrorAPI> =>
  useSWR(`/api/residents/${id}/casestatus`);
>>>>>>> main
