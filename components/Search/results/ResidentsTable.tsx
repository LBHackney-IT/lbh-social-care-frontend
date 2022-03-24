import Link from 'next/link';
import cx from 'classnames';
import { LegacyResident, User } from 'types';
import { canManageCases } from '../../../lib/permissions';
import { useAuth } from '../../UserContext/UserContext';
import styles from './ResidentsTable.module.scss';

const ResultEntry = ({
  person,
  newTab,
}: {
  person: LegacyResident;
  newTab?: boolean;
}): React.ReactElement => {
  const { user } = useAuth() as { user: User };
  const { mosaicId, firstName, lastName, dateOfBirth, address, ageContext } =
    person;

  const isRecordRestricted = !canManageCases(user, {
    contextFlag: ageContext,
    restricted: person.restricted,
  });

  return (
    <tr
      className={cx(
        'govuk-table__row',
        isRecordRestricted && styles.restrictedRow
      )}
    >
      <td className="govuk-table__cell">{mosaicId}</td>
      <td className="govuk-table__cell">
        {newTab ? (
          <a
            href={`/residents/${mosaicId}`}
            target="_blank"
            rel="noreferrer"
            className="govuk-link govuk-custom-text-color"
          >
            {firstName} {lastName}
          </a>
        ) : (
          <Link href={`/residents/${mosaicId}`}>
            <a className="govuk-link govuk-custom-text-color">
              {firstName} {lastName}
            </a>
          </Link>
        )}
      </td>
      <td className="govuk-table__cell">
        {dateOfBirth && new Date(dateOfBirth).toLocaleDateString('en-GB')}
      </td>
      <td className="govuk-table__cell">
        {address && (
          <>
            {address?.address && (
              <span>
                {address.address.length > 20
                  ? address?.address.substr(0, 19).trimEnd() + '... '
                  : address?.address + ' ' || ''}
              </span>
            )}
            <span className={styles.uppercase}>
              {(address && address.postcode) || ''}
            </span>
          </>
        )}
      </td>
      <td className="govuk-table__cell govuk-table__cell--numeric">
        {isRecordRestricted && (
          <span
            className={cx('govuk-tag lbh-tag lbh-tag--grey', styles.uppercase)}
          >
            Restricted
          </span>
        )}
      </td>
    </tr>
  );
};

const ResultTable = ({
  records,
  newTab,
}: {
  records: LegacyResident[];
  /** whether to open residents in a new tab? */
  newTab?: boolean;
}): React.ReactElement => (
  <table className="govuk-table lbh-table" data-testid="residents-table">
    <thead className="govuk-table__head">
      <tr className="govuk-table__row">
        <th scope="col" className="govuk-table__header">
          Social care ID
        </th>
        <th scope="col" className="govuk-table__header">
          Person
        </th>
        <th scope="col" className="govuk-table__header">
          Date of birth
        </th>
        <th scope="col" className="govuk-table__header">
          Address
        </th>
        <th scope="col" className="govuk-table__header" />
      </tr>
    </thead>
    <tbody className="govuk-table__body">
      {records.map((result) => (
        <ResultEntry key={result.mosaicId} person={result} newTab={newTab} />
      ))}
    </tbody>
  </table>
);

export default ResultTable;
