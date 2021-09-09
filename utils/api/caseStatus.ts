import axios from 'axios';

import useSWR, { SWRResponse } from 'swr';

import type {
  PersonCaseStatus,
  AddCaseStatusFormData,
  FormFields,
  ErrorAPI,
} from 'types';

export const AddCaseStatus = async (
  formData: AddCaseStatusFormData
): Promise<Record<string, unknown>> => {
  const response = await axios.post(`/api/casestatus`, formData);
  return response?.data;
};

export const GetCaseStatus = (
  id: number
): SWRResponse<PersonCaseStatus, ErrorAPI> =>
  useSWR(`/api/residents/${id}/casestatus`);

export const GetFormValues = (
  type: string
): SWRResponse<FormFields, ErrorAPI> =>
  useSWR(`/api/casestatus/form-options/${type}`);
