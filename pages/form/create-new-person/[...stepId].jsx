import { useContext } from 'react';

import UserContext from 'components/UserContext/UserContext';
import FormWizard from 'components/FormWizard/FormWizard';
import { addResident } from 'utils/api/residents';

import form from 'data/forms/create-new-person';

const CreateNewPerson = () => {
  const { user } = useContext(UserContext);
  const onFormSubmit = async (formData) => {
    const ref = await addResident({
      ...formData,
      ageGroup: formData.ageGroup || user.permissionFlag,
      nhsNumber: parseInt(formData.nhsNumber),
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
    />
  );
};

export default CreateNewPerson;
