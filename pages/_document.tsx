import Document, { Html, Head, Main, NextScript } from 'next/document';

import { GA_TRACKING_ID } from 'utils/gtag';

export default class AppDocument extends Document {
  render(): JSX.Element {
    return (
      <Html id="root" className="govuk-template lbh-template" lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body className="govuk-template__body lbh-template__body js-enabled">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
