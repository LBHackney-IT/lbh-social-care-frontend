import { render } from '@testing-library/react';

import Header from './Header';
import { UserContext } from 'components/UserContext/UserContext';
import { getData } from 'utils/saveData';

let mockedUseRouter = { asPath: 'path', pathname: 'pathname' };

jest.mock('next/router', () => ({
  useRouter: () => mockedUseRouter,
}));

jest.mock('./Logo.jsx', () => () => 'MockedLogo');

jest.mock('utils/saveData', () => ({
  getData: jest.fn(),
}));

describe('Header component', () => {
  const props = {
    serviceName: 'Foo',
  };
  it('should render header links with form in progress link', () => {
    getData.mockImplementationOnce(() => [
      {
        formPath: '/form/foo-bar/',
        timeStamp: '22/12/2020',
        title: 'Foo Bar',
        deleteForm: jest.fn(),
      },
    ]);
    const { getByText } = render(
      <UserContext.Provider
        value={{
          user: { name: 'bar' },
        }}
      >
        <Header {...props} />
      </UserContext.Provider>
    );

    expect(getByText('Search')).toBeInTheDocument();
    expect(getByText('My records')).toBeInTheDocument();
    expect(getByText('Forms in progress')).toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();
  });

  it('should render service name but no header links', () => {
    const { getByText, queryByText } = render(
      <UserContext.Provider
        value={{
          user: null,
        }}
      >
        <Header {...props} />
      </UserContext.Provider>
    );
    expect(getByText('Foo')).toBeInTheDocument();
    expect(queryByText('Search')).not.toBeInTheDocument();
    expect(queryByText('My records')).not.toBeInTheDocument();
    expect(queryByText('Forms in progress')).not.toBeInTheDocument();
    expect(queryByText('Logout')).not.toBeInTheDocument();
  });

  it('should set active the correct link', () => {
    mockedUseRouter = {
      asPath: '/cases?my_notes_only=true',
      pathname: '/cases',
    };
    const { getByText, asFragment } = render(
      <UserContext.Provider
        value={{
          user: { name: 'bar' },
        }}
      >
        <Header {...props} />
      </UserContext.Provider>
    );
    expect(getByText('My records')).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
