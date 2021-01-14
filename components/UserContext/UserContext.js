import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { AUTH_WHITELIST } from 'utils/auth';
import { getUser } from 'utils/api/checkAuth';
import Layout from 'components/Layout';
import Spinner from 'components/Spinner/Spinner';

export const UserContext = createContext({
  user: undefined,
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [redirect, setRedirect] = useState();
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const data = getUser();
        setUser(data);
      } catch (e) {
        setUser();
        setRedirect(e.response.status === 403 ? '/access-denied' : '/login');
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);
  if (isLoading || !router.isReady) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }
  if (
    typeof window !== 'undefined' &&
    AUTH_WHITELIST.includes(router.pathname) === Boolean(user)
  ) {
    router.push(redirect || location);
    return <></>;
  }
  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        setUser,
        redirect,
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
