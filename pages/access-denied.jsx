import { NextSeo } from 'next-seo';

import { redirectToHome, isAuthorised } from 'utils/auth';

const AccessDenied = () => (
  <div>
    <NextSeo title="Access Denied" noindex={true} />
    <h1>Access denied</h1>
    <p className="govuk-body">
      Sorry, but access to that page is for administrators only.
    </p>
  </div>
);

export const getServerSideProps = async (ctx) => {
  const user = isAuthorised(ctx);
  if (user && user.isAuthorised) {
    redirectToHome(ctx.res);
  }
  return {
    props: {},
  };
};

export default AccessDenied;
