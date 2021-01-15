import { SavedForms } from 'components/SaveFormData/SaveFormData';

const FormInProgress = () => (
  <>
    <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
      Incomplete forms
    </h1>
    <SavedForms />
  </>
);

export default FormInProgress;
