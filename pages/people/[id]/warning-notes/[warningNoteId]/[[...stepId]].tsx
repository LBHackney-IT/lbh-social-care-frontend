import { useRouter } from 'next/router';
import { useCallback } from 'react';

import PersonView from 'components/PersonView/PersonView';
import BackButton from 'components/Layout/BackButton/BackButton';
import WarningNoteRecap from 'components/WarningNote/WarningNoteRecap/WarningNoteRecap';
import { ExtendedResident, User } from 'types';
import FormWizard from 'components/FormWizard/FormWizard';
import formSteps from 'data/forms/warning-note-review';
import { useAuth } from 'components/UserContext/UserContext';
import CustomConfirmation from 'components/Steps/ReviewWarningNoteConfirmation';

const ReviewWarningNote = (): React.ReactElement => {
  const { query, asPath } = useRouter();
  const personId = Number(query.id as string);
  const warningNoteId = Number(query.warningNoteId as string);
  const summary = asPath.includes('summary');
  const confirmation = asPath.includes('confirmation');
  const { user } = useAuth() as { user: User };
  const onFormSubmit = useCallback(
    (person: ExtendedResident) => async ({
      form_name,
      ...formData
    }: Record<string, unknown>) => {
      console.log({
        personId: person.personId,
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
      <BackButton />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        {summary
          ? 'Check Warning Note renew details'
          : confirmation
          ? 'Warning Note renew confirmed'
          : 'Review/end Warning Note'}
      </h1>
      <PersonView personId={personId} expandView>
        {(person) => (
          <>
            {!summary && !confirmation && (
              <>
                <h2>Reviewing or ending a Warning Note</h2>
                <span className="govuk-caption-m">
                  Warnings must be kept under review by Team Managers and the
                  evidence to support continued use must be reviewed at least
                  annually. Warnings must always be reviewed on the closure or
                  transfer of the case
                </span>
                <div className="govuk-!-margin-top-7">
                  <WarningNoteRecap
                    person={person}
                    warningNoteId={warningNoteId}
                  />
                </div>
                <h2>Warning Note review</h2>
              </>
            )}
            <FormWizard
              formPath={`/people/${personId}/warning-notes/${warningNoteId}/`}
              formSteps={formSteps}
              title="Review Warning Note"
              onFormSubmit={onFormSubmit(person)}
              personDetails={{ ...person }}
              defaultValues={{ person }}
              customConfirmation={CustomConfirmation}
              hideBackButton
            ></FormWizard>
          </>
        )}
      </PersonView>
    </>
  );
};

export default ReviewWarningNote;
