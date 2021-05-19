import Head from 'next/head';

const NotFound = (): React.ReactElement => (
  <>
    <Head>
      <title>Page not found | Social care | Hackney Council</title>
    </Head>

    <h1 className="lbh-heading-h1">Page not found</h1>

    <p className="lbh-body">
      If you typed the web address, check it is correct.
    </p>
    <p className="lbh-body">
      If you pasted the web address, check you copied the entire address.
    </p>
    <p className="lbh-body">
      If the web address is correct or you selected a link or button, please
      report an issue.
    </p>
  </>
);

export default NotFound;
