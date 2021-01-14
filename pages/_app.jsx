import App from 'next/app';
import { DefaultSeo } from 'next-seo';

import Layout from 'components/Layout';
import SEO from '../next-seo.config';
import GoogleTagManager from 'components/GoogleTagManager/GoogleTagManager';
import { AuthProvider } from 'components/UserContext/UserContext';

import 'stylesheets/all.scss';
import 'stylesheets/header.scss';

class MyApp extends App {
  componentDidMount = () => {
    window.GOVUKFrontend.initAll();
  };
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <AuthProvider>
          <GoogleTagManager>
            <Layout>
              <DefaultSeo {...SEO} />
              <Component {...pageProps} />
            </Layout>
          </GoogleTagManager>
        </AuthProvider>
        <script src="/js/govuk.js"></script>
      </>
    );
  }
}

export default MyApp;
