import { render } from '@testing-library/react';
import React from 'react';

import { residentFactory } from 'factories/residents';
import { Resident } from 'types';
import { AddWarningNoteForm } from './AddWarningNoteForm';
import PersonView from '../../../PersonView/PersonView';
import { AuthProvider } from '../../../UserContext/UserContext';
import { mockedUser } from '../../../../factories/users';

jest.mock('../../../PersonView/PersonView');

jest.mock('next/router', () => ({
  __esModule: true,
  default: {
    events: {
      on: jest.fn(),
    },
    push: jest.fn(),
  },
  useRouter: () => ({
    query: { foo: 'bar' },
    replace: jest.fn(),
    pathname: 'foopath',
  }),
}));

const createMockedPersonView = (
  resident: Resident = residentFactory.build()
) => {
  const MockedPersonView = ({
    children,
  }: {
    children: (resident: Resident) => React.ComponentType;
  }) => {
    return <>{children(resident)}</>;
  };

  return MockedPersonView;
};

describe('<AddWarningNoteForm />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render the warning notes form for an adults resident', () => {
    (PersonView as jest.Mock).mockImplementationOnce(
      createMockedPersonView(
        residentFactory.build({
          contextFlag: 'A',
        })
      )
    );

    const { asFragment } = render(
      <AuthProvider user={mockedUser}>
        <AddWarningNoteForm personId={100} />
      </AuthProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the warning notes form for a childrens resident', () => {
    (PersonView as jest.Mock).mockImplementationOnce(
      createMockedPersonView(
        residentFactory.build({
          contextFlag: 'C',
        })
      )
    );

    const { asFragment } = render(
      <AuthProvider user={mockedUser}>
        <AddWarningNoteForm personId={100} />
      </AuthProvider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
