import Spinner from 'components/Spinner/Spinner';
import Summary from 'components/Summary/Summary';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useWarningNote } from 'utils/api/warningNotes';
import { formStepsAdult, formStepsChild } from 'data/forms/warning-note';
import { Resident } from 'types';
import {
  reviewFormStepsAdult,
  reviewFormStepsChild,
} from 'data/forms/warning-note-review';

export interface Props {
  person: Resident;
  warningNoteId: number;
  noteDetails?: string;
}

const WarningNoteRecap = ({
  person,
  warningNoteId,
  noteDetails,
}: Props): React.ReactElement => {
  const { data: warningNote, error: warningNoteError } =
    useWarningNote(warningNoteId);

  if (warningNoteError) {
    return <ErrorMessage label={warningNoteError.message} />;
  }
  if (!warningNote) {
    return <Spinner />;
  }

  const shouldPageDisplayNoteReviews = (
    noteDetails: string | undefined
  ): boolean => {
    return noteDetails !== undefined && noteDetails !== 'note-created';
  };

  const reviewsOrderedByMostRecentFirst = [
    ...warningNote.warningNoteReviews,
  ].reverse();

  const reviewFormSteps =
    person.contextFlag === 'A' ? reviewFormStepsAdult : reviewFormStepsChild;

  return (
    <>
      {shouldPageDisplayNoteReviews(noteDetails) &&
        reviewsOrderedByMostRecentFirst.map((review) => {
          const isSelectedReviewTheMostRecent =
            reviewsOrderedByMostRecentFirst.indexOf(review) === 0;
          return (
            <Summary
              key={review.id}
              formData={{
                ...review,
                disclosedWithIndividual: review.disclosedWithIndividual
                  ? 'Yes'
                  : 'No',
                outputAsDetailedSummary: 'Yes',
                endDate: isSelectedReviewTheMostRecent
                  ? warningNote.endDate
                  : null,
                nextReviewDate: isSelectedReviewTheMostRecent
                  ? warningNote.nextReviewDate
                  : null,
              }}
              formSteps={reviewFormSteps.map((step) => {
                return {
                  ...step,
                  title: `Warning Review Details ${new Date(
                    review.reviewDate
                  ).toLocaleDateString('en-GB')}`,
                };
              })}
              formPath="/people/:peopleId/warning-notes/:warningNoteId"
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
        additionalMetadata={[
          {
            key: 'created_by',
            title: 'Created by',
            value: warningNote.createdBy,
          },
        ]}
      />
    </>
  );
};

export default WarningNoteRecap;
