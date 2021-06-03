import { render } from '@testing-library/react';

import WarningNoteRecap from './WarningNoteRecap';
import * as warningNotes from 'utils/api/warningNotes';
import { mockedWarningNote, warningNoteFactory } from 'factories/warningNotes';
import { mockedResident } from 'factories/residents';

jest.mock('components/Spinner/Spinner', () => () => 'MockedSpinner');

describe(`WarningNoteRecap`, () => {
  const props = {
    person: mockedResident,
    warningNoteId: 1,
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', async () => {
    jest.spyOn(warningNotes, 'useWarningNote').mockImplementation(() => ({
      data: mockedWarningNote.find(({ id }) => id === props.warningNoteId),
      mutate: jest.fn(),
      revalidate: jest.fn(),
      isValidating: false,
    }));

    const { asFragment } = render(<WarningNoteRecap {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should show the email address of the user who created the warning note', async () => {
    jest.spyOn(warningNotes, 'useWarningNote').mockImplementation(() => ({
      data: warningNoteFactory.build({
        createdBy: 'first.last@hackney.gov.uk',
      }),
      mutate: jest.fn(),
      revalidate: jest.fn(),
      isValidating: false,
    }));

    const { getByText } = render(
      <WarningNoteRecap person={mockedResident} warningNoteId={0} />
    );

    getByText('first.last@hackney.gov.uk');
  });
});
