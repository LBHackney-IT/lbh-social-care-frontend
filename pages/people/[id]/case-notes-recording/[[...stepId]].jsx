import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

import PersonView from 'components/PersonView/PersonView';
import { useAuth } from 'components/UserContext/UserContext';
import BackButton from 'components/Layout/BackButton/BackButton';
import FormWizard from 'components/FormWizard/FormWizard';
import { addCase } from 'utils/api/cases';

import formAdult from 'data/forms/asc-case-notes-recording';
import formChild from 'data/forms/cfs-case-notes-recording';

const CaseNotesRecording = () => {
  const { query } = useRouter();
  const { user } = useAuth();
  const onFormSubmit = useCallback(
    (person) => async (formData) => {
      const ref = await addCase({
        mosaicId: person.mosaicId,
        firstName: person.firstName,
        lastName: person.lastName,
        ageContext: person.ageContext,
        workerEmail: user.email,
        caseFormData: JSON.stringify({
          form_name_overall:
            person.ageContext === 'A' ? 'ASC_case_note' : 'CFS_case_note',
          ...formData,
        }),
      });
      return ref;
    },
    [user.email]
  );
  return (
    <>
      <NextSeo title="Case note" noindex />
      <>
        <BackButton />
        <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
          Case note for
        </h1>
        <PersonView personId={query.id} expandView nameSize="m">
          {(person) => (
            <FormWizard
              formPath={`/people/${query.id}/case-notes-recording/`}
              formSteps={
                person.ageContext === 'A' ? formAdult.steps : formChild.steps
              }
              title="Case Notes Recording"
              onFormSubmit={onFormSubmit}
              personDetails={{ ...person }}
              includesDetails
              hideBackButton
            />
          )}
        </PersonView>
      </>
    </>
  );
};

export default CaseNotesRecording;
