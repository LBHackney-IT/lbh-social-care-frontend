import { Case } from 'types';
import { formatDate } from 'utils/date';

import CaseLink from './CaseLink';

const CasesEntry = ({
  recordId,
  formName,
  caseFormUrl,
  officerEmail,
  dateOfEvent,
  caseFormData,
  caseFormTimestamp,
}: Case) => (
  <tr className="govuk-table__row">
    <td
      className="govuk-table__cell govuk--timestamp"
      style={{ width: '120px' }}
    >
      {(dateOfEvent && formatDate(dateOfEvent)) ||
        (caseFormTimestamp && formatDate(caseFormTimestamp))}
    </td>
    <td className="govuk-table__cell">
      {officerEmail && `- created by ${officerEmail}`}
    </td>
    <td className="govuk-table__cell">{officerEmail}</td>
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
  { id: 'date_of_event', text: 'Date created' },
  { id: 'formName', text: 'Record type' },
  { id: 'officer_email', text: 'Created by' },
  { id: 'action', text: 'Action' },
];

const CasesTable = ({ records }: { records: Case[] }): React.ReactElement => (
  <table className="govuk-table">
    <thead className="govuk-table__head">
      <tr className="govuk-table__row">
        {tableHeader.map(({ id, text }) => (
          <th key={id} scope="col" className="govuk-table__header">
            {text}
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

export default CasesTable;
