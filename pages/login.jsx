import PropTypes from 'prop-types';
import { NextSeo } from 'next-seo';
import { redirectToHome, isAuthorised } from 'utils/auth';
import { getProtocol } from 'utils/urls';

const AdminLoginPage = ({ gssoUrl, returnUrl }) => (
  <>
    <NextSeo title="Log In" noindex />
    <h1>Login</h1>
    <p className="govuk-body">Please log in with your Hackney email account.</p>
    <div>
      <a className="govuk-button" href={`${gssoUrl}${returnUrl}`}>
        Login
      </a>
    </div>
    <p className="govuk-body">
      Please contact your administrator if you have issues logging in.
    </p>
  </>
);

AdminLoginPage.propTypes = {
  gssoUrl: PropTypes.string.isRequired,
  returnUrl: PropTypes.string.isRequired,
};

export const getServerSideProps = async (ctx) => {
  const { GSSO_URL } = process.env;
  const protocol = getProtocol();
  const { REDIRECT_URL } = process.env;
  const host = REDIRECT_URL;

  const user = isAuthorised(ctx);

  if (user && user.isAuthorised) {
    redirectToHome(ctx.res);
  }

  return {
    props: {
      gssoUrl: GSSO_URL,
      returnUrl: `${protocol}://${host}`,
    },
  };
};

export default AdminLoginPage;
