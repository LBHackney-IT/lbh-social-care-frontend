import PropTypes from 'prop-types';

const onClick = (url) => window.open(url, '_blank');

const formatTime = (time) => {
  console.log(time);
  // const split = time.split('/');
  // const requiredFormat = [split[1], split[0], split[2]].join('/');
  // const formatTime = new Date(requiredFormat).toLocaleString('en-GB', {
  //   hour: 'numeric',
  //   minute: 'numeric',
  //   second: 'numeric',
  //   day: 'numeric',
  //   month: 'short',
  //   year: 'numeric',
  // });
  // return formatTime.split(',').reverse().join(', ');
};

const CasesEntry = ({
  formName,
  caseFormUrl,
  officerEmail,
  caseFormTimestamp,
}) => (
  <tr className="govuk-table__row">
    <td className="govuk-table__cell timestamp">
      {formatTime(caseFormTimestamp)}{' '}
    </td>
    <td className="govuk-table__cell">{formName}</td>
    <td className="govuk-table__cell">
      {officerEmail && `- created by ${officerEmail}`}
    </td>
    <td className="govuk-table__cell govuk-button--secondary'">
      <a href="#" className="govuk-link" onClick={() => onClick(caseFormUrl)}>
        View
      </a>
    </td>
  </tr>
);

const CasesTable = ({ cases }) => {
  console.log(cases);
  const filterCases = cases.filter((nom) => nom.formName !== null);
  return (
    <table className="govuk-table">
      <tbody className="govuk-table__body">
        {filterCases.map((result) => (
          <CasesEntry key={result.caseFormTimestamp} {...result} />
        ))}
      </tbody>
    </table>
  );
};

CasesTable.propTypes = {
  cases: PropTypes.arrayOf(
    PropTypes.shape({
      personId: PropTypes.number.isRequired,
      formName: PropTypes.string.isRequired,
      caseFormUrl: PropTypes.string.isRequired,
      officerEmail: PropTypes.string.isRequired,
      caseFormTimestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CasesTable;
