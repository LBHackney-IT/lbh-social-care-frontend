import PropTypes from 'prop-types';
import Router from 'next/router';
import { isAuthorised, redirectToLogin } from 'utils/auth';
import { NextSeo } from 'next-seo';
import AdminNavBar from 'components/AdminNavBar/AdminNavBar';

const Home = ({ userDetails }) => {
  return (
    <div>
      <NextSeo title="Home" />
      <AdminNavBar adminName={userDetails.name} />
      <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
        <h1 className="govuk-fieldset__heading">Adult Referral From</h1>
      </legend>
      <button
        className="govuk-button"
        onClick={() => Router.push('/steps/client-details')}
      >
        Start
      </button>
    </div>
  );
};

Home.propTypes = {
  userDetails: PropTypes.object,
};

export const getServerSideProps = async (ctx) => {
  const user = isAuthorised(ctx);

  if (!user || !user.isAuthorised) {
    redirectToLogin(ctx);
  }

  return {
    props: {
      userDetails: user,
    },
  };
};

export default Home;
