import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import DeallocateWorkers from 'components/AllocatedWorkers/DeallocateWorker/DeallocateWorker';
import PersonView from 'components/PersonView/PersonView';
import { useAuth } from 'components/UserContext/UserContext';
import { isBrowser } from 'utils/ssr';
import { useResident } from 'utils/api/residents';
import { canUserAllocateWorkerToPerson } from 'lib/permissions';
import Spinner from 'components/Spinner/Spinner';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { User } from 'types';

const RemovedAllocationPage: React.FC = () => {
  const { query, replace } = useRouter();
  const personId = Number(query.id as string);
  const { data: person, error } = useResident(personId);
  const allocationId = Number(query.allocationId as string);
  const { user } = useAuth() as { user: User };

  if (!person) {
    return <Spinner />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  if (isBrowser() && !canUserAllocateWorkerToPerson(user, person)) {
    replace(`/people/${personId}`);

    return null;
  }

  return (
    <>
      <Seo title={`Deallocate Worker from #${query.id} `} />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Deallocate worker from
      </h1>
      <PersonView personId={personId} expandView={true}>
        {(person) => (
          <div className="govuk-!-margin-top-7">
            <DeallocateWorkers
              personId={person.id}
              allocationId={allocationId}
            />
          </div>
        )}
      </PersonView>
    </>
  );
};

RemovedAllocationPage.goBackButton = true;

export default RemovedAllocationPage;
