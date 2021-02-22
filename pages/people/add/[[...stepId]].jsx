import { useAuth } from 'components/UserContext/UserContext';
import FormWizard from 'components/FormWizard/FormWizard';
import { addResident } from 'utils/api/residents';
import CustomConfirmation from 'components/Steps/PersonConfirmation';

import form from 'data/forms/create-new-person';

const CreateNewPerson = () => {
  const user = useAuth();
  const onFormSubmit = async (formData) => {
    const ref = await addResident({
      ...formData,
      contextFlag: formData.contextFlag || user.permissionFlag,
      nhsNumber: parseInt(formData.nhsNumber),
      createdBy: user.user.email,
    });
    return ref;
  };
  return (
    <FormWizard
      formPath={form.path}
      formSteps={form.steps}
      title={form.title}
      defaultValues={{ user, ...form.defaultValues }}
      onFormSubmit={onFormSubmit}
      successMessage={form.successMessage}
      customConfirmation={CustomConfirmation}
    />
  );
};

export default CreateNewPerson;
