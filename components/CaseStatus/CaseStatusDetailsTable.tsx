import { CaseStatusFields, CaseStatus, CaseStatusFieldMapping } from 'types';

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
  return (
    <>
      {tableName && <h2 className={`${styleType}`}>{tableName}</h2>}
      <dl className={`govuk-summary-list lbh-summary-list ${styleType}`}>
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
            <dd className="govuk-summary-list__value" data-testid="end_date">
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
              key={`${field.selectedOption.name} ${field.selectedOption.description}`}
            >
              <dt className="govuk-summary-list__key">
                {
                  CaseStatusFieldMapping[
                    field.name as keyof typeof CaseStatusFieldMapping
                  ]
                }
              </dt>
              <dd className="govuk-summary-list__value">
                {field.selectedOption.name} - {field.selectedOption.description}
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
