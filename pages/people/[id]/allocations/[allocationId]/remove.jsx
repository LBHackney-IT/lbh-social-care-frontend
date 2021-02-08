import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import DeallocateWorkers from 'components/AllocatedWorkers/DeallocateWorker/DeallocateWorker';
import BackButton from 'components/Layout/BackButton/BackButton';
import PersonView from 'components/PersonView/PersonView';

const CasesPage = () => {
  const { query } = useRouter();
  return (
    <>
      <NextSeo title={`#${query.id} Cases`} noindex />
      <BackButton />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Deallocate worker from
      </h1>
      <PersonView personId={query.id} expandView={true} nameSize="m">
        {(person) => (
          <div className="govuk-!-margin-top-7">
            <DeallocateWorkers
              personId={person.mosaicId}
              allocationId={query.allocationId}
            />
          </div>
        )}
      </PersonView>
    </>
  );
};

export default CasesPage;
