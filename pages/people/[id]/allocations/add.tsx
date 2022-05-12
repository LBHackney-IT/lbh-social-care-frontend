import Seo from 'components/Layout/Seo/Seo';
import { useRouter } from 'next/router';

import AddAllocatedWorker from 'components/AllocatedWorkers/AddAllocatedWorker/AddAllocatedWorker';
import PersonView from 'components/PersonView/PersonView';
import { useAuth } from 'components/UserContext/UserContext';
import { isBrowser } from 'utils/ssr';
import { canUserAllocateWorkerToPerson } from '../../../../lib/permissions';
import { User } from '../../../../types';
import { useResident } from '../../../../utils/api/residents';
import ErrorMessage from '../../../../components/ErrorMessage/ErrorMessage';
import Spinner from '../../../../components/Spinner/Spinner';

const AddNewAllocationPage = (): React.ReactElement => {
  const { query, replace } = useRouter();
  const personId = Number(query.id as string);
  const { user } = useAuth() as { user: User };
  const { data: person, error } = useResident(personId);

  if (error) {
    return <ErrorMessage label={error.message} />;
  }

  if (!person) {
    return <Spinner />;
  }

  if (isBrowser() && !canUserAllocateWorkerToPerson(user, person)) {
    replace(`/people/${personId}`);
    return <></>;
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
