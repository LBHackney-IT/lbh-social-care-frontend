import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import DeallocateWorkers from 'components/AllocatedWorkers/DeallocateWorker/DeallocateWorker';
import BackButton from 'components/Layout/BackButton/BackButton';
import PersonView from 'components/PersonView/PersonView';
import { Resident } from 'types';

const RemovedAllocationPage = (): React.ReactElement => {
  const { query } = useRouter();
  const personId = query.id as string;
  const allocationId = query.allocationId as string;
  return (
    <>
      <NextSeo title={`#${personId} Cases`} noindex />
      <BackButton />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Deallocate worker from
      </h1>
      <PersonView personId={personId} expandView={true}>
        {(person: Resident) => (
          <div className="govuk-!-margin-top-7">
            <DeallocateWorkers
              personId={person.mosaicId}
              allocationId={allocationId}
            />
          </div>
        )}
      </PersonView>
    </>
  );
};

export default RemovedAllocationPage;
