import { waitFor, render } from '@testing-library/react';

import { UserContext, AuthProvider, useAuth } from './UserContext';
import { mockedUser } from 'factories/users';

import type { User } from 'types';

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
        <AuthProvider user={mockedUser}>
          <p>foo</p>
        </AuthProvider>
      );
      const children = await findByText('foo');
      expect(children).toBeInTheDocument();
    });

    it('should redirect to "/access-denied" if user is present but isAuthorised false', async () => {
      render(
        <AuthProvider user={{ ...mockedUser, isAuthorised: false }}>
          <p>foo</p>
        </AuthProvider>
      );
      await waitFor(() => {
        expect(mockedUseRouter.push).toHaveBeenCalled();
        expect(mockedUseRouter.push).toHaveBeenCalledWith('/access-denied');
      });
    });

    it('should redirect to "/login" if user undefined', async () => {
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
        const { user } = useAuth() as { user: User };
        return user ? <>{user.name}</> : null;
      };
      const { getByText } = render(
        <UserContext.Provider value={{ user: mockedUser }}>
          <TestComponent />
        </UserContext.Provider>
      );
      expect(getByText('foo')).toBeInTheDocument();
    });
  });
});
