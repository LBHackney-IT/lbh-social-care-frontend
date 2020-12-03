import App from 'next/app';
import { DefaultSeo } from 'next-seo';

import { isAuthorised, AUTH_WHITELIST } from 'utils/auth';
import Layout from 'components/Layout';
import SEO from '../next-seo.config';
import UserContext from 'components/UserContext/UserContext';

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
        <UserContext.Provider
          value={{
            user: this.state.user,
          }}
        >
          <Layout>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </Layout>
        </UserContext.Provider>
        <script src="/js/govuk.js"></script>
      </>
    );
  }
}

MyApp.getInitialProps = async ({ ctx }) => {
  const WITH_REDIRECT = true;
  if (AUTH_WHITELIST.includes(ctx.pathname)) {
    return {};
  }
  const user = isAuthorised(ctx, WITH_REDIRECT);
  return {
    user,
  };
};

export default MyApp;
