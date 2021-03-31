import { useState } from 'react';
import App, { AppInitialProps, AppContext, AppProps } from 'next/app';
import axios from 'axios';
import { SWRConfig } from 'swr';

import Layout from 'components/Layout';
import GoogleAnalytics from 'components/GoogleAnalytics/GoogleAnalytics';
import { AuthProvider } from 'components/UserContext/UserContext';
import { isAuthorised, shouldRedirect } from 'utils/auth';

import type { User } from 'types';

import 'stylesheets/all.scss';

interface Props {
  user?: Partial<User>;
}

const CustomApp = ({
  Component,
  pageProps,
}: AppProps<Props>): JSX.Element | null => {
  const [user] = useState(pageProps.user);
  return (
    <>
      <SWRConfig
        value={{
          fetcher: (resource, options) =>
            axios.get(resource, options).then((res) => res.data),
        }}
      >
        <AuthProvider user={user}>
          <GoogleAnalytics>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </GoogleAnalytics>
        </AuthProvider>
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
  return { ...appProps, pageProps: { ...appProps.pageProps, user } };
};

export default CustomApp;
