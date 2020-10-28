import PropTypes from 'prop-types';
import { NextSeo } from 'next-seo';

import { isAuthorised, redirectToLogin } from 'utils/auth';
import AdminNavBar from 'components/AdminNavBar/AdminNavBar';
import Cases from 'components/Cases/Cases';
import BackButton from 'components/Layout/BackButton/BackButton';
import PersonView from 'components/PersonView/PersonView';
const CasesPage = ({ user, query }) => {
  return (
    <div>
      <NextSeo title={`#${query.id} Cases`} noindex />
      <AdminNavBar adminName={user.name} />
      <BackButton />
      <PersonView personId={query.id} />
      <h1>Cases for #{query.id}</h1>
      <Cases {...query} />
    </div>
  );
};

CasesPage.propTypes = {
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

export default CasesPage;
