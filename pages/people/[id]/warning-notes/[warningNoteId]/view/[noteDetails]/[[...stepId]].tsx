import { useRouter } from 'next/router';

import PersonView from 'components/PersonView/PersonView';
import WarningNoteRecap from 'components/WarningNote/WarningNoteRecap/WarningNoteRecap';

const ViewWarningNote = (): React.ReactElement => {
  const { query } = useRouter();
  const personId = Number(query.id as string);
  const warningNoteId = Number(query.warningNoteId as string);
  const noteDetails = query.noteDetails as string;

  const getTitle = (noteDetails: string) => {
    switch (noteDetails) {
      case 'note-created':
        return 'Warning Note Details';
      case 'note-reviews':
        return 'Warning Note Review Details';
      case 'note-end':
        return 'Warning Note End Details';
      default:
        return null;
    }
  };

  return (
    <>
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        {getTitle(noteDetails)}
      </h1>
      <PersonView personId={personId} expandView>
        {(person) => (
          <>
            <div className="govuk-!-margin-top-7">
              <WarningNoteRecap
                person={person}
                warningNoteId={warningNoteId}
                noteDetails={noteDetails}
              />
            </div>
          </>
        )}
      </PersonView>
    </>
  );
};

ViewWarningNote.goBackButton = true;

export default ViewWarningNote;
