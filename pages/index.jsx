import PropTypes from 'prop-types';
import { isAuthorised, redirectToLogin } from 'utils/auth';
import { NextSeo } from 'next-seo';
import AdminNavBar from 'components/AdminNavBar/AdminNavBar';
import LinkButton from 'components/LinkButton/LinkButton';

const Home = ({ userDetails }) => {
  return (
    <div>
      <NextSeo title="Home" />
      <AdminNavBar adminName={userDetails.name} />
      <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
        <h1 className="govuk-fieldset__heading">Form Dashboard</h1>
      </legend>
      <LinkButton label="Search for People" route="/people/search" />
      <LinkButton label="Adult Referral From" route="/steps/client-details" />
      <LinkButton
        label="Case Notes Recording"
        route="/steps/case-notes-recording"
      />
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
