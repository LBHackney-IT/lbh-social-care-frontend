import PropTypes from 'prop-types';
import { NextSeo } from 'next-seo';

import { isAuthorised, redirectToLogin } from 'utils/auth';
import AdminNavBar from 'components/AdminNavBar/AdminNavBar';
import BackButton from 'components/Layout/BackButton/BackButton';
import Search from 'components/Search/Search';

const SearchPage = ({ user, query }) => {
  return (
    <div>
      <NextSeo title="Search" noindex />
      <AdminNavBar adminName={user.name} />
      <BackButton />
      <h1>Person lookup</h1>
      <p className="govuk-body govuk-!-margin-bottom-7">
        Search for resident by Mosaic Id <strong>or</strong> Person Details to
        see if we have a record for them.
      </p>
      <Search {...query} />
    </div>
  );
};

SearchPage.propTypes = {
  userDetails: PropTypes.object,
};

export const getServerSideProps = async (ctx) => {
  const { query } = ctx;
  const user = isAuthorised(ctx);
  if (!user || !user.isAuthorised) {
    redirectToLogin(ctx);
  }
  return {
    props: {
      user,
      query,
    },
  };
};

export default SearchPage;
