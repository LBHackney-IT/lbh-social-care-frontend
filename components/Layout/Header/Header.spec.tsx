import { render, screen } from '@testing-library/react';

import Header from './Header';
import { UserContext } from 'components/UserContext/UserContext';
import { mockedUser, userFactory } from 'factories/users';
import * as saveData from 'utils/saveData';
import { AppConfigProvider } from 'lib/appConfig';

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
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <UserContext.Provider
          value={{
            user: mockedUser,
          }}
        >
          <Header {...props} />
        </UserContext.Provider>
      </AppConfigProvider>
    );

    expect(getByText('Search')).toBeInTheDocument();
    expect(getByText('Workflows')).toBeInTheDocument();
    expect(getByText('Sign out')).toBeInTheDocument();
  });

  it('should render service name but no header links', () => {
    const { getByText, queryByText } = render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <UserContext.Provider
          value={{
            user: undefined,
          }}
        >
          <Header {...props} />
        </UserContext.Provider>
      </AppConfigProvider>
    );
    expect(getByText('Foo')).toBeInTheDocument();
    expect(queryByText('Search')).not.toBeInTheDocument();
    expect(queryByText('Workflows')).not.toBeInTheDocument();
    expect(queryByText('Sign out')).not.toBeInTheDocument();
  });

  it('should set active the correct link', () => {
    mockedUseRouter = {
      pathname: '/my-records',
    };
    const { asFragment } = render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
        <UserContext.Provider
          value={{
            user: mockedUser,
          }}
        >
          <Header {...props} />
        </UserContext.Provider>
      </AppConfigProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should show the "Manage workers" navigation item for admins', () => {
    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
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
      </AppConfigProvider>
    );

    screen.getByText('Manage workers');
  });

  it('should show the "Manage workers" navigation item for developers', () => {
    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
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
      </AppConfigProvider>
    );

    screen.getByText('Manage workers');
  });

  it('should not show the "Manage workers" navigation item for regular users', () => {
    render(
      <AppConfigProvider
        appConfig={{ workflowsPilotUrl: 'http://example.com' }}
      >
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
      </AppConfigProvider>
    );

    expect(screen.queryByText('Manage workers')).toBeNull();
  });
});
