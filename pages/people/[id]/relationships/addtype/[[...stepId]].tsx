import Seo from 'components/Layout/Seo/Seo';
import PersonView from 'components/PersonView/PersonView';
import FormWizard from 'components/FormWizard/FormWizard';
import formSteps from 'data/forms/add-relationship';
import RelationshipConfirmation from 'components/Steps/RelationshipConfirmation';

const addType = (): React.ReactElement => {
  return (
    <>
      <Seo title={`Person Details - #${query.id}`} />
      <PersonView personId={Number(query.id as string)} expandView>
        <FormWizard
          formPath={`/people/${query.id}/relationships/addtype`}
          formSteps={formSteps}
          title="Add stuff"
          hideBackButton
          successMessage="Relationship has been added"
          customConfirmation={RelationshipConfirmation}
        />
      </PersonView>
    </>
  );
};

addType.goBackButton = true;

export default addType;
