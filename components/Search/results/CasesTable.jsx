import PropTypes from 'prop-types';

import { formatDate, isDateValid } from 'utils/date';
import CaseLink from '../../Cases/CaseLink';

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
}) => (
  <tr className="govuk-table__row">
    <td className="govuk-table__cell">
      {firstName} {lastName}
    </td>
    <td className="govuk-table__cell">
      {isDateValid(dateOfBirth) && dateOfBirth}
    </td>
    <td className="govuk-table__cell">{officerEmail}</td>
    <td className="govuk-table__cell">
      {formatDate(dateOfEvent || caseFormTimestamp)}
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
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  officerEmail: PropTypes.string.isRequired,
  caseFormUrl: PropTypes.string,
  dateOfEvent: PropTypes.string,
  dateOfBirth: PropTypes.string,
  caseFormTimestamp: PropTypes.string.isRequired,
  caseFormData: PropTypes.object.isRequired,
};

const tableHeader = [
  { id: 'first_name', text: 'Client Name' },
  { id: 'date_of_birth', text: 'Date of birth' },
  { id: 'officer_email', text: 'Uploaded by' },
  { id: 'date_of_event', text: 'Last upload' },
];

const CasesTable = ({ records, sort = {}, onSort }) => {
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

CasesTable.propTypes = {
  sort: PropTypes.shape({
    sort_by: PropTypes.string.isRequired,
    order_by: PropTypes.string.isRequired,
  }),
  onSort: PropTypes.func.isRequired,
  records: PropTypes.arrayOf(
    PropTypes.shape({
      recordId: PropTypes.string.isRequired,
      formName: PropTypes.string.isRequired,
      caseFormUrl: PropTypes.string,
      officerEmail: PropTypes.string.isRequired,
      dateOfEvent: PropTypes.string,
      caseFormTimestamp: PropTypes.string.isRequired,
      caseFormData: PropTypes.object.isRequired,
    })
  ).isRequired,
};

export default CasesTable;
