import Seo from 'components/Layout/Seo/Seo';
import PersonView from 'components/PersonView/PersonView';
import FormWizard from 'components/FormWizard/FormWizard';
import formSteps from 'data/forms/add-relationship';
import { useResident } from 'utils/api/residents';
import { addRelationships, useRelationships } from 'utils/api/relationships';
import PersonLinkConfirmation from 'components/Steps/PersonLinkConfirmation';
import { RELATIONSHIP_TYPE_OPTIONS } from 'data/relationships';
import { ObjectOption } from 'components/Form/types';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { useAuth } from 'components/UserContext/UserContext';
import type { User } from 'types';

interface FormData {
  type: string;
  additionalOptions?: string[];
  [key: string]: unknown;
}

const AddRelationshipForm: React.FC<{
  personId: number;
  secondPersonId: number;
}> = ({ personId, secondPersonId }) => {
  const { user } = useAuth() as { user: User };

  const onFormSubmit = async (formData: FormData) => {
    const { data, error } = await addRelationships({
      ...formData,
      personId: Number(personId),
      otherPersonId: Number(secondPersonId),
      createdBy: user.email,
    });

    if (error) throw error;

    return data;
  };

  const { data: secondPerson, error: secondPersonError } =
    useResident(secondPersonId);

  const { data: relationships, error: relationshipsError } =
    useRelationships(personId);

  if (!secondPerson && !secondPersonError) return <Spinner />;

  if (secondPersonError || secondPerson === undefined)
    return (
      <ErrorMessage label="There was a problem with getting the details of the selected resident. Please refresh the page or try again later." />
    );

  if (!relationships && !relationshipsError) return <Spinner />;

  if (relationshipsError || relationships === undefined)
    return (
      <ErrorMessage label="There was a problem with getting current personal relationships. Please refresh the page or try again later." />
    );

  const existingRelationshipTypes = relationships.personalRelationships.map(
    (relationship) => {
      if (relationship.persons.some((person) => person.id === secondPersonId)) {
        return relationship.type;
      }
    }
  ) as string[];

  const relationshipTypeOptions = RELATIONSHIP_TYPE_OPTIONS.map(
    (type: ObjectOption) => {
      if (existingRelationshipTypes.includes(type.value as string)) {
        type.disabled = true;
      }

      return type;
    }
  );

  const sortedRelationshipTypeOptions = relationshipTypeOptions.sort((a, b) =>
    a.text.localeCompare(b.text)
  );

  return (
    <>
      <Seo title={`Person Details - #${personId}`} />
      <PersonView personId={Number(personId)} expandView>
        {() => (
          <FormWizard
            formPath={`/people/${personId}/relationships/add/${secondPersonId}/`}
            formSteps={formSteps(sortedRelationshipTypeOptions, secondPerson)}
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
