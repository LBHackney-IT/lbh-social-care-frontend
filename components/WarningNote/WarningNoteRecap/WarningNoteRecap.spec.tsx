import { render } from '@testing-library/react';

import WarningNoteRecap from './WarningNoteRecap';
import * as warningNotes from 'utils/api/warningNotes';
import { mockedWarningNote } from 'fixtures/warningNotes.fixtures';
import { AgeContext } from 'types';

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

describe(`WarningNoteRecap`, () => {
  jest.spyOn(warningNotes, 'useWarningNote').mockImplementation(() => ({
    data: mockedWarningNote.find(({ id }) => id === props.warningNoteId),
    mutate: jest.fn(),
    revalidate: jest.fn(),
    isValidating: false,
  }));
  const props = {
    person: {
      dateOfBirth: '2020-11-13',
      firstName: 'Ciasom',
      lastName: 'Tesselate',
      mosaicId: 44000000,
      nhsNumber: '12345',
      ageContext: 'A' as AgeContext,
      gender: 'F',
    },
    warningNoteId: 123,
  };

  it('should render correctly', async () => {
    const { asFragment } = render(<WarningNoteRecap {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
