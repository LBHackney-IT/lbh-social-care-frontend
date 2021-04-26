import axios from 'axios';
import useSWR, { SWRResponse } from 'swr';

import type { WarningNote, ErrorAPI } from 'types';

export const useWarningNotes = (
  id: number
): SWRResponse<WarningNote[], ErrorAPI> =>
  useSWR(`/api/residents/${id}/warningnotes`);

export const useWarningNote = (
  warningNoteId: number
): SWRResponse<WarningNote, ErrorAPI> =>
  useSWR(`/api/warningnotes/${warningNoteId}`);

export const addWarningNote = async (
  formData: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const { data } = await axios.post(`/api/warningnotes`, formData);
  return data;
};

export const updateWarningNote = async (
  noteId: number,
  formData: Record<string, unknown>
): Promise<Record<string, unknown>> => {
  const { data } = await axios.patch(`/api/warningnotes/${noteId}`, formData);
  return data;
};
