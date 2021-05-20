import { useRouter } from 'next/router';
import AddForm from 'components/AddForm/AddForm';
import PersonView from 'components/PersonView/PersonView';
import Seo from 'components/Layout/Seo/Seo';

const AddNewRecordPage = (): React.ReactElement => {
  const { query } = useRouter();
  const personId = Number(query.id as string);
  return (
    <>
      <Seo title={`Add a new record for #${query.id}`} />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Add a new record for
      </h1>
      <PersonView personId={personId} expandView>
        {(person) => (
          <>
            <p className="lbh-label govuk-!-margin-top-7 govuk-!-margin-bottom-5">
              Use forms to create a new record for a person
            </p>
            <AddForm person={person} />
          </>
        )}
      </PersonView>
    </>
  );
};

AddNewRecordPage.goBackButton = true;

export default AddNewRecordPage;
