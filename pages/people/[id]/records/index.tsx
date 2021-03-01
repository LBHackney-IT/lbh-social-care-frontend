import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import AddForm from 'components/AddForm/AddForm';
import BackButton from 'components/Layout/BackButton/BackButton';
import PersonView from 'components/PersonView/PersonView';
import { Resident } from 'types';

const AddNewRecordPage = (): React.ReactElement => {
  const { query } = useRouter();
  const personId = query.id as string;
  return (
    <>
      <NextSeo title={`#${personId} Cases`} noindex />
      <BackButton />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Add a new record for
      </h1>
      <PersonView personId={personId} expandView={true}>
        {(person: Resident) => (
          <>
            <p className="govuk-label govuk-!-margin-top-7 govuk-!-margin-bottom-5">
              Use forms to create a new record for a person
            </p>
            <AddForm person={person} />
          </>
        )}
      </PersonView>
    </>
  );
};

export default AddNewRecordPage;
