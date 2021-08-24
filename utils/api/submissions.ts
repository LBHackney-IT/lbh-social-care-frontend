import {
  Form,
  InProgressSubmission,
  Submission,
} from 'data/flexibleForms/forms.types';
import useSWR, { SWRResponse } from 'swr';
import type { ErrorAPI } from 'types';

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
): SWRResponse<InProgressSubmission[], ErrorAPI> => {
  const personIdQuery = `?personID=${socialCareId}`;

  const res: SWRResponse<InProgressSubmission[], ErrorAPI> = useSWR(
    `/api/submissions${personIdQuery}`
  );
  console.log('🚀 ~ file: submissions.ts ~ line 35 ~ res', res.data?.length);

  return res;
};
