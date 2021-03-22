import { render } from '@testing-library/react';

import WarningNoteRecap from './WarningNoteRecap';
import * as warningNotes from 'utils/api/warningNotes';
import { mockedWarningNote } from 'factories/warningNotes';
import { mockedResident } from 'factories/residents';

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

describe(`WarningNoteRecap`, () => {
  jest.spyOn(warningNotes, 'useWarningNote').mockImplementation(() => ({
    data: mockedWarningNote.find(({ id }) => id === props.warningNoteId),
    mutate: jest.fn(),
    revalidate: jest.fn(),
    isValidating: false,
  }));
  const props = {
    person: mockedResident,
    warningNoteId: 1,
  };

  it('should render correctly', async () => {
    const { asFragment } = render(<WarningNoteRecap {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
