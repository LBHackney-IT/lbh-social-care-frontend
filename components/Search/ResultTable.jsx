import Link from 'next/link';
import PropTypes from 'prop-types';

const ResultEntry = ({
  personId,
  mosaicId,
  firstName,
  lastName,
  dateOfBirth,
}) => (
  <tr className="govuk-table__row">
    <td className="govuk-table__cell">{personId || mosaicId}</td>
    <td className="govuk-table__cell">
      {firstName} {lastName}
    </td>
    <td className="govuk-table__cell">
      {new Date(dateOfBirth).toLocaleDateString('en-GB')}
    </td>
    <td className="govuk-table__cell">
      <Link href={`/people/${personId || mosaicId}`}>
        <a
          className="govuk-link govuk-custom-text-color
        "
        >
          View
        </a>
      </Link>
    </td>
  </tr>
);

const ResultTable = ({ results }) => (
  <table className="govuk-table">
    <caption className="govuk-table__caption">
      <h2 className="govuk-fieldset__legend--m govuk-custom-text-color">
        PEOPLE SEARCH RESULT
      </h2>
      <hr className="govuk-divider" />
    </caption>
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
