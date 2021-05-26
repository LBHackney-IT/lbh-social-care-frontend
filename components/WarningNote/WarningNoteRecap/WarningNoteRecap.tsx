import Spinner from 'components/Spinner/Spinner';
import Summary from 'components/Summary/Summary';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useWarningNote } from 'utils/api/warningNotes';
import { formStepsAdult, formStepsChild } from 'data/forms/warning-note';
import { Resident } from 'types';
import reviewFormSteps from 'data/forms/warning-note-review';
import { FormComponentStep, FormStep } from 'components/Form/types';

export interface Props {
  person: Resident;
  warningNoteId: number;
  formName?: string;
}

export const modifyReviewSummary = (): FormStep[] => {
  const reviewedBy: FormComponentStep = {
    component: 'TextInput',
    name: 'lastModifiedBy',
    label: 'Review done by',
  };

  const endDate: FormComponentStep = {
    component: 'DateInput',
    name: 'endDate',
    label: 'End Date',
  };

  const nextReviewDateWithoutReviewDecision: FormComponentStep = {
    component: 'DateInput',
    name: 'nextReviewDate',
    label: 'Next Review Date',
  };

  const updatedReviewFormSteps = reviewFormSteps;

  updatedReviewFormSteps[0].components.pop();
  updatedReviewFormSteps[0].components.splice(1, 0, reviewedBy);
  updatedReviewFormSteps[0].components.push(
    endDate,
    nextReviewDateWithoutReviewDecision
  );

  return updatedReviewFormSteps;
};

const reviewedNoteSummary = modifyReviewSummary();

const WarningNoteRecap = ({
  person,
  warningNoteId,
  formName,
}: Props): React.ReactElement => {
  const { data: warningNote, error: warningNoteError } =
    useWarningNote(warningNoteId);

  if (warningNoteError) {
    return <ErrorMessage />;
  }
  if (!warningNote) {
    return <Spinner />;
  }

  const displayReviews =
    Array.isArray(warningNote.warningNoteReviews) &&
    warningNote.warningNoteReviews.length > 0 &&
    formName != 'Warning Note Created';

  return (
    <>
      {displayReviews &&
        warningNote.warningNoteReviews
          .slice(0)
          .reverse()
          .map((review) => {
            return (
              <Summary
                key={review.id}
                formData={{
                  ...review,
                  endDate: warningNote.endDate,
                  nextReviewDate: warningNote.nextReviewDate,
                  person,
                }}
                formSteps={reviewedNoteSummary.map((step) => {
                  return {
                    ...step,
                    title: `Warning Review Details ${new Date(
                      review.reviewDate
                    ).toLocaleDateString('en-GB')}`,
                  };
                })}
                formPath={`/people/:peopleId/warning-notes/:warningNoteId`}
              />
            );
          })}
      <Summary
        formData={{
          ...warningNote,
          disclosedWithIndividual: warningNote.disclosedWithIndividual
            ? 'Yes'
            : 'No',
        }}
        formSteps={person.contextFlag === 'A' ? formStepsAdult : formStepsChild}
        formPath={`/people/:peopleId/warning-notes/:warningNoteId`}
      />
    </>
  );
};

export default WarningNoteRecap;
