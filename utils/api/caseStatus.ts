import useSWR, { SWRResponse } from 'swr';

import type { PersonCaseStatus, ErrorAPI } from 'types';

export const GetCaseStatus = (
  id: number
): SWRResponse<PersonCaseStatus, ErrorAPI> =>
  useSWR(`/api/residents/${id}/casestatus`);

export const GetFormValues = (
  type: string
): SWRResponse<PersonCaseStatus, ErrorAPI> =>
  useSWR(`/api/casestatuses/form-options?type=${type}`);
