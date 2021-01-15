import { waitFor, render } from '@testing-library/react';

import { UserContext, AuthProvider, useAuth } from './UserContext';

import { getUser } from 'utils/api/checkAuth';

jest.mock('components/Layout', () => () => 'MockedSpinnerWithLayout');

jest.mock('utils/api/checkAuth', () => ({
  getUser: jest.fn(),
}));

const mockedUseRouter = {
  query: { foo: 'bar' },
  replace: jest.fn(),
  push: jest.fn(),
  isReady: true,
  asPath: 'foopath',
};

jest.mock('next/router', () => ({
  useRouter: () => mockedUseRouter,
}));

describe(`UserContext`, () => {
  describe('AuthProvider', () => {
    it('should work properly', async () => {
      getUser.mockImplementation(() =>
        Promise.resolve({
          name: 'foo',
        })
      );

      const { findByText, queryByText } = render(
        <AuthProvider>
          <p>foo</p>
        </AuthProvider>
      );
      expect(getUser).toHaveBeenCalled();
      expect(queryByText('MockedSpinnerWithLayout')).toBeInTheDocument();
      const children = await findByText('foo');
      expect(queryByText('MockedSpinnerWithLayout')).not.toBeInTheDocument();
      expect(children).toBeInTheDocument();
    });

    it('should redirect to "/access-denied" if check-auth returns 403', async () => {
      getUser.mockImplementation(() =>
        Promise.reject({
          response: { status: 403 },
        })
      );

      render(
        <AuthProvider>
          <p>foo</p>
        </AuthProvider>
      );
      await waitFor(() => {
        expect(mockedUseRouter.push).toHaveBeenCalled();
        expect(mockedUseRouter.push).toHaveBeenCalledWith('/access-denied');
      });
    });

    it('should redirect to "/login" if check-auth returns 401', async () => {
      getUser.mockImplementation(() =>
        Promise.reject({
          response: { status: 401 },
        })
      );

      render(
        <AuthProvider>
          <p>foo</p>
        </AuthProvider>
      );
      await waitFor(() => {
        expect(mockedUseRouter.push).toHaveBeenCalled();
        expect(mockedUseRouter.push).toHaveBeenCalledWith('/login');
      });
    });
  });

  describe('useAuth with UserContext', () => {
    it('should work properly', async () => {
      const TestComponent = () => {
        const { user } = useAuth();
        return user;
      };
      const { getByText } = render(
        <UserContext.Provider
          value={{
            user: 'i am the user',
          }}
        >
          <TestComponent />
        </UserContext.Provider>
      );
      expect(getByText('i am the user')).toBeInTheDocument();
    });
  });
});
