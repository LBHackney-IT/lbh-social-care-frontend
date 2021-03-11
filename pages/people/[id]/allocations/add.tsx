import Seo from 'components/Layout/Seo/Seo';
import { useRouter } from 'next/router';

import AddAllocatedWorker from 'components/AllocatedWorkers/AddAllocatedWorker/AddAllocatedWorker';
import BackButton from 'components/Layout/BackButton/BackButton';
import PersonView from 'components/PersonView/PersonView';
import { useAuth } from 'components/UserContext/UserContext';
import { isBrowser } from 'utils/ssr';

import type { Resident } from 'types';

const AddNewAllocationPage = (): React.ReactElement => {
  const { query, replace } = useRouter();
  const personId = Number(query.id as string);
  const { user } = useAuth();
  if (isBrowser() && !user?.hasAllocationsPermissions) {
    replace(`/people/${personId}`);
    return <></>;
  }
  return (
    <>
      <Seo title={`#${query.id} Cases`} />
      <BackButton />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Allocate worker to
      </h1>
      <PersonView personId={personId} expandView>
        {(person: Resident) => (
          <div className="govuk-!-margin-top-7">
            <AddAllocatedWorker
              personId={person.mosaicId}
              ageContext={person.ageContext}
            />
          </div>
        )}
      </PersonView>
    </>
  );
};

export default AddNewAllocationPage;
