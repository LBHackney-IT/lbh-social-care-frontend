import {
  Form,
  InProgressSubmission,
  Submission,
} from 'data/flexibleForms/forms.types';
import useSWR, { SWRResponse } from 'swr';
import type { ErrorAPI } from 'types';

export type Data = {
  forms: Form[];
  submissions: InProgressSubmission[];
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
  socialCareId?: number
): SWRResponse<Data, ErrorAPI> => {
  const res: SWRResponse<Data, ErrorAPI> = useSWR(
    `/api/submissions?includeSubmissions=true`
  );

  return {
    ...res,
    data: {
      forms: res?.data?.forms || [],
      submissions: socialCareId
        ? res?.data?.submissions.filter((sub) =>
            sub.residents.some((resident) => resident.id === socialCareId)
          ) || []
        : res?.data?.submissions || [],
    },
  };
};
