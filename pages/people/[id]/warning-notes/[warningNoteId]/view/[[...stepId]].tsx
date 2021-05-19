import { useRouter } from 'next/router';

import PersonView from 'components/PersonView/PersonView';
import BackButton from 'components/Layout/BackButton/BackButton';
import WarningNoteRecap from 'components/WarningNote/WarningNoteRecap/WarningNoteRecap';

const ViewWarningNote = (): React.ReactElement => {
  const { query } = useRouter();
  const personId = Number(query.id as string);
  const warningNoteId = Number(query.warningNoteId as string);

  return (
    <>
      <BackButton />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Warning Note Details
      </h1>
      <PersonView personId={personId} expandView>
        {(person) => (
          <>
            <div className="govuk-!-margin-top-7">
              <WarningNoteRecap person={person} warningNoteId={warningNoteId} />
            </div>
          </>
        )}
      </PersonView>
    </>
  );
};

export default ViewWarningNote;
