import { NextSeo } from 'next-seo';

import Cases from 'components/Cases/Cases';
import BackButton from 'components/Layout/BackButton/BackButton';
import PersonView from 'components/PersonView/PersonView';

const CasesPage = ({ query }) => {
  return (
    <div>
      <NextSeo title={`#${query.id} Cases`} noindex />
      <BackButton />
      <PersonView personId={query.id} />
      <h3>NOTES HISTORY #{query.id}</h3>
      <p>Linked files are read only</p>
      <Cases {...query} />
    </div>
  );
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
