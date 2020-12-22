import PropTypes from 'prop-types';
import { formatDate } from 'utils/date';
const onClick = (url) => window.open(url, '_blank');

const CasesEntry = ({ formName, caseFormUrl, officerEmail, dateOfEvent }) => (
  <tr className="govuk-table__row">
    <td className="govuk-table__cell govuk--timestamp">
      {dateOfEvent && formatDate(dateOfEvent)}{' '}
    </td>
    <td className="govuk-table__cell">{formName}</td>
    <td className="govuk-table__cell">
      {officerEmail && `- created by ${officerEmail}`}
    </td>
    <td className="govuk-table__cell govuk-button--secondary'">
      {caseFormUrl && (
        <span
          role="button"
          className="govuk-link govuk-custom-text-color"
          onClick={() => onClick(caseFormUrl)}
        >
          View
        </span>
      )}
    </td>
  </tr>
);

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
  records: PropTypes.arrayOf(
    PropTypes.shape({
      recordId: PropTypes.string.isRequired,
      formName: PropTypes.string.isRequired,
      caseFormUrl: PropTypes.string.isRequired,
      officerEmail: PropTypes.string.isRequired,
      dateOfEvent: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CasesTable;
