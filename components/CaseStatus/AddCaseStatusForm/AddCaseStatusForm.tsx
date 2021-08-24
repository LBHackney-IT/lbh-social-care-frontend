import Seo from 'components/Layout/Seo/Seo';
import PersonView from 'components/PersonView/PersonView';
import FormWizard from 'components/FormWizard/FormWizard';
import formSteps from 'data/forms/add-case-status';
import { useAuth } from 'components/UserContext/UserContext';
import type { User } from 'types';

interface FormData {
  type: string;
  additionalOptions?: string[];
  [key: string]: unknown;
}

const AddCaseStatusForm: React.FC<{
  personId: number;
}> = ({ personId }) => {
  const { user } = useAuth() as { user: User };

  //   const onFormSubmit = async (formData: FormData) => {
  //     const { data, error } = addCaseStatus
  //         id: number;
  //     });

  //     if (error) throw error;

  //     return data;
  //   };

  return (
    <>
      <Seo title={`Person Details - #${personId}`} />
      <PersonView personId={Number(personId)} expandView>
        {() => (
          <FormWizard
            formPath={`/people/${personId}/add/${personId}/`}
            formSteps={formSteps}
            title="Add new case status"
            // onFormSubmit={onFormSubmit}
            successMessage="Case Status has been added"
          />
        )}
      </PersonView>
    </>
  );
};

export default AddCaseStatusForm;
