import { useRouter } from 'next/router';

import PersonView from 'components/PersonView/PersonView';
import BackButton from 'components/Layout/BackButton/BackButton';
import WarningNoteRecap from 'components/WarningNote/WarningNoteRecap/WarningNoteRecap';
import { Resident } from 'types';

const ReviewWarningNote = (): React.ReactElement => {
  const { query } = useRouter();
  const personId = Number(query.id as string);
  return (
    <>
      <BackButton />
      <h1 className="govuk-fieldset__legend--l gov-weight-lighter">
        Renew/end Warning Note
      </h1>
      <PersonView personId={personId} expandView>
        {(person: Resident) => (
          <WarningNoteRecap
            person={person}
            warningNoteId={1234}
          ></WarningNoteRecap>
        )}
      </PersonView>
    </>
  );
};

export default ReviewWarningNote;
