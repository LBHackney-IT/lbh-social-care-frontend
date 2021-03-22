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
    <td className="govuk-table__cell govuk--timestamp">
      {(dateOfEvent && formatDate(dateOfEvent)) ||
        (caseFormTimestamp && formatDate(caseFormTimestamp))}
    </td>
    <td className="govuk-table__cell">{formName}</td>
    <td className="govuk-table__cell">
      {officerEmail && `- created by ${officerEmail}`}
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

const CasesTable = ({ records }: { records: Case[] }): React.ReactElement => (
  <table className="govuk-table">
    <tbody className="govuk-table__body">
      {records.map((result) => (
        <CasesEntry key={result.recordId} {...result} />
      ))}
    </tbody>
  </table>
);

export default CasesTable;
