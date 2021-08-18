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
