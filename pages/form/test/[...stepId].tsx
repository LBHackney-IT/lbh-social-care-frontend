import axios from 'axios';

import FormWizard from 'components/FormWizard/FormWizard';

import form from 'data/forms/test';
import React from 'react';

const TestForm = (): React.ReactElement => {
  const onFormSubmit = async (formData: Record<string, unknown>) =>
    await axios.post('/api/test', formData);

  return (
    <>
      <FormWizard
        formPath={form.path}
        formSteps={form.steps}
        title={form.title}
        onFormSubmit={onFormSubmit}
        successMessage={form.successMessage}
      />
    </>
  );
};

export default TestForm;
