import { CaseStatusFields, CaseStatus } from 'types';
import {
  CaseStatusSelectOptionLookup,
  CaseStatusFieldMapping,
} from '../../data/caseStatus';

interface Props {
  tableName?: string;
  styleType?: string;
  status: CaseStatus;
}

const CaseStatusDetailsTable = ({
  tableName,
  styleType,
  status,
}: Props): React.ReactElement => {
  if (!status) {
    return <></>;
  }
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

        {status.fields &&
          status.fields?.length > 0 &&
          status.fields[0].selectedOption &&
          status.fields.map((field: CaseStatusFields) => (
            <div
              className="govuk-summary-list__row"
              key={`${status.id} ${field.name} ${field.selectedOption.name}`}
              data-testid="case_status_fields"
            >
              <dt className="govuk-summary-list__key">
                {
                  CaseStatusFieldMapping[
                    field.name as keyof typeof CaseStatusFieldMapping
                  ]
                }
              </dt>
              <dd className="govuk-summary-list__value">
                {CaseStatusSelectOptionLookup(
                  field.selectedOption.name,
                  field.selectedOption.description,
                  field.name
                )}
              </dd>
            </div>
          ))}

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
