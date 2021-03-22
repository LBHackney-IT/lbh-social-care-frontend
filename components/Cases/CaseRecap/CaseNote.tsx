import PropTypes from 'prop-types';

import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import Summary from 'components/Summary/Summary';
import { useCase } from 'utils/api/cases';
import * as form from 'data/forms';
import { FormStep } from 'components/Form/types';

interface Props {
  personId: number;
  recordId: string;
}

const CaseRecap = ({ personId, recordId }: Props): React.ReactElement => {
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

CaseRecap.propTypes = {
  personId: PropTypes.string.isRequired,
  recordId: PropTypes.string.isRequired,
};

export default CaseRecap;
