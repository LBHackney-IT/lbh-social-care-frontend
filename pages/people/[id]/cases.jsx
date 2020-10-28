import PropTypes from 'prop-types';
import { NextSeo } from 'next-seo';

import AdminNavBar from 'components/AdminNavBar/AdminNavBar';
import Cases from 'components/Cases/Cases';
import BackButton from 'components/Layout/BackButton/BackButton';

const CasesPage = ({ userDetails, query }) => {
  return (
    <div>
      <NextSeo title={`#${query.id} Cases`} noindex />
      <AdminNavBar adminName={userDetails.name} />
      <BackButton />
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
  return {
    props: {
      query,
    },
  };
};

export default CasesPage;
