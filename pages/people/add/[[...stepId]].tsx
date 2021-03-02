import { useAuth } from 'components/UserContext/UserContext';
import FormWizard from 'components/FormWizard/FormWizard';
import { addResident } from 'utils/api/residents';
import CustomConfirmation from 'components/Steps/PersonConfirmation';

import { User } from 'types';

import form from 'data/forms/create-new-person';

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
      nhsNumber: parseInt(formData.nhsNumber, 10),
      createdBy: user.email,
    });
    return ref;
  };
  return (
    <FormWizard
      formPath={form.path}
      formSteps={form.steps}
      title={form.title}
      onFormSubmit={onFormSubmit}
      defaultValues={{ user }}
      successMessage={form.successMessage}
      customConfirmation={CustomConfirmation}
    />
  );
};

export default CreateNewPerson;
