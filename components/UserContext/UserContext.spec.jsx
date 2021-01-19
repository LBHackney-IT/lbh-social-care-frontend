import { waitFor, render } from '@testing-library/react';

import { UserContext, AuthProvider, useAuth } from './UserContext';

const mockedUseRouter = {
  pathname: '/foo',
  push: jest.fn(),
};

jest.mock('next/router', () => ({
  useRouter: () => mockedUseRouter,
}));

describe(`UserContext`, () => {
  describe('AuthProvider', () => {
    it('should work properly', async () => {
      const { findByText } = render(
        <AuthProvider
          user={{
            name: 'foo',
            isAuthorised: true,
          }}
        >
          <p>foo</p>
        </AuthProvider>
      );
      const children = await findByText('foo');
      expect(children).toBeInTheDocument();
    });

    it('should redirect to "/access-denied" if check-auth returns 403', async () => {
      render(
        <AuthProvider
          user={{
            name: 'foo',
          }}
        >
          <p>foo</p>
        </AuthProvider>
      );
      await waitFor(() => {
        expect(mockedUseRouter.push).toHaveBeenCalled();
        expect(mockedUseRouter.push).toHaveBeenCalledWith('/access-denied');
      });
    });

    it('should redirect to "/login" if check-auth returns 401', async () => {
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
