import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import BackButton from 'components/Layout/BackButton/BackButton';
import PersonView from 'components/PersonView/PersonView';
import Cases from 'components/Cases/Cases';
import AllocatedWorkers from 'components/AllocatedWorkers/AllocatedWorkers';

const PersonPage = () => {
  const { query } = useRouter();
  return (
    <div>
      <NextSeo title={`#${query.id} Cases`} noindex />
      <BackButton />
      <PersonView personId={query.id}>
        {(person) => (
          <>
            <AllocatedWorkers {...query} />
            <Cases {...query} person={person} />
          </>
        )}
      </PersonView>
    </div>
  );
};

export default PersonPage;
