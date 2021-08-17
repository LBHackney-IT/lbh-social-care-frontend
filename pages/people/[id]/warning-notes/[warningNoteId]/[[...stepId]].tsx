import { useRouter } from 'next/router';

import { ReviewWarningNoteForm } from '../../../../../components/WarningNotes/ReviewWarningNoteForm/ReviewWarningNoteForm';

const ReviewWarningNote = (): React.ReactElement => {
  const { query } = useRouter();
  const personId = Number(query.id as string);
  const warningNoteId = Number(query.warningNoteId as string);

  return (
    <ReviewWarningNoteForm personId={personId} warningNoteId={warningNoteId} />
  );
};

ReviewWarningNote.goBackButton = true;

export default ReviewWarningNote;
