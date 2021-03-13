import { useCallback } from 'react';
import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import PersonView from 'components/PersonView/PersonView';
import { useAuth } from 'components/UserContext/UserContext';
import BackButton from 'components/Layout/BackButton/BackButton';
import FormWizard from 'components/FormWizard/FormWizard';

import { formStepsAdult, formStepsChild } from 'data/forms/warning-note';

import type { Resident, User } from 'types';

const CaseNotesRecording = (): React.ReactElement => {
  const { query } = useRouter();
  const personId = Number(query.id as string);
  const { user } = useAuth() as { user: User };
  const onFormSubmit = useCallback(
    (person: Resident) => async ({
      form_name,
      ...formData
    }: Record<string, unknown>) => {
      console.log({
        personId: person.mosaicId, // TODO: needs to be fixed BE
        firstName: person.firstName,
        lastName: person.lastName,
        contextFlag: person.ageContext,
        dateOfBirth: person.dateOfBirth,
        workerEmail: user.email,
        formNameOverall:
          person.ageContext === 'A' ? 'ASC_case_note' : 'CFS_case_note',
        formName: form_name,
        caseFormData: JSON.stringify(formData),
      });
    },
    [user.email]
  );
  return (
    <>
      <Seo title="Case note" />
      <>
        <BackButton />
        <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
          Add Warning Note
        </h1>
        <PersonView personId={personId} expandView>
          {(person: Resident) => (
            <FormWizard
              formPath={`/people/${personId}/warning-notes/add/`}
              formSteps={
                person.ageContext === 'A' ? formStepsAdult : formStepsChild
              }
              title="Add Warning Note"
              onFormSubmit={onFormSubmit(person)}
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
