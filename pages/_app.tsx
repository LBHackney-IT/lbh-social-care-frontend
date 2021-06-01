import { useEffect, useState } from 'react';
import App, { AppInitialProps, AppContext, AppProps } from 'next/app';
import { NextComponentType } from 'next';
import axios from 'axios';
import { SWRConfig } from 'swr';

import Layout from 'components/Layout';
import GoogleAnalytics from 'components/GoogleAnalytics/GoogleAnalytics';
import { AuthProvider } from 'components/UserContext/UserContext';
import { isAuthorised, shouldRedirect } from 'utils/auth';

import type { User } from 'types';

import 'stylesheets/all.scss';
import 'stylesheets/header.scss';
import { FeatureProvider } from '../hooks/use-feature-flags';
import { getFeatureFlags } from '../lib/feature-flags';

interface Props {
  user?: Partial<User>;
}

interface ExtendedAppProps extends AppProps<Props> {
  Component: NextComponentType & {
    goBackButton?: boolean;
  };
}

const CustomApp = ({
  Component,
  pageProps,
}: ExtendedAppProps): JSX.Element | null => {
  const [user] = useState(pageProps.user);
  const [featureFlags, setFeatureFlags] = useState(pageProps.featureFlags);

  useEffect(() => {
    setFeatureFlags(getFeatureFlags());
  }, [user]);

  return (
    <>
      <SWRConfig
        value={{
          fetcher: (resource, options) =>
            axios.get(resource, options).then((res) => res.data),
          onErrorRetry: (error) => {
            if (error.status === 404) return;
          },
        }}
      >
        <FeatureProvider features={featureFlags}>
          <AuthProvider user={user}>
            <GoogleAnalytics>
              <Layout goBackButton={Component.goBackButton}>
                <Component {...pageProps} />
              </Layout>
            </GoogleAnalytics>
          </AuthProvider>
        </FeatureProvider>
      </SWRConfig>
    </>
  );
};

CustomApp.getInitialProps = async (
  appContext: AppContext
): Promise<AppInitialProps & Props> => {
  let user;
  if (appContext.ctx.req && appContext.ctx.res) {
    user = isAuthorised(appContext.ctx.req) ?? user;

    const redirect =
      appContext.ctx.req.url && shouldRedirect(appContext.ctx.req.url, user);
    if (redirect && appContext.ctx.res.writeHead) {
      appContext.ctx.res.writeHead(302, {
        Location: redirect,
      });
      appContext.ctx.res.end();
    }
  }

  const appProps = await App.getInitialProps(appContext);

  const featureFlags = getFeatureFlags();

  return {
    ...appProps,
    pageProps: {
      ...appProps.pageProps,
      user,
      featureFlags,
    },
  };
};

export default CustomApp;
