import axios from 'axios';

import useSWR, { SWRResponse } from 'swr';

import type {
  AddCaseStatusFormData,
  EditCaseStatusFormData,
  UpdateLACCaseStatusFormData,
  ErrorAPI,
  CaseStatus,
} from 'types';

export const addCaseStatus = async (
  formData: AddCaseStatusFormData
): Promise<Record<string, unknown>> => {
  const response = await axios.post(`/api/casestatus`, formData);
  return response?.data;
};

export const patchCaseStatus = async (
  caseStatusId: number,
  formData: EditCaseStatusFormData
): Promise<Record<string, unknown>> => {
  const response = await axios.patch(
    `/api/casestatus/${caseStatusId}/`,
    formData
  );
  return response?.data;
};

export const updateCaseStatus = async (
  formData: UpdateLACCaseStatusFormData,
  caseStatusId: number
): Promise<Record<string, unknown>> => {
  const response = await axios.post(
    `/api/casestatus/update/${caseStatusId}`,
    formData
  );
  return response?.data;
};

export const useCaseStatuses = (
  id: number,
  include_closed_cases = 'false'
): SWRResponse<CaseStatus[], ErrorAPI> =>
  useSWR(
    `/api/residents/${id}/casestatus?include_closed_cases=${include_closed_cases}`
  );
