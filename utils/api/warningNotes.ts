import useSWR, { SWRResponse } from 'swr';

import type { WarningNote, ErrorAPI } from 'types';

export const useWarningNotes = (
  id: number
): SWRResponse<WarningNote[], ErrorAPI> =>
  useSWR(`/api/residents/${id}/warning-notes`);

export const useWarningNote = (
  warningNoteId: number
): SWRResponse<WarningNote, ErrorAPI> =>
  useSWR(`/api/warning-notes/${warningNoteId}`);
