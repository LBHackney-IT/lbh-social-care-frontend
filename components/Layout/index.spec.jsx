import { render, waitFor } from '@testing-library/react';
import UserContext from 'components/UserContext/UserContext';
import { getDataIncludes } from 'utils/saveData';

import Layout from './index';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: jest.fn(),
  }),
}));

jest.mock('utils/saveData', () => ({
  getDataIncludes: jest.fn(),
}));

describe('Layout component', () => {
  it('should render properly', async () => {
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
        <Layout />
      </UserContext.Provider>
    );
    await waitFor(() => {
      expect(getByText('Menu')).toBeInTheDocument();
    });
    expect(getByText('My records')).toBeInTheDocument();
  });
});
