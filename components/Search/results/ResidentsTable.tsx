import Link from 'next/link';
import { LegacyResident } from 'types';

const ResultEntry = ({
  mosaicId,
  firstName,
  lastName,
  dateOfBirth,
  ageContext,
}: LegacyResident): React.ReactElement => (
  <tr className="govuk-table__row">
    <td className="govuk-table__cell">{mosaicId}</td>
    <td className="govuk-table__cell">
      <strong className="govuk-tag" title={ageContext === 'A' ? 'ASC' : 'CFS'}>
        {ageContext}
      </strong>{' '}
      {firstName} {lastName}
    </td>
    <td className="govuk-table__cell">
      {dateOfBirth && new Date(dateOfBirth).toLocaleDateString('en-GB')}
    </td>
    <td className="govuk-table__cell">
      <Link href={`/people/${mosaicId}`}>
        <a className="govuk-link govuk-custom-text-color">View</a>
      </Link>
    </td>
  </tr>
);

const ResultTable = ({
  records,
}: {
  records: LegacyResident[];
}): React.ReactElement => (
  <table className="govuk-table">
    <thead className="govuk-table__head">
      <tr className="govuk-table__row">
        <th scope="col" className="govuk-table__header">
          Mosaic ID
        </th>
        <th scope="col" className="govuk-table__header">
          Client Name
        </th>
        <th scope="col" className="govuk-table__header">
          Date of birth
        </th>
        <th scope="col" className="govuk-table__header"></th>
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
