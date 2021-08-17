import { useRouter } from 'next/router';
import PersonView from 'components/PersonView/PersonView';

import SearchForRelatedPerson from 'components/Relationships/AddRelationshipForm/SearchForRelatedPerson';
import Seo from 'components/Layout/Seo/Seo';

const AddNewRelationship = (): React.ReactElement => {
  const { query } = useRouter();
  const personId = Number(query.id as string);

  return (
    <>
      <Seo title={`Add a new record for #${query.id}`} />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Add a new relationship
      </h1>
      <PersonView personId={personId} expandView>
        {(person) => <SearchForRelatedPerson personId={person.id} />}
      </PersonView>
    </>
  );
};

AddNewRelationship.goBackButton = true;

export default AddNewRelationship;
