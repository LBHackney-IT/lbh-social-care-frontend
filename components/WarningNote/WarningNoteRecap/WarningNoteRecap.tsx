import Spinner from 'components/Spinner/Spinner';
import Summary from 'components/Summary/Summary';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useWarningNote } from 'utils/api/warningNotes';
import { formStepsAdult, formStepsChild } from 'data/forms/warning-note';
import { Resident } from 'types';

export interface Props {
  person: Resident;
  warningNoteId: number;
}

const WarningNoteRecap = ({
  person,
  warningNoteId,
}: Props): React.ReactElement => {
  const { data: warningNote, error: warningNoteError } = useWarningNote(
    warningNoteId
  );

  if (warningNoteError) {
    return <ErrorMessage />;
  }
  if (!warningNote) {
    return <Spinner />;
  }

  return (
    <>
      <Summary
        formData={warningNote}
        formSteps={person.contextFlag === 'A' ? formStepsAdult : formStepsChild}
        formPath={`/people/:peopleId/warning-notes/:warningNoteId`}
      />
    </>
  );
};

export default WarningNoteRecap;
