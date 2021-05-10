import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import Summary from 'components/Summary/Summary';
import { useCase } from 'utils/api/cases';
import * as form from 'data/forms';
import { FormStep } from 'components/Form/types';
import FlexibleAnswers from 'components/FlexibleAnswers/FlexibleAnswers';

interface Props {
  personId: number;
  recordId: string;
}

const CaseNote = ({ personId, recordId }: Props): React.ReactElement => {
  const { data: record, error: recordError } = useCase(recordId);

  const recordData = record?.caseFormData?.form_name_overall;

  const fileData =
    recordData && (form as Record<string, FormStep[]>)[recordData];

  if (recordError || (recordData && !fileData)) {
    return <ErrorMessage />;
  }
  if (!record || !fileData) {
    return <Spinner />;
  }

  // this needs to be fixed with a better way of distinguishing
  if (
    record?.caseFormData?.case_note_description &&
    record.caseFormData.form_name === 'Case recording'
  ) {
    return (
      <FlexibleAnswers
        data={JSON.parse(record?.caseFormData?.case_note_description)}
      />
    );
  }

  return (
    <>
      <Summary
        formData={record.caseFormData}
        formSteps={fileData}
        formPath={`/people/${personId}/records/${recordId}/`}
      />
    </>
  );
};

export default CaseNote;
