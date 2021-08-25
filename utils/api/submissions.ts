import {
  Form,
  InProgressSubmission,
  Submission,
} from 'data/flexibleForms/forms.types';
import useSWR, { SWRResponse } from 'swr';
import type { ErrorAPI, Paginated } from 'types';

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

/** fetch unfinished submissions in the user's current service context, either for everyone, or by social care id */
export const useUnfinishedSubmissions = (
  socialCareId: number
): SWRResponse<Paginated<InProgressSubmission>, ErrorAPI> => {
  const personIdQuery = `?personID=${socialCareId}`;

  const res: SWRResponse<Paginated<InProgressSubmission>, ErrorAPI> = useSWR(
    `/api/submissions${personIdQuery}`
  );

  return res;
};
