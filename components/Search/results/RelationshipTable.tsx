import Link from 'next/link';
import cx from 'classnames';
import { LegacyResident } from 'types';

const ResultEntry = ({
  person,
  newTab,
  getValueCallback,
}: {
  person: LegacyResident;
  newTab?: boolean;
}): React.ReactElement => {
  const { mosaicId, firstName, lastName, dateOfBirth, address } = person;

  return (
    <>
      <tr className={cx('govuk-table__row')}>
        <td className="govuk-table__cell">
          <input
            aria-labelledby={`worker_${mosaicId}`}
            name="workerId"
            type="radio"
            value={mosaicId}
            onChange={(e) => {
              getValueCallback(e.target.value);
            }}
          />
        </td>
        <td className="govuk-table__cell">{mosaicId}</td>
        <td className="govuk-table__cell">
          {newTab ? (
            <a
              href={`/people/${mosaicId}`}
              target="_blank"
              rel="noreferrer"
              className="govuk-link govuk-custom-text-color"
            >
              {firstName} {lastName}
            </a>
          ) : (
            <Link href={`/people/${mosaicId}`}>
              <a className="govuk-link govuk-custom-text-color">
                {firstName} {lastName}
              </a>
            </Link>
          )}
        </td>
        <td className="govuk-table__cell">
          <span>{(address && address.postcode) || ''}</span>
        </td>
        <td className="govuk-table__cell">
          {dateOfBirth && new Date(dateOfBirth).toLocaleDateString('en-GB')}
        </td>
      </tr>
    </>
  );
};

const RelationshipSearchTable = ({
  records,
  getValueCallback,
}: {
  records: LegacyResident[];
}): React.ReactElement => {
  return (
    <table className="govuk-table lbh-table" data-testid="residents-table">
      <thead className="govuk-table__head">
        <tr className="govuk-table__row">
          <th scope="col" className="govuk-table__header">
            Select
          </th>
          <th scope="col" className="govuk-table__header">
            ID
          </th>
          <th scope="col" className="govuk-table__header">
            Client Name
          </th>
          <th scope="col" className="govuk-table__header">
            Address
          </th>
          <th scope="col" className="govuk-table__header">
            Date of birth
          </th>
          <th scope="col" className="govuk-table__header" />
        </tr>
      </thead>

      <tbody className="govuk-table__body">
        {records.map((result) => (
          <ResultEntry
            key={result.mosaicId}
            person={result}
            getValueCallback={getValueCallback}
          />
        ))}
      </tbody>
    </table>
  );
};

export default RelationshipSearchTable;
