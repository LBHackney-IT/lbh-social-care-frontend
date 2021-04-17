import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import Spinner from 'components/Spinner/Spinner';
import { useHistoricCaseVisit } from 'utils/api/cases';

interface Props {
  recordId: string;
}

const HistoricNote = ({ recordId }: Props): React.ReactElement => {
  const { data: record, error: recordError } = useHistoricCaseVisit(recordId);
  if (recordError) {
    return <ErrorMessage />;
  }
  if (!record) {
    return <Spinner />;
  }
  return (
    <dl className="govuk-summary-list govuk-!-margin-bottom-2">
      {record && (
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Visit type</dt>
          <dd className="govuk-summary-list__value">{record.visitType}</dd>
        </div>
      )}
      <div className="govuk-summary-list__row">
        <dt className="govuk-summary-list__key">Created by</dt>
        <dd className="govuk-summary-list__value">
          {record.createdByName} &lt;{record.createdByEmail}&gt;
        </dd>
      </div>
      <div className="govuk-summary-list__row">
        <dt className="govuk-summary-list__key">Planned date</dt>
        <dd className="govuk-summary-list__value">
          {`${new Date(record.plannedDateTime).toLocaleDateString(
            'en-GB'
          )} ${new Date(record.plannedDateTime).toLocaleTimeString('en-GB')}`}
        </dd>
      </div>
      <div className="govuk-summary-list__row">
        <dt className="govuk-summary-list__key">Actual date</dt>
        <dd className="govuk-summary-list__value">{`${new Date(
          record.actualDateTime
        ).toLocaleDateString('en-GB')} ${new Date(
          record.actualDateTime
        ).toLocaleTimeString('en-GB')}`}</dd>
      </div>
      {record.reasonNotPlanned && (
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Reason not planned</dt>
          <dd className="govuk-summary-list__value">
            {record.reasonNotPlanned}
          </dd>
        </div>
      )}
      {record.reasonVisitNotMade && (
        <div className="govuk-summary-list__row">
          <dt className="govuk-summary-list__key">Reason visit not made</dt>
          <dd className="govuk-summary-list__value">
            {record.reasonVisitNotMade}
          </dd>
        </div>
      )}
      <div className="govuk-summary-list__row">
        <dt className="govuk-summary-list__key">Seen alone</dt>
        <dd className="govuk-summary-list__value">
          {record.seenAloneFlag ? 'Yes' : 'No'}
        </dd>
      </div>
      <div className="govuk-summary-list__row">
        <dt className="govuk-summary-list__key">Visit completed</dt>
        <dd className="govuk-summary-list__value">
          {record.completedFlag ? 'Yes' : 'No'}
        </dd>
      </div>
    </dl>
  );
};

export default HistoricNote;
