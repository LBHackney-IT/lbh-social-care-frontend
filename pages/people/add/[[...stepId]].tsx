import { useAuth } from 'components/UserContext/UserContext';
import FormWizard from 'components/FormWizard/FormWizard';
import { addResident } from 'utils/api/residents';
import CustomConfirmation from 'components/Steps/PersonConfirmation';

import { User } from 'types';

import formSteps from 'data/forms/create-new-person';

const StepHeader = () => (
  <h1
    key="form-title"
    className="govuk-fieldset__legend--xl gov-weight-lighter"
  >
    Add a new person
  </h1>
);

interface FormData {
  nhsNumber: string;
  [key: string]: unknown;
}

const CreateNewPerson = (): React.ReactElement => {
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
      defaultValues={{ user }}
      successMessage="Add new person confirmed"
      customConfirmation={CustomConfirmation}
      stepHeader={StepHeader}
    />
  );
};

export default CreateNewPerson;
