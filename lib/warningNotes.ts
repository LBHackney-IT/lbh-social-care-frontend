import axios from 'axios';

import { WarningNote } from 'types';

const { ENDPOINT_API, AWS_KEY } = process.env;

const headers = { 'x-api-key': AWS_KEY };

export const getWarningNotesByResident = async (
  personId: number
): Promise<WarningNote[] | []> => {
  const { data }: { data: { warningNotes: WarningNote[] } } = await axios.get(
    `${ENDPOINT_API}/residents/${personId}/warningnotes`,
    {
      headers,
    }
  );
  return data.warningNotes.filter((note) => note.status === 'open');
};

export const getWarningNote = async (
  warningNoteId: number
): Promise<WarningNote | undefined> => {
  const { data } = await axios.get(
    `${ENDPOINT_API}/warningnotes/${warningNoteId}`,
    {
      headers,
    }
  );
  return data;
};

export const addWarningNote = async (
  params: Record<string, unknown>
): Promise<void> => {
  await axios.post(`${ENDPOINT_API}/warningnotes`, params, {
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
};

export const updateWarningNote = async (
  params: Record<string, unknown>
): Promise<void> => {
  await axios.patch(`${ENDPOINT_API}/warningnotes`, params, {
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
};
