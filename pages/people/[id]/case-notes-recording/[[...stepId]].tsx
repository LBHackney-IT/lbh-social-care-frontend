import { useCallback } from 'react';
import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import PersonView from 'components/PersonView/PersonView';
import { useAuth } from 'components/UserContext/UserContext';
import BackButton from 'components/Layout/BackButton/BackButton';
import FormWizard from 'components/FormWizard/FormWizard';
import { addCase } from 'utils/api/cases';

import formStepsAdult from 'data/forms/asc-case-notes-recording';
import formStepsChild from 'data/forms/cfs-case-notes-recording';

import type { Resident, User } from 'types';

const CaseNotesRecording = (): React.ReactElement => {
  const { query } = useRouter();
  const personId = query.id as string;
  const { user } = useAuth() as { user: User };
  const onFormSubmit = useCallback(
    (person: Resident) => async ({
      form_name,
      ...formData
    }: Record<string, unknown>) => {
      await addCase({
        personId: parseInt(person.mosaicId, 10), // TODO: needs to be fixed BE
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
          Case note for
        </h1>
        <PersonView personId={personId} expandView>
          {(person: Resident) => (
            <FormWizard
              formPath={`/people/${personId}/case-notes-recording/`}
              formSteps={
                person.ageContext === 'A' ? formStepsAdult : formStepsChild
              }
              title="Case Notes Recording"
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
