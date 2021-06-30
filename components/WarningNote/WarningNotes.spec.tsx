import { render } from '@testing-library/react';

import * as residentsAPI from 'utils/api/residents';
import * as warningNotes from 'utils/api/warningNotes';
import WarningNotes from './WarningNotes';

import { warningNoteFactory } from 'factories/warningNotes';
import { AuthProvider } from '../UserContext/UserContext';
import { userFactory } from '../../factories/users';
import { residentFactory } from '../../factories/residents';

const mockedAdultsUser = userFactory.build({
  hasAdminPermissions: false,
  hasUnrestrictedPermissions: false,
  hasChildrenPermissions: false,
  hasAdultPermissions: true,
});

const mockedAdultsResident = residentFactory.build({
  contextFlag: 'A',
});

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'path',
    push: jest.fn(),
  }),
}));

describe(`useWarningNotes`, () => {
  beforeEach(() => {
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

    jest.spyOn(residentsAPI, 'useResident').mockImplementation(() => ({
      data: mockedAdultsResident,
      isValidating: false,
      mutate: jest.fn(),
      revalidate: jest.fn(),
    }));
  });

  it('should render a list of warning notes', () => {
    const { asFragment } = render(
      <AuthProvider user={mockedAdultsUser}>
        <WarningNotes id={123} />
      </AuthProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render the review date if there is a scheduled future review date', () => {
    const { getByText, queryByText } = render(
      <AuthProvider user={mockedAdultsUser}>
        <WarningNotes id={123} />
      </AuthProvider>
    );

    getByText('Next review date');

    expect(
      queryByText('Review date', {
        exact: true,
      })
    ).toBeNull();
  });
});
