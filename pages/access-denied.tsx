import Seo from 'components/Layout/Seo/Seo';
import Link from 'next/link';

const AccessDenied = (): React.ReactElement => (
  <main className="lbh-main-wrapper" id="main-content" role="main">
    <Seo title="Access denied" />
    <h1 className="lbh-heading-h1">Access denied</h1>
    <p className="lbh-body">
      You don&apos;t have permission to view this page.
    </p>
    <p className="lbh-body">
      You may need to{' '}
      <Link href="/login">
        <a className="lbh-link">sign in</a>
      </Link>
      .
    </p>
  </main>
);

export default AccessDenied;
