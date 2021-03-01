import PropTypes from 'prop-types';
import { NextSeo } from 'next-seo';

import { getProtocol } from 'utils/urls';

interface Props {
  gssoUrl: string;
  returnUrl: string;
}

const AdminLoginPage = ({ gssoUrl, returnUrl }: Props): React.ReactElement => (
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

export const getServerSideProps = async () => {
  const { GSSO_URL, REDIRECT_URL } = process.env;
  const protocol = getProtocol();
  return {
    props: {
      gssoUrl: GSSO_URL,
      returnUrl: `${protocol}://${REDIRECT_URL}`,
    },
  };
};

export default AdminLoginPage;
