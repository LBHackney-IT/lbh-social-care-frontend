import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import CustomConfirmation from 'components/Steps/ReviewWarningNoteConfirmation';
import {
  reviewFormStepsAdult,
  reviewFormStepsChild,
} from '../../../data/forms/warning-note-review';
import { User } from '../../../types';
import { updateWarningNote } from '../../../utils/api/warningNotes';
import FormWizard from '../../FormWizard/FormWizard';
import PersonView from '../../PersonView/PersonView';
import { useAuth } from '../../UserContext/UserContext';
import WarningNoteRecap from '../../WarningNotes/WarningNoteRecap/WarningNoteRecap';

export const ReviewWarningNoteForm: React.FC<{
  personId: number;
  warningNoteId: number;
}> = ({ personId, warningNoteId }) => {
  const { asPath } = useRouter();
  const { user } = useAuth() as { user: User };

  const [reviewType, setReviewType] = useState<'renew' | 'end' | null>(null);

  const onFormSubmit = useCallback(
    async ({ ...formData }: Record<string, unknown>) => {
      if (formData.disclosedWithIndividual !== undefined) {
        formData = {
          ...formData,
          disclosedWithIndividual: formData.disclosedWithIndividual === 'Yes',
        };
      }
      await updateWarningNote(warningNoteId, {
        warningNoteId,
        reviewedBy: user.email,
        endedBy: formData.reviewDecision === 'No' ? user.email : undefined,
        status: formData.reviewDecision === 'No' ? 'closed' : 'open',
        ...formData,
      });
    },
    [user.email, warningNoteId]
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

  const summary = asPath.includes('summary');
  const confirmation = asPath.includes('confirmation');

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
              stepPath={`/people/[id]/warning-notes/[warningNoteId]/[[...stepId]]`}
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
            />
          </>
        )}
      </PersonView>
    </>
  );
};
