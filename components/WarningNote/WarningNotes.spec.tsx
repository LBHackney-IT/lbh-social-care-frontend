import { render } from '@testing-library/react';

import * as warningNotes from 'utils/api/warningNotes';
import WarningNotes from './WarningNotes';

import { mockedWarningNote } from 'fixtures/warningNotes.fixtures';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'path',
    push: jest.fn(),
  }),
}));

describe(`useWarningNotes`, () => {
  jest.spyOn(warningNotes, 'useWarningNotes').mockImplementation(() => ({
    data: mockedWarningNote,
    mutate: jest.fn(),
    revalidate: jest.fn(),
    isValidating: false,
  }));

  const props = {
    id: 123,
  };

  it('should render properly', () => {
    const { asFragment } = render(<WarningNotes {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
