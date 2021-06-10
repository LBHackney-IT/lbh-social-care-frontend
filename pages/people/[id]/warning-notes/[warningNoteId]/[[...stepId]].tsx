import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import PersonView from 'components/PersonView/PersonView';
import WarningNoteRecap from 'components/WarningNote/WarningNoteRecap/WarningNoteRecap';
import { Resident, User } from 'types';
import FormWizard from 'components/FormWizard/FormWizard';
import {
  reviewFormStepsAdult,
  reviewFormStepsChild,
} from 'data/forms/warning-note-review';
import { useAuth } from 'components/UserContext/UserContext';
import CustomConfirmation from 'components/Steps/ReviewWarningNoteConfirmation';
import { updateWarningNote } from 'utils/api/warningNotes';

const ReviewWarningNote = (): React.ReactElement => {
  const { query, asPath } = useRouter();
  const personId = Number(query.id as string);
  const warningNoteId = Number(query.warningNoteId as string);
  const [reviewType, setReviewType] = useState<'renew' | 'end' | null>(null);

  const summary = asPath.includes('summary');
  const confirmation = asPath.includes('confirmation');
  const { user } = useAuth() as { user: User };
  const onFormSubmit = useCallback(
    async ({ ...formData }: Record<string, unknown>) => {
      await updateWarningNote(warningNoteId, {
        warningNoteId,
        reviewedBy: user.email,
        endedBy: formData.reviewDecision === 'No' ? user.email : undefined,
        endedDate:
          formData.reviewDecision === 'No'
            ? new Date().toISOString()
            : undefined,
        status: formData.reviewDecision === 'No' ? 'closed' : 'open',
        ...formData,
      });
    },
    [user.email]
  );

  const handleProgressStep = useCallback(
    (formData: Record<string, unknown>) => {
      setReviewType(
        formData.reviewDecision === 'Yes'
          ? 'renew'
          : formData.reviewDecision === 'No'
          ? 'end'
          : null
      );
    },
    []
  );

  return (
    <>
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        {summary
          ? `Check Warning Note ${reviewType || 'renew / end'} details`
          : confirmation
          ? `Warning Note ${reviewType || 'renew / end'} confirmed`
          : 'Review / end Warning Note'}
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
              formSteps={
                person.contextFlag === 'A'
                  ? reviewFormStepsAdult
                  : reviewFormStepsChild
              }
              title="Review Warning Note"
              onFormSubmit={onFormSubmit}
              onProgressStep={handleProgressStep}
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

ReviewWarningNote.goBackButton = true;

export default ReviewWarningNote;
