import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import PersonView from 'components/PersonView/PersonView';
import FormWizard from 'components/FormWizard/FormWizard';
import formSteps from 'data/forms/add-relationship';
import { addRelationships } from 'utils/api/relationships';

const AddRelationshipForm = (): React.ReactElement => {
  const { query } = useRouter();

  const personId = query.id as string;
  const secondPersonId = query.secondPersonId as string;

  interface FormData {
    type: string;
    ofUnbornChild?: string;
    isMainCarer?: string;
    [key: string]: unknown;
  }

  const onFormSubmit = async (formData: FormData) => {
    if (formData.type === 'Parent' && formData.ofUnbornChild == 'Yes') {
      formData.type = 'parentOfUnbornChild';
    }
    if (formData.type === 'Sibling' && formData.ofUnbornChild == 'Yes') {
      formData.type = 'siblingOfUnbornChild';
    }

    delete formData.ofUnbornChild;

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
      <PersonView personId={Number(personId as string)} expandView>
        <FormWizard
          formPath={`/people/${personId}/relationships/add/${secondPersonId}/`}
          formSteps={formSteps}
          title="Add relationship"
          onFormSubmit={onFormSubmit}
          successMessage="Relationship has been added"
        />
      </PersonView>
    </>
  );
};

export default AddRelationshipForm;
