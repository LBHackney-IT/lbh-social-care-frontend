import { useCallback } from 'react';
import { useRouter } from 'next/router';

import Seo from 'components/Layout/Seo/Seo';
import PersonView from 'components/PersonView/PersonView';
import { useAuth } from 'components/UserContext/UserContext';
import BackButton from 'components/Layout/BackButton/BackButton';
import FormWizard from 'components/FormWizard/FormWizard';
import { addCase } from 'utils/api/cases';
import PersonLinkConfirmation from 'components/Steps/PersonLinkConfirmation';

import formStepsAdult from 'data/forms/asc-case-notes-recording';
import formStepsChild from 'data/forms/cfs-case-notes-recording';

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
      await addCase({
        personId: person.id,
        firstName: person.firstName,
        lastName: person.lastName,
        contextFlag: person.contextFlag,
        dateOfBirth: person.dateOfBirth,
        workerEmail: user.email,
        formNameOverall:
          person.contextFlag === 'A' ? 'ASC_case_note' : 'CFS_case_note',
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
          {(person) => (
            <div className="govuk-!-margin-top-7">
              <FormWizard
                formPath={`/people/${personId}/records/case-notes-recording/`}
                formSteps={
                  person.contextFlag === 'A' ? formStepsAdult : formStepsChild
                }
                title="Case Notes Recording"
                onFormSubmit={onFormSubmit(person)}
                personDetails={{ ...person }}
                includesDetails
                hideBackButton
                successMessage="Case Notes Recording details have been added"
                customConfirmation={PersonLinkConfirmation}
              />
            </div>
          )}
        </PersonView>
      </>
    </>
  );
};

export default CaseNotesRecording;
