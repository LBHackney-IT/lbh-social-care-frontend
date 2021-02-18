import Link from 'next/link';
import PropTypes from 'prop-types';

const header = ['Person', 'Name', 'Address', 'Date of birth'];

const AllocatedCasesTable = ({ cases }) => (
  <table className="govuk-table">
    <thead className="govuk-table__head">
      <tr className="govuk-table__row">
        {header.map((text) => (
          <th key={text} className="govuk-table__header">
            {text}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="govuk-table__body">
      {cases.map((cell) => (
        <tr key={cell.id} className="govuk-table__row">
          <td className="govuk-table__cell">{cell.personId} </td>
          <td className="govuk-table__cell">
            {
              <Link href={`/people/${cell.personId}`}>
                <a className="govuk-link">{cell.personName}</a>
              </Link>
            }
          </td>
          <td className="govuk-table__cell"> {cell.personAddress}</td>
          <td className="govuk-table__cell">
            {' '}
            {new Date(cell.personDateOfBirth).toLocaleDateString('en-GB')}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

AllocatedCasesTable.propTypes = {
  cases: PropTypes.arrayOf(
    PropTypes.shape({
      personId: PropTypes.string.isRequired,
      personName: PropTypes.string.isRequired,
      personAddress: PropTypes.string.isRequired,
      personDateOfBirth: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AllocatedCasesTable;
