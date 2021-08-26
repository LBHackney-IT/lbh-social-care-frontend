import axios from 'axios';

import useSWR, { SWRResponse } from 'swr';

import type { PersonCaseStatus, FormFields, ErrorAPI } from 'types';

interface addCaseStatusFormData {
  personId: number;
  type: string;
  fields: [{ name: string; selected: string }];
  startDate: string;
  endDate: string;
  notes: string;
}

export const AddCaseStatus = async (
  formData: addCaseStatusFormData
): Promise<Record<string, unknown>> => {
  const { data } = await axios.post(`/api/case-statuses`, formData);

  return data;
};

export const GetCaseStatus = (
  id: number
): SWRResponse<PersonCaseStatus, ErrorAPI> =>
  useSWR(`/api/residents/${id}/casestatus`);

export const GetFormValues = (
  type: string
): SWRResponse<FormFields, ErrorAPI> =>
  useSWR(`/api/casestatuses/form-options?type=${type}`);
