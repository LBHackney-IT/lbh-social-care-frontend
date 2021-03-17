import { useRouter } from 'next/router';
import { useCallback } from 'react';

import PersonView from 'components/PersonView/PersonView';
import BackButton from 'components/Layout/BackButton/BackButton';
import WarningNoteRecap from 'components/WarningNote/WarningNoteRecap/WarningNoteRecap';
import { Resident, User } from 'types';
import FormWizard from 'components/FormWizard/FormWizard';
import formSteps from 'data/forms/warning-note-review';
import { useAuth } from 'components/UserContext/UserContext';

const ReviewWarningNote = (): React.ReactElement => {
  const { query } = useRouter();
  const personId = Number(query.id as string);
  const warningNoteId = Number(query.warningNoteId as string);
  const { user } = useAuth() as { user: User };
  const onFormSubmit = useCallback(
    (person: Resident) => async ({
      form_name,
      ...formData
    }: Record<string, unknown>) => {
      console.log({
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
      <BackButton />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Renew/end Warning Note
      </h1>
      <PersonView personId={personId} expandView>
        {(person: Resident) => (
          <>
            <div className="govuk-!-margin-top-7">
              <WarningNoteRecap person={person} warningNoteId={warningNoteId} />
            </div>
            <FormWizard
              formPath={`/people/${personId}/warning-notes/${warningNoteId}/`}
              formSteps={formSteps}
              title="Review Warning Note"
              onFormSubmit={onFormSubmit(person)}
              personDetails={{ ...person }}
              defaultValues={{ person }}
            ></FormWizard>
          </>
        )}
      </PersonView>
    </>
  );
};

export default ReviewWarningNote;
