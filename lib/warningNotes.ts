import { WarningNote } from 'types';

const { MOCKED_WARNING_NOTES } = process.env;

import { mockedWarningNote } from 'fixtures/warningNotes.fixtures';

export const getWarningNotesByResident = async (
  personId: number
): Promise<WarningNote[] | []> => {
  const mockedWN = !MOCKED_WARNING_NOTES
    ? []
    : personId % 3 === 0
    ? []
    : personId % 3 === 1
    ? mockedWarningNote.slice(0, 1)
    : mockedWarningNote;

  return await new Promise((resolve) =>
    setTimeout(() => resolve(mockedWN), 1000)
  );
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
