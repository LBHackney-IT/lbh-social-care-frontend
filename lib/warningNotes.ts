import { WarningNote } from 'types';

const { MOCKED_WARNING_NOTES } = process.env;

export const getWarningNotes = async (
  personId: number
): Promise<WarningNote[] | []> => {
  const mockedWN = !MOCKED_WARNING_NOTES
    ? []
    : personId % 3 === 0
    ? []
    : personId % 3 === 1
    ? [
        {
          id: 123,
          type: 'Risk to Adults',
          createdDate: new Date(2020, 12, 12),
          createdBy: 'Foo',
          reviewedDate: new Date(2020, 12, 13),
          reviewedBy: 'Bar',
        },
      ]
    : [
        {
          id: 123,
          type: 'Risk to Adults',
          createdDate: new Date(2020, 12, 12),
          createdBy: 'Foo',
          reviewedDate: new Date(2020, 12, 13),
          reviewedBy: 'Bar',
        },
        {
          id: 234,
          type: 'Risk to Staff',
          createdDate: new Date(2020, 12, 22),
          createdBy: 'Foo',
        },
      ];

  return await new Promise((resolve) =>
    setTimeout(() => resolve(mockedWN), 1000)
  );
};
