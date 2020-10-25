import Link from 'next/link';
import PropTypes from 'prop-types';

const ResultEntry = ({
  personId,
  mosaicId,
  firstName,
  lastName,
  addressList,
  dateOfBirth,
}) => (
  <Link href={`/people/${personId || mosaicId}/cases`}>
    <tr className="govuk-table__row govuk-table__row--clickable">
      <td className="govuk-table__cell">{personId || mosaicId}</td>
      <td className="govuk-table__cell">
        {firstName} {lastName}
      </td>
      <td className="govuk-table__cell">
        {addressList && Object.values(addressList[0]).join(' ')}
      </td>
      <td className="govuk-table__cell">
        {new Date(dateOfBirth).toLocaleDateString('en-GB')}
      </td>
    </tr>
  </Link>
);

const ResultTable = ({ results }) => (
  <table className="govuk-table">
    <caption className="govuk-table__caption">People search result</caption>
    <thead className="govuk-table__head">
      <tr className="govuk-table__row">
        <th scope="col" className="govuk-table__header">
          Person ID
        </th>
        <th scope="col" className="govuk-table__header">
          Name
        </th>
        <th scope="col" className="govuk-table__header">
          Address
        </th>
        <th scope="col" className="govuk-table__header">
          DOB
        </th>
      </tr>
    </thead>
    <tbody className="govuk-table__body">
      {results.map((result) => (
        <ResultEntry key={result.personId} {...result} />
      ))}
    </tbody>
  </table>
);

ResultTable.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      personId: PropTypes.string,
      mosaicId: PropTypes.string,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      addressList: PropTypes.array.isRequired,
      dateOfBirth: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ResultTable;
