import App from 'next/app';
import axios from 'axios';
import { SWRConfig } from 'swr';

import Layout from 'components/Layout';
import GoogleAnalytics from 'components/GoogleAnalytics/GoogleAnalytics';
import { AuthProvider } from 'components/UserContext/UserContext';
import { isAuthorised, shouldRedirect } from 'utils/auth';

import 'stylesheets/all.scss';
import 'stylesheets/header.scss';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = { user: props.user };
  }
  componentDidMount = () => {
    window.GOVUKFrontend.initAll();
  };
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <SWRConfig
          value={{
            fetcher: (resource, options) =>
              axios.get(resource, options).then((res) => res.data),
          }}
        >
          <AuthProvider user={this.state.user}>
            <GoogleAnalytics>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </GoogleAnalytics>
          </AuthProvider>
        </SWRConfig>
        <script src="/js/govuk.js"></script>
      </>
    );
  }
}

MyApp.getInitialProps = async (appContext) => {
  let user;
  if (appContext.ctx.req) {
    user = isAuthorised(appContext.ctx.req);
    const redirect = shouldRedirect(appContext.ctx.req.url, user);
    if (redirect) {
      appContext.ctx.res.writeHead(302, {
        Location: redirect,
      });
      appContext.ctx.res.end();
    }
  }
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps, user };
};

export default MyApp;
