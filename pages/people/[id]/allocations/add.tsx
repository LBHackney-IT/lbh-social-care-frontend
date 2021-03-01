import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import AddAllocatedWorker from 'components/AllocatedWorkers/AddAllocatedWorker/AddAllocatedWorker';
import BackButton from 'components/Layout/BackButton/BackButton';
import PersonView from 'components/PersonView/PersonView';
import { Resident } from 'types';

const AddNewAllocationPage = (): React.ReactElement => {
  const { query } = useRouter();
  const personId = query.id as string;
  return (
    <>
      <NextSeo title={`#${personId} Cases`} noindex />
      <BackButton />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Allocate worker to
      </h1>
      <PersonView personId={personId} expandView={true}>
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
