import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import PersonView from 'components/PersonView/PersonView';
import FormWizard from 'components/FormWizard/FormWizard';
import formSteps from 'data/forms/add-relationship';
import CustomConfirmation from 'components/Steps/PersonConfirmation';

const AddRelationshipForm = (): React.ReactElement => {
  const { query } = useRouter();
  const onFormSubmit = async (formData: FormData) => {
    // const ref = await updateResident(personId, {
    //   ...formData,
    //   contextFlag: formData.contextFlag || user.permissionFlag,
    //   nhsNumber: Number(formData.nhsNumber),
    //   createdBy: user.email,
    //   restricted: formData.restricted || person?.restricted,

    console.log('Relationship add ' + formData);
  };

  return (
    <>
      <Seo title={`Person Details - #${query.id}`} />
      <PersonView personId={Number(query.id as string)} expandView>
        <FormWizard
          formPath={`/people/${query.id}/relationships/add/form`}
          formSteps={formSteps}
          title="Choose relationship details"
          onFormSubmit={onFormSubmit}
          hideBackButton
          successMessage="Relationship has been added"
          customConfirmation={CustomConfirmation}
        />
      </PersonView>
    </>
  );
};

AddRelationshipForm.goBackButton = true;

export default AddRelationshipForm;
