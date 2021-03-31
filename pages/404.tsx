import Seo from 'components/Layout/Seo/Seo';

const NotFound = (): React.ReactElement => (
  <main className="lbh-main-wrapper" id="main-content" role="main">
    <Seo title="Page not found" />
    <h1 className="lbh-heading-h1">Page not found</h1>
    <p className="lbh-body">
      If you typed the web address, check it is correct.
    </p>
    <p className="lbh-body">
      If you pasted the web address, check you copied the entire address.
    </p>
    <p className="lbh-body">
      If the web address is correct or you selected a link or button, please{' '}
      <a href={process.env.NEXT_PUBLIC_FEEDBACK_LINK}>report the problem</a>.
    </p>
  </main>
);

export default NotFound;
