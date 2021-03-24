import { formatDate, isDateValid } from 'utils/date';

import CaseLink from 'components/Cases/CaseLink';
import { Case } from 'types';

const CasesEntry = ({
  recordId,
  firstName,
  lastName,
  caseFormUrl,
  dateOfBirth,
  officerEmail,
  dateOfEvent,
  caseFormTimestamp,
  caseFormData,
}: Case): React.ReactElement => (
  <tr className="govuk-table__row">
    <td className="govuk-table__cell">
      {firstName} {lastName}
    </td>
    <td className="govuk-table__cell">
      {dateOfBirth && isDateValid(dateOfBirth) && dateOfBirth}
    </td>
    <td className="govuk-table__cell">{officerEmail}</td>
    <td className="govuk-table__cell">
      {(dateOfEvent && formatDate(dateOfEvent)) ||
        (caseFormTimestamp && formatDate(caseFormTimestamp))}
    </td>
    <td className="govuk-table__cell govuk-button--secondary'">
      <CaseLink
        recordId={recordId}
        externalUrl={caseFormUrl}
        caseFormData={caseFormData}
      />
    </td>
  </tr>
);

const tableHeader = [
  { id: 'first_name', text: 'Client Name' },
  { id: 'date_of_birth', text: 'Date of birth' },
  { id: 'officer_email', text: 'Uploaded by' },
  { id: 'date_of_event', text: 'Last upload' },
];

interface Props {
  sort?: {
    sort_by?: string;
    order_by?: string;
  };
  onSort?: (id: string) => void;
  records: Case[];
}

const CasesTable = ({
  records,
  sort = {},
  onSort,
}: Props): React.ReactElement => {
  return (
    <table className="govuk-table">
      <thead className="govuk-table__head">
        <tr className="govuk-table__row">
          {tableHeader.map(({ id, text }) => (
            <th
              key={id}
              scope="col"
              className="govuk-table__header"
              role={onSort && 'button'}
              onClick={() => onSort && onSort(id)}
            >
              {text}{' '}
              {id === sort.sort_by && (
                <>{sort.order_by === 'desc' ? '🔽' : '🔼'}</>
              )}
            </th>
          ))}
          <th scope="col" className="govuk-table__header"></th>
        </tr>
      </thead>
      <tbody className="govuk-table__body">
        {records.map((result) => (
          <CasesEntry key={result.recordId} {...result} />
        ))}
      </tbody>
    </table>
  );
};

export default CasesTable;
