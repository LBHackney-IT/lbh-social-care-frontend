import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import PageView from 'components/PageView/PageView';
import { useCaseNote } from 'utils/api/cases';

interface Props {
  recordId: string;
}

const HistoricNote = ({ recordId }: Props): React.ReactElement => {
  const { data: record, error: recordError } = useCaseNote(recordId);

  if (recordError) {
    return <ErrorMessage />;
  }
  if (!record) {
    return <Spinner />;
  }
  return (
    <PageView
      title={record.title}
      officerEmail={record.officerEmail}
      formName={record.formName}
      dateOfEvent={record.dateOfEvent}
      content={record.content}
    />
  );
};

export default HistoricNote;
