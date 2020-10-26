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
      <button
        href="#"
        role="button"
        draggable="false"
        className="govuk-button govuk-button--start govuk-!-margin-top-3"
        data-module="govuk-button"
        onClick={() => Router.push('/people/search')}
      >
        Search for People
        <svg
          className="govuk-button__start-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="17.5"
          height="19"
          viewBox="0 0 33 40"
          aria-hidden="true"
          focusable="false"
        >
          <path fill="currentColor" d="M0 0h13l20 20-20 20H0l20-20z" />
        </svg>
      </button>
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
