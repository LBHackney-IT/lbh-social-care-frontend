import { CaseStatusFields, CaseStatus, CaseStatusAnswer } from 'types';
import {
  CaseStatusSelectOptionLookup,
  CaseStatusOptionMapping,
} from '../../data/caseStatus';

interface Props {
  tableName?: string;
  styleType?: string;
  status: CaseStatus;
  groupedAnswers?: CaseStatusAnswer[];
  // groupedAnswers?: CaseStatusAnswer;
}

const CaseStatusDetailsTable = ({
  tableName,
  styleType,
  status,
  groupedAnswers,
}: // groupedAnswers,
Props): React.ReactElement => {
  if (!status) {
    return <></>;
  }
  console.log('groupedAnswers', groupedAnswers);
  return (
    <>
      {tableName && (
        <h2 className={`${styleType}`} data-testid="case_status_table_title">
          {tableName}
        </h2>
      )}
      <dl
        className={`govuk-summary-list lbh-summary-list ${styleType}`}
        data-testid="case_status_details_table"
      >
        {status.startDate && !status.endDate && (
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key ">Start date</dt>
            <dd className="govuk-summary-list__value" data-testid="start_date">
              {new Date(status.startDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </dd>
          </div>
        )}

        {status.startDate && status.endDate && (
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Dates</dt>
            <dd
              className="govuk-summary-list__value"
              data-testid="start_end_date"
            >
              {new Date(status.startDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}{' '}
              -{' '}
              {new Date(status.startDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </dd>
          </div>
        )}

        {groupedAnswers &&
          groupedAnswers?.length > 0 &&
          groupedAnswers?.[0]?.status &&
          groupedAnswers.map((dateGroup: CaseStatusAnswer) =>
            dateGroup.status.map((answer: CaseStatusFields) => (
              <div
                className="govuk-summary-list__row"
                key={`${status.id} ${answer.option} ${answer.value} ${answer.createdAt}`}
                data-testid="case_status_fields"
              >
                <dt className="govuk-summary-list__key">
                  {
                    CaseStatusOptionMapping[
                      answer.option as keyof typeof CaseStatusOptionMapping
                    ]
                  }
                </dt>
                <dd className="govuk-summary-list__value">
                  {CaseStatusSelectOptionLookup(answer.value, answer.option)}
                </dd>
              </div>
            ))
          )}

        {status.notes && (
          <div className="govuk-summary-list__row">
            <dt className="govuk-summary-list__key">Notes</dt>
            <dd className="govuk-summary-list__value">{status.notes}</dd>
          </div>
        )}
      </dl>
    </>
  );
};

export default CaseStatusDetailsTable;
