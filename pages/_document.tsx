import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
import { generateCSP, generateNonce } from '../utils/contentSecurity';
import { GA_TRACKING_ID } from 'utils/gtag';

export default class AppDocument extends Document<{ nonce?: string }> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & { nonce?: string }> {
    const res = ctx?.res;
    const nonce = generateNonce();

    if (process.env.NODE_ENV === 'production' && res != null)
      res.setHeader('Content-Security-Policy', generateCSP(nonce));

    return { ...(await Document.getInitialProps(ctx)), nonce };
  }

  render(): JSX.Element {
    return (
      <Html id="root" className="govuk-template lbh-template" lang="en-gb">
        <Head nonce={this.props.nonce}>
          <link rel="icon" href="/favicon.ico" />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            nonce={this.props.nonce}
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
          <script
            nonce={this.props.nonce}
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TV9MT99');
          `,
            }}
          />
          {process.env.NODE_ENV === 'production' ? (
            <script
              nonce={this.props.nonce}
              dangerouslySetInnerHTML={{
                __html: `// Hotjar Tracking Code for https://social-care-service.hackney.gov.uk/
            (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:2457845,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`,
              }}
            />
          ) : null}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          />
        </Head>
        <body className="govuk-template__body lbh-template__body js-enabled">
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TV9MT99"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
        `,
            }}
          />

          <Main />
          <NextScript nonce={this.props.nonce} />
        </body>
      </Html>
    );
  }
}
