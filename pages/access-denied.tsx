import { NextSeo } from 'next-seo';

const AccessDenied = (): React.ReactElement => (
  <>
    <NextSeo title="Access Denied" noindex={true} />
    <h1>Access denied</h1>
    <p className="govuk-body">
      Sorry, but access to that page is for administrators only.
    </p>
  </>
);

export default AccessDenied;
