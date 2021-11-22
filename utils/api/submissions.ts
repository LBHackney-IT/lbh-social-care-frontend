import {
  Form,
  InProgressSubmission,
  Submission,
} from 'data/flexibleForms/forms.types';
import useSWR, { SWRResponse } from 'swr';
import type { ErrorAPI, Paginated } from 'types';
import axios from 'axios';

export type Data = {
  forms: Form[];
  submissions: Submission[];
};

export const useSubmission = (
  submissionId: string
): SWRResponse<Submission, ErrorAPI> => {
  const res: SWRResponse<Submission, ErrorAPI> = useSWR(
    `/api/submissions/${submissionId}`
  );

  return res;
};

export const deleteSubmission = async (
  submissionId: string,
  deletedBy: string,
  deleteReason: string,
  deleteRequestedBy: string
): Promise<Record<string, unknown>> => {
  const response = await axios.delete(
    `/api/submissions/${submissionId}/delete?deletedBy=${deletedBy}&deleteReason=${deleteReason}&deleteRequestedBy=${deleteRequestedBy}`
  );

  return response?.data;
};

/** fetch unfinished submissions in the user's current service context, either for everyone, or by social care id */
export const useUnfinishedSubmissions = (
  socialCareId: number,
  page: number,
  size: number
): SWRResponse<Paginated<InProgressSubmission>, ErrorAPI> => {
  const personIdQuery = `&personID=${socialCareId}`;

  const res: SWRResponse<Paginated<InProgressSubmission>, ErrorAPI> = useSWR(
    `/api/submissions?page=${page}&size=${size}${personIdQuery}&submissionStates=in_progress`
  );

  return res;
};
