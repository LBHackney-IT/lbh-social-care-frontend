import { useContext } from 'react';
import { NextSeo } from 'next-seo';

import UserContext from 'components/UserContext/UserContext';
import BackButton from 'components/Layout/BackButton/BackButton';
import FormWizard from 'components/FormWizard/FormWizard';
import PersonView from 'components/PersonView/PersonView';
import { addCase } from 'utils/api/cases';
import form from 'data/forms/case-notes-recording';

const CaseNotesRecording = ({ query }) => {
  const { user } = useContext(UserContext);
  const onFormSubmit = async (formData) => {
    const ref = await addCase({
      caseFormData: JSON.stringify({ ...formData, worker_email: user.email }),
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
