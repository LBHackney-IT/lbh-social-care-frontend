import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import DeallocateWorkers from 'components/AllocatedWorkers/DeallocateWorker/DeallocateWorker';
import BackButton from 'components/Layout/BackButton/BackButton';
import PersonView from 'components/PersonView/PersonView';
import { useAuth } from 'components/UserContext/UserContext';
import { isBrowser } from 'utils/ssr';

import type { Resident } from 'types';

const RemovedAllocationPage = (): React.ReactElement => {
  const { query, replace } = useRouter();
  const personId = Number(query.id as string);
  const allocationId = Number(query.allocationId as string);
  const { user } = useAuth();
  if (isBrowser() && !user?.hasAllocationsPermissions) {
    replace(`/people/${personId}`);
    return <></>;
  }
  return (
    <>
      <Seo title={`Deallocate Worker from #${query.id} `} />
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
