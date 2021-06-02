import { useRouter } from 'next/router';

import PersonView from 'components/PersonView/PersonView';
import WarningNoteRecap from 'components/WarningNote/WarningNoteRecap/WarningNoteRecap';

const ViewWarningNote = (): React.ReactElement => {
  const { query } = useRouter();
  const personId = Number(query.id as string);
  const warningNoteId = Number(query.warningNoteId as string);
  const formName = query.form_name as string;

  return (
    <>
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        {formName == 'Warning Note Created'
          ? 'Warning Note Details'
          : formName == 'Warning Note Reviewed'
          ? 'Warning Note Review Details'
          : 'Warning Note End Details'}
      </h1>
      <PersonView personId={personId} expandView>
        {(person) => (
          <>
            <div className="govuk-!-margin-top-7">
              <WarningNoteRecap
                person={person}
                warningNoteId={warningNoteId}
                formName={formName}
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
