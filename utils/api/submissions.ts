//
import { Form, Submission } from 'data/flexibleForms/forms.types';
import useSWR, { SWRResponse } from 'swr';
import type { ErrorAPI } from 'types';

export const useUnfinishedSubmissions = (
  socialCareId: number
): SWRResponse<
  {
    forms: Form[];
    submissions: Submission[];
  },
  ErrorAPI
> => useSWR(`/api/submissions?includeSubmissions=true`);
