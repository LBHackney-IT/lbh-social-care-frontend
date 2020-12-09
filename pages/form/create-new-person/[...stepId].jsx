import FormWizard from 'components/FormWizard/FormWizard';
import { postResidentCase } from 'utils/api/residents';
import form from 'data/forms/create-new-person';

const CreateNewPerson = () => {
  const onFormSubmit = async (formData) => {
    const ref = await postResidentCase(formData.mosaic_id, {
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
