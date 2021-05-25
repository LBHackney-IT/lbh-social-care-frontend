import { render } from '@testing-library/react';

import Header from './Header';
import { UserContext } from 'components/UserContext/UserContext';
import { mockedUser } from 'factories/users';
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
    const { getByText, asFragment } = render(
      <UserContext.Provider
        value={{
          user: mockedUser,
        }}
      >
        <Header {...props} />
      </UserContext.Provider>
    );
    // TODO: uncomment when dashboard is back
    // expect(getByText('My work space')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
