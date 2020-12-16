import { useContext } from 'react';

import UserContext from 'components/UserContext/UserContext';
import FormWizard from 'components/FormWizard/FormWizard';

import form from 'data/forms/create-new-person';

const CreateNewPerson = () => {
  const { user } = useContext(UserContext);
  const onFormSubmit = (formData) => {
    console.log({ ...formData, worker_email: user.email });
  };
  return (
    <FormWizard
      formPath={form.path}
      formSteps={form.steps}
      title={form.title}
      defaultValues={form.defaultValues}
      onFormSubmit={onFormSubmit}
    />
  );
};

export default CreateNewPerson;
