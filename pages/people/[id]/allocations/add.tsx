import Seo from 'components/Layout/Seo/Seo';
import { useRouter } from 'next/router';

import AddAllocatedWorker from 'components/AllocatedWorkers/AddAllocatedWorker/AddAllocatedWorker';
import PersonView from 'components/PersonView/PersonView';
import { useAuth } from 'components/UserContext/UserContext';
import { isBrowser } from 'utils/ssr';
import { canUserAllocateWorkerToPerson } from '../../../../lib/permissions';
import { useResident } from '../../../../utils/api/residents';
import { User } from '../../../../types';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import Spinner from '../../../../components/Spinner/Spinner';

const AddNewAllocationPage: React.FC = () => {
  const { query, replace } = useRouter();
  const personId = Number(query.id as string);
  const { data: person, error } = useResident(personId);
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
      <Seo title={`Allocate Worker to #${query.id} Allocate Worker`} />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Allocate worker to
      </h1>
      <PersonView personId={personId} expandView>
        {(person) => (
          <div className="govuk-!-margin-top-7">
            <AddAllocatedWorker
              personId={person.id}
              ageContext={person.contextFlag}
            />
          </div>
        )}
      </PersonView>
    </>
  );
};

AddNewAllocationPage.goBackButton = true;

export default AddNewAllocationPage;
