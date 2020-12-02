import { SavedForms } from 'components/SaveFormData/SaveFormData';

const FormInProgress = () => (
  <>
    <h1 className="govuk-heading-l">Incomplete forms</h1>
    <SavedForms />
  </>
);

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

export default FormInProgress;
