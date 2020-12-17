import { NextSeo } from 'next-seo';

import BackButton from 'components/Layout/BackButton/BackButton';
import FormWizard from 'components/FormWizard/FormWizard';
import { addCase } from 'utils/api/cases';
import form from 'data/forms/csc-case-notes-recording';
import PersonView from 'components/PersonView/PersonView';

const CscCaseNotesRecording = ({ query }) => {
  const onFormSubmit = async (formData) => {
    const ref = await addCase(formData.mosaic_id, {
      caseFormData: JSON.stringify(formData),
    });
    return ref;
  };
  return (
    <>
      <NextSeo title={`#${query.id} Cases`} noindex />
      <BackButton />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Add a new case note for
      </h1>
      <PersonView personId={query.id} expandView={true} nameSize="m" />
      <FormWizard
        formPath={form.path}
        formSteps={form.steps}
        title={form.title}
        defaultValues={form.defaultValues}
        onFormSubmit={onFormSubmit}
      />
    </>
  );
};
export const getServerSideProps = async (ctx) => {
  const { query } = ctx;
  return {
    props: {
      query,
    },
  };
};

export default CscCaseNotesRecording;
