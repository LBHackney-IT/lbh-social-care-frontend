import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import PersonView from 'components/PersonView/PersonView';
import FormWizard from 'components/FormWizard/FormWizard';
import formSteps from 'data/forms/add-relationship';
import PersonLinkConfirmation from 'components/Steps/PersonLinkConfirmation';
import { addRelationships } from 'utils/api/relationships';

const AddRelationshipForm = (): React.ReactElement => {
  const { query } = useRouter();

  const personId = query.id as string;
  const otherPersonId = query.otherPersonId as string;

  const onFormSubmit = async (formData: FormData) => {
    const ref = await addRelationships({
      ...formData,
      personId: personId,
      otherPersonId: otherPersonId,
      isMainCarer: 'N',
      isInformalCarer: 'N',
      details: 'formData.details',
    });
    return ref;
  };

  return (
    <>
      <Seo title={`Person Details - #${personId}`} />
      <PersonView personId={Number(personId as string)} expandView>
        <FormWizard
          formPath={`/people/${personId}/relationships/add/`}
          formSteps={formSteps}
          title="Add relationship"
          customConfirmation={PersonLinkConfirmation}
          onFormSubmit={onFormSubmit}
          hideBackButton
          successMessage="Relationship has been added"
        />
      </PersonView>
    </>
  );
};

// AddRelationshipForm.goBackButton = false;

export default AddRelationshipForm;
