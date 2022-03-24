import Link from 'next/link';

import { Allocation } from 'types';

const header = [
  'Person ID',
  'Client name',
  'Date of birth',
  'Assessment type',
  'Date allocated',
];

const AllocatedCasesTable = ({
  cases,
}: {
  cases: Allocation[];
}): React.ReactElement => (
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
              <Link href={`/residents/${cell.personId}`}>
                <a className="govuk-link">{cell.personName}</a>
              </Link>
            }
          </td>
          <td className="govuk-table__cell">
            {new Date(cell.personDateOfBirth).toLocaleDateString('en-GB')}
          </td>
          <td className="govuk-table__cell">{cell.workerType}</td>
          <td className="govuk-table__cell">
            {new Date(cell.allocationStartDate).toLocaleDateString('en-GB')}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default AllocatedCasesTable;
