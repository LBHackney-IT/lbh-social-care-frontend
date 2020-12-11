import FormWizard from 'components/FormWizard/FormWizard';
import { addCase } from 'utils/api/cases';
import form from 'data/forms/create-new-person';

const CreateNewPerson = () => {
  const onFormSubmit = async (formData) => {
    const ref = await addCase(formData.mosaic_id, {
      caseFormData: JSON.stringify(formData),
    });
    return ref;
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
