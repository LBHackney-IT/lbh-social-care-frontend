import axios from 'axios';

import useSWR, { SWRResponse } from 'swr';

import type {
  AddCaseStatusFormData,
  FormFields,
  ErrorAPI,
  CaseStatus,
} from 'types';

export const addCaseStatus = async (
  formData: AddCaseStatusFormData
): Promise<Record<string, unknown>> => {
  const response = await axios.post(`/api/casestatus`, formData);
  return response?.data;
};

export const useCaseStatuses = (
  id: number
): SWRResponse<CaseStatus[], ErrorAPI> =>
  useSWR(`/api/residents/${id}/casestatus`);

export const useFormValues = (
  type: string
): SWRResponse<FormFields, ErrorAPI> =>
  useSWR(`/api/casestatus/form-options/${type}`);
