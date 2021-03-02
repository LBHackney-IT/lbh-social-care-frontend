import { createContext, useContext, ReactNode, ReactElement } from 'react';
import { useRouter } from 'next/router';

import { shouldRedirect } from 'utils/auth';
import { isBrowser } from 'utils/ssr';

import type { User } from 'types';

interface Props {
  children: ReactNode;
  user?: User;
}

export const UserContext = createContext<{ user?: User }>({
  user: undefined,
});

export const AuthProvider = ({ children, user }: Props): ReactElement => {
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

export const useAuth = (): { user?: User } => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
