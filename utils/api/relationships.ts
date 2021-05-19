import useSWR, { SWRResponse } from 'swr';

import type { RelationshipData, ErrorAPI } from 'types';

export const useRelationships = (
  id: number
): SWRResponse<RelationshipData, ErrorAPI> =>
  useSWR(
    `https://virtserver.swaggerhub.com/Hackney/social-care-case-viewer-api/1.0.0/residents/${id}/relationships`
  );
// useSWR(`/api/residents/${id}/relationships`);
