import App from 'next/app';
import Layout from 'components/Layout';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

import 'stylesheets/all.scss';

export default class MyApp extends App {
  componentDidMount = () => {
    window.GOVUKFrontend.initAll();
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Layout>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </Layout>
        <script src="/js/govuk.js"></script>
      </>
    );
  }
}
