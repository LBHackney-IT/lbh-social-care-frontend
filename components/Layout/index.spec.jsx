import { render } from '@testing-library/react';
import { UserContext } from 'components/UserContext/UserContext';
import { getData } from 'utils/saveData';

import Layout from './index';

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: 'path',
  }),
}));

jest.mock('utils/saveData', () => ({
  getData: jest.fn(),
}));

describe('Layout component', () => {
  it('should render properly', async () => {
    getData.mockImplementationOnce(() => [
      {
        formPath: '/form/foo-bar/',
        timeStamp: '22/12/2020',
        title: 'Foo Bar',
        deleteForm: jest.fn(),
      },
    ]);
    const { getByText, findByText } = render(
      <UserContext.Provider
        value={{
          user: { name: 'bar' },
        }}
      >
        <Layout>
          <p>I am the children</p>
        </Layout>
      </UserContext.Provider>
    );
    const menu = await findByText('Menu');
    expect(menu).toBeInTheDocument();
    expect(getByText('My records')).toBeInTheDocument();
  });
});
