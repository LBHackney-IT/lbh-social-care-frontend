import Spinner from 'components/Spinner/Spinner';
import Summary from 'components/Summary/Summary';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import { useWarningNote } from 'utils/api/warningNotes';
import { formStepsAdult, formStepsChild } from 'data/forms/warning-note';
import { Resident } from 'types';
import SummaryList from '../../Summary/SummaryList';

export interface Props {
  person: Resident;
  warningNoteId: number;
}

const WarningNoteRecap = ({
  person,
  warningNoteId,
}: Props): React.ReactElement => {
  const { data: warningNote, error: warningNoteError } =
    useWarningNote(warningNoteId);

  if (warningNoteError) {
    return <ErrorMessage />;
  }
  if (!warningNote) {
    return <Spinner />;
  }

  return (
    <>
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

      <SummaryList
        list={[
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
