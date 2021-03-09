import { render } from '@testing-library/react';

import { UserContext } from 'components/UserContext/UserContext';
import { useWarningNotes } from '../../utils/api/warningNotes';
import { WarningNote } from 'types';

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
  useWarningNotes.mockImplementation(() => [
    {
      id: 123,
      type: 'Risk to Adults',
      createdDate: new Date(2020, 12, 12),
      createdBy: 'Foo',
      reviewedDate: new Date(2020, 12, 13),
      reviewedBy: 'Bar',
    },
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
  ]);
});

const props = {
  id: '123',
};

it('should render properly', () => {
  const { asFragment } = render();
  expect(asFragment()).toMatchSnapshot();
});
