import { createContext, useContext } from 'react';
import { useRouter } from 'next/router';

import { AUTH_WHITELIST } from 'utils/auth';
import { isBrowser } from 'utils/ssr';

export const UserContext = createContext({
  user: undefined,
  setUser: () => {},
});

const shouldRedirect = (isPathWhitelisted, user) => {
  if (isBrowser()) {
    if (!isPathWhitelisted) {
      if (!user) {
        return '/login';
      }
      if (!user?.isAuthorised) {
        return '/access-denied';
      }
    }
    if (isPathWhitelisted & user?.isAuthorised) {
      return '/';
    }
  }
};

export const AuthProvider = ({ children, user }) => {
  const { pathname, push } = useRouter();
  const redirect = shouldRedirect(AUTH_WHITELIST.includes(pathname), user);
  if (redirect) {
    push(redirect);
    return <></>;
  }
  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
