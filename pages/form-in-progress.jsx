import { SavedForms } from 'components/SaveFormData/SaveFormData';

const FormInProgress = () => (
  <>
    <h1 className="govuk-fieldset__legend--xl gov-weight-lighter">
      Incomplete forms
    </h1>
    <SavedForms />
  </>
);

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

export default FormInProgress;
