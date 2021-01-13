import { NextSeo } from 'next-seo';

import BackButton from 'components/Layout/BackButton/BackButton';
import PersonView from 'components/PersonView/PersonView';
import Cases from 'components/Cases/Cases';
import AllocatedWorkers from 'components/AllocatedWorkers/AllocatedWorkers';

const CasesPage = ({ query }) => {
  return (
    <div>
      <NextSeo title={`#${query.id} Cases`} noindex />
      <BackButton />
      <PersonView personId={query.id}>
        <AllocatedWorkers {...query} />
        <Cases {...query} />
      </PersonView>
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
