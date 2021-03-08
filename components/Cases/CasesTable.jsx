import PropTypes from 'prop-types';
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
}) => (
  <tr className="govuk-table__row">
    <td className="govuk-table__cell govuk--timestamp">
      {formatDate(dateOfEvent || caseFormTimestamp)}{' '}
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

CasesEntry.propTypes = {
  recordId: PropTypes.string.isRequired,
  formName: PropTypes.string.isRequired,
  caseFormUrl: PropTypes.string.isRequired,
  officerEmail: PropTypes.string.isRequired,
  dateOfEvent: PropTypes.string,
  caseFormTimestamp: PropTypes.string,
  caseFormData: PropTypes.object.isRequired,
};

const CasesTable = ({ records }) => (
  <table className="govuk-table">
    <tbody className="govuk-table__body">
      {records.map((result) => (
        <CasesEntry key={result.recordId} {...result} />
      ))}
    </tbody>
  </table>
);

CasesTable.propTypes = {
  records: PropTypes.arrayOf(PropTypes.shape(CasesEntry.propTypes)).isRequired,
};

export default CasesTable;
