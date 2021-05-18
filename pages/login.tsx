import Seo from 'components/Layout/Seo/Seo';
import { getProtocol } from 'utils/urls';

interface Props {
  gssoUrl: string;
  returnUrl: string;
}

const AdminLoginPage = ({ gssoUrl, returnUrl }: Props): React.ReactElement => (
  <>
    <Seo title="Log In" />
    <h1>Sign in</h1>
    <a
      href={`${gssoUrl}${returnUrl}`}
      className="govuk-button lbh-button  lbh-button--start govuk-button--start"
    >
      Sign in with Google
      <svg
        className="govuk-button__start-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="17.5"
        height="19"
        viewBox="0 0 33 40"
        role="presentation"
        focusable="false"
      >
        <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
      </svg>
    </a>

    <p className="lbh-body">Please sign in with your Hackney email account.</p>

    <p className="lbh-body">
      Please contact your manager if you have issues signing in.
    </p>
  </>
);

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
