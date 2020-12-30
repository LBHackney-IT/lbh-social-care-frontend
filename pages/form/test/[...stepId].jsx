import { useContext } from 'react';

import UserContext from 'components/UserContext/UserContext';
import FormWizard from 'components/FormWizard/FormWizard';

import form from 'data/forms/test';

const TestForm = () => {
  const { user } = useContext(UserContext);
  const onFormSubmit = (formData) => console.log(formData);
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

export default TestForm;
