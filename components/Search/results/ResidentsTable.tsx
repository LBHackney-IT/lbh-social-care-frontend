import Link from 'next/link';
import { Resident } from 'types';

const ResultEntry = ({
  mosaicId,
  firstName,
  lastName,
  dateOfBirth,
}: Resident): React.ReactElement => (
  <tr className="govuk-table__row">
    <td className="govuk-table__cell">{mosaicId}</td>
    <td className="govuk-table__cell">
      <Link href={`/people/${mosaicId}`}>
        <a className="lbh-link">
          {' '}
          {firstName} {lastName}
        </a>
      </Link>
    </td>
    <td className="govuk-table__cell">
      {dateOfBirth && new Date(dateOfBirth).toLocaleDateString('en-GB')}
    </td>
  </tr>
);

const ResultTable = ({
  records,
}: {
  records: Resident[];
}): React.ReactElement => (
  <table className="govuk-table lbh-table govuk-!-margin-bottom-0">
    <thead className="govuk-table__head">
      <tr className="govuk-table__row">
        <th scope="col" className="govuk-table__header">
          Mosaic ID
        </th>
        <th scope="col" className="govuk-table__header">
          Client
        </th>
        <th scope="col" className="govuk-table__header">
          Date of birth
        </th>
      </tr>
    </thead>
    <tbody className="govuk-table__body">
      {records.map((result) => (
        <ResultEntry key={result.mosaicId} {...result} />
      ))}
    </tbody>
  </table>
);

export default ResultTable;
