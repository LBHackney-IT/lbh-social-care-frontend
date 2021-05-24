import useSWR, { SWRResponse } from 'swr';

import type { RelationshipData, ErrorAPI } from 'types';

export const useRelationships = (
  id: number
): SWRResponse<RelationshipData, ErrorAPI> =>
  useSWR(`/api/residents/${id}/relationships`);
