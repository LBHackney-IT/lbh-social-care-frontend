import { render } from '@testing-library/react';

import * as warningNotes from 'utils/api/warningNotes';
import WarningNotes from './WarningNotes';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'path',
    push: jest.fn(),
  }),
}));

jest.mock('utils/api/warningNotes', () => ({
  useWarningNotes: jest.fn(),
}));

describe(`useWarningNotes`, () => {
  jest.spyOn(warningNotes, 'useWarningNotes').mockImplementation(() => ({
    data: [
      {
        id: 123,
        type: 'Risk to Adults',
        createdDate: new Date(2020, 12, 12),
        createdBy: 'Foo',
        reviewedDate: new Date(2020, 12, 13),
        reviewedBy: 'Bar',
      },
      {
        id: 321,
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
    ],
    mutate: jest.fn(),
    revalidate: jest.fn(),
    isValidating: false,
  }));

  const props = {
    id: '123',
  };

  it('should render properly', () => {
    const { asFragment } = render(<WarningNotes {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
