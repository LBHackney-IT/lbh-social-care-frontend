import { render, screen } from '@testing-library/react';

import Header from './Header';
import { UserContext } from 'components/UserContext/UserContext';
import { mockedUser, userFactory } from 'factories/users';
import * as saveData from 'utils/saveData';

let mockedUseRouter = { pathname: 'pathname' };

jest.mock('next/router', () => ({
  asPath: 'path',
  useRouter: () => mockedUseRouter,
}));

jest.mock('./Logo', () => () => 'MockedLogo');

describe('Header component', () => {
  const props = {
    serviceName: 'Foo',
  };
  it('should render header links with form in progress link', () => {
    jest.spyOn(saveData, 'getData').mockImplementationOnce(() => ({
      first: {
        data: { id: '123' },
        formPath: '/form/foo-bar/',
        timestamp: '22/12/2020',
        title: 'Foo Bar',
        step: 'foo',
        deleteForm: jest.fn(),
      },
    }));
    const { getByText } = render(
      <UserContext.Provider
        value={{
          user: mockedUser,
        }}
      >
        <Header {...props} />
      </UserContext.Provider>
    );

    expect(getByText('Search')).toBeInTheDocument();
    expect(getByText('Sign out')).toBeInTheDocument();
  });

  it('should render service name but no header links', () => {
    const { getByText, queryByText } = render(
      <UserContext.Provider
        value={{
          user: undefined,
        }}
      >
        <Header {...props} />
      </UserContext.Provider>
    );
    expect(getByText('Foo')).toBeInTheDocument();
    expect(queryByText('Search')).not.toBeInTheDocument();
    expect(queryByText('Sign out')).not.toBeInTheDocument();
  });

  it('should set active the correct link', () => {
    mockedUseRouter = {
      pathname: '/my-records',
    };
    const { asFragment } = render(
      <UserContext.Provider
        value={{
          user: mockedUser,
        }}
      >
        <Header {...props} />
      </UserContext.Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should show the "Manage workers" navigation item for admins', () => {
    render(
      <UserContext.Provider
        value={{
          user: userFactory.build({
            hasAdminPermissions: true,
            hasDevPermissions: false,
          }),
        }}
      >
        <Header {...props} />
      </UserContext.Provider>
    );

    screen.getByText('Manage workers');
  });

  it('should show the "Manage workers" navigation item for developers', () => {
    render(
      <UserContext.Provider
        value={{
          user: userFactory.build({
            hasAdminPermissions: false,
            hasDevPermissions: true,
          }),
        }}
      >
        <Header {...props} />
      </UserContext.Provider>
    );

    screen.getByText('Manage workers');
  });

  it('should not show the "Manage workers" navigation item for regular users', () => {
    render(
      <UserContext.Provider
        value={{
          user: userFactory.build({
            hasAdminPermissions: false,
            hasDevPermissions: false,
          }),
        }}
      >
        <Header {...props} />
      </UserContext.Provider>
    );

    expect(screen.queryByText('Manage workers')).toBeNull();
  });
});
