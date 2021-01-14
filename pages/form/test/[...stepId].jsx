import axios from 'axios';

import { useAuth } from 'components/UserContext/UserContext';
import FormWizard from 'components/FormWizard/FormWizard';

import form from 'data/forms/test';

const TestForm = () => {
  const { user } = useAuth();
  const onFormSubmit = async (formData) =>
    await axios.post('/api/test', formData);
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
