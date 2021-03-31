import Seo from 'components/Layout/Seo/Seo';
import { useRouter } from 'next/router';

import AddAllocatedWorker from 'components/AllocatedWorkers/AddAllocatedWorker/AddAllocatedWorker';
import BackButton from 'components/Layout/BackButton/BackButton';
import PersonView from 'components/PersonView/PersonView';
import { useAuth } from 'components/UserContext/UserContext';
import { isBrowser } from 'utils/ssr';

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
      <BackButton />
      <main className="lbh-main-wrapper" id="main-content" role="main">
        <Seo title={`Allocate Worker to #${query.id} Allocate Worker`} />
        <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">
          Allocate worker to
        </h1>
        <PersonView personId={personId} expandView>
          {(person) => (
            <div className="govuk-!-margin-top-7">
              <AddAllocatedWorker
                personId={person.mosaicId}
                ageContext={person.ageContext}
              />
            </div>
          )}
        </PersonView>
      </main>
    </>
  );
};

export default AddNewAllocationPage;
