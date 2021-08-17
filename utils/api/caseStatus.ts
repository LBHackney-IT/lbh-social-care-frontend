import useSWR, { SWRResponse } from 'swr';

import type { PersonCaseStatus, ErrorAPI } from 'types';

export const GetCaseStatus = (
  id: number
): SWRResponse<PersonCaseStatus, ErrorAPI> =>
  useSWR(`/api/residents/${id}/casestatus`);
