import Seo from 'components/Layout/Seo/Seo';
import PersonView from 'components/PersonView/PersonView';
import FormWizard from 'components/FormWizard/FormWizard';
import formSteps from 'data/forms/add-relationship';
import { addRelationships } from 'utils/api/relationships';
import PersonLinkConfirmation from 'components/Steps/PersonLinkConfirmation';

const AddRelationshipForm: React.FC<{
  personId: number;
  secondPersonId: number;
}> = ({ personId, secondPersonId }) => {
  interface FormData {
    type: string;
    additionalOptions?: string[];
    [key: string]: unknown;
  }

  const onFormSubmit = async (formData: FormData) => {
    const { data, error } = await addRelationships({
      ...formData,
      personId: Number(personId),
      otherPersonId: Number(secondPersonId),
    });

    if (error) throw error;

    return data;
  };

  return (
    <>
      <Seo title={`Person Details - #${personId}`} />
      <PersonView personId={Number(personId)} expandView>
        {() => (
          <FormWizard
            formPath={`/people/${personId}/relationships/add/${secondPersonId}/`}
            formSteps={formSteps}
            title="Add new relationship"
            onFormSubmit={onFormSubmit}
            successMessage="Relationship has been added"
            customConfirmation={PersonLinkConfirmation}
          />
        )}
      </PersonView>
    </>
  );
};

export default AddRelationshipForm;
