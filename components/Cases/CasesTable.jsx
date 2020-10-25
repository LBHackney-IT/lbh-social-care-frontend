import PropTypes from 'prop-types';

const onClick = (url) => window.open(url, '_blank');

const CasesEntry = ({
  personId,
  firstName,
  lastName,
  formName,
  dateOfBirth,
  caseFormUrl,
}) => (
  <tr
    className="govuk-table__row govuk-table__row--clickable"
    onClick={() => onClick(caseFormUrl)}
  >
    <td className="govuk-table__cell">{personId}</td>
    <td className="govuk-table__cell">
      {firstName} {lastName}
    </td>
    <td className="govuk-table__cell">{formName}</td>
    <td className="govuk-table__cell">
      {new Date(dateOfBirth).toLocaleDateString('en-GB')}
    </td>
  </tr>
);

const CasesTable = ({ cases }) => (
  <table className="govuk-table">
    <thead className="govuk-table__head">
      <tr className="govuk-table__row">
        <th scope="col" className="govuk-table__header">
          Person ID
        </th>
        <th scope="col" className="govuk-table__header">
          Name
        </th>
        <th scope="col" className="govuk-table__header">
          Form Name
        </th>
        <th scope="col" className="govuk-table__header">
          DOB
        </th>
      </tr>
    </thead>
    <tbody className="govuk-table__body">
      {cases.map((result) => (
        <CasesEntry key={result.personId} {...result} />
      ))}
    </tbody>
  </table>
);

CasesTable.propTypes = {
  cases: PropTypes.arrayOf(
    PropTypes.shape({
      personId: PropTypes.string,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      formName: PropTypes.string.isRequired,
      dateOfBirth: PropTypes.string.isRequired,
      caseFormUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CasesTable;
