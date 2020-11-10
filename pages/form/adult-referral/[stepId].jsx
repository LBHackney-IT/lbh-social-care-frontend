import Router from 'next/router';

import FormWizard from 'components/FormWizard/FormWizard';
import { postResidentCase } from 'utils/api/residents';
import form from 'data/forms/adult-referral';

const AdultReferral = () => {
  const onFormSubmit = async (formData, { setIsSubmitting, setHasError }) => {
    try {
      setIsSubmitting(true);
      setHasError(false);
      await postResidentCase(formData.mosaic_id, {
        caseFormData: JSON.stringify({ formData }),
      });
      Router.replace({
        pathname: '/form/adult-referral/confirmation',
      });
    } catch {
      setIsSubmitting(false);
      setHasError(true);
    }
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

export default AdultReferral;
