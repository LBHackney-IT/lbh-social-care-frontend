import SavedForms from 'components/SaveFormData/SaveFormData';

const FormInProgress = (): React.ReactElement => (
  <main className="lbh-main-wrapper" id="main-content" role="main">
    <h1 className="lbh-heading-h1 govuk-!-margin-bottom-8">Incomplete forms</h1>
    <SavedForms />
  </main>
);

export default FormInProgress;
