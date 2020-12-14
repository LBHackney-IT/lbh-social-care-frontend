// import { useState } from 'react';
import { NextSeo } from 'next-seo';

import BackButton from 'components/Layout/BackButton/BackButton';
import FormWizard from 'components/FormWizard/FormWizard';
import { postResidentCase } from 'utils/api/residents';
import form from 'data/forms/case-notes-recording';
import PersonView from 'components/PersonView/PersonView';

const CaseNotesRecording = ({ query }) => {
  // const [url, setUrl] = useState();
  const onFormSubmit = async (formData) => {
    const ref = await postResidentCase(formData.mosaic_id, {
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

export default CaseNotesRecording;
