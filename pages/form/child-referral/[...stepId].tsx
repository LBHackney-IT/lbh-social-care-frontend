import FormWizard from 'components/FormWizard/FormWizard';
import { addCase } from 'utils/api/cases';
import form from 'data/forms/child-referral';

interface FormData {
  mosaic_id: string;
  [id: string]: unknown;
}

const ChildReferral = (): React.ReactElement => {
  const onFormSubmit = async (formData: FormData) => {
    const ref = await addCase({
      caseFormData: JSON.stringify(formData),
    });
    return ref;
  };
  return (
    <FormWizard
      formPath={form.path}
      formSteps={form.steps}
      title={form.title}
      onFormSubmit={onFormSubmit}
    />
  );
};

export default ChildReferral;
