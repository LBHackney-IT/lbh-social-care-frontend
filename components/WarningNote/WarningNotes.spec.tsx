import { render } from '@testing-library/react';

import * as warningNotes from 'utils/api/warningNotes';
import WarningNotes from './WarningNotes';

import { mockedWarningNote, warningNoteFactory } from 'factories/warningNotes';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'path',
    push: jest.fn(),
  }),
}));

describe(`useWarningNotes`, () => {
  it('should render a list of warning notes', () => {
    jest.spyOn(warningNotes, 'useWarningNotes').mockImplementation(() => ({
      data: mockedWarningNote,
      mutate: jest.fn(),
      revalidate: jest.fn(),
      isValidating: false,
    }));

    const { asFragment } = render(<WarningNotes id={123} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render the review date if there is a scheduled future review date', () => {
    jest.spyOn(warningNotes, 'useWarningNotes').mockImplementation(() => ({
      data: [
        warningNoteFactory.build({
          nextReviewDate: '2020-11-12',
        }),
      ],
      mutate: jest.fn(),
      revalidate: jest.fn(),
      isValidating: false,
    }));

    const { getByText, queryByText } = render(<WarningNotes id={123} />);

    getByText('Next review date');
    expect(
      queryByText('Review date', {
        exact: true,
      })
    ).toBeNull();
  });
});
