import Link from 'next/link';

const header = [
  'Person',
  'Name',
  'Address',
  'Date of birth',
  'Assessment type',
];

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
          <td className="govuk-table__cell"> {cell.allocatedWorkerTeam}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default AllocatedCasesTable;
