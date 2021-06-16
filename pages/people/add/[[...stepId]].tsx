import { useAuth } from 'components/UserContext/UserContext';
import { useRouter } from 'next/router';
import FormWizard from 'components/FormWizard/FormWizard';
import { addResident } from 'utils/api/residents';
import CustomConfirmation from 'components/Steps/PersonConfirmation';

import { User } from 'types';

import formSteps from 'data/forms/create-new-person';

const StepHeader = () => (
  <h1 key="form-title" className="govuk-!-margin-bottom-8">
    Add a new person
  </h1>
);

interface FormData {
  nhsNumber: string;
  [key: string]: unknown;
}

const CreateNewPerson = (): React.ReactElement => {
  const { query } = useRouter();
  const { user } = useAuth() as { user: User };
  const onFormSubmit = async (formData: FormData) => {
    const ref = await addResident({
      ...formData,
      contextFlag: formData.contextFlag || user.permissionFlag,
      nhsNumber: Number(formData.nhsNumber),
      createdBy: user.email,
    });
    return ref;
  };

  return (
    <FormWizard
      formPath="/people/add/"
      formSteps={formSteps}
      title="Add New Person"
      onFormSubmit={onFormSubmit}
      defaultValues={{
        user,
        firstName: query.first_name,
        lastName: query.last_name,
      }}
      successMessage="Add new person confirmed"
      customConfirmation={CustomConfirmation}
      stepHeader={StepHeader}
    />
  );
};

export default CreateNewPerson;
