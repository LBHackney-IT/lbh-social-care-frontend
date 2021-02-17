import { createContext, useContext } from 'react';
import { useRouter } from 'next/router';

import { shouldRedirect } from 'utils/auth';
import { isBrowser } from 'utils/ssr';

export const UserContext = createContext({
  user: undefined,
  setUser: () => {},
});

export const AuthProvider = ({ children, user }) => {
  const { pathname, push } = useRouter();
  const redirect = isBrowser() && shouldRedirect(pathname, user);
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
