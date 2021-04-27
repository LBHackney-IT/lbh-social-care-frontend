import axios from 'axios';

import { mockedWarningNote } from 'factories/warningNotes';
import { WarningNote } from 'types';

const { ENDPOINT_API, AWS_KEY } = process.env;

const headers = { 'x-api-key': AWS_KEY };

export const getWarningNotesByResident = async (
  personId: number
): Promise<WarningNote[] | []> => {
  const { data } = await axios.get(
    `${ENDPOINT_API}/residents/${personId}/warningnotes`,
    {
      headers,
    }
  );
  return data.warningNotes;
};

export const getWarningNote = async (
  warningNoteId: number
): Promise<WarningNote | undefined> => {
  return await new Promise((resolve) =>
    setTimeout(
      () => resolve(mockedWarningNote.find(({ id }) => id === warningNoteId)),
      1000
    )
  );
};

export const addWarningNote = async (
  params: Record<string, unknown>
): Promise<void> => {
  await axios.post(`${ENDPOINT_API}/warningnotes`, params, {
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
};

export const patchWarningNote = async (
  personId: number,
  params: Record<string, unknown>
): Promise<void> => {
  await axios.patch(`${ENDPOINT_API}/warningnotes/${personId}`, params, {
    headers: { ...headers, 'Content-Type': 'application/json' },
  });
};
