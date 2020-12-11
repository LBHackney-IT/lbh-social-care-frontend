import PropTypes from 'prop-types';

import { formatDate, isDateValid } from 'utils/date';

const onClick = (url) => window.open(url, '_blank');

const CasesEntry = ({
  firstName,
  lastName,
  caseFormUrl,
  dateOfBirth,
  officerEmail,
  caseFormTimestamp,
}) => (
  <tr className="govuk-table__row">
    <td className="govuk-table__cell">
      {firstName} {lastName}
    </td>
    <td className="govuk-table__cell">
      {isDateValid(dateOfBirth) && dateOfBirth}
    </td>
    <td className="govuk-table__cell">{officerEmail}</td>
    <td className="govuk-table__cell">{formatDate(caseFormTimestamp)}</td>
    <td className="govuk-table__cell govuk-button--secondary'">
      <a
        href="#"
        className="govuk-link govuk-custom-text-color"
        onClick={() => onClick(caseFormUrl)}
      >
        View
      </a>
    </td>
  </tr>
);

const tableHeader = [
  { id: 'client_name', text: 'Client Name' },
  { id: 'date_of_birth', text: 'Date of birth' },
  { id: 'uploaded_by', text: 'Uploaded by' },
  { id: 'last_upload', text: 'Last upload' },
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
              role="button"
              onClick={() => onSort(id)}
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
          <CasesEntry key={result.personId} {...result} />
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
      personId: PropTypes.number.isRequired,
      formName: PropTypes.string.isRequired,
      caseFormUrl: PropTypes.string.isRequired,
      officerEmail: PropTypes.string.isRequired,
      caseFormTimestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CasesTable;
