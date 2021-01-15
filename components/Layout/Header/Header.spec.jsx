import { render } from '@testing-library/react';

import Header from './Header';
import { UserContext } from 'components/UserContext/UserContext';
import { getDataIncludes } from 'utils/saveData';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'path',
  }),
}));

jest.mock('utils/saveData', () => ({
  getDataIncludes: jest.fn(),
}));

describe('Header component', () => {
  const props = {
    serviceName: 'Foo',
  };
  it('should render header links with form in progress link', () => {
    getDataIncludes.mockImplementationOnce(() => [
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
});
